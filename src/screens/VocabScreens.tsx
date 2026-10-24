import { useEffect, useMemo, useState } from 'react'
import { WORDS } from '../content/vocab'
import type { Word } from '../content/types'
import { useApp } from '../lib/store'
import { buildVocabQueue } from '../lib/program'
import { useStudyTimer } from '../lib/useStudyTimer'
import type { SrsCard } from '../lib/srs'
import { VocabSession } from '../components/VocabSession'
import { Btn, GermanWord, Page, SpeakButton, TopBar } from '../components/ui'

export function unfilteredA2(cards: Record<string, SrsCard>, filterSeen: string[] = []): Word[] {
  return WORDS.filter((w) => w.week <= 3 && !cards[`w:${w.id}`] && !filterSeen.includes(w.id))
}

export function FreeVocab() {
  useStudyTimer('language')
  const queue = useMemo(() => buildVocabQueue(useApp.getState()), [])
  return (
    <>
      <TopBar title="Kelime tekrarı" />
      <Page className="pt-5">
        <VocabSession initial={queue} />
      </Page>
    </>
  )
}

export function QuickFilter() {
  useStudyTimer('language')
  return (
    <>
      <TopBar title="Hızlı eleme" />
      <Page className="pt-5">
        <QuickFilterPanel />
      </Page>
    </>
  )
}

/**
 * Known A2 words go straight to long intervals; unknown ones stay in the new-word queue
 * (they come first, because the queue is ordered by week).
 */
export function QuickFilterPanel() {
  const cards = useApp((s) => s.cards)
  const filterSeen = useApp((s) => s.filterSeen)
  const markKnown = useApp((s) => s.markKnown)
  const markFilterSeen = useApp((s) => s.markFilterSeen)
  const [reveal, setReveal] = useState(false)
  const [counts, setCounts] = useState({ known: 0, unknown: 0 })
  const list = unfilteredA2(cards, filterSeen)
  const w = list[0]

  useEffect(() => setReveal(false), [w?.id])

  if (!w) {
    return (
      <div className="py-8">
        <p className="font-display text-3xl font-bold">Eleme bitti</p>
        <p className="mt-2 text-muted">
          {counts.known} kelimeyi biliyordun. {counts.unknown} kelime yeni kelime sırasına girdi; her gün kelime bloğunda gelecek.
        </p>
      </div>
    )
  }

  const answer = (known: boolean) => {
    if (known) markKnown(`w:${w.id}`)
    else markFilterSeen(w.id)
    setCounts((c) => ({ known: c.known + (known ? 1 : 0), unknown: c.unknown + (known ? 0 : 1) }))
  }

  return (
    <div>
      <p className="text-sm text-muted">
        Kelimeyi gör, anlamını biliyorsan "Biliyorum" de. Emin değilsen "Bilmiyorum": öğrenme sırasına girer. Kalan {list.length}
      </p>
      <div className="mt-4 rounded-2xl bg-surface p-5">
        <div className="flex items-start justify-between gap-3">
          <p className="font-display text-4xl font-bold leading-tight">
            <GermanWord art={w.art} word={w.de} />
          </p>
          <SpeakButton text={w.art ? `${w.art} ${w.de}` : w.de} />
        </div>
        {reveal ? (
          <p className="mt-3 text-xl font-semibold">{w.tr}</p>
        ) : (
          <button onClick={() => setReveal(true)} className="mt-3 text-sm text-muted underline underline-offset-4">
            Anlamını göster
          </button>
        )}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2.5">
        <Btn variant="secondary" onClick={() => answer(false)}>
          Bilmiyorum
        </Btn>
        <Btn onClick={() => answer(true)}>Biliyorum</Btn>
      </div>
      <p className="mt-3 text-center text-sm tabular-nums text-muted">
        Bu turda {counts.known} biliyorum, {counts.unknown} bilmiyorum
      </p>
    </div>
  )
}
