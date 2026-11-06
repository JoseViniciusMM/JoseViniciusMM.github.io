import { ArrowLeft, ArrowRight, ArrowUpRight, Code2, GitBranch, TrendingUp, Workflow } from 'lucide-react'
import { Fragment, useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import type { CaseStudy, SideProject, Slide } from '../data/content'
import { useLang } from '../lang'
import { Chip, Section } from './Section'

/*
 * Seção de projetos no formato de vitrine (inspirada em lucasgama.vercel.app):
 * cartões de números, barra de abas numeradas em dois grupos e um painel que
 * troca de conteúdo — galeria com miniaturas e detalhes técnicos à esquerda,
 * problema e resultados à direita, paginação embaixo.
 */

const base = import.meta.env.BASE_URL
const num = (i: number) => String(i + 1).padStart(2, '0')
const href = (url: string) => (/^https?:/.test(url) ? url : `${base}${url}`)

type Item = { type: 'case'; c: CaseStudy } | { type: 'side'; p: SideProject }
const idOf = (it: Item) => (it.type === 'case' ? it.c.id : it.p.id)

/** Converte **trecho** em negrito (para destacar os números). */
function rich(text: string): ReactNode {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') ? (
      <strong key={i} className="font-bold text-accent">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  )
}

const label = 'text-xs font-bold tracking-[0.12em] uppercase'

/* ---------- galeria ---------- */

