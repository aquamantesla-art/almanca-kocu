export type Article = 'der' | 'die' | 'das'
export type Pos = 'n' | 'pl' | 'v' | 'adj' | 'adv' | 'prep' | 'konj' | 'phr' | 'x'

export interface Word {
  id: string
  week: number
  pos: Pos
  art?: Article
  de: string
  /** nouns: plural form ("–" = no plural); verbs: key forms; adjectives: comparison */
  forms: string
  tr: string
  ex: string
  exTr: string
}

export type ExerciseKind = 'mc' | 'ty' | 'or'

export interface Exercise {
  id: string
  topic: string
  kind: ExerciseKind
  /** prompt text; "___" marks gaps */
  q: string
  /** mc: options */
  options?: string[]
  /** mc: index of correct option */
  correct?: number
  /** ty: accepted answers per gap; or: accepted full answers */
  answers?: string[][]
  /** or: tokens to arrange (shuffled at render time) */
  tokens?: string[]
  explain: string
}

export interface GrammarTopic {
  id: string
  title: string
  titleTr: string
  level: 'A2' | 'B1'
  summary: string
  lesson: string
  exercises: Exercise[]
}

export interface Reading {
  id: string
  week: number
  title: string
  level: 'A2' | 'B1'
  text: string
  glossary: Record<string, string>
  questions: Exercise[]
}

export interface WritingPrompt {
  id: string
  week: number
  title: string
  task: string
  targets: string
  minWords: number
  starter?: string
}

export interface SpeakingTopic {
  id: string
  week: number
  title: string
  titleTr: string
  hints: string[]
}
