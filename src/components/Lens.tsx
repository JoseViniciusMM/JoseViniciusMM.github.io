import { useRef, useState, type PointerEvent, type ReactNode } from 'react'

/**
 * Lente de outra dimensão: um círculo verde segue o mouse sobre o bloco e,
 * dentro dele, aparece a versão alternativa do texto (`alt`). Mesma ideia do
 * minhpham.design, trocando o "good/bad" pela realidade alternativa.
 * A versão alternativa é decorativa (aria-hidden); a original segue legível.
 */
export function Lens({ children, alt, className = '' }: { children: ReactNode; alt: ReactNode; className?: string }) {
  const box = useRef<HTMLDivElement>(null)
  const [state, setState] = useState({ x: 0, y: 0, r: 0 })

  const move = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') return
    const b = box.current?.getBoundingClientRect()
    if (!b) return
    setState({ x: e.clientX - b.left, y: e.clientY - b.top, r: 120 })
  }

  return (
    <div ref={box} data-lens className={`relative ${className}`} onPointerMove={move} onPointerLeave={() => setState((s) => ({ ...s, r: 0 }))}>
      {children}
      <div
        aria-hidden="true"
        className="lens-layer pointer-events-none absolute inset-0 bg-accent text-bg"
        style={{ clipPath: `circle(${state.r}px at ${state.x}px ${state.y}px)` }}
      >
        {alt}
      </div>
    </div>
  )
}