function SlideView({ s, c, demo }: { s: Slide; c: CaseStudy; demo?: string }) {
  if (s.kind === 'image') {
    const img = <img src={href(s.src)} alt={s.caption} loading="lazy" width={1440} height={900} className="h-full w-full object-cover object-top" />
    return demo ? (
      <a href={href(demo)} target="_blank" rel="noreferrer" className="block h-full transition-opacity hover:opacity-90">
        {img}
      </a>
    ) : (
      img
    )
  }
  if (s.kind === 'flow' && c.flow) {
    return (
      <div className="flex h-full flex-col justify-center p-6 md:p-8">
        <ol className="relative space-y-3.5">
          <span aria-hidden="true" className="absolute top-3 bottom-3 left-[15px] w-px bg-line" />
          {c.flow.map((step, i, all) => (
            <li key={step} className="relative flex items-center gap-4">
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                  i === all.length - 1 ? 'bg-accent text-bg' : 'border border-line bg-surface'
                }`}
              >
                {i + 1}
              </span>
              <span className="text-base font-semibold md:text-lg">{step}</span>
            </li>
          ))}
        </ol>
      </div>
    )
  }
  if (s.kind === 'code' && c.code) {
    return (
      <pre className="h-full overflow-auto p-5 font-mono text-[0.72rem] leading-relaxed md:text-[0.78rem]">
        <code>{c.code.snippet}</code>
      </pre>
    )
  }
  if (s.kind === 'metric') {
    return (
      <div className="flex h-full flex-col justify-center gap-4 p-6 md:p-8">
        {s.items.map((m) => (
          <div key={m.label}>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-lg text-muted line-through decoration-1 md:text-xl">{m.before}</span>
              <ArrowRight size={18} strokeWidth={2} className="shrink-0 text-accent" aria-hidden="true" />
              <span className="text-2xl font-extrabold tracking-tight text-accent md:text-3xl">{m.after}</span>
            </div>
            <p className="mt-0.5 text-sm text-muted">{m.label}</p>
          </div>
        ))}
      </div>
    )
  }
  return null
}

const thumbIcon = { flow: Workflow, code: Code2, metric: TrendingUp }

function Gallery({ c }: { c: CaseStudy }) {
  const { t } = useLang()
  const [i, setI] = useState(0)
  const slides = c.gallery
  const s = slides[Math.min(i, slides.length - 1)]
  const demo = c.links?.find((l) => l.primary)?.url
  return (
    <figure>
      <div className="aspect-[16/10] overflow-hidden rounded-xl border border-line bg-bg">
        <SlideView s={s} c={c} demo={demo} />
      </div>
      <figcaption className="mt-2 text-sm text-muted">{s.caption}</figcaption>
      {slides.length > 1 && (
        <div className="mt-3 grid grid-cols-4 gap-2.5" role="group" aria-label={t.ui.projects.previewOf}>
          {slides.map((sl, k) => {
            const Icon = sl.kind === 'image' ? null : thumbIcon[sl.kind]
            const on = k === i
            return (
              <button
                key={k}
                type="button"
                onClick={() => setI(k)}
                aria-label={sl.caption}
                aria-pressed={on}
                title={sl.caption}
                className={`aspect-[16/10] overflow-hidden rounded-lg border-2 transition-colors ${on ? 'border-accent' : 'border-line hover:border-muted'}`}
              >
                {sl.kind === 'image' ? (
                  <img src={href(sl.src)} alt="" loading="lazy" className="h-full w-full object-cover object-top" />
                ) : (
                  <span className="flex h-full w-full flex-col items-center justify-center gap-1 bg-bg text-muted">
                    {Icon && <Icon size={18} strokeWidth={2} aria-hidden="true" className={on ? 'text-accent' : ''} />}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      )}
    </figure>
  )
}

/* ---------- painéis ---------- */

const btnPrimary = 'inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-bg transition-opacity hover:opacity-90'
const btnGhost = 'inline-flex items-center gap-1.5 rounded-lg border border-line px-4 py-2 text-sm font-semibold transition-colors hover:border-ink'

function CasePanel({ c }: { c: CaseStudy }) {
  const { t } = useLang()
  const ui = t.ui.projects
  return (
    <div className="grid gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
      <div className="order-2 space-y-5 lg:order-1">
        <Gallery key={c.id} c={c} />
        <div className="rounded-xl border border-line bg-raised/50 p-5">
          <p className={`${label} mb-3 text-accent`}>{ui.details}</p>
          <ul className="space-y-2.5 text-[0.95rem] leading-relaxed">
            {c.tech.map((x) => (
              <li key={x} className="flex gap-3">
                <span aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-muted" />
                <span>{x}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="order-1 min-w-0 lg:order-2">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className={`${label} text-ipe`}>
            {c.kind}
            {c.status && <span className="ml-3 rounded-md bg-accent-soft px-2 py-0.5 tracking-normal text-accent normal-case">{c.status}</span>}
          </p>
          {c.links && (
            <div className="flex flex-wrap gap-2">
              {c.links.map((l) => (
                <a key={l.url} href={href(l.url)} target="_blank" rel="noreferrer" data-magnetic className={l.primary ? btnPrimary : btnGhost}>
                  {l.label}
                  <ArrowUpRight size={15} strokeWidth={2} aria-hidden="true" />
                </a>
              ))}
            </div>
          )}
        </div>
        <h3 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">{c.title}</h3>
        <p className="mt-3 text-lg leading-relaxed text-muted">{c.summary}</p>

        <h4 className={`${label} mt-8 text-accent`}>{ui.problem}</h4>
        <p className="mt-2 leading-relaxed">{c.problem}</p>

        <h4 className={`${label} mt-8 text-accent`}>{ui.outcomes}</h4>
        <ul className="mt-3 space-y-2.5">
          {c.outcomes.map((o) => (
            <li key={o} className="rounded-r-lg border-l-[3px] border-accent bg-raised px-4 py-3 leading-relaxed">
              {rich(o)}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-2">
          {c.tags.map((tag) => (
            <Chip key={tag} tone={tag === 'Interativo' || tag === 'Interactive' ? 'accent' : 'plain'}>
              {tag}
            </Chip>
          ))}
        </div>
      </div>
    </div>
  )
}

function SidePanel({ p }: { p: SideProject }) {
  const repo = p.url?.replace('https://github.com/', '')
  return (
    <div className="grid gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
      <div className="order-2 lg:order-1">
        <div className="aspect-[16/10] overflow-hidden rounded-xl border border-line bg-bg">
          <div className="flex items-center gap-1.5 border-b border-line px-4 py-3" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-[#e66767]" />
            <span className="h-2.5 w-2.5 rounded-full bg-ipe" />
            <span className="h-2.5 w-2.5 rounded-full bg-accent" />
          </div>
          <pre className="overflow-x-auto p-5 font-mono text-[0.82rem] leading-8">
            {repo ? (
              <>
                <span className="text-accent">$</span> git clone https://github.com/{repo}
                {'\n'}
                <span className="text-accent">$</span> cd {repo.split('/')[1]}
                {'\n'}
                <span className="text-muted"># {p.tags.join(' · ')}</span>
              </>
            ) : (
              <>
                <span className="text-accent">$</span> git status
                {'\n'}
                <span className="text-muted"># projeto acadêmico, sem repositório público</span>
                {'\n'}
                <span className="text-muted"># {p.tags.join(' · ')}</span>
              </>
            )}
          </pre>
        </div>
      </div>
      <div className="order-1 min-w-0 lg:order-2">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className={`${label} text-ipe`}>{p.kind}</p>
          {p.url && (
            <a href={p.url} target="_blank" rel="noreferrer" data-magnetic className={btnGhost}>
              <GitBranch size={15} strokeWidth={2} aria-hidden="true" />
              GitHub
            </a>
          )}
        </div>
        <h3 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">{p.title}</h3>
        <p className="mt-3 text-lg leading-relaxed text-muted">{p.text}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {p.tags.map((tag) => (
            <Chip key={tag}>{tag}</Chip>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ---------- seção ---------- */

export function Projects() {
  const { t } = useLang()
  const ui = t.ui.projects
  const items: Item[] = [...t.cases.map((c) => ({ type: 'case' as const, c })), ...t.side.map((p) => ({ type: 'side' as const, p }))]
  const [active, setActive] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  // #p-<id> na URL abre direto o projeto (link para mandar um projeto específico)
  useEffect(() => {
    const open = () => {
      const m = location.hash.match(/^#p-(.+)$/)
      if (!m) return
      const i = items.findIndex((it) => idOf(it) === m[1])
      if (i >= 0) {
        setActive(i)
        document.getElementById('vitrine')?.scrollIntoView({ behavior: 'smooth' })
      }
    }
    open()
    window.addEventListener('hashchange', open)
    return () => window.removeEventListener('hashchange', open)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const select = (i: number, focus = false) => {
    const n = (i + items.length) % items.length
    setActive(n)
    history.replaceState(null, '', `#p-${idOf(items[n])}`)
    const tab = tabRefs.current[n]
    if (focus) tab?.focus({ preventScroll: true })
    // rola só a barra de abas na horizontal, sem mexer na página
    const bar = tab?.closest('.tab-scroll') as HTMLElement | null
    if (tab && bar) bar.scrollTo({ left: tab.offsetLeft - bar.clientWidth / 2 + tab.offsetWidth / 2, behavior: 'smooth' })
  }
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') select(active + 1, true)
    else if (e.key === 'ArrowLeft') select(active - 1, true)
    else if (e.key === 'Home') select(0, true)
    else if (e.key === 'End') select(items.length - 1, true)
    else return
    e.preventDefault()
  }

  const groups = [
    { label: ui.dataGroup, start: 0, list: items.filter((i) => i.type === 'case') },
    { label: ui.devGroup, start: t.cases.length, list: items.filter((i) => i.type === 'side') },
  ]
  const cur = items[active]

  return (
    <Section id="projetos" title={ui.title} lead={ui.lead} face={4} wide>
      <p className="max-w-3xl leading-relaxed text-muted">{ui.note}</p>


      <p className="mt-6 text-sm text-muted">{ui.hint}</p>

      <div id="vitrine" className="surface mt-5 scroll-mt-24 overflow-hidden rounded-2xl border border-line">
        {/* barra de abas */}
        <div className="tab-scroll tab-fade overflow-x-auto border-b border-line bg-raised/60 px-3 pt-4 md:px-6">
          <div role="tablist" aria-label={ui.title} onKeyDown={onKey} className="flex min-w-max">
            {groups.map((g, gi) => (
              <div key={g.label} className={`flex flex-col ${gi > 0 ? 'ml-3 border-l border-line pl-3 md:ml-5 md:pl-5' : ''}`}>
                <p className={`${label} mb-2 flex items-center gap-3 px-2 text-muted`}>
                  {g.label}
                  <span aria-hidden="true" className="h-px flex-1 bg-line" />
                </p>
                <div className="flex">
                  {g.list.map((it, k) => {
                    const i = g.start + k
                    const on = i === active
                    const text = it.type === 'case' ? it.c.tab : it.p.title
                    return (
                      <button
                        key={idOf(it)}
                        ref={(el) => {
                          tabRefs.current[i] = el
                        }}
                        id={`tab-${idOf(it)}`}
                        role="tab"
                        type="button"
                        aria-selected={on}
                        aria-controls="painel-projeto"
                        tabIndex={on ? 0 : -1}
                        onClick={() => select(i)}
                        className={`flex w-[6.75rem] shrink-0 flex-col justify-start rounded-t-xl border-b-[3px] px-3 pt-2.5 pb-3 text-left transition-colors ${
                          on ? 'border-accent bg-surface shadow-[0_-1px_0_var(--c-line)]' : 'border-transparent hover:bg-surface/50'
                        }`}
                      >
                        <span className={`block text-2xl font-extrabold tracking-tight ${on ? 'text-accent' : 'text-muted/50'}`}>{num(i)}</span>
                        <span className={`mt-0.5 block text-sm leading-tight font-semibold ${on ? 'text-ink' : 'text-muted'}`}>{text}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* painel */}
        <div id="painel-projeto" role="tabpanel" aria-labelledby={`tab-${idOf(cur)}`} tabIndex={0} key={idOf(cur)} className="panel-in p-5 md:p-8 lg:p-10">
          {cur.type === 'case' ? <CasePanel c={cur.c} /> : <SidePanel p={cur.p} />}
        </div>

        {/* paginação */}
        <div className="flex items-center justify-center gap-4 border-t border-line bg-raised/40 px-5 py-4">
          <button type="button" data-magnetic onClick={() => select(active - 1)} aria-label={ui.prevProject} title={ui.prevProject} className="flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-surface transition-colors hover:border-accent hover:text-accent">
            <ArrowLeft size={17} strokeWidth={2.2} aria-hidden="true" />
          </button>
          <p className="min-w-[5rem] text-center text-sm text-muted" aria-live="polite">
            <span className="font-bold text-ink">{active + 1}</span> {ui.of} {items.length}
          </p>
          <button type="button" data-magnetic onClick={() => select(active + 1)} aria-label={ui.nextProject} title={ui.nextProject} className="flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-surface transition-colors hover:border-accent hover:text-accent">
            <ArrowRight size={17} strokeWidth={2.2} aria-hidden="true" />
          </button>
        </div>
      </div>
    </Section>
  )
}
