import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { content, type Lang } from './data/content'
import { LangContext } from './lang'

const STORAGE_KEY = 'portfolio:lang'

function initialLang(): Lang {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'pt' || stored === 'en') return stored
  } catch {
    /* storage unavailable */
  }
  return navigator.language.toLowerCase().startsWith('pt') ? 'pt' : 'en'
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(initialLang)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      /* storage unavailable */
    }
    const t = content[lang]
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en'
    document.title = t.meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description)
  }, [lang])

  const value = useMemo(() => ({ lang, setLang, t: content[lang] }), [lang])
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}
