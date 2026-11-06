/*
 * Gráficos em SVG puro para os painéis demo: colunas empilhadas, barras
 * horizontais e linha. Sem biblioteca externa. Textos sempre via textContent.
 */

// Tema: escuro por padrão; claro só se a pessoa escolheu no portfólio (mesmo domínio).
try {
  if (localStorage.getItem('portfolio:theme') === 'light') document.documentElement.dataset.theme = 'light'
} catch (e) {
  /* sem storage */
}

export const nf = new Intl.NumberFormat('pt-BR')
export const pf = new Intl.NumberFormat('pt-BR', { style: 'percent', maximumFractionDigits: 0 })
const NS = 'http://www.w3.org/2000/svg'

export function el(tag, attrs = {}, ...kids) {
  const n = document.createElement(tag)
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'class') n.className = v
    else if (k === 'text') n.textContent = v
    else n.setAttribute(k, v)
  }
  for (const k of kids) if (k != null) n.append(k)
  return n
}
export function s(tag, attrs = {}) {
  const n = document.createElementNS(NS, tag)
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'text') n.textContent = v
    else n.setAttribute(k, v)
  }
  return n
}
const css = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim()

/* ---------- tooltip ---------- */
const tip = el('div', { class: 'tip', role: 'status' })
document.body.append(tip)
function showTip(evt, title, rows) {
  tip.replaceChildren(el('div', { class: 't', text: title }))
  for (const r of rows) {
    const key = el('span', { class: 'key' })
    key.style.background = r.color
    tip.append(el('div', { class: 'row' }, key, el('b', { text: r.value }), el('span', { text: r.label })))
  }
  let x, y
  if (evt.clientX != null && evt.type !== 'focus') {
    x = evt.clientX
    y = evt.clientY
  } else {
    const b = evt.target.getBoundingClientRect()
    x = b.left + b.width / 2
    y = b.top
  }
  tip.classList.add('on')
  const w = tip.offsetWidth
  const h = tip.offsetHeight
  tip.style.left = Math.min(window.innerWidth - w - 8, Math.max(8, x + 14)) + 'px'
  tip.style.top = Math.max(8, y - h - 12) + 'px'
}
function hideTip() {
  tip.classList.remove('on')
}
export function bindTip(node, title, rows) {
  node.setAttribute('tabindex', '0')
  node.setAttribute('aria-label', `${title}: ${rows.map((r) => `${r.label} ${r.value}`).join(', ')}`)
  node.addEventListener('pointermove', (e) => showTip(e, title, rows))
  node.addEventListener('focus', (e) => showTip(e, title, rows))
  node.addEventListener('pointerleave', hideTip)
  node.addEventListener('blur', hideTip)
}

/* ---------- utilidades ---------- */
function niceMax(v) {
  if (v <= 0) return 1
  const p = Math.pow(10, Math.floor(Math.log10(v)))
  for (const m of [1, 2, 2.5, 5, 10]) if (m * p >= v) return m * p
  return 10 * p
}
// coluna com topo arredondado (4px) e base reta
function colPath(x, y, w, h, r = 4) {
  if (h <= 0) return ''
  r = Math.min(r, h, w / 2)
  return `M${x} ${y + h} V${y + r} Q${x} ${y} ${x + r} ${y} H${x + w - r} Q${x + w} ${y} ${x + w} ${y + r} V${y + h} Z`
}
function barPath(x, y, w, h, r = 4) {
  if (w <= 0) return ''
  r = Math.min(r, w, h / 2)
  return `M${x} ${y} H${x + w - r} Q${x + w} ${y} ${x + w} ${y + r} V${y + h - r} Q${x + w} ${y + h} ${x + w - r} ${y + h} H${x} Z`
}
export function legend(container, items) {
  const ul = el('ul', { class: 'legend' })
  for (const it of items) {
    const sw = el('i')
    sw.style.background = it.color
    if (it.line) {
      sw.style.height = '3px'
      sw.style.width = '14px'
    }
    ul.append(el('li', {}, sw, document.createTextNode(it.label)))
  }
  container.append(ul)
}

/** Redesenha quando o container muda de largura. */
export function responsive(container, draw) {
  let last = 0
  if (container._ro) container._ro.disconnect()
  const ro = new ResizeObserver(() => {
    const w = Math.round(container.clientWidth)
    if (w && w !== last) {
      last = w
      draw(w)
    }
  })
  ro.observe(container)
  container._ro = ro
  return () => draw(Math.round(container.clientWidth))
}

