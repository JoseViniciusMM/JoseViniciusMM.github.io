import { Menu, Moon, Sun, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useLang } from '../lang'
import { useTheme } from '../theme'
import { Mascot } from './Mascot'

export function Nav() {
  const { t, lang, setLang } = useLang()
  const { theme, toggle } = useTheme()
  const [open, setOpen] = useState(false)
  // fecha o menu do celular com Esc
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])
  const items = [
    { href: '#sobre', label: t.ui.nav.about },
    { href: '#faco', label: t.ui.nav.work },
    { href: '#trajetoria', label: t.ui.nav.experience },
    { href: '#projetos', label: t.ui.nav.projects },
    { href: '#dimensoes', label: t.ui.nav.tv },
    { href: '#contato', label: t.ui.nav.contact },
  ]
  const iconBtn =
    'inline-flex h-9 items-center justify-center rounded-lg border border-line px-3 text-sm font-semibold transition-colors hover:border-ink'

  return (
    <nav
      aria-label={lang === 'pt' ? 'Seções do portfólio' : 'Portfolio sections'}
      className="sticky top-0 z-20 border-b border-line bg-bg/90 backdrop-blur"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-3 md:px-10">
        <a href="#topo" className="inline-flex items-center gap-2.5 text-sm font-bold tracking-tight">
          <Mascot className="h-9 w-9" />
          {t.profile.short}
          <span className="hidden text-accent min-[380px]:inline"> Martines</span>
        </a>
        <ul className="hidden gap-7 text-sm text-muted lg:flex">
          {items.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="transition-colors hover:text-ink">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <button
            type="button"
            data-magnetic
            onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}
            className={iconBtn}
            aria-label={t.ui.switchLang}
            title={t.ui.switchLang}
          >
            {lang === 'pt' ? 'EN' : 'PT'}
          </button>
          <button
            type="button"
            data-magnetic
            onClick={toggle}
            className={`${iconBtn} w-9 px-0`}
            aria-label={theme === 'dark' ? t.ui.themeLight : t.ui.themeDark}
            title={theme === 'dark' ? t.ui.themeLight : t.ui.themeDark}
          >
            {theme === 'dark' ? <Sun size={16} strokeWidth={2} aria-hidden="true" /> : <Moon size={16} strokeWidth={2} aria-hidden="true" />}
          </button>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className={`${iconBtn} w-9 px-0 lg:hidden`}
            aria-expanded={open}
            aria-controls="menu-celular"
            aria-label={open ? (lang === 'pt' ? 'Fechar menu' : 'Close menu') : lang === 'pt' ? 'Abrir menu' : 'Open menu'}
          >
            {open ? <X size={17} strokeWidth={2} aria-hidden="true" /> : <Menu size={17} strokeWidth={2} aria-hidden="true" />}
          </button>
        </div>
      </div>
      {open && (
        <ul id="menu-celular" className="panel-in border-t border-line px-5 py-2 lg:hidden">
          {items.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)} className="flex items-center justify-between border-b border-line py-3.5 text-base font-medium last:border-0">
                {l.label}
                <span aria-hidden="true" className="text-accent">↓</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  )
}
