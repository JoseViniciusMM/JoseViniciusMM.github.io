/**
 * Galho de ipê-amarelo em traço de pincel, gerado em SVG.
 * As flores ficam em amarelo-ipê; os estames e as nervuras ganham tinta no
 * hover do `.bloom-host` mais próximo (mesma ideia dos lírios da Luana,
 * trocando a flor por uma árvore de Rondônia).
 */

type Pt = [number, number]

// Sorteio com semente: o desenho sai igual em toda visita.
function rng(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

/** Traço de pincel: linha com leve tremor, em camadas de espessura diferente. */
function brush(pts: Pt[], r: () => number) {
  return [0, 1, 2].map((k) => {
    const d = pts
      .map(([x, y], i) => {
        const jx = (r() - 0.5) * 1.6
        const jy = (r() - 0.5) * 1.6
        return `${i ? 'L' : 'M'}${(x + jx).toFixed(1)} ${(y + jy).toFixed(1)}`
      })
      .join(' ')
    return { d, w: [5.5, 3.2, 1.6][k], o: [0.55, 0.8, 1][k] }
  })
}

/** Pétala do ipê: trombeta curta com borda franzida, apontando para `ang`. */
function petal(cx: number, cy: number, ang: number, len: number) {
  const c = Math.cos(ang)
  const s = Math.sin(ang)
  const p = (a: number, b: number): Pt => [cx + a * c - b * s, cy + a * s + b * c]
  const pts = [p(0, 0), p(len * 0.45, -len * 0.32), p(len * 0.95, -len * 0.42), p(len * 1.08, -len * 0.12), p(len, len * 0.05), p(len * 1.08, len * 0.22), p(len * 0.95, len * 0.42), p(len * 0.45, len * 0.32)]
  return `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)} ` + pts.slice(1).map(([x, y]) => `L${x.toFixed(1)} ${y.toFixed(1)}`).join(' ') + 'Z'
}

type Flower = { x: number; y: number; r: number; rot: number }

function build(seed: number) {
  const r = rng(seed)
  const branches: Pt[][] = [
    [
      [118, 258],
      [114, 210],
      [104, 168],
      [86, 128],
      [64, 96],
    ],
    [
      [106, 176],
      [128, 144],
      [150, 116],
      [168, 82],
    ],
    [
      [92, 138],
      [104, 104],
      [112, 70],
      [108, 40],
    ],
    [
      [116, 222],
      [140, 204],
      [166, 196],
    ],
  ]
  const tips: Pt[] = [
    [64, 96],
    [168, 82],
    [108, 40],
    [166, 196],
  ]
  const flowers: Flower[] = []
  tips.forEach(([tx, ty], t) => {
    const n = t === 3 ? 4 : 7
    for (let i = 0; i < n; i++) {
      const a = r() * Math.PI * 2
      const d = 4 + r() * 22
      flowers.push({ x: tx + Math.cos(a) * d, y: ty + Math.sin(a) * d * 0.8, r: 8 + r() * 5, rot: r() * Math.PI })
    }
  })
  return { strokes: branches.map((b) => brush(b, r)), flowers }
}

const SHAPES = [build(7), build(19)]

export function Ipe({ className = '', variant = 0 }: { className?: string; variant?: 0 | 1 }) {
  const { strokes, flowers } = SHAPES[variant]
  return (
    <svg viewBox="0 0 230 270" className={className} aria-hidden="true" focusable="false">
      <g filter="url(#wobble)">
        {strokes.map((layers, i) =>
          layers.map((l, k) => (
            <path key={`${i}-${k}`} d={l.d} fill="none" className="stroke-muted" strokeWidth={l.w} strokeOpacity={l.o} strokeLinecap="round" strokeLinejoin="round" />
          )),
        )}
      </g>
      {flowers.map((f, i) => (
        <g key={i}>
          {[0, 1, 2, 3, 4].map((k) => (
            <path key={k} d={petal(f.x, f.y, f.rot + (k * 2 * Math.PI) / 5, f.r)} className="petal fill-ipe" fillOpacity={0.88} />
          ))}
          <g className="ink-detail">
            {[0, 1, 2, 3, 4].map((k) => {
              const a = f.rot + (k * 2 * Math.PI) / 5
              return (
                <line
                  key={k}
                  x1={f.x}
                  y1={f.y}
                  x2={f.x + Math.cos(a) * f.r * 0.7}
                  y2={f.y + Math.sin(a) * f.r * 0.7}
                  className="stroke-bg"
                  strokeOpacity={0.55}
                  strokeWidth={1}
                  strokeLinecap="round"
                />
              )
            })}
            <circle cx={f.x} cy={f.y} r={2.2} className="fill-bg" fillOpacity={0.8} />
          </g>
        </g>
      ))}
    </svg>
  )
}

/** Filtro de tremor usado nos traços de pincel. Renderize uma vez perto da raiz. */
export function SketchDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
      <defs>
        <filter id="wobble" x="-5%" y="-10%" width="110%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.02 0.04" numOctaves="2" seed="5" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  )
}
