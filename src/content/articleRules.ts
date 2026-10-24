import type { Article } from './types'

export interface SuffixRule {
  art: Article
  ending: string
  test: (w: string) => boolean
  how: 'her zaman' | 'neredeyse her zaman' | 'çoğunlukla'
  examples: string
  exceptions?: string
}

const end = (s: string) => (w: string) => w.toLowerCase().endsWith(s)

export const RULES: SuffixRule[] = [
  { art: 'die', ending: '-ung', test: end('ung'), how: 'her zaman', examples: 'die Wohnung, die Zeitung, die Rechnung' },
  { art: 'die', ending: '-heit', test: end('heit'), how: 'her zaman', examples: 'die Gesundheit, die Freiheit' },
  { art: 'die', ending: '-keit', test: end('keit'), how: 'her zaman', examples: 'die Möglichkeit, die Pünktlichkeit' },
  { art: 'die', ending: '-schaft', test: end('schaft'), how: 'her zaman', examples: 'die Freundschaft, die Gesellschaft' },
  { art: 'die', ending: '-tät', test: end('tät'), how: 'her zaman', examples: 'die Universität, die Qualität' },
  { art: 'die', ending: '-ion', test: end('ion'), how: 'neredeyse her zaman', examples: 'die Information, die Region', exceptions: 'das Stadion' },
  { art: 'die', ending: '-ik', test: end('ik'), how: 'neredeyse her zaman', examples: 'die Musik, die Politik, die Statistik' },
  { art: 'die', ending: '-ie', test: end('ie'), how: 'neredeyse her zaman', examples: 'die Familie, die Industrie, die Demokratie' },
  { art: 'die', ending: '-ur', test: end('ur'), how: 'çoğunlukla', examples: 'die Kultur, die Natur, die Temperatur', exceptions: 'das Abitur' },
  { art: 'die', ending: '-ei', test: end('ei'), how: 'çoğunlukla', examples: 'die Bäckerei, die Polizei, die Partei', exceptions: 'das Ei' },
  { art: 'die', ending: '-enz / -anz', test: (w) => /(enz|anz)$/i.test(w), how: 'neredeyse her zaman', examples: 'die Konferenz, die Toleranz' },
  { art: 'die', ending: '-in (kadın)', test: (w) => /(erin|tin|gin|din|rztin)$/i.test(w), how: 'her zaman', examples: 'die Lehrerin, die Kollegin, die Freundin' },
  { art: 'das', ending: '-chen / -lein', test: (w) => /(chen|lein)$/i.test(w), how: 'her zaman', examples: 'das Brötchen, das Mädchen' },
  { art: 'das', ending: '-ment', test: end('ment'), how: 'neredeyse her zaman', examples: 'das Medikament, das Dokument', exceptions: 'der Moment' },
  { art: 'das', ending: '-um', test: end('um'), how: 'neredeyse her zaman', examples: 'das Studium, das Museum, das Zentrum' },
  { art: 'das', ending: '-ma', test: end('ma'), how: 'çoğunlukla', examples: 'das Thema, das Klima', exceptions: 'die Firma' },
  { art: 'das', ending: '-nis', test: end('nis'), how: 'çoğunlukla', examples: 'das Ergebnis, das Zeugnis, das Erlebnis', exceptions: 'die Erlaubnis' },
  { art: 'das', ending: 'Ge-', test: (w) => /^Ge[^h]/.test(w) && !/(ung|heit|keit|schaft|e)$/.test(w), how: 'çoğunlukla', examples: 'das Geschenk, das Gespräch, das Gemüse', exceptions: 'der Geburtstag, die Gefahr' },
  { art: 'der', ending: '-ling', test: end('ling'), how: 'her zaman', examples: 'der Frühling, der Flüchtling' },
  { art: 'der', ending: '-ismus', test: end('ismus'), how: 'her zaman', examples: 'der Tourismus' },
  { art: 'der', ending: '-ist', test: end('ist'), how: 'neredeyse her zaman', examples: 'der Polizist, der Journalist' },
  { art: 'der', ending: '-or', test: end('or'), how: 'çoğunlukla', examples: 'der Motor, der Doktor', exceptions: 'das Labor' },
  { art: 'der', ending: '-ig / -ich', test: (w) => /(ig|ich)$/i.test(w), how: 'çoğunlukla', examples: 'der Honig, der Teppich' },
  { art: 'die', ending: '-e', test: end('e'), how: 'çoğunlukla', examples: 'die Lampe, die Straße, die Tasche', exceptions: 'der Name, der Käse, der Kollege, das Ende, das Auge' },
]

export function findRule(word: string): SuffixRule | undefined {
  return RULES.find((r) => r.test(word))
}

/** Gender share of frequent nouns (rapordaki frekans analizi) */
export const GENDER_SHARE = { die: 46, der: 34, das: 20 }
