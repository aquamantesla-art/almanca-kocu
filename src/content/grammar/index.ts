import { parseExercises } from '../parse'
import type { Exercise, GrammarTopic } from '../types'
import { A2A } from './a2a'
import { A2B } from './a2b'
import { B1A } from './b1a'
import { B1B } from './b1b'

export const TOPICS: GrammarTopic[] = [...A2A, ...A2B, ...B1A, ...B1B].map((t) => ({
  id: t.id,
  title: t.title,
  titleTr: t.titleTr,
  level: t.level,
  summary: t.summary,
  lesson: t.lesson.trim(),
  exercises: parseExercises(t.id, t.ex),
}))

export const TOPIC_BY_ID: Record<string, GrammarTopic> = Object.fromEntries(TOPICS.map((t) => [t.id, t]))

export const EXERCISE_BY_ID: Record<string, Exercise> = Object.fromEntries(
  TOPICS.flatMap((t) => t.exercises.map((e) => [e.id, e])),
)

/** Repair order for weeks 1–3 when no placement test was taken */
export const A2_ORDER = [
  'verbpos',
  'nebensatz',
  'perfekt',
  'praetbasic',
  'trennbar',
  'kasus',
  'praep',
  'adjbasic',
  'komparativ',
  'reflexiv',
]

/** Fixed B1 focus per program week (weeks 4–11). Week 12 reviews the weakest topics. */
export const WEEK_TOPICS: Record<number, string[]> = {
  4: ['praeteritum', 'temporal'],
  5: ['konj2', 'konnektoren'],
  6: ['relativ', 'verbpraep'],
  7: ['passiv', 'infinitiv'],
  8: ['doppelkonj', 'genitiv'],
  9: ['adjfull', 'futurlassen'],
  10: ['partizip', 'konj1'],
  11: ['nvv'],
}
