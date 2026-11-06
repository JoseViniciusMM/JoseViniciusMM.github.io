import { useEffect } from 'react'
import { dadoSvg } from './dado'

const FRAMES = Array.from({ length: 12 }, (_, i) => {
  const value = Math.floor(i / 2) + 1
  const rotate = i % 2 === 0 ? -8 : 8
  return `data:image/svg+xml;utf8,${encodeURIComponent(dadoSvg(value, rotate))}`
})

/** O ícone da aba fica "rolando" o dado, trocando o número de barras. */
export function useAnimatedFavicon(intervalMs = 420) {
  useEffect(() => {
    let link = document.querySelector<HTMLLinkElement>('link[rel="icon"]')
    if (!link) {
      link = document.createElement('link')
      link.rel = 'icon'
      document.head.appendChild(link)
    }
    link.type = 'image/svg+xml'
    link.href = FRAMES[4]
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let i = 0
    const id = window.setInterval(() => {
      i = (i + 1) % FRAMES.length
      link!.href = FRAMES[i]
    }, intervalMs)
    return () => window.clearInterval(id)
  }, [intervalMs])
}
