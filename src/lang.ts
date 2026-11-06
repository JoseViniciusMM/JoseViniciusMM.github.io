import { createContext, useContext } from 'react'
import type { Content, Lang } from './data/content'

export type LangContextValue = {
  lang: Lang
  setLang: (lang: Lang) => void
  t: Content
}

export const LangContext = createContext<LangContextValue | null>(null)

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used inside LangProvider')
  return ctx
}
