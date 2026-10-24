import { create } from 'zustand'
import { persist, createJSONStorage, type StateStorage } from 'zustand/middleware'
import { get as idbGet, set as idbSet, del as idbDel } from 'idb-keyval'
import type { Article } from '../content/types'
import { dateKey } from './date'
import { review, knownCard, configureScheduler, Rating, type Grade, type SrsCard } from './srs'

export type Strand = 'language' | 'input' | 'output' | 'fluency'
export type BlockId = 'kelime' | 'gramer' | 'girdi' | 'yazma' | 'akicilik'
export const BLOCK_ORDER: BlockId[] = ['kelime', 'gramer', 'girdi', 'yazma', 'akicilik']
export const BLOCK_STRAND: Record<BlockId, Strand> = {
  kelime: 'language',
  gramer: 'language',
  girdi: 'input',
  yazma: 'output',
  akicilik: 'fluency',
}

export type ThemePref = 'system' | 'light' | 'dark'

export interface Settings {
  dailyNew: number
  retention: number
  ttsRate: number
  theme: ThemePref
  courseTopic: string | null
}

export interface BlockProgress {
  done: boolean
  sec: number
}

export interface Session {
  day: number
  started: string
  blocks: Partial<Record<BlockId, BlockProgress>>
  /** ids of input assignments ticked off today */
  inputDone: string[]
}

export type CustomCard =
  | { id: string; kind: 'word'; de: string; tr: string; art?: Article; created: number }
  | { id: string; kind: 'fix'; wrong: string; right: string; note: string; created: number }

export interface TopicStat {
  lessonSeen: boolean
  /** last 30 answers, 1 = correct */
  results: number[]
}

export interface WritingEntry {
  date: string
  promptId: string
  text: string
}

interface Data {
  onboarded: boolean
  settings: Settings
  placement: { done: boolean; scores: Record<string, number> }
  cards: Record<string, SrsCard>
  custom: Record<string, CustomCard>
  newByDate: Record<string, number>
  timeLog: Record<string, Partial<Record<Strand, number>>>
  completedDays: number
  dayDates: Record<number, string>
  session: Session | null
  nicosDone: string[]
  readingsDone: Record<string, number>
  topicStats: Record<string, TopicStat>
  writings: WritingEntry[]
  /** words marked "unknown" in the quick filter: they wait in the new-word queue */
  filterSeen: string[]
}

interface Actions {
  finishOnboarding: () => void
  setSettings: (s: Partial<Settings>) => void
  setPlacement: (scores: Record<string, number>) => void
  reviewCard: (key: string, grade: Grade) => void
  markKnown: (key: string) => void
  addCustom: (c: CustomCard) => void
  removeCustom: (id: string) => void
  logTime: (strand: Strand, sec: number) => void
  ensureSession: (day: number) => void
  addBlockTime: (block: BlockId, sec: number) => void
  completeBlock: (block: BlockId) => boolean
  toggleInputDone: (id: string) => void
  toggleNicos: (id: string) => void
  recordGrammar: (topic: string, exerciseId: string, correct: boolean) => void
  markLessonSeen: (topic: string) => void
  saveReading: (id: string, score: number) => void
  saveWriting: (e: WritingEntry) => void
  markFilterSeen: (wordId: string) => void
  importData: (json: string) => void
  resetAll: () => void
}

export type AppState = Data & Actions

export const DEFAULT_SETTINGS: Settings = {
  dailyNew: 15,
  retention: 0.9,
  ttsRate: 0.9,
  theme: 'system',
  courseTopic: null,
}

const initialData = (): Data => ({
  onboarded: false,
  settings: { ...DEFAULT_SETTINGS },
  placement: { done: false, scores: {} },
  cards: {},
  custom: {},
  newByDate: {},
  timeLog: {},
  completedDays: 0,
  dayDates: {},
  session: null,
  nicosDone: [],
  readingsDone: {},
  topicStats: {},
  writings: [],
  filterSeen: [],
})

/** IndexedDB with a localStorage fallback (private windows can block IndexedDB) */
const storage: StateStorage = {
  getItem: async (name) => {
    try {
      const v = await idbGet<string>(name)
      if (v != null) return v
    } catch {
      /* fall through */
    }
    try {
      return localStorage.getItem(name)
    } catch {
      return null
    }
  },
  setItem: async (name, value) => {
    try {
      await idbSet(name, value)
      return
    } catch {
      /* fall through */
    }
    try {
      localStorage.setItem(name, value)
    } catch {
      /* storage unavailable: keep state in memory only */
    }
  },
  removeItem: async (name) => {
    try {
      await idbDel(name)
    } catch {
      /* ignore */
    }
    try {
      localStorage.removeItem(name)
    } catch {
      /* ignore */
    }
  },
}

export const STORAGE_KEY = 'almanca-kocu'

