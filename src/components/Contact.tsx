import { ArrowUpRight, Mail } from 'lucide-react'
import { links } from '../data/content'
import { useLang } from '../lang'
import { Ipe } from './Ipe'
import { Container } from './Section'

const btn = 'inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors'

export function Contact() {
  const { t } = useLang()
  return (
    <section id="contato" className="scroll-mt-20 border-t border-line">
      <Container className="py-24 md:py-32">
        <div className="bloom-host grid items-end gap-10 lg:grid-cols-[1fr_auto]">
          <div className="readable max-w-3xl">
            <h2 className="text-4xl font-extrabold tracking-tight md:text-6xl">{t.ui.contact.title}</h2>
            <p className="mt-6 text-lg leading-relaxed text-muted md:text-xl">{t.ui.contact.text}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href={`mailto:${links.email}`} data-magnetic className={`${btn} glow bg-accent text-bg hover:opacity-90`}>
                <Mail size={16} strokeWidth={2} aria-hidden="true" />
                <span className="break-all">{links.email}</span>
              </a>
              <a href={links.linkedin} target="_blank" rel="noreferrer" data-magnetic className={`${btn} surface border border-line hover:border-ink`}>
                LinkedIn
                <ArrowUpRight size={15} strokeWidth={2} aria-hidden="true" />
              </a>
              <a href={links.github} target="_blank" rel="noreferrer" data-magnetic className={`${btn} surface border border-line hover:border-ink`}>
                GitHub
                <ArrowUpRight size={15} strokeWidth={2} aria-hidden="true" />
              </a>
            </div>
          </div>
          <Ipe variant={1} className="hidden h-72 w-auto lg:block" />
        </div>
      </Container>
    </section>
  )
}
