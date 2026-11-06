import { useEffect, useRef } from 'react'

type Star = { x: number; y: number; vx: number; vy: number; r: number; tw: number; green: boolean }

/**
 * Céu estrelado atrás da página. As estrelas piscam, se ligam quando estão
 * perto (constelações), desviam do cursor e se agitam com a rolagem. Algumas
 * são verde-portal. Fica parado com "reduzir movimento".
 */
export function Stars() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0
    let h = 0
    let stars: Star[] = []
    let ink = '#eceeef'
    let accent = '#5fe3a1'
    const mouse = { x: -9999, y: -9999, active: false }
    let lastScroll = window.scrollY
    let stir = 0
    let raf = 0
    let running = true
    let t = 0

    const readColors = () => {
      const cs = getComputedStyle(document.documentElement)
      ink = cs.getPropertyValue('--c-ink').trim() || ink
      accent = cs.getPropertyValue('--c-accent').trim() || accent
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const target = Math.min(170, Math.max(50, Math.floor((w * h) / 11000)))
      while (stars.length < target) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          r: 0.5 + Math.random() * 1.3,
          tw: Math.random() * Math.PI * 2,
          green: Math.random() < 0.12,
        })
      }
      stars.length = target
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      const link = 110
      for (let i = 0; i < stars.length; i++) {
        const a = stars[i]
        for (let j = i + 1; j < stars.length; j++) {
          const b = stars[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d2 = dx * dx + dy * dy
          if (d2 < link * link) {
            ctx.strokeStyle = a.green && b.green ? accent : ink
            ctx.globalAlpha = (1 - Math.sqrt(d2) / link) * 0.1
            ctx.lineWidth = 0.7
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
        if (mouse.active) {
          const d = Math.hypot(a.x - mouse.x, a.y - mouse.y)
          if (d < 180) {
            ctx.strokeStyle = accent
            ctx.globalAlpha = (1 - d / 180) * 0.25
            ctx.lineWidth = 0.7
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.stroke()
          }
        }
      }
      for (const s of stars) {
        ctx.fillStyle = s.green ? accent : ink
        ctx.globalAlpha = 0.25 + 0.45 * (0.5 + 0.5 * Math.sin(t * 0.03 + s.tw))
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
    }

    const step = () => {
      t++
      for (const s of stars) {
        if (mouse.active) {
          const dx = s.x - mouse.x
          const dy = s.y - mouse.y
          const d2 = dx * dx + dy * dy
          if (d2 < 150 * 150 && d2 > 0.01) {
            const d = Math.sqrt(d2)
            const f = ((150 - d) / 150) * 0.05
            s.vx += (dx / d) * f
            s.vy += (dy / d) * f
          }
        }
        s.vx += (Math.random() - 0.5) * 0.015 * (1 + stir)
        s.vy += (Math.random() - 0.5) * 0.015 * (1 + stir)
        s.vx *= 0.985
        s.vy *= 0.985
        s.x += s.vx
        s.y += s.vy
        if (s.x < -10) s.x = w + 10
        if (s.x > w + 10) s.x = -10
        if (s.y < -10) s.y = h + 10
        if (s.y > h + 10) s.y = -10
      }
      stir *= 0.9
    }

    const loop = () => {
      if (!running) return
      step()
      draw()
      raf = requestAnimationFrame(loop)
    }
    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      mouse.active = true
    }
    const onLeave = () => {
      mouse.active = false
    }
    const onScroll = () => {
      const y = window.scrollY
      const delta = y - lastScroll
      lastScroll = y
      for (const s of stars) s.y -= delta * 0.12 * (s.r / 1.8)
      stir = Math.min(stir + Math.abs(delta) / 40, 6)
    }
    const onVisibility = () => {
      if (document.hidden) {
        running = false
        cancelAnimationFrame(raf)
      } else if (!reduce) {
        running = true
        raf = requestAnimationFrame(loop)
      }
    }
    const themeObserver = new MutationObserver(() => {
      readColors()
      if (reduce) draw()
    })
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    readColors()
    resize()
    window.addEventListener('resize', resize)
    if (reduce) {
      draw()
    } else {
      window.addEventListener('pointermove', onMove, { passive: true })
      window.addEventListener('pointerleave', onLeave)
      window.addEventListener('scroll', onScroll, { passive: true })
      document.addEventListener('visibilitychange', onVisibility)
      raf = requestAnimationFrame(loop)
    }
    return () => {
      running = false
      cancelAnimationFrame(raf)
      themeObserver.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 h-full w-full" />
}
