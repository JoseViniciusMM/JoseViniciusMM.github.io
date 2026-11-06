/**
 * Geometria do "dado" isométrico, símbolo do site. Trocadilho: "dado" é o cubo
 * que rola e também a unidade dos "dados". No lugar dos pontos, a face da
 * direita mostra um gráfico de barras (1 a 6 barras) e a da esquerda, uma linha.
 * Usado pelo componente React e pelo favicon animado, para desenharem igual.
 */

export type Pt = [number, number]
type Face = { o: Pt; u: Pt; v: Pt }

/** Cubo num viewBox 0..100. Cada face é um paralelogramo: origem + a*u + b*v. */
export const FACES: Record<'top' | 'left' | 'right', Face> = {
  top: { o: [16, 32], u: [34, -18], v: [34, 18] },
  left: { o: [16, 32], u: [34, 18], v: [0, 40] },
  right: { o: [50, 50], u: [34, -18], v: [0, 40] },
}

const at = (f: Face, a: number, b: number): Pt => [f.o[0] + a * f.u[0] + b * f.v[0], f.o[1] + a * f.u[1] + b * f.v[1]]
const path = (pts: Pt[], close = true) =>
  pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ') + (close ? 'Z' : '')

export function facePath(key: keyof typeof FACES): string {
  const f = FACES[key]
  return path([at(f, 0, 0), at(f, 1, 0), at(f, 1, 1), at(f, 0, 1)])
}

/** Alturas das barras para cada valor do dado (1..6), entre 0 e 1. */
const HEIGHTS: Record<number, number[]> = {
  1: [0.7],
  2: [0.42, 0.78],
  3: [0.3, 0.55, 0.72],
  4: [0.28, 0.5, 0.4, 0.72],
  5: [0.25, 0.42, 0.36, 0.58, 0.74],
  6: [0.2, 0.36, 0.3, 0.5, 0.44, 0.74],
}

/** Barras desenhadas na face direita, crescendo de baixo para cima. */
export function barPaths(value: number): string[] {
  const f = FACES.right
  const hs = HEIGHTS[value] ?? HEIGHTS[1]
  const n = hs.length
  const pad = 0.12
  const slot = (1 - pad * 2) / n
  const w = slot * 0.74
  const base = 0.86
  return hs.map((h, i) => {
    const a = pad + slot * i + (slot - w) / 2
    return path([at(f, a, base), at(f, a + w, base), at(f, a + w, base - h * 0.86), at(f, a, base - h * 0.86)])
  })
}

/** Linha de tendência na face esquerda; muda de forma com o valor. */
export function linePath(value: number): string {
  const f = FACES.left
  const ys = [0.72, 0.6 - value * 0.02, 0.66, 0.42, 0.5, 0.28 - value * 0.015]
  return path(
    ys.map((b, i) => at(f, 0.14 + (i * 0.72) / (ys.length - 1), b)),
    false,
  )
}

/** Ponto central no topo, como o 1 de um dado (vira losango na perspectiva). */
export function topMark(): string {
  const f = FACES.top
  return path([at(f, 0.36, 0.36), at(f, 0.64, 0.36), at(f, 0.64, 0.64), at(f, 0.36, 0.64)])
}

/** SVG completo em texto (para o favicon). Cores literais porque favicon não lê CSS. */
export function dadoSvg(value: number, rotate = 0, ink = '#eceeef', paper = '#141618', accent = '#5fe3a1'): string {
  const face = (k: keyof typeof FACES, fill: string) =>
    `<path d="${facePath(k)}" fill="${fill}" stroke="${ink}" stroke-width="5" stroke-linejoin="round"/>`
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><g transform="rotate(${rotate} 50 52)">` +
    face('top', paper) +
    face('left', paper) +
    face('right', '#1f2326') +
    `<path d="${topMark()}" fill="${accent}"/>` +
    `<path d="${linePath(value)}" fill="none" stroke="${ink}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>` +
    barPaths(value)
      .map((d) => `<path d="${d}" fill="${accent}"/>`)
      .join('') +
    `</g></svg>`
  )
}
