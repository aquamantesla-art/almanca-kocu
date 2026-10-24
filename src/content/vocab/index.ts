import { parseWords } from '../parse'
import type { Word } from '../types'
import w01 from './w01'
import w02 from './w02'
import w03 from './w03'
import w04 from './w04'
import w05 from './w05'
import w06 from './w06'
import w07 from './w07'
import w08 from './w08'
import w09 from './w09'
import w10 from './w10'
import w11 from './w11'
import w12 from './w12'

const SOURCES = [w01, w02, w03, w04, w05, w06, w07, w08, w09, w10, w11, w12]

export const WORDS: Word[] = SOURCES.flatMap((src, i) => parseWords(i + 1, src))

export const WORD_BY_ID: Record<string, Word> = Object.fromEntries(WORDS.map((w) => [w.id, w]))

const SKIP = new Set(['hat', 'ist', 'sich', 'an', 'ab', 'auf', 'aus', 'ein', 'mit', 'vor', 'zu', 'um', 'los', 'weg', 'zurück', 'fest', 'teil', 'gesorgt'])

/** Lowercased surface form → word, for tap-to-translate in reading texts */
export const LOOKUP: Map<string, Word> = (() => {
  const m = new Map<string, Word>()
  const add = (k: string, w: Word) => {
    const key = k.toLowerCase().trim()
    if (key && !SKIP.has(key) && !m.has(key)) m.set(key, w)
  }
  for (const w of WORDS) {
    const base = w.de.replace(/^sich /, '')
    add(base, w)
    if (w.pos === 'n' && w.forms !== '–') add(w.forms, w)
    if (w.pos === 'v') {
      for (const part of w.forms.split(/[,/]/)) {
        for (const tok of part.trim().split(/\s+/)) add(tok, w)
      }
    }
    if (w.pos === 'adj' && w.forms !== '–') {
      for (const tok of w.forms.split(/[, ]+/)) if (tok !== 'am') add(tok, w)
    }
  }
  return m
})()
