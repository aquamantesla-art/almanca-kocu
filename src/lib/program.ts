import { A2_ORDER, WEEK_TOPICS, TOPICS, TOPIC_BY_ID } from '../content/grammar'
import { NICOS_B1, ROTATION, type InputSource, type NicosLesson } from '../content/resources'
import { READINGS } from '../content/readings'
import { WRITING_PROMPTS } from '../content/writing'
import { SPEAKING_TOPICS } from '../content/speaking'
import { WORDS } from '../content/vocab'
import type { Exercise, Reading, SpeakingTopic, WritingPrompt } from '../content/types'
import { shuffle } from './answer'
import { currentWeekKeys, dateKey, addDays } from './date'
import { isMature, State } from './srs'
import { newCountToday, BLOCK_ORDER, type AppState, type BlockId, type Strand } from './store'

export const TOTAL_DAYS = 72
export const DAYS_PER_WEEK = 6
export const WEEKLY_TARGET_SEC = 6 * 3600

export type Phase = 1 | 2 | 3

export interface PhaseInfo {
  name: string
  weeks: string
  goal: string
  minutes: Record<BlockId, number>
}

export const PHASES: Record<Phase, PhaseInfo> = {
  1: {
    name: 'A2 tamiri',
    weeks: '1–3. hafta',
    goal: 'Unuttuğun temel gramer ve en sık kelimeler',
    minutes: { kelime: 12, gramer: 12, girdi: 15, yazma: 10, akicilik: 10 },
  },
  2: {
    name: 'B1 çekirdek',
    weeks: '4–8. hafta',
    goal: 'B1 gramer, dört çizgi eşit',
    minutes: { kelime: 10, gramer: 8, girdi: 15, yazma: 13, akicilik: 13 },
  },
  3: {
    name: 'Anlama sıçraması',
    weeks: '9–12. hafta',
    goal: 'Daha çok dinleme ve okuma',
    minutes: { kelime: 8, gramer: 6, girdi: 24, yazma: 11, akicilik: 11 },
  },
}

export const BLOCK_INFO: Record<BlockId, { name: string; strand: string; what: string }> = {
  kelime: { name: 'Kelime', strand: 'Dil odaklı', what: 'Aralıklı tekrar kartları' },
  gramer: { name: 'Gramer', strand: 'Dil odaklı', what: 'Karışık alıştırma' },
  girdi: { name: 'Dinle & oku', strand: 'Girdi', what: 'Video, haber, metin' },
  yazma: { name: 'Yazma', strand: 'Çıktı', what: 'Günün görevi' },
  akicilik: { name: 'Konuşma', strand: 'Akıcılık', what: '4/3/2 ya da tekrarlı okuma' },
}

export const STRAND_NAMES: Record<Strand, string> = {
  language: 'Dil odaklı',
  input: 'Girdi',
  output: 'Çıktı',
  fluency: 'Akıcılık',
}

export const weekOf = (day: number) => Math.min(12, Math.ceil(day / DAYS_PER_WEEK))
export const dayInWeek = (day: number) => ((day - 1) % DAYS_PER_WEEK) + 1
export const phaseOf = (week: number): Phase => (week <= 3 ? 1 : week <= 8 ? 2 : 3)

export function currentDay(s: Pick<AppState, 'completedDays'>): number {
  return s.completedDays + 1
}

export type FluencyTask = { kind: '432'; topic: SpeakingTopic } | { kind: 'rrr'; reading: Reading }

export interface DayPlan {
  day: number
  week: number
  dow: number
  phase: Phase
  minutes: Record<BlockId, number>
  grammarFocus: string[]
  nicos: NicosLesson | null
  extra: InputSource
  extraRequired: boolean
  writing: WritingPrompt
  fluency: FluencyTask
  readings: Reading[]
}

export function topicAccuracy(s: Pick<AppState, 'topicStats'>, topic: string): number | null {
  const r = s.topicStats[topic]?.results ?? []
  if (r.length < 4) return null
  return r.reduce((a, b) => a + b, 0) / r.length
}

/** A2 topics ordered for repair: weakest placement score first; mastered ones drop out */
export function a2Queue(s: Pick<AppState, 'placement'>): string[] {
  if (!s.placement.done) return A2_ORDER
  const scored = A2_ORDER.map((id, i) => ({ id, i, score: s.placement.scores[id] ?? 0 }))
  const weak = scored.filter((t) => t.score < 3).sort((a, b) => a.score - b.score || a.i - b.i)
  return weak.length ? weak.map((t) => t.id) : A2_ORDER
}

