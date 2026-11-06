import { useEffect, useRef, useState } from 'react'

/**
 * Mascote do site: um gatinho preto de cabeça arredondada, orelhas pontudas e laterais quase retas, meio inclinado,
 * subindo de dentro de um círculo amarelo-ipê. Os olhos seguem o mouse, ele
 * pisca de vez em quando e mexe a orelha no hover do link.
 */
export function Mascot({ className = '' }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null)
  const [look, setLook] = useState({ x: 0, y: 0 })
  const [blink, setBlink] = useState(false)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const onMove = (e: PointerEvent) => {
      const b = ref.current?.getBoundingClientRect()
      if (!b) return
      const dx = e.clientX - (b.left + b.width / 2)
      const dy = e.clientY - (b.top + b.height * 0.55)
      const d = Math.hypot(dx, dy) || 1
      const m = Math.min(1, d / 220)
      setLook({ x: (dx / d) * 1.4 * m, y: (dy / d) * 1 * m })
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    let id = 0
    if (!reduce) {
      const tick = () => {
        setBlink(true)
        window.setTimeout(() => setBlink(false), 140)
        id = window.setTimeout(tick, 2600 + Math.random() * 3200)
      }
      id = window.setTimeout(tick, 1800)
    }
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.clearTimeout(id)
    }
  }, [])

  return (
    <svg ref={ref} viewBox="0 0 40 40" className={`mascot ${className}`} aria-hidden="true" focusable="false">
      <defs>
        <clipPath id="mascot-clip">
          <circle cx={20} cy={20} r={18} />
        </clipPath>
      </defs>
      <circle cx={20} cy={20} r={18} className="fill-ipe" />
      <g clipPath="url(#mascot-clip)">
        {/* gatinho levemente inclinado, apoiado na base do círculo */}
        <g transform="rotate(-11 20 34)">
          {/* corpo: cabeça larga e arredondada, orelhas pontudas, laterais quase retas */}
          <path
            d="M10 40 L10.4 23 Q10.2 16 11.2 13 L12.6 7.2 Q13 6.6 13.6 7.2 L17.6 11.6 Q20 11 22.4 11.6 L26.4 7.2 Q27 6.6 27.4 7.2 L28.8 13 Q29.8 16 29.6 23 L30 40 Z"
            className="fill-bg"
          />
          {/* orelha direita separada para mexer no hover */}
          <path d="M22.4 11.6 L26.4 7.2 Q27 6.6 27.4 7.2 L28.8 13 Z" className="ear-r fill-bg" />
          {/* olhos */}
          <g transform={`translate(${look.x} ${look.y})`}>
            <ellipse cx={15.6} cy={20.5} rx={1.3} ry={blink ? 0.2 : 1.7} className="fill-ipe" />
            <ellipse cx={24.4} cy={20.5} rx={1.3} ry={blink ? 0.2 : 1.7} className="fill-ipe" />
            <path d="M19.1 23.2 L20.9 23.2 L20 24.3 Z" className="fill-accent" />
          </g>
        </g>
      </g>
    </svg>
  )
}
