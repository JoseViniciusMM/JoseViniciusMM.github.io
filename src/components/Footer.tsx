import { useLang } from '../lang'
import { Dado } from './Dado'
import { Ducks } from './Ducks'
import { Container } from './Section'

const year = new Date().getFullYear()

export function Footer() {
  const { t } = useLang()
  return (
    <footer className="border-t border-line">
      <Ducks label={t.ui.footer.ducks} />
      <Container className="flex flex-wrap items-center justify-between gap-4 pb-8 text-sm text-muted">
        <p className="inline-flex items-center gap-2.5">
          <Dado face={6} rollEvery={2600} className="h-6 w-6" />
          <span>
            © {year} {t.profile.name} · <span className="hand text-lg">{t.ui.footer.dimension}</span>
          </span>
        </p>
        <p>
          {t.ui.footer.madeWith} {t.ui.footer.data}
        </p>
      </Container>
    </footer>
  )
}
