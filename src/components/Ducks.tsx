/**
 * Família de patos atravessando o rodapé devagar, numa linha d'água.
 * Desenho genérico de pato; a referência fica para quem reconhecer.
 */

function Duck({ x, scale = 1, delay = 0 }: { x: number; scale?: number; delay?: number }) {
  return (
    <g transform={`translate(${x} ${(36 * (1 - scale)).toFixed(1)}) scale(${scale})`}>
      <g className="animate-bob" style={{ animationDelay: `${delay}s`, transformBox: 'fill-box', transformOrigin: '50% 100%' }}>
        {/* corpo */}
        <path d="M2 30 C2 20 12 16 22 18 C28 19 32 22 36 22 C40 22 41 26 38 30 C34 36 8 37 2 30 Z" className="fill-ipe" />
        {/* asa */}
        <path d="M14 23 C20 21 27 23 29 27 C24 30 17 29 14 23 Z" className="fill-bg" fillOpacity={0.25} />
        {/* cabeça */}
        <circle cx={34} cy={12} r={7} className="fill-ipe" />
        {/* bico */}
        <path d="M40 11 L48 13 L40 15 Z" className="fill-accent" />
        {/* olho */}
        <circle cx={35.5} cy={10.5} r={1.3} className="fill-bg" />
      </g>
    </g>
  )
}

export function Ducks({ label }: { label: string }) {
  return (
    <div className="pointer-events-none relative h-16 overflow-hidden" role="img" aria-label={label}>
      <svg className="absolute bottom-3 left-0 h-12 w-full" viewBox="0 0 1200 48" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 40 Q 25 36 50 40 T 100 40 T 150 40 T 200 40 T 250 40 T 300 40 T 350 40 T 400 40 T 450 40 T 500 40 T 550 40 T 600 40 T 650 40 T 700 40 T 750 40 T 800 40 T 850 40 T 900 40 T 950 40 T 1000 40 T 1050 40 T 1100 40 T 1150 40 T 1200 40" fill="none" className="stroke-line" strokeWidth={2} />
      </svg>
      <div className="swim absolute bottom-[14px] left-0 w-full">
        <svg viewBox="0 0 220 40" className="h-10 w-[220px]" aria-hidden="true">
          <Duck x={150} scale={1} />
          <Duck x={96} scale={0.62} delay={0.4} />
          <Duck x={56} scale={0.58} delay={0.9} />
          <Duck x={18} scale={0.55} delay={1.3} />
        </svg>
      </div>
    </div>
  )
}
