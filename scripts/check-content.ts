// Content sanity check: parses everything and reports duplicates and counts.
import { WORDS } from '../src/content/vocab/index'
import { TOPICS } from '../src/content/grammar/index'
import { PLACEMENT } from '../src/content/placement'

const seen = new Map<string, string>()
let dupes = 0
for (const w of WORDS) {
  const key = `${w.pos}:${w.de.toLowerCase()}`
  const prev = seen.get(key)
  if (prev) {
    console.log(`DUPLICATE ${w.de} (${w.pos}) in ${w.id}, first ${prev}`)
    dupes++
  } else seen.set(key, w.id)
  if (w.pos === 'n' && !w.art) console.log(`NO ARTICLE ${w.id} ${w.de}`)
}

const perWeek = new Map<number, number>()
for (const w of WORDS) perWeek.set(w.week, (perWeek.get(w.week) ?? 0) + 1)
console.log('Words per week:', Object.fromEntries(perWeek))
console.log('Total words:', WORDS.length, 'duplicates:', dupes)

let ex = 0
for (const t of TOPICS) {
  ex += t.exercises.length
  for (const e of t.exercises) {
    if (e.kind === 'mc' && (e.q.split('___').length - 1) === 0 && !e.q.includes('=') && !e.q.includes('?')) {
      console.log(`MC WITHOUT GAP ${e.id}: ${e.q}`)
    }
  }
}
console.log('Topics:', TOPICS.length, 'exercises:', ex, 'placement:', PLACEMENT.length)