/* ---------- colunas empilhadas ---------- */
export function stackedColumns(container, { categories, series, height = 260, fmt = nf.format }) {
  const redraw = responsive(container, (W) => {
    container.replaceChildren()
    const m = { t: 16, r: 4, b: 26, l: 38 }
    const iw = W - m.l - m.r
    const ih = height - m.t - m.b
    const totals = categories.map((_, i) => series.reduce((a, s) => a + s.values[i], 0))
    const max = niceMax(Math.max(...totals))
    const svg = s('svg', { viewBox: `0 0 ${W} ${height}`, height, role: 'img' })
    for (let k = 0; k <= 4; k++) {
      const y = m.t + ih - (ih * k) / 4
      svg.append(s('line', { x1: m.l, x2: W - m.r, y1: y, y2: y, stroke: css(k ? '--grid' : '--axis'), 'stroke-width': 1 }))
      svg.append(s('text', { x: m.l - 6, y: y + 4, 'text-anchor': 'end', 'font-size': 11, fill: css('--muted'), text: fmt((max * k) / 4) }))
    }
    const band = iw / categories.length
    const bw = Math.min(24, band * 0.62)
    const step = Math.max(1, Math.ceil(categories.length / Math.floor(iw / 46)))
    categories.forEach((c, i) => {
      const x = m.l + band * i + (band - bw) / 2
      let y = m.t + ih
      const g = s('g', { class: 'hit' })
      g.append(s('rect', { x: m.l + band * i, y: m.t, width: band, height: ih, fill: 'transparent' }))
      series.forEach((ser, si) => {
        const v = ser.values[i]
        const h = (v / max) * ih
        if (h <= 0) return
        const top = si === series.length - 1 || series.slice(si + 1).every((x) => !x.values[i])
        const gap = si > 0 ? 2 : 0
        const p = top
          ? colPath(x, y - h, bw, h - gap)
          : `M${x} ${y - gap} V${y - h} H${x + bw} V${y - gap} Z`
        svg.append(s('path', { d: p, fill: ser.color, class: 'mark' }))
        y -= h
      })
      bindTip(
        g,
        c,
        series.map((ser) => ({ label: ser.name, value: fmt(ser.values[i]), color: ser.color })).reverse(),
      )
      svg.append(g)
      if (i % step === 0)
        svg.append(s('text', { x: x + bw / 2, y: height - 8, 'text-anchor': 'middle', 'font-size': 11, fill: css('--muted'), text: c }))
    })
    container.append(svg)
  })
  return redraw
}

/* ---------- barras horizontais ---------- */
export function hBars(container, { items, color, fmt = nf.format, label = '' }) {
  return responsive(container, (W) => {
    container.replaceChildren()
    if (!items.length) {
      container.append(el('p', { class: 'empty', text: 'Nada para mostrar com estes filtros.' }))
      return
    }
    const row = 34
    const lw = Math.min(130, W * 0.36)
    const vw = 44
    const H = items.length * row + 4
    const iw = W - lw - vw
    const max = Math.max(...items.map((d) => d.value)) || 1
    const svg = s('svg', { viewBox: `0 0 ${W} ${H}`, height: H, role: 'img' })
    items.forEach((d, i) => {
      const y = i * row
      const w = (d.value / max) * iw
      const g = s('g', { class: 'hit' })
      g.append(s('rect', { x: 0, y, width: W, height: row, fill: 'transparent' }))
      g.append(s('text', { x: 0, y: y + row / 2 + 4, 'font-size': 13, fill: css('--ink'), text: d.label }))
      g.append(s('path', { d: barPath(lw, y + (row - 18) / 2, Math.max(w, 1), 18), fill: color, class: 'mark' }))
      g.append(s('text', { x: lw + w + 6, y: y + row / 2 + 4, 'font-size': 13, 'font-weight': 600, fill: css('--ink'), text: fmt(d.value) }))
      bindTip(g, d.label, [{ label, value: fmt(d.value), color }])
      svg.append(g)
    })
    svg.append(s('line', { x1: lw, x2: lw, y1: 0, y2: H - 4, stroke: css('--axis'), 'stroke-width': 1 }))
    container.append(svg)
  })
}