function weakestTopics(s: Pick<AppState, 'topicStats'>): string[] {
  return TOPICS.map((t) => ({ id: t.id, acc: topicAccuracy(s, t.id) }))
    .filter((t) => t.acc !== null)
    .sort((a, b) => (a.acc ?? 1) - (b.acc ?? 1))
    .map((t) => t.id)
}

export function mainTopicFor(s: Pick<AppState, 'placement' | 'topicStats'>, day: number): string {
  const week = weekOf(day)
  const dow = dayInWeek(day)
  if (day <= 18) {
    const q = a2Queue(s)
    return q[Math.min(q.length - 1, Math.floor(((day - 1) * q.length) / 18))]
  }
  const fixed = WEEK_TOPICS[week]
  if (fixed && day <= TOTAL_DAYS) return dow <= 3 || fixed.length === 1 ? fixed[0] : fixed[1]
  // Week 12 and beyond: rotate through the weakest topics
  const weak = weakestTopics(s).slice(0, 6)
  const pool = weak.length ? weak : TOPICS.map((t) => t.id)
  return pool[(day - 1) % pool.length]
}

export function buildDayPlan(s: AppState, day: number): DayPlan {
  const week = weekOf(day)
  const dow = dayInWeek(day)
  const phase = phaseOf(week)
  const main = mainTopicFor(s, day)
  const course = s.settings.courseTopic
  const grammarFocus = course && course !== main && TOPIC_BY_ID[course] ? [main, course] : [main]
  const nicos = NICOS_B1.find((l) => !s.nicosDone.includes(l.id)) ?? null
  const readings = READINGS.filter((r) => r.week === week)
  const idx = (day - 1) % TOTAL_DAYS
  const fluency: FluencyTask =
    dow % 2 === 1
      ? { kind: '432', topic: SPEAKING_TOPICS[Math.min(SPEAKING_TOPICS.length - 1, (week - 1) * 3 + (dow - 1) / 2)] }
      : { kind: 'rrr', reading: readings[dow === 4 ? 1 : 0] ?? READINGS[0] }
  return {
    day,
    week,
    dow,
    phase,
    minutes: PHASES[phase].minutes,
    grammarFocus,
    nicos,
    extra: ROTATION[(dow - 1) % ROTATION.length],
    extraRequired: phase === 3,
    writing: WRITING_PROMPTS[idx],
    fluency,
    readings,
  }
}

// ---------- Vocabulary queue ----------

export function dueCardKeys(s: Pick<AppState, 'cards'>, prefixes: string[], now = Date.now()): string[] {
  return Object.entries(s.cards)
    .filter(([k, c]) => prefixes.some((p) => k.startsWith(p)) && c.due <= now)
    .sort((a, b) => a[1].due - b[1].due)
    .map(([k]) => k)
}

export function newWordKeys(s: Pick<AppState, 'cards' | 'newByDate' | 'settings'>, limitOverride?: number): string[] {
  const left = limitOverride ?? Math.max(0, s.settings.dailyNew - newCountToday(s))
  if (left <= 0) return []
  const out: string[] = []
  for (const w of WORDS) {
    if (out.length >= left) break
    if (!s.cards[`w:${w.id}`]) out.push(`w:${w.id}`)
  }
  return out
}

export function newCustomKeys(s: Pick<AppState, 'cards' | 'custom'>): string[] {
  return Object.keys(s.custom)
    .map((id) => `c:${id}`)
    .filter((k) => !s.cards[k])
}

/** Reviews first, with one new card slotted in after every three reviews */
export function buildVocabQueue(s: AppState): string[] {
  const due = dueCardKeys(s, ['w:', 'c:'])
  const fresh = [...newCustomKeys(s), ...newWordKeys(s)]
  const out: string[] = []
  let i = 0
  let j = 0
  while (i < due.length || j < fresh.length) {
    for (let k = 0; k < 3 && i < due.length; k++) out.push(due[i++])
    if (j < fresh.length) out.push(fresh[j++])
  }
  return out
}

// ---------- Grammar selection (interleaved) ----------

function pickFromTopic(s: AppState, topic: string, n: number, now: number, exclude: Set<string>): Exercise[] {
  const t = TOPIC_BY_ID[topic]
  if (!t) return []
  const items = t.exercises.filter((e) => !exclude.has(e.id))
  const unseen = items.filter((e) => !s.cards[`g:${e.id}`])
  const due = items
    .filter((e) => s.cards[`g:${e.id}`] && s.cards[`g:${e.id}`].due <= now)
    .sort((a, b) => s.cards[`g:${a.id}`].due - s.cards[`g:${b.id}`].due)
  const rest = shuffle(items.filter((e) => !unseen.includes(e) && !due.includes(e)))
  return [...due, ...unseen, ...rest].slice(0, n)
}

