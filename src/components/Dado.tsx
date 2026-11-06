import { useEffect, useState } from 'react'
import { barPaths, facePath, linePath, topMark } from '../dado'

type Props = {
  /** Quantas barras mostrar (1 a 6). */
  face?: number
  /** Se definido, o dado "rola" trocando de face a cada N ms. */
  rollEvery?: number
  className?: string
}

/** O "dado" isométrico: cubo de traço com gráfico de barras e linha nas faces. */
export function Dado({ face = 1, rollEvery, className = '' }: Props) {
  const [value, setValue] = useState(face)

  useEffect(() => {
    if (!rollEvery || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(() => setValue((v) => (v % 6) + 1), rollEvery)
    return () => window.clearInterval(id)
  }, [rollEvery])

  return (
    <svg viewBox="0 0 100 100" className={`${className} ${rollEvery ? 'die-roll' : ''}`} aria-hidden="true" focusable="false">
      <path d={facePath('top')} className="fill-surface stroke-ink" strokeWidth={5} strokeLinejoin="round" />
      <path d={facePath('left')} className="fill-surface stroke-ink" strokeWidth={5} strokeLinejoin="round" />
      <path d={facePath('right')} className="fill-raised stroke-ink" strokeWidth={5} strokeLinejoin="round" />
      <path d={topMark()} className="fill-accent" />
      <path d={linePath(value)} fill="none" className="stroke-ink" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
      {barPaths(value).map((d, i) => (
        <path key={i} d={d} className="fill-accent" />
      ))}
    </svg>
  )
}