export const useApp = create<AppState>()(
  persist(
    (set, get) => ({
      ...initialData(),

      finishOnboarding: () => set({ onboarded: true }),

      setSettings: (s) => {
        const settings = { ...get().settings, ...s }
        configureScheduler(settings.retention)
        set({ settings })
      },

      setPlacement: (scores) => set({ placement: { done: true, scores } }),

      reviewCard: (key, grade) => {
        const { cards, newByDate } = get()
        const prev = cards[key]
        const next = review(prev, grade)
        const patch: Partial<Data> = { cards: { ...cards, [key]: next } }
        if (!prev && key.startsWith('w:')) {
          const k = dateKey()
          patch.newByDate = { ...newByDate, [k]: (newByDate[k] ?? 0) + 1 }
        }
        set(patch)
      },

      markKnown: (key) => {
        const { cards } = get()
        if (cards[key]) return
        set({ cards: { ...cards, [key]: knownCard() } })
      },

      addCustom: (c) => set({ custom: { ...get().custom, [c.id]: c } }),

      removeCustom: (id) => {
        const custom = { ...get().custom }
        delete custom[id]
        const cards = { ...get().cards }
        delete cards[`c:${id}`]
        set({ custom, cards })
      },

      logTime: (strand, sec) => {
        if (sec <= 0) return
        const k = dateKey()
        const log = get().timeLog
        const day = { ...(log[k] ?? {}) }
        day[strand] = (day[strand] ?? 0) + sec
        set({ timeLog: { ...log, [k]: day } })
      },

      ensureSession: (day) => {
        const s = get().session
        if (s && s.day === day) return
        set({ session: { day, started: dateKey(), blocks: {}, inputDone: [] } })
      },

      addBlockTime: (block, sec) => {
        const s = get().session
        if (!s || sec <= 0) return
        const prev = s.blocks[block] ?? { done: false, sec: 0 }
        set({ session: { ...s, blocks: { ...s.blocks, [block]: { ...prev, sec: prev.sec + sec } } } })
        get().logTime(BLOCK_STRAND[block], sec)
      },

      /** Marks a block done; returns true when this finished the whole day */
      completeBlock: (block) => {
        const s = get().session
        if (!s) return false
        const prev = s.blocks[block] ?? { done: false, sec: 0 }
        const blocks = { ...s.blocks, [block]: { ...prev, done: true } }
        const allDone = BLOCK_ORDER.every((b) => blocks[b]?.done)
        if (allDone) {
          set({
            session: null,
            completedDays: get().completedDays + 1,
            dayDates: { ...get().dayDates, [s.day]: dateKey() },
          })
          return true
        }
        set({ session: { ...s, blocks } })
        return false
      },

      toggleInputDone: (id) => {
        const s = get().session
        if (!s) return
        const inputDone = s.inputDone.includes(id) ? s.inputDone.filter((x) => x !== id) : [...s.inputDone, id]
        set({ session: { ...s, inputDone } })
      },

      toggleNicos: (id) => {
        const done = get().nicosDone
        set({ nicosDone: done.includes(id) ? done.filter((x) => x !== id) : [...done, id] })
      },

      recordGrammar: (topic, exerciseId, correct) => {
        const stats = get().topicStats
        const prev = stats[topic] ?? { lessonSeen: false, results: [] }
        const results = [...prev.results, correct ? 1 : 0].slice(-30)
        set({ topicStats: { ...stats, [topic]: { ...prev, results } } })
        get().reviewCard(`g:${exerciseId}`, correct ? Rating.Good : Rating.Again)
      },

      markLessonSeen: (topic) => {
        const stats = get().topicStats
        const prev = stats[topic] ?? { lessonSeen: false, results: [] }
        set({ topicStats: { ...stats, [topic]: { ...prev, lessonSeen: true } } })
      },

      saveReading: (id, score) => set({ readingsDone: { ...get().readingsDone, [id]: score } }),

      saveWriting: (e) => set({ writings: [...get().writings, e].slice(-200) }),

      markFilterSeen: (wordId) => {
        const seen = get().filterSeen
        if (!seen.includes(wordId)) set({ filterSeen: [...seen, wordId] })
      },

      importData: (json) => {
        const parsed = JSON.parse(json)
        const data = parsed?.state ?? parsed
        if (!data || typeof data !== 'object' || !('cards' in data) || !('settings' in data)) {
          throw new Error('Bu dosya Almanca Koçu yedeği değil.')
        }
        const merged = { ...initialData(), ...data, settings: { ...DEFAULT_SETTINGS, ...data.settings } }
        configureScheduler(merged.settings.retention)
        set(merged)
      },

      resetAll: () => {
        configureScheduler(DEFAULT_SETTINGS.retention)
        set(initialData())
      },
    }),
    {
      name: STORAGE_KEY,
      version: 1,
      storage: createJSONStorage(() => storage),
      partialize: (s) => {
        const { ...data } = s
        for (const k of Object.keys(data) as (keyof AppState)[]) {
          if (typeof data[k] === 'function') delete data[k]
        }
        return data as Data
      },
      onRehydrateStorage: () => (state) => {
        if (state) configureScheduler(state.settings.retention)
      },
    },
  ),
)

export function exportData(): string {
  const s = useApp.getState()
  const data: Record<string, unknown> = {}
  for (const [k, v] of Object.entries(s)) if (typeof v !== 'function') data[k] = v
  return JSON.stringify({ app: 'almanca-kocu', version: 1, exported: new Date().toISOString(), state: data })
}

export function newCountToday(state: Pick<Data, 'newByDate'>): number {
  return state.newByDate[dateKey()] ?? 0
}
