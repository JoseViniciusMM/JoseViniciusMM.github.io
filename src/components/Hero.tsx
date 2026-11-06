import { ArrowDown, Download, MapPin } from 'lucide-react'
import { useEffect, useState } from 'react'
import { links } from '../data/content'
import { useLang } from '../lang'
import { Dado } from './Dado'
import { Lens } from './Lens'
import { Pipeline } from './Pipeline'
import { Container } from './Section'

const btn = 'inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors'
const base = import.meta.env.BASE_URL

/** Foto se public/foto.jpg existir; senão, o card com as iniciais (só em telas grandes). */
function Portrait({ alt }: { alt: string }) {
  const [failed, setFailed] = useState(false)
  if (failed) {
    return (
      <div
        aria-hidden="true"
        className="hidden aspect-[4/5] w-full items-end overflow-hidden rounded-2xl bg-ink p-6 text-[5.5rem] leading-[0.8] font-extrabold tracking-[-0.06em] text-bg lg:flex xl:text-[6.5rem]"
      >
        JV<span className="text-accent">M</span>
      </div>
    )
  }
  return <img src={`${base}${links.photo}`} alt={alt} onError={() => setFailed(true)} className="aspect-[4/5] w-full rounded-2xl object-cover" loading="eager" />
}

/** Só mostra o botão de currículo quando o PDF existe em public/. */
function useFileExists(path: string) {
  const [ok, setOk] = useState(false)
  useEffect(() => {
    fetch(`${base}${path}`, { method: 'HEAD' })
      .then((r) => setOk(r.ok && !(r.headers.get('content-type') ?? '').includes('text/html')))
      .catch(() => setOk(false))
  }, [path])
  return ok
}

/** Nome, cargo e resumo. Usado duas vezes: a versão desta dimensão e a da lente. */
function Intro({ name, role, summary }: { name: string; role: string; summary: string }) {
  return (
    <div className="pt-7 pb-1">
      <h1 className="text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.95] font-extrabold tracking-[-0.035em]">{name}</h1>
      <p className="mt-6 text-2xl font-medium md:text-3xl">{role}</p>
      <p className="mt-4 max-w-xl text-lg leading-relaxed opacity-75">{summary}</p>
    </div>
  )
}

export function Hero() {
  const { t } = useLang()
  const hasCv = useFileExists(links.cv)
  const outline = `${btn} border border-line surface hover:border-ink`

  return (
    <header id="topo">
      <Container className="grid items-end gap-12 pt-12 pb-14 md:pt-20 lg:grid-cols-[1.35fr_0.65fr] lg:gap-20 lg:pt-24">
        <div className="readable">
          <p className="inline-flex items-center gap-2.5 rounded-full border border-line surface py-1.5 pr-4 pl-2 text-sm text-muted">
            <Dado face={1} rollEvery={1400} className="h-6 w-6" />
            {t.profile.status}
          </p>

          <Lens alt={<Intro name={t.profile.name} role={t.ui.lens.role} summary={t.ui.lens.summary} />} className="rounded-xl">
            <Intro name={t.profile.name} role={t.profile.role} summary={t.profile.summary} />
          </Lens>
          <p className="only-mouse hand mt-1 text-xl text-accent">{t.ui.lens.hint}</p>

          <p className="mt-5 inline-flex items-center gap-1.5 text-sm text-muted">
            <MapPin size={15} strokeWidth={2} aria-hidden="true" />
            {t.profile.location}
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#projetos" data-magnetic className={`${btn} bg-accent text-bg hover:opacity-90`}>
              {t.ui.seeProjects}
              <ArrowDown size={16} strokeWidth={2} aria-hidden="true" />
            </a>
            {hasCv && (
              <a href={`${base}${links.cv}`} download data-magnetic className={outline}>
                <Download size={16} strokeWidth={2} aria-hidden="true" />
                {t.ui.downloadCv}
              </a>
            )}
            <a href={links.linkedin} target="_blank" rel="noreferrer" data-magnetic className={outline}>
              LinkedIn
            </a>
            <a href={links.github} target="_blank" rel="noreferrer" data-magnetic className={outline}>
              GitHub
            </a>
          </div>
        </div>

        <div className="mx-auto w-full max-w-xs lg:mr-0">
          <Portrait alt={t.ui.photoAlt} />
        </div>
      </Container>

      <Container className="pb-20 md:pb-24">
        <Pipeline />
      </Container>
    </header>
  )
}
