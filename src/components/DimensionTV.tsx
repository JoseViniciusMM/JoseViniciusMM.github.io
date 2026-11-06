import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useLang } from '../lang'
import { Section } from './Section'

/**
 * TV a cabo interdimensional: uma TV de tubo desenhada do zero. Cada canal
 * mostra como seria o trabalho em outra realidade. Trocar de canal dá um
 * chiado rápido. Troca sozinha a cada poucos segundos, pausa no hover.
 */
export function DimensionTV() {
  const { t } = useLang()
  const tv = t.ui.tv
  const [ch, setCh] = useState(0)
  const [noise, setNoise] = useState(false)
  const [paused, setPaused] = useState(false)
  const canvas = useRef<HTMLCanvasElement>(null)

  const go = useCallback(
    (dir: number) => {
      setNoise(true)
      window.setTimeout(() => {
        setCh((c) => (c + dir + tv.channels.length) % tv.channels.length)
        setNoise(false)
      }, 320)
    },
    [tv.channels.length],
  )

  // chiado: pixels aleatórios só durante a troca
  useEffect(() => {
    if (!noise) return
    const c = canvas.current
    const ctx = c?.getContext('2d')
    if (!c || !ctx) return
    let raf = 0
    const img = ctx.createImageData(c.width, c.height)
    const draw = () => {
      for (let i = 0; i < img.data.length; i += 4) {
        const v = Math.random() * 255
        img.data[i] = v
        img.data[i + 1] = v
        img.data[i + 2] = v
        img.data[i + 3] = 255
      }
      ctx.putImageData(img, 0, 0)
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(raf)
  }, [noise])

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(() => go(1), 8000)
    return () => window.clearInterval(id)
  }, [paused, go])

  const cur = tv.channels[ch]
  const knob = 'flex h-11 w-11 items-center justify-center rounded-full border-2 border-line bg-bg text-muted transition-colors hover:border-accent hover:text-accent'

  return (
    <Section id="dimensoes" title={tv.title} lead={tv.lead} face={3}>
      <div className="flex justify-center md:justify-start" onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)}>
        <div className="relative w-full max-w-2xl pt-14">
          {/* antenas */}
          <svg viewBox="0 0 200 60" className="absolute top-0 left-1/2 h-16 w-48 -translate-x-1/2" aria-hidden="true">
            <path d="M100 58 L58 6 M100 58 L146 2" className="stroke-muted" strokeWidth={3} strokeLinecap="round" />
            <circle cx={58} cy={6} r={4} className="fill-accent" />
            <circle cx={146} cy={2} r={4} className="fill-ipe" />
            <ellipse cx={100} cy={58} rx={16} ry={6} className="fill-raised stroke-line" strokeWidth={2} />
          </svg>

          {/* gabinete */}
          <div className="relative grid grid-cols-[1fr_auto] gap-4 rounded-[2rem] border-2 border-line bg-raised p-4 md:gap-6 md:p-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.4rem] border-4 border-bg bg-[#06120d]" aria-live="polite">
              <div className={`absolute inset-0 flex flex-col justify-between p-5 transition-opacity md:p-8 ${noise ? 'opacity-0' : 'opacity-100'}`}>
                <p className="font-mono text-xs tracking-wider text-[#5fe3a1]/70 md:text-sm">
                  {tv.channel} {String(ch + 1).padStart(2, '0')} · {cur.code}
                </p>
                <p className="text-xl leading-snug font-semibold text-[#c9f7df] md:text-3xl" style={{ textShadow: '0 0 12px rgba(95,227,161,.45)' }}>
                  {cur.text}
                </p>
                <div className="flex gap-1.5" aria-hidden="true">
                  {tv.channels.map((c, i) => (
                    <span key={c.code} className={`h-1.5 rounded-full transition-all ${i === ch ? 'w-6 bg-[#5fe3a1]' : 'w-1.5 bg-[#5fe3a1]/30'}`} />
                  ))}
                </div>
              </div>
              <canvas ref={canvas} width={160} height={120} aria-hidden="true" className={`absolute inset-0 h-full w-full [image-rendering:pixelated] ${noise ? 'opacity-90' : 'opacity-0'}`} />
              <div aria-hidden="true" className="tv-glass pointer-events-none absolute inset-0" />
            </div>

            {/* painel de botões */}
            <div className="flex flex-col items-center justify-between py-2">
              <div className="flex flex-col gap-3">
                <button type="button" data-magnetic onClick={() => go(-1)} className={knob} aria-label={tv.prev} title={tv.prev}>
                  <ChevronLeft size={18} strokeWidth={2.5} aria-hidden="true" />
                </button>
                <button type="button" data-magnetic onClick={() => go(1)} className={knob} aria-label={tv.next} title={tv.next}>
                  <ChevronRight size={18} strokeWidth={2.5} aria-hidden="true" />
                </button>
              </div>
              <div className="flex flex-col gap-1.5" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((i) => (
                  <span key={i} className="h-1 w-8 rounded-full bg-line" />
                ))}
              </div>
              <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_10px_var(--c-accent)]" />
            </div>
          </div>
          {/* pés */}
          <div className="flex justify-between px-16" aria-hidden="true">
            <span className="h-3 w-10 rounded-b-lg bg-line" />
            <span className="h-3 w-10 rounded-b-lg bg-line" />
          </div>
        </div>
      </div>
    </Section>
  )
}
