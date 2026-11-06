import { useEffect, useRef } from 'react'

/**
 * Cursor próprio (inspirado no minhpham.design):
 * - um ponto verde no lugar da seta e um anel que segue com atraso;
 * - em links e botões o anel cresce;
 * - em elementos com `data-magnetic` o anel abraça o elemento e o elemento
 *   é puxado de leve na direção do mouse;
 * - dentro de uma `Lens` (data-lens) ponto e anel somem, porque a própria
 *   lente vira o cursor.
 * Só liga com mouse de verdade (pointer: fine) e sem "reduzir movimento".
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const d = dot.current
    const r = ring.current
    if (!fine || reduce || !d || !r) return

    document.documentElement.classList.add('has-cursor')
    const pos = { x: -100, y: -100 }
    const ringPos = { x: -100, y: -100, w: 34, h: 34, radius: 999 }
    let target: { x: number; y: number; w: number; h: number; radius: number } | null = null
    let magnet: HTMLElement | null = null
    let mode: 'idle' | 'hover' | 'lens' = 'idle'
    let raf = 0
    let visible = false

    const onMove = (e: PointerEvent) => {
      pos.x = e.clientX
      pos.y = e.clientY
      if (!visible) {
        visible = true
        d.style.opacity = '1'
        r.style.opacity = '1'
      }
      const el = e.target as HTMLElement | null
      const lens = el?.closest('[data-lens]')
      const mag = el?.closest<HTMLElement>('[data-magnetic]')
      const hoverable = el?.closest('a, button, summary, select, [role="button"]')

      if (magnet && magnet !== mag) {
        magnet.style.transform = ''
        magnet = null
      }
      if (lens) {
        mode = 'lens'
        target = null
      } else if (mag) {
        magnet = mag
        const b = mag.getBoundingClientRect()
        const cx = b.left + b.width / 2
        const cy = b.top + b.height / 2
        mag.style.transform = `translate(${(pos.x - cx) * 0.22}px, ${(pos.y - cy) * 0.22}px)`
        const pad = 8
        target = {
          x: cx + (pos.x - cx) * 0.22,
          y: cy + (pos.y - cy) * 0.22,
          w: b.width + pad * 2,
          h: b.height + pad * 2,
          radius: parseFloat(getComputedStyle(mag).borderRadius) + pad || 14,
        }
        mode = 'hover'
      } else {
        target = null
        mode = hoverable ? 'hover' : 'idle'
      }
    }

    const onLeaveWindow = () => {
      visible = false
      d.style.opacity = '0'
      r.style.opacity = '0'
      if (magnet) magnet.style.transform = ''
      magnet = null
    }

    const loop = () => {
      const size = mode === 'hover' ? 52 : 34
      const goal = target ?? { x: pos.x, y: pos.y, w: size, h: size, radius: 999 }
      const k = target ? 0.28 : 0.18
      ringPos.x += (goal.x - ringPos.x) * k
      ringPos.y += (goal.y - ringPos.y) * k
      ringPos.w += (goal.w - ringPos.w) * 0.22
      ringPos.h += (goal.h - ringPos.h) * 0.22
      ringPos.radius = goal.radius
      d.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%) scale(${mode === 'idle' ? 1 : 0})`
      r.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px) translate(-50%, -50%)`
      r.style.width = `${ringPos.w}px`
      r.style.height = `${ringPos.h}px`
      r.style.borderRadius = `${Math.min(ringPos.radius, 999)}px`
      r.dataset.mode = mode
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeaveWindow)
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeaveWindow)
      document.documentElement.classList.remove('has-cursor')
    }
  }, [])

  return (
    <>
      <div ref={ring} aria-hidden="true" className="cursor-ring pointer-events-none fixed top-0 left-0 z-[60] opacity-0" />
      <div ref={dot} aria-hidden="true" className="pointer-events-none fixed top-0 left-0 z-[61] h-2.5 w-2.5 rounded-full bg-accent opacity-0" />
    </>
  )
}
