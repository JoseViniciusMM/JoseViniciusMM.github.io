import { useEffect, useState } from 'react'
import { useLang } from '../lang'

function useReducedMotion() {
  const [reduce, setReduce] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduce(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return reduce
}

const X = [80, 250, 430, 610, 780]
const Y = 64
const FLOW = `M${X[0]} ${Y} L${X[4]} ${Y}`

const node = 'fill-surface stroke-ink'
const ink = 'fill-ink'

/** Ícones desenhados à mão, um por etapa, centrados em (cx, Y). */
function Icon({ i, cx }: { i: number; cx: number }) {
  switch (i) {
    case 0: // fontes: janelas de portal empilhadas
      return (
        <g>
          <rect x={cx - 34} y={Y - 30} width={52} height={38} rx={5} className={node} strokeWidth={2} />
          <rect x={cx - 18} y={Y - 18} width={52} height={38} rx={5} className={node} strokeWidth={2} />
          <path d={`M${cx - 18} ${Y - 8} H${cx + 34}`} className="stroke-ink" strokeWidth={2} />
          <circle cx={cx - 12} cy={Y - 13} r={1.8} className={ink} />
          <circle cx={cx - 6} cy={Y - 13} r={1.8} className={ink} />
        </g>
      )
    case 1: // coleta: engrenagem do robô
      return (
        <g>
          <circle cx={cx} cy={Y} r={24} className={node} strokeWidth={2} />
          {Array.from({ length: 8 }).map((_, k) => {
            const a = (k * Math.PI) / 4
            return (
              <line
                key={k}
                x1={cx + Math.cos(a) * 9}
                y1={Y + Math.sin(a) * 9}
                x2={cx + Math.cos(a) * 15}
                y2={Y + Math.sin(a) * 15}
                className="stroke-ink"
                strokeWidth={3}
                strokeLinecap="round"
              />
            )
          })}
          <circle cx={cx} cy={Y} r={5} className="fill-accent" />
        </g>
      )
    case 2: // banco: cilindro
      return (
        <g>
          <path d={`M${cx - 30} ${Y - 20} V${Y + 20} Q${cx} ${Y + 34} ${cx + 30} ${Y + 20} V${Y - 20}`} className={node} strokeWidth={2} />
          <ellipse cx={cx} cy={Y - 20} rx={30} ry={9} className={node} strokeWidth={2} />
          <path d={`M${cx - 30} ${Y - 4} Q${cx} ${Y + 10} ${cx + 30} ${Y - 4}`} fill="none" className="stroke-ink" strokeWidth={1.5} />
          <path d={`M${cx - 30} ${Y + 8} Q${cx} ${Y + 22} ${cx + 30} ${Y + 8}`} fill="none" className="stroke-ink" strokeWidth={1.5} />
        </g>
      )
    case 3: // modelo: estrela fato-dimensão
      return (
        <g>
          {[
            [-30, -18],
            [30, -18],
            [-30, 20],
            [30, 20],
          ].map(([dx, dy], k) => (
            <g key={k}>
              <line x1={cx} y1={Y} x2={cx + dx} y2={Y + dy} className="stroke-ink" strokeWidth={2} />
              <rect x={cx + dx - 9} y={Y + dy - 7} width={18} height={14} rx={3} className={node} strokeWidth={2} />
            </g>
          ))}
          <rect x={cx - 14} y={Y - 11} width={28} height={22} rx={4} className="fill-accent" />
        </g>
      )
    default: // entrega: painel + balão de mensagem
      return (
        <g>
          <rect x={cx - 38} y={Y - 28} width={60} height={46} rx={6} className={node} strokeWidth={2} />
          <rect x={cx - 30} y={Y - 2} width={8} height={12} rx={1.5} className={ink} />
          <rect x={cx - 18} y={Y - 12} width={8} height={22} rx={1.5} className={ink} />
          <rect x={cx - 6} y={Y - 6} width={8} height={16} rx={1.5} className={ink} />
          <path
            d={`M${cx + 10} ${Y + 4} h30 a6 6 0 0 1 6 6 v14 a6 6 0 0 1 -6 6 h-20 l-8 7 v-7 h-2 a6 6 0 0 1 -6 -6 v-14 a6 6 0 0 1 6 -6 z`}
            className="fill-accent"
          />
        </g>
      )
  }
}

/**
 * O caminho real do dado no trabalho: portais e APIs, robô Python, SQL Server,
 * modelo Power BI e entrega por painel e mensagem. Estático com "reduzir movimento".
 */
export function Pipeline() {
  const { t } = useLang()
  const reduce = useReducedMotion()
  const dots = [0, 1.4, 2.8, 4.2, 5.6]

  return (
    <figure className="rounded-2xl border border-line surface p-5 md:p-8">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h2 className="text-base font-semibold tracking-tight md:text-lg">{t.ui.pipeline.title}</h2>
        <p className="hand text-2xl text-accent">{t.ui.pipeline.caption}</p>
      </div>
      <ol className="space-y-3 sm:hidden">
        {t.ui.pipeline.stages.map((st, i) => (
          <li key={st.title} className="flex items-center gap-3">
            <span
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                i === t.ui.pipeline.stages.length - 1 ? 'bg-accent text-surface' : 'border border-line'
              }`}
            >
              {i + 1}
            </span>
            <span>
              <span className="font-semibold">{st.title}</span>
              <span className="text-muted"> · {st.sub}</span>
            </span>
          </li>
        ))}
      </ol>
      <div className="hidden sm:block">
        <svg viewBox="0 0 860 150" className="block w-full" role="img" aria-label={t.ui.pipeline.alt}>
          <path d={FLOW} fill="none" className="stroke-line dash-flow" strokeWidth={2.5} strokeDasharray="7 7" />
          {dots.map((delay, i) =>
            reduce ? (
              <circle key={i} cx={X[0] + i * 175} cy={Y} r={4.5} className="fill-accent" />
            ) : (
              <circle key={i} r={4.5} className="fill-accent">
                <animateMotion dur="7s" begin={`-${delay}s`} repeatCount="indefinite" path={FLOW} />
              </circle>
            ),
          )}
          {t.ui.pipeline.stages.map((s, i) => (
            <g key={s.title}>
              <Icon i={i} cx={X[i]} />
              <text x={X[i]} y={126} textAnchor="middle" fontSize={14} fontWeight={600} className="fill-ink">
                {s.title}
              </text>
              <text x={X[i]} y={143} textAnchor="middle" fontSize={12} className="fill-muted">
                {s.sub}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </figure>
  )
}
