import { useEffect, useMemo, useState } from 'react'
import { WORD_BY_ID } from '../content/vocab'
import { findRule } from '../content/articleRules'
import type { Article, Word } from '../content/types'
import { useApp, type CustomCard } from '../lib/store'
import { previewIntervals, Rating, State, type Grade } from '../lib/srs'
import { speak } from '../lib/platform'
import { Btn, GermanWord, SpeakButton, articleColor } from './ui'

type Stage = 'article' | 'front' | 'back'

const ARTS: Article[] = ['der', 'die', 'das']
const ART_BG: Record<Article, string> = {
  der: 'border-der text-der',
  die: 'border-die text-die',
  das: 'border-das text-das',
}

const GRADES: { g: Grade; label: string; key: string }[] = [
  { g: Rating.Again, label: 'Tekrar', key: '1' },
  { g: Rating.Hard, label: 'Zor', key: '2' },
  { g: Rating.Good, label: 'İyi', key: '3' },
  { g: Rating.Easy, label: 'Kolay', key: '4' },
]

function itemFor(key: string, custom: Record<string, CustomCard>): { word?: Word; custom?: CustomCard } {
  if (key.startsWith('w:')) return { word: WORD_BY_ID[key.slice(2)] }
  return { custom: custom[key.slice(2)] }
}

