import { useLang } from '../lang'
import { Dado } from './Dado'
import { Chip, Section } from './Section'

export function Capabilities() {
  const { t } = useLang()
  return (
    <Section id="faco" title={t.ui.work.title} lead={t.ui.work.lead} face={2}>
      <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {t.capabilities.map((c, i) => (
          <li key={c.title} className="group/die surface flex flex-col rounded-2xl border border-line p-6 transition-colors hover:border-accent">
            <Dado face={i + 1} className="die-hover h-10 w-10" />
            <h3 className="mt-4 text-xl font-bold tracking-tight">{c.title}</h3>
            <p className="mt-3 flex-1 text-base leading-relaxed text-muted">{c.text}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {c.tools.map((tool) => (
                <Chip key={tool}>{tool}</Chip>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </Section>
  )
}
