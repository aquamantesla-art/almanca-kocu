import { useState } from 'react'
import { LOOKUP } from '../content/vocab'
import { ponsUrl } from '../content/resources'
import type { Word } from '../content/types'
import { useApp } from '../lib/store'
import { openLink } from '../lib/platform'
import { Rating } from '../lib/srs'
import { Btn, GermanWord, Icon, SpeakButton } from './ui'

interface Hit {
  token: string
  gloss?: { key: string; tr: string }
  word?: Word
}

const ENDINGS = ['en', 'em', 'er', 'es', 'e', 'n', 's', 'st', 't']

function lookup(token: string, glossary: Record<string, string>): Hit {
  const t = token.toLowerCase()
  if (glossary[t]) return { token, gloss: { key: t, tr: glossary[t] } }
  const w = LOOKUP.get(t)
  if (w) return { token, word: w }
  for (const e of ENDINGS) {
    if (t.length > e.length + 2 && t.endsWith(e)) {
      const base = t.slice(0, -e.length)
      if (glossary[base]) return { token, gloss: { key: base, tr: glossary[base] } }
      const wb = LOOKUP.get(base)
      if (wb) return { token, word: wb }
    }
  }
  const phrase = Object.keys(glossary).find((k) => k.includes(' ') && k.split(' ').includes(t))
  if (phrase) return { token, gloss: { key: phrase, tr: glossary[phrase] } }
  return { token }
}

/** Reading text where every word can be tapped for its meaning */
export function TapText({ text, glossary = {} }: { text: string; glossary?: Record<string, string> }) {
  const [hit, setHit] = useState<Hit | null>(null)
  const paragraphs = text.split(/\n\s*\n/)
  return (
    <>
      {paragraphs.map((p, pi) => (
        <p key={pi} className={pi > 0 ? 'mt-3' : ''}>
          {p.split(/([\p{L}][\p{L}-]*)/u).map((part, i) =>
            /^\p{L}/u.test(part) ? (
              <span
                key={i}
                role="button"
                tabIndex={0}
                onClick={() => setHit(lookup(part, glossary))}
                onKeyDown={(e) => e.key === 'Enter' && setHit(lookup(part, glossary))}
                className={`cursor-pointer rounded-sm hover:bg-sunken ${hit?.token === part ? 'bg-signal/50' : ''}`}
              >
                {part}
              </span>
            ) : (
              <span key={i}>{part}</span>
            ),
          )}
        </p>
      ))}
      {hit && <WordSheet hit={hit} onClose={() => setHit(null)} />}
    </>
  )
}

function WordSheet({ hit, onClose }: { hit: Hit; onClose: () => void }) {
  const cards = useApp((s) => s.cards)
  const reviewCard = useApp((s) => s.reviewCard)
  const addCustom = useApp((s) => s.addCustom)
  const [tr, setTr] = useState('')
  const [added, setAdded] = useState(false)
  const key = hit.word ? `w:${hit.word.id}` : null
  const inDeck = key ? !!cards[key] : false

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/30" onClick={onClose}>
      <div
        role="dialog"
        aria-label={`Kelime: ${hit.token}`}
        className="pb-safe mx-auto w-full max-w-xl rounded-t-3xl bg-surface p-5 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm text-muted">{hit.token}</p>
            <p className="font-display text-3xl font-bold">
              {hit.word ? <GermanWord art={hit.word.art} word={hit.word.de} /> : hit.gloss?.key ?? hit.token}
            </p>
            {hit.word && hit.word.forms !== '–' && <p className="text-muted">{hit.word.art ? `die ${hit.word.forms}` : hit.word.forms}</p>}
          </div>
          <div className="flex gap-2">
            <SpeakButton text={hit.word ? (hit.word.art ? `${hit.word.art} ${hit.word.de}` : hit.word.de) : hit.token} />
            <button aria-label="Kapat" onClick={onClose} className="flex h-11 w-11 items-center justify-center rounded-full bg-sunken">
              <Icon name="close" />
            </button>
          </div>
        </div>

        {(hit.gloss || hit.word) && <p className="mt-3 text-2xl font-semibold">{hit.gloss?.tr ?? hit.word?.tr}</p>}
        {hit.word && <p className="mt-2 text-muted">{hit.word.ex}</p>}

        <div className="mt-5 flex flex-col gap-2.5">
          {hit.word &&
            (inDeck || added ? (
              <p className="text-sm font-semibold text-ok">Bu kelime tekrar kartlarında.</p>
            ) : (
              <Btn
                onClick={() => {
                  reviewCard(key!, Rating.Again)
                  setAdded(true)
                }}
              >
                <Icon name="plus" /> Tekrar kartlarıma ekle
              </Btn>
            ))}
          {!hit.word &&
            (added ? (
              <p className="text-sm font-semibold text-ok">Kartlarına eklendi.</p>
            ) : (
              <form
                className="flex gap-2"
                onSubmit={(e) => {
                  e.preventDefault()
                  if (!hit.gloss && !tr.trim()) return
                  addCustom({ id: `u${Date.now()}`, kind: 'word', de: hit.gloss?.key ?? hit.token, tr: hit.gloss?.tr ?? tr.trim(), created: Date.now() })
                  setAdded(true)
                }}
              >
                {hit.gloss ? (
                  <Btn type="submit" className="flex-1">
                    <Icon name="plus" /> Kartlarıma ekle
                  </Btn>
                ) : (
                  <>
                    <input
                      value={tr}
                      onChange={(e) => setTr(e.target.value)}
                      placeholder="Türkçe anlamı"
                      className="min-h-12 min-w-0 flex-1 rounded-xl border-2 border-line bg-paper px-3"
                    />
                    <Btn type="submit" disabled={!tr.trim()}>
                      Ekle
                    </Btn>
                  </>
                )}
              </form>
            ))}
          <Btn variant="quiet" onClick={() => openLink(ponsUrl(hit.word?.de ?? hit.token))}>
            <Icon name="external" /> PONS sözlükte bak
          </Btn>
        </div>
      </div>
    </div>
  )
}
