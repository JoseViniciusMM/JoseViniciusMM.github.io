import type { ReactNode } from 'react'
import { Dado } from './Dado'

type SectionProps = {
  id: string
  title: string
  lead?: string
  /** Número de barras do dado ao lado do título (1 a 6). */
  face?: number
  /** Algo extra embaixo do título (ex.: um galho de ipê). */
  aside?: ReactNode
  /** Título em cima do conteúdo, ocupando a largura toda (usado em Projetos). */
  wide?: boolean
  children: ReactNode
}

/** Seção editorial: título fixo à esquerda e conteúdo à direita, ou título em cima quando `wide`. */
export function Section({ id, title, lead, face = 1, aside, wide, children }: SectionProps) {
  const heading = (
    <div className="group/die readable">
      <Dado face={face} className="die-hover mb-4 h-9 w-9" />
      <h2 className={`font-bold tracking-tight ${wide ? 'text-3xl md:text-5xl' : 'text-3xl md:text-4xl'}`}>{title}</h2>
      {lead && <p className={`mt-3 text-muted ${wide ? 'max-w-2xl text-lg' : 'max-w-xs text-base'}`}>{lead}</p>}
      {aside}
    </div>
  )
  if (wide) {
    return (
      <section id={id} className="scroll-mt-20 border-t border-line">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28">
          {heading}
          <div className="mt-12">{children}</div>
        </div>
      </section>
    )
  }
  return (
    <section id={id} className="scroll-mt-20 border-t border-line">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:grid-cols-[240px_1fr] md:gap-16 md:px-10 md:py-28">
        <div className="md:sticky md:top-24 md:self-start">{heading}</div>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  )
}

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-7xl px-5 md:px-10 ${className}`}>{children}</div>
}

export function Chip({ children, tone = 'plain' }: { children: ReactNode; tone?: 'plain' | 'accent' }) {
  const cls = tone === 'accent' ? 'bg-accent-soft text-accent' : 'border border-line text-ink'
  return <span className={`inline-flex items-center rounded-md px-2.5 py-1 text-sm ${cls}`}>{children}</span>
}