/**
 * About half from today's focus, a quarter from the course topic, the rest from due items of other
 * topics — so earlier topics keep competing with the new one (interleaving).
 */
export function pickGrammarItems(s: AppState, focus: string[], count = 12): Exercise[] {
  const now = Date.now()
  const chosen: Exercise[] = []
  const ids = new Set<string>()
  const add = (list: Exercise[]) => {
    for (const e of list) {
      if (!ids.has(e.id)) {
        ids.add(e.id)
        chosen.push(e)
      }
    }
  }
  const [main, course] = focus
  add(pickFromTopic(s, main, course ? 6 : 8, now, ids))
  if (course) add(pickFromTopic(s, course, 3, now, ids))
  const otherDue = Object.entries(s.cards)
    .filter(([k, c]) => k.startsWith('g:') && c.due <= now)
    .map(([k]) => k.slice(2))
    .filter((id) => !ids.has(id) && !focus.some((f) => id.startsWith(`${f}-`)))
  const reviewIds = shuffle(otherDue).slice(0, count - chosen.length)
  for (const id of reviewIds) {
    const topic = id.slice(0, id.lastIndexOf('-'))
    const ex = TOPIC_BY_ID[topic]?.exercises.find((e) => e.id === id)
    if (ex) add([ex])
  }
  if (chosen.length < count) {
    // Not enough reviews yet: mix in topics already practised
    const practised = Object.keys(s.topicStats).filter((t) => !focus.includes(t))
    for (const t of shuffle(practised)) {
      if (chosen.length >= count) break
      add(pickFromTopic(s, t, 1, now, ids))
    }
  }
  if (chosen.length < count) add(pickFromTopic(s, main, count - chosen.length, now, ids))
  return shuffle(chosen)
}

// ---------- Stats ----------

export function secondsOn(s: Pick<AppState, 'timeLog'>, key: string): number {
  const d = s.timeLog[key]
  if (!d) return 0
  return (d.language ?? 0) + (d.input ?? 0) + (d.output ?? 0) + (d.fluency ?? 0)
}

export function weekStrandSeconds(s: Pick<AppState, 'timeLog'>, d = new Date()): Record<Strand, number> {
  const out: Record<Strand, number> = { language: 0, input: 0, output: 0, fluency: 0 }
  for (const k of currentWeekKeys(d)) {
    const day = s.timeLog[k]
    if (!day) continue
    for (const st of Object.keys(out) as Strand[]) out[st] += day[st] ?? 0
  }
  return out
}

export function totalSeconds(s: Pick<AppState, 'timeLog'>): number {
  return Object.keys(s.timeLog).reduce((a, k) => a + secondsOn(s, k), 0)
}

/** Consecutive days with at least 5 minutes, counting back from today (or yesterday) */
export function streak(s: Pick<AppState, 'timeLog'>): number {
  let d = new Date()
  if (secondsOn(s, dateKey(d)) < 300) d = addDays(d, -1)
  let n = 0
  while (secondsOn(s, dateKey(d)) >= 300) {
    n++
    d = addDays(d, -1)
  }
  return n
}

export interface VocabStats {
  total: number
  unseen: number
  learning: number
  young: number
  mature: number
  dueNow: number
}

export function vocabStats(s: Pick<AppState, 'cards'>): VocabStats {
  const now = Date.now()
  let learning = 0
  let young = 0
  let mature = 0
  let seen = 0
  let dueNow = 0
  for (const w of WORDS) {
    const c = s.cards[`w:${w.id}`]
    if (!c) continue
    seen++
    if (c.due <= now) dueNow++
    if (c.state === State.Learning || c.state === State.Relearning) learning++
    else if (isMature(c)) mature++
    else young++
  }
  return { total: WORDS.length, unseen: WORDS.length - seen, learning, young, mature, dueNow }
}

export function blockMinutesDone(s: AppState, block: BlockId): number {
  return Math.round((s.session?.blocks[block]?.sec ?? 0) / 60)
}

export function nextOpenBlock(s: AppState): BlockId | null {
  return BLOCK_ORDER.find((b) => !s.session?.blocks[b]?.done) ?? null
}