/* ---------- linha com crosshair ---------- */
export function lineChart(container, { categories, values, color, name, height = 240, min, max, fmt = nf.format }) {
  return responsive(container, (W) => {
    container.replaceChildren()
    const m = { t: 18, r: 34, b: 26, l: 38 }
    const iw = W - m.l - m.r
    const ih = height - m.t - m.b
    const vals = values.filter((v) => v != null)
    const lo = min ?? Math.floor(Math.min(...vals) / 10) * 10
    const hi = max ?? niceMax(Math.max(...vals))
    const X = (i) => m.l + (categories.length === 1 ? iw / 2 : (iw * i) / (categories.length - 1))
    const Y = (v) => m.t + ih - ((v - lo) / (hi - lo)) * ih
    const svg = s('svg', { viewBox: `0 0 ${W} ${height}`, height, role: 'img' })
    for (let k = 0; k <= 4; k++) {
      const v = lo + ((hi - lo) * k) / 4
      const y = Y(v)
      svg.append(s('line', { x1: m.l, x2: W - m.r, y1: y, y2: y, stroke: css(k ? '--grid' : '--axis'), 'stroke-width': 1 }))
      svg.append(s('text', { x: m.l - 6, y: y + 4, 'text-anchor': 'end', 'font-size': 11, fill: css('--muted'), text: fmt(v) }))
    }
    const pts = values.map((v, i) => (v == null ? null : [X(i), Y(v)]))
    const d = pts.filter(Boolean).map((p, i) => `${i ? 'L' : 'M'}${p[0]} ${p[1]}`).join(' ')
    const area = `${d} L${pts.filter(Boolean).at(-1)[0]} ${m.t + ih} L${pts.find(Boolean)[0]} ${m.t + ih} Z`
    svg.append(s('path', { d: area, fill: color, 'fill-opacity': 0.1 }))
    svg.append(s('path', { d, fill: 'none', stroke: color, 'stroke-width': 2, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }))
    const step = Math.max(1, Math.ceil(categories.length / Math.floor(iw / 46)))
    categories.forEach((c, i) => {
      if (i % step === 0 || i === categories.length - 1)
        svg.append(s('text', { x: X(i), y: height - 8, 'text-anchor': 'middle', 'font-size': 11, fill: css('--muted'), text: c }))
    })
    const lastI = values.length - 1
    if (pts[lastI]) {
      svg.append(s('circle', { cx: pts[lastI][0], cy: pts[lastI][1], r: 4.5, fill: color, stroke: css('--surface'), 'stroke-width': 2 }))
      svg.append(s('text', { x: pts[lastI][0] + 8, y: pts[lastI][1] + 4, 'font-size': 12, 'font-weight': 700, fill: css('--ink'), text: fmt(values[lastI]) }))
    }
    // crosshair
    const cross = s('line', { y1: m.t, y2: m.t + ih, stroke: css('--axis'), 'stroke-width': 1, opacity: 0 })
    const dot = s('circle', { r: 4.5, fill: color, stroke: css('--surface'), 'stroke-width': 2, opacity: 0 })
    svg.append(cross, dot)
    const hit = s('rect', { x: m.l, y: m.t, width: iw, height: ih, fill: 'transparent', tabindex: 0, 'aria-label': name })
    const at = (i) => {
      if (!pts[i]) return
      cross.setAttribute('x1', pts[i][0])
      cross.setAttribute('x2', pts[i][0])
      cross.setAttribute('opacity', 1)
      dot.setAttribute('cx', pts[i][0])
      dot.setAttribute('cy', pts[i][1])
      dot.setAttribute('opacity', 1)
    }
    let cur = lastI
    hit.addEventListener('pointermove', (e) => {
      const b = svg.getBoundingClientRect()
      const x = ((e.clientX - b.left) / b.width) * W
      cur = Math.max(0, Math.min(lastI, Math.round(((x - m.l) / iw) * (categories.length - 1))))
      at(cur)
      showTip(e, categories[cur], [{ label: name, value: fmt(values[cur]), color }])
    })
    hit.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') cur = Math.max(0, cur - 1)
      else if (e.key === 'ArrowRight') cur = Math.min(lastI, cur + 1)
      else return
      e.preventDefault()
      at(cur)
      const b = svg.getBoundingClientRect()
      showTip({ clientX: b.left + (pts[cur][0] / W) * b.width, clientY: b.top + (pts[cur][1] / height) * b.height }, categories[cur], [
        { label: name, value: fmt(values[cur]), color },
      ])
    })
    const off = () => {
      cross.setAttribute('opacity', 0)
      dot.setAttribute('opacity', 0)
      hideTip()
    }
    hit.addEventListener('pointerleave', off)
    hit.addEventListener('blur', off)
    svg.append(hit)
    container.append(svg)
  })
}

/* ---------- tabela ---------- */
export function table(container, columns, rows) {
  container.replaceChildren()
  if (!rows.length) {
    container.append(el('p', { class: 'empty', text: 'Nada para mostrar com estes filtros.' }))
    return
  }
  const thead = el('thead', {}, el('tr', {}, ...columns.map((c) => el('th', { class: c.num ? 'num' : '', text: c.label }))))
  const tbody = el('tbody')
  for (const r of rows) {
    tbody.append(
      el(
        'tr',
        {},
        ...columns.map((c) => {
          const v = c.render ? c.render(r) : r[c.key]
          const td = el('td', { class: c.num ? 'num' : '' })
          if (v instanceof Node) td.append(v)
          else td.textContent = v
          return td
        }),
      ),
    )
  }
  container.append(el('div', { class: 'table-wrap' }, el('table', {}, thead, tbody)))
}

export const meses = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']
export const rotuloMes = (ym) => `${meses[+ym.slice(5, 7) - 1]}/${ym.slice(2, 4)}`
export const fmtData = (iso) => `${iso.slice(8, 10)}/${iso.slice(5, 7)}/${iso.slice(0, 4)}`
/** Ano fiscal novembro–outubro: nov/2025 já é FY 2026. */
export const anoFiscal = (iso) => +iso.slice(0, 4) + (+iso.slice(5, 7) >= 11 ? 1 : 0)
export const cssVar = css
