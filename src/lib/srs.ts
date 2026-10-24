import { fsrs, generatorParameters, createEmptyCard, Rating, State, type Card, type FSRS, type Grade } from 'ts-fsrs'

export { Rating, State }
export type { Grade }

/** Serializable card (dates as epoch ms) so it can live in IndexedDB as JSON */
export interface SrsCard {
  due: number
  stability: number
  difficulty: number
  elapsed_days: number
  scheduled_days: number
  learning_steps: number
  reps: number
  lapses: number
  state: State
  last_review?: number
}

let scheduler: FSRS = makeScheduler(0.9)
let currentRetention = 0.9

function makeScheduler(retention: number): FSRS {
  return fsrs(generatorParameters({ request_retention: retention, enable_fuzz: true, maximum_interval: 365 }))
}

export function configureScheduler(retention: number) {
  if (retention === currentRetention) return
  currentRetention = retention
  scheduler = makeScheduler(retention)
}

function toCard(c: SrsCard): Card {
  return {
    ...c,
    due: new Date(c.due),
    last_review: c.last_review ? new Date(c.last_review) : undefined,
  }
}

function fromCard(c: Card): SrsCard {
  return {
    due: c.due.getTime(),
    stability: c.stability,
    difficulty: c.difficulty,
    elapsed_days: c.elapsed_days,
    scheduled_days: c.scheduled_days,
    learning_steps: c.learning_steps,
    reps: c.reps,
    lapses: c.lapses,
    state: c.state,
    last_review: c.last_review ? c.last_review.getTime() : undefined,
  }
}

export function review(card: SrsCard | undefined, grade: Grade, now = Date.now()): SrsCard {
  const base = card ? toCard(card) : createEmptyCard(new Date(now))
  return fromCard(scheduler.next(base, new Date(now), grade).card)
}

/**
 * A word the learner already knows (quick filter). Instead of rating it "Easy" — which would bring
 * hundreds of known words back on the same day a week later — it starts as a mature card whose first
 * check is spread over the next 10–40 days.
 */
export function knownCard(now = Date.now()): SrsCard {
  const days = 10 + Math.floor(Math.random() * 30)
  return {
    due: now + days * 86_400_000,
    stability: days,
    difficulty: 3,
    elapsed_days: 0,
    scheduled_days: days,
    learning_steps: 0,
    reps: 1,
    lapses: 0,
    state: State.Review,
    last_review: now,
  }
}

export function intervalLabel(ms: number): string {
  const min = Math.max(1, Math.round(ms / 60_000))
  if (min < 60) return `${min} dk`
  const h = Math.round(min / 60)
  if (h < 24) return `${h} sa`
  const d = Math.round(h / 24)
  if (d < 31) return `${d} gün`
  const mo = Math.round(d / 30)
  if (mo < 12) return `${mo} ay`
  return `${Math.round(d / 365)} yıl`
}

export function previewIntervals(card: SrsCard | undefined, now = Date.now()): Record<Grade, string> {
  const base = card ? toCard(card) : createEmptyCard(new Date(now))
  const p = scheduler.repeat(base, new Date(now))
  const out = {} as Record<Grade, string>
  for (const g of [Rating.Again, Rating.Hard, Rating.Good, Rating.Easy] as Grade[]) {
    out[g] = intervalLabel(p[g].card.due.getTime() - now)
  }
  return out
}

export function isDue(card: SrsCard, now = Date.now()): boolean {
  return card.due <= now
}

/** Learning/relearning cards are "short-term": they come back within the same session */
export function isShortTerm(card: SrsCard): boolean {
  return card.state === State.Learning || card.state === State.Relearning
}

/** 21+ day stability counts as "learned" in the stats */
export function isMature(card: SrsCard): boolean {
  return card.state === State.Review && card.stability >= 21
}