export function VocabSession({ initial, onEmpty }: { initial: string[]; onEmpty?: (reviewed: number) => void }) {
  const cards = useApp((s) => s.cards)
  const custom = useApp((s) => s.custom)
  const reviewCard = useApp((s) => s.reviewCard)
  const [queue, setQueue] = useState(initial)
  const [reviewed, setReviewed] = useState(0)
  const [stage, setStage] = useState<Stage>('front')
  const [picked, setPicked] = useState<Article | null>(null)

  const key = queue[0]
  const item = key ? itemFor(key, custom) : {}
  const card = key ? cards[key] : undefined
  const isNew = !card
  const word = item.word
  const isNoun = !!word?.art || (item.custom?.kind === 'word' && !!item.custom.art)
  const nounArt = word?.art ?? (item.custom?.kind === 'word' ? item.custom.art : undefined)

  // Reset the stage whenever a new card comes up
  useEffect(() => {
    if (!key) return
    setPicked(null)
    if (isNoun) setStage('article')
    else if (isNew && word) setStage('back')
    else setStage('front')
  }, [key, isNoun, isNew, word])

  useEffect(() => {
    if (!key && onEmpty) onEmpty(reviewed)
  }, [key, onEmpty, reviewed])

  const intervals = useMemo(() => (key ? previewIntervals(card) : null), [key, card])

  const rate = (g: Grade) => {
    if (!key) return
    reviewCard(key, g)
    setReviewed((n) => n + 1)
    const updated = useApp.getState().cards[key]
    const rest = queue.slice(1)
    const soon = updated && (updated.state === State.Learning || updated.state === State.Relearning) && updated.due - Date.now() < 20 * 60_000
    setQueue(soon ? [...rest.slice(0, 4), key, ...rest.slice(4)] : rest)
  }

  // Keyboard shortcuts on desktop: space reveals, 1–4 rate
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.tagName === 'INPUT') return
      if (stage === 'front' && (e.key === ' ' || e.key === 'Enter')) {
        e.preventDefault()
        setStage('back')
      } else if (stage === 'back') {
        const g = GRADES.find((x) => x.key === e.key)
        if (g) rate(g.g)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  if (!key) {
    return (
      <div className="py-10 text-center">
        <p className="font-display text-4xl font-bold">Hepsi bu kadar</p>
        <p className="mt-2 text-muted">{reviewed ? `${reviewed} kart çalıştın. ` : ''}Şu an tekrar edilecek kart kalmadı.</p>
      </div>
    )
  }

  const pickArticle = (a: Article) => {
    setPicked(a)
    setStage('back')
    const de = word?.de ?? (item.custom?.kind === 'word' ? item.custom.de : '')
    void speak(`${nounArt} ${de}`)
  }

  const articleWrong = picked !== null && picked !== nounArt
  const rule = word?.art ? findRule(word.de) : undefined

  return (
    <div>
      <p className="mb-3 flex items-center gap-2 text-sm text-muted">
        {isNew && <span className="rounded-md bg-signal px-2 py-0.5 font-semibold text-signal-ink">Yeni</span>}
        <span className="tabular-nums">Kalan {queue.length}</span>
        {reviewed > 0 && <span className="ml-auto tabular-nums">{reviewed} kart bitti</span>}
      </p>

      <div className="min-h-44 rounded-2xl bg-surface p-5">
        {word && <WordFace word={word} stage={stage} picked={picked} />}
        {item.custom?.kind === 'word' && <CustomWordFace c={item.custom} stage={stage} />}
        {item.custom?.kind === 'fix' && <FixFace c={item.custom} stage={stage} />}

        {stage === 'back' && articleWrong && (
          <p className="mt-4 rounded-lg bg-bad-bg px-3 py-2 text-sm">
            Sen <strong className={articleColor(picked!)}>{picked}</strong> dedin, doğrusu{' '}
            <strong className={articleColor(nounArt)}>{nounArt}</strong>.
          </p>
        )}
        {stage === 'back' && picked && !articleWrong && (
          <p className="mt-4 text-sm font-semibold text-ok">Artikel doğru.</p>
        )}
        {stage === 'back' && rule && (
          <p className="mt-3 text-sm text-muted">
            Kural: <strong className={articleColor(rule.art)}>{rule.ending}</strong> ile bitenler {rule.how} <strong className={articleColor(rule.art)}>{rule.art}</strong>.
            {rule.exceptions && ` İstisna: ${rule.exceptions}.`}
          </p>
        )}
      </div>

      <div className="mt-4">
        {stage === 'article' && (
          <div>
            <p className="mb-2 text-sm text-muted">{isNew ? 'Yeni kelime. Artikelini tahmin et:' : 'Artikeli hangisi?'}</p>
            <div className="grid grid-cols-3 gap-2.5">
              {ARTS.map((a) => (
                <button key={a} onClick={() => pickArticle(a)} className={`min-h-14 rounded-xl border-2 bg-surface text-xl font-bold ${ART_BG[a]}`}>
                  {a}
                </button>
              ))}
            </div>
          </div>
        )}
        {stage === 'front' && (
          <Btn className="w-full" onClick={() => setStage('back')}>
            Cevabı göster
          </Btn>
        )}
        {stage === 'back' && intervals && (
          <div>
            <p className="mb-2 text-sm text-muted">{isNew ? 'Ne kadar tanıdık geldi?' : 'Ne kadar kolay hatırladın?'}</p>
            <div className="grid grid-cols-4 gap-2">
              {GRADES.map(({ g, label }) => {
                const disabled = articleWrong && g === Rating.Easy
                return (
                  <button
                    key={g}
                    disabled={disabled}
                    onClick={() => rate(g)}
                    className={`flex min-h-16 flex-col items-center justify-center rounded-xl border-2 px-1 disabled:opacity-30 ${
                      g === Rating.Good ? 'border-ink bg-signal text-signal-ink' : g === Rating.Again ? 'border-bad bg-surface text-bad' : 'border-line bg-surface'
                    }`}
                  >
                    <span className="font-semibold">{label}</span>
                    <span className="text-xs tabular-nums opacity-75">{intervals[g]}</span>
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function WordFace({ word, stage, picked }: { word: Word; stage: Stage; picked: Article | null }) {
  const sayText = word.art ? `${word.art} ${word.de}` : word.de
  if (stage === 'article') {
    return (
      <div className="flex items-start justify-between gap-3">
        <p className="font-display text-4xl font-bold leading-tight">{word.de}</p>
        <SpeakButton text={word.de} />
      </div>
    )
  }
  if (stage === 'front') {
    return (
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-display text-4xl font-bold leading-tight">{word.de}</p>
          {word.pos === 'v' && <p className="mt-1 text-muted">{word.forms}</p>}
        </div>
        <SpeakButton text={sayText} />
      </div>
    )
  }
  return (
    <div>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-display text-4xl font-bold leading-tight">
            {word.art ? <GermanWord art={word.art} word={word.de} /> : word.pos === 'pl' ? <span className="text-pl">die {word.de}</span> : word.de}
          </p>
          {word.art && word.forms !== '–' && <p className="mt-1 text-pl">Çoğul: die {word.forms}</p>}
          {word.pos === 'pl' && <p className="mt-1 text-sm text-muted">sadece çoğul kullanılır</p>}
          {(word.pos === 'v' || word.pos === 'adj') && word.forms !== '–' && <p className="mt-1 text-muted">{word.forms}</p>}
        </div>
        <SpeakButton text={sayText} />
      </div>
      <p className="mt-4 text-2xl font-semibold">{word.tr}</p>
      <div className="mt-4 border-t border-line pt-3">
        <div className="flex items-start gap-2">
          <p className="flex-1 text-[1.08rem]">{word.ex}</p>
          <SpeakButton text={word.ex} small label="Cümleyi dinle" />
        </div>
        <p className="mt-1 text-muted">{word.exTr}</p>
      </div>
      {picked === null && word.art && <span className="sr-only">{word.art}</span>}
    </div>
  )
}

function CustomWordFace({ c, stage }: { c: Extract<CustomCard, { kind: 'word' }>; stage: Stage }) {
  return (
    <div>
      <div className="flex items-start justify-between gap-3">
        <p className="font-display text-4xl font-bold leading-tight">
          {stage === 'back' && c.art ? <GermanWord art={c.art} word={c.de} /> : c.de}
        </p>
        <SpeakButton text={c.art ? `${c.art} ${c.de}` : c.de} />
      </div>
      <p className="mt-1 text-sm text-muted">Senin eklediğin kelime</p>
      {stage === 'back' && <p className="mt-4 text-2xl font-semibold">{c.tr}</p>}
    </div>
  )
}

function FixFace({ c, stage }: { c: Extract<CustomCard, { kind: 'fix' }>; stage: Stage }) {
  return (
    <div>
      <p className="text-sm text-muted">Hata defterinden: bu cümleyi kafanda düzelt</p>
      <p className="mt-2 text-xl text-bad line-through decoration-2">{c.wrong}</p>
      {stage === 'back' && (
        <>
          <div className="mt-4 flex items-start gap-2">
            <p className="flex-1 text-xl font-semibold text-ok">{c.right}</p>
            <SpeakButton text={c.right} small />
          </div>
          {c.note && <p className="mt-2 text-muted">{c.note}</p>}
        </>
      )}
    </div>
  )
}
