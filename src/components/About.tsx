import { ArrowUpRight } from 'lucide-react'
import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { useLang } from '../lang'
import { Ipe } from './Ipe'
import { Chip, Section } from './Section'

/*
 * Sobre, Trajetória, Stack e Certificações num painel só, com abas.
 * Os links #trajetoria, #stack e #certificacoes abrem direto a aba certa.
 */

type Tab = 'who' | 'path' | 'stack' | 'certs'
const TABS: Tab[] = ['who', 'path', 'stack', 'certs']
const HASH: Record<string, Tab> = { '#sobre': 'who', '#trajetoria': 'path', '#stack': 'stack', '#certificacoes': 'certs' }

function Who() {
  const { t } = useLang()
  return (
    <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
      <div className="max-w-[68ch] space-y-5 text-lg leading-relaxed">
        {t.about.map((p) => (
          <p key={p.slice(0, 24)}>{p}</p>
        ))}
      </div>
      <dl className="divide-y divide-line self-start rounded-xl border border-line bg-raised/50 px-5">
        {t.facts.map((f) => (
          <div key={f.label} className="py-3.5">
            <dt className="text-sm text-muted">{f.label}</dt>
            <dd className="mt-0.5 font-medium">{f.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

function Path() {
  const { t } = useLang()
  return (
    <ol className="relative max-w-3xl pl-8 md:pl-10">
      <span aria-hidden="true" className="timeline-line absolute top-2 bottom-2 left-[4px] w-0.5" />
      {t.experience.map((job, i) => (
        <li key={job.role} className={`relative ${i === t.experience.length - 1 ? '' : 'pb-10'}`}>
          <span
            aria-hidden="true"
            className={`absolute top-2.5 -left-8 h-2.5 w-2.5 rounded-full ring-4 ring-surface md:-left-10 ${job.current ? 'pulse bg-accent' : 'bg-muted'}`}
          />
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
            <h3 className="text-xl font-bold tracking-tight md:text-2xl">{job.role}</h3>
            <span className="text-sm text-muted">{job.period}</span>
          </div>
          <p className="mt-1 text-muted">{job.company}</p>
          <ul className="mt-4 space-y-2 leading-relaxed">
            {job.bullets.map((b) => (
              <li key={b} className="flex gap-3">
                <span aria-hidden="true" className="mt-3 h-px w-4 shrink-0 bg-accent" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  )
}

function Stack() {
  const { t } = useLang()
  return (
    <div>
      <p className="mb-2 text-muted">{t.ui.stack.lead}</p>
      <dl className="divide-y divide-line">
        {t.stack.map((g) => (
          <div key={g.group} className="grid gap-3 py-5 md:grid-cols-[220px_1fr] md:gap-8">
            <dt className="font-semibold">{g.group}</dt>
            <dd className="flex flex-wrap gap-2">
              {g.items.map((item) => (
                <Chip key={item}>{item}</Chip>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

function Certs() {
  const { t } = useLang()
  return (
    <div>
      <p className="mb-2 text-muted">{t.ui.certifications.lead}</p>
      <ul className="grid gap-x-10 sm:grid-cols-2">
        {t.certifications.map((c) => (
          <li key={c.title} className="border-b border-line py-3.5">
            {c.url ? (
              <a href={c.url} target="_blank" rel="noreferrer" className="link-wave inline-flex items-baseline gap-1 font-medium">
                {c.title}
                <ArrowUpRight size={14} strokeWidth={2} className="shrink-0 self-center text-accent" aria-hidden="true" />
              </a>
            ) : (
              <span className="font-medium">{c.title}</span>
            )}
            <p className="mt-0.5 text-sm text-muted">
              {c.issuer}
              {c.meta && <span className="text-muted/70"> · {c.meta}</span>}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function About() {
  const { t } = useLang()
  const [tab, setTab] = useState<Tab>('who')
  const refs = useRef<Record<Tab, HTMLButtonElement | null>>({ who: null, path: null, stack: null, certs: null })

  useEffect(() => {
    const open = () => {
      const target = HASH[location.hash]
      if (!target) return
      setTab(target)
      // a rolagem espera a troca de aba renderizar, para parar na barra de abas
      const el = document.getElementById(target === 'who' ? 'sobre' : 'sobre-abas')
      window.setTimeout(() => el?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60)
    }
    open()
    window.addEventListener('hashchange', open)
    return () => window.removeEventListener('hashchange', open)
  }, [])

  const onKey = (e: KeyboardEvent) => {
    const i = TABS.indexOf(tab)
    let n = i
    if (e.key === 'ArrowRight') n = (i + 1) % TABS.length
    else if (e.key === 'ArrowLeft') n = (i - 1 + TABS.length) % TABS.length
    else return
    e.preventDefault()
    setTab(TABS[n])
    refs.current[TABS[n]]?.focus({ preventScroll: true })
  }

  const labels = t.ui.about.tabs
  return (
    <Section
      id="sobre"
      title={t.ui.about.title}
      lead={t.ui.about.lead}
      face={1}
      aside={
        <div className="bloom-host mt-8 hidden md:block">
          <Ipe className="h-56 w-auto" />
        </div>
      }
    >
      <div id="sobre-abas" className="surface scroll-mt-24 overflow-hidden rounded-2xl border border-line">
        <div className="overflow-x-auto border-b border-line bg-raised/60 px-2 pt-2 md:px-4">
          <div role="tablist" aria-label={t.ui.about.title} onKeyDown={onKey} className="flex min-w-max gap-1">
            {TABS.map((k) => {
              const on = k === tab
              return (
                <button
                  key={k}
                  ref={(el) => {
                    refs.current[k] = el
                  }}
                  id={`aba-${k}`}
                  role="tab"
                  type="button"
                  aria-selected={on}
                  aria-controls="painel-sobre"
                  tabIndex={on ? 0 : -1}
                  onClick={() => setTab(k)}
                  className={`rounded-t-lg border-b-[3px] px-4 py-3 text-sm font-semibold transition-colors md:px-5 ${
                    on ? 'border-accent bg-surface text-ink' : 'border-transparent text-muted hover:text-ink'
                  }`}
                >
                  {labels[k]}
                </button>
              )
            })}
          </div>
        </div>
        <div id="painel-sobre" role="tabpanel" aria-labelledby={`aba-${tab}`} tabIndex={0} key={tab} className="panel-in p-5 md:p-8">
          {tab === 'who' && <Who />}
          {tab === 'path' && <Path />}
          {tab === 'stack' && <Stack />}
          {tab === 'certs' && <Certs />}
        </div>
      </div>
    </Section>
  )
}
