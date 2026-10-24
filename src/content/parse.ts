import type { Article, Exercise, Pos, Word } from './types'

const SEP = ' | '

/**
 * Vocabulary lines: `type | word | forms | türkçe | Beispielsatz. | Örnek cümle.`
 * type: der/die/das (noun), pl (plural-only noun), v, adj, adv, prep, konj, phr, x
 */
export function parseWords(week: number, src: string): Word[] {
  const out: Word[] = []
  let i = 0
  for (const raw of src.split('\n')) {
    const line = raw.trim()
    if (!line || line.startsWith('#')) continue
    const parts = line.split(SEP).map((p) => p.trim())
    if (parts.length !== 6) throw new Error(`Kelime satırı hatalı (hafta ${week}): ${line}`)
    const [type, de, forms, tr, ex, exTr] = parts
    i++
    const isNoun = type === 'der' || type === 'die' || type === 'das'
    out.push({
      id: `w${String(week).padStart(2, '0')}-${String(i).padStart(3, '0')}`,
      week,
      pos: (isNoun ? 'n' : type) as Pos,
      art: isNoun ? (type as Article) : undefined,
      de,
      forms,
      tr,
      ex,
      exTr,
    })
  }
  return out
}

/**
 * Exercise lines:
 *   mc | Satz mit ___ . | richtig* / falsch / falsch | Açıklama
 *   ty | Satz mit ___ und ___ . | a / a2 ; b | Açıklama
 *   or | Kontext ___ | richtige Reihenfolge // Alternative | Açıklama
 */
export function parseExercises(topic: string, src: string): Exercise[] {
  const out: Exercise[] = []
  let i = 0
  for (const raw of src.split('\n')) {
    const line = raw.trim()
    if (!line || line.startsWith('#')) continue
    const parts = line.split(SEP).map((p) => p.trim())
    if (parts.length !== 4) throw new Error(`Alıştırma satırı hatalı (${topic}): ${line}`)
    const [kind, q, ans, explain] = parts
    i++
    const id = `${topic}-${i}`
    if (kind === 'mc') {
      const opts = ans.split(' / ').map((o) => o.trim())
      const correct = opts.findIndex((o) => o.endsWith('*'))
      if (correct < 0) throw new Error(`Doğru şık işaretlenmemiş (${id}): ${line}`)
      out.push({ id, topic, kind, q, options: opts.map((o) => o.replace(/\*$/, '')), correct, explain })
    } else if (kind === 'ty') {
      const answers = ans.split(' ; ').map((g) => g.split(' / ').map((a) => a.trim()))
      const gaps = q.split('___').length - 1
      if (gaps !== answers.length) throw new Error(`Boşluk sayısı tutmuyor (${id}): ${line}`)
      out.push({ id, topic, kind, q, answers, explain })
    } else if (kind === 'or') {
      const alts = ans.split(' // ').map((a) => a.trim())
      out.push({ id, topic, kind, q, answers: [alts], tokens: alts[0].split(/\s+/), explain })
    } else {
      throw new Error(`Bilinmeyen alıştırma türü (${id}): ${kind}`)
    }
  }
  return out
}

/** Glossary: `wort = anlam` per line */
export function parseGlossary(src: string): Record<string, string> {
  const out: Record<string, string> = {}
  for (const raw of src.split('\n')) {
    const line = raw.trim()
    if (!line) continue
    const idx = line.indexOf(' = ')
    if (idx < 0) throw new Error(`Sözlük satırı hatalı: ${line}`)
    out[line.slice(0, idx).trim().toLowerCase()] = line.slice(idx + 3).trim()
  }
  return out
}
