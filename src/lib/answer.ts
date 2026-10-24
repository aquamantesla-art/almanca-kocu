export interface Check {
  ok: boolean
  /** set when accepted with a spelling note (case, umlaut written as ae/oe/ue, ß as ss) */
  note?: string
}

const clean = (s: string) =>
  s
    .trim()
    .replace(/[„“"‚‘’']/g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([.,!?;:])\s*$/, '')

const fold = (s: string) =>
  s
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')

export function checkAnswer(given: string, accepted: string[]): Check {
  const g = clean(given)
  if (!g) return { ok: false }
  for (const a of accepted) {
    if (clean(a) === g) return { ok: true }
  }
  for (const a of accepted) {
    if (clean(a).toLowerCase() === g.toLowerCase()) return { ok: true, note: `Yazım: büyük/küçük harfe dikkat → ${a}` }
  }
  for (const a of accepted) {
    if (fold(clean(a)) === fold(g)) return { ok: true, note: `Yazım: ${a}` }
  }
  return { ok: false }
}

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/** Deterministic pseudo-random pick, stable for a given seed (used for day plans) */
export function seeded(seed: number) {
  let s = seed % 2147483647
  if (s <= 0) s += 2147483646
  return () => (s = (s * 16807) % 2147483647) / 2147483647
}

export function countWords(text: string): number {
  return text.trim() ? text.trim().split(/\s+/).length : 0
}
