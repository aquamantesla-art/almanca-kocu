import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import type { Exercise } from '../content/types'
import { TOPIC_BY_ID } from '../content/grammar'
import { checkAnswer, shuffle, type Check } from '../lib/answer'
import { Btn, Icon, Progress, UmlautBar } from './ui'
import { inline } from './Rich'

export interface RunnerResult {
  correct: number
  total: number
  byTopic: Record<string, { correct: number; total: number }>
}

interface Props {
  items: Exercise[]
  onAnswer?: (ex: Exercise, correct: boolean) => void
  onDone: (r: RunnerResult) => void
  doneLabel?: string
  /** Show the topic name after answering (interleaved practice hides it before) */
  showTopic?: boolean
}

function Prompt({ q, children }: { q: string; children?: (gapIndex: number) => ReactNode }) {
  const parts = q.split('___')
  return (
    <p className="text-[1.25rem] leading-relaxed">
      {parts.map((p, i) => (
        <span key={i}>
          {inline(p)}
          {i < parts.length - 1 &&
            (children ? (
              children(i)
            ) : (
              <span className="mx-1 inline-block min-w-14 border-b-2 border-ink align-baseline">&nbsp;</span>
            ))}
        </span>
      ))}
    </p>
  )
}

export function ExerciseRunner({ items, onAnswer, onDone, doneLabel = 'Bitti', showTopic = true }: Props) {
  const [idx, setIdx] = useState(0)
  const [answered, setAnswered] = useState<null | { ok: boolean; note?: string }>(null)
  const [result, setResult] = useState<RunnerResult>({ correct: 0, total: 0, byTopic: {} })
  const [finished, setFinished] = useState(false)
  const ex = items[idx]

  const record = (ok: boolean, note?: string) => {
    setAnswered({ ok, note })
    onAnswer?.(ex, ok)
    setResult((r) => {
      const t = r.byTopic[ex.topic] ?? { correct: 0, total: 0 }
      return {
        correct: r.correct + (ok ? 1 : 0),
        total: r.total + 1,
        byTopic: { ...r.byTopic, [ex.topic]: { correct: t.correct + (ok ? 1 : 0), total: t.total + 1 } },
      }
    })
  }

  const next = () => {
    setAnswered(null)
    if (idx + 1 >= items.length) setFinished(true)
    else setIdx(idx + 1)
  }

  if (!items.length) return <p className="text-muted">Bu bölüm için alıştırma yok.</p>

  if (finished) {
    const pct = Math.round((result.correct / Math.max(1, result.total)) * 100)
    return (
      <div className="py-6">
        <p className="font-display text-5xl font-bold">
          {result.correct}/{result.total}
        </p>
        <p className="mt-1 text-muted">
          {pct >= 85 ? 'Çok iyi. Yanlışların tekrar listesine eklendi.' : pct >= 60 ? 'İyi gidiyor. Yanlış yaptıkların birkaç gün içinde tekrar gelecek.' : 'Zorlandığın sorular tekrar listesine eklendi; birkaç gün içinde yeniden karşına çıkacak.'}
        </p>
        <Btn className="mt-6 w-full" onClick={() => onDone(result)}>
          {doneLabel}
        </Btn>
      </div>
    )
  }

  const topic = TOPIC_BY_ID[ex.topic]

  return (
    <div>
      <div className="mb-5 flex items-center gap-3">
        <Progress value={idx + (answered ? 1 : 0)} max={items.length} className="flex-1" />
        <span className="text-sm tabular-nums text-muted">
          {idx + 1}/{items.length}
        </span>
      </div>
      {ex.kind === 'mc' && <MultipleChoice key={ex.id} ex={ex} answered={answered} onAnswer={(ok) => record(ok)} />}
      {ex.kind === 'ty' && <TypeIn key={ex.id} ex={ex} answered={answered} onAnswer={record} />}
      {ex.kind === 'or' && <Order key={ex.id} ex={ex} answered={answered} onAnswer={(ok) => record(ok)} />}
      {answered && (
        <div className={`mt-5 rounded-xl p-4 ${answered.ok ? 'bg-ok-bg' : 'bg-bad-bg'}`} role="status">
          <p className={`flex items-center gap-2 font-semibold ${answered.ok ? 'text-ok' : 'text-bad'}`}>
            <Icon name={answered.ok ? 'check' : 'close'} size={20} />
            {answered.ok ? 'Doğru' : 'Yanlış'}
            {showTopic && topic && <span className="ml-auto text-sm font-medium text-muted">{topic.titleTr}</span>}
          </p>
          {answered.note && <p className="mt-1 text-sm">{answered.note}</p>}
          <p className="mt-2">{inline(ex.explain)}</p>
          <Btn className="mt-4 w-full" onClick={next} autoFocus>
            {idx + 1 >= items.length ? 'Sonucu gör' : 'Devam'}
          </Btn>
        </div>
      )}
    </div>
  )
}

function MultipleChoice({ ex, answered, onAnswer }: { ex: Exercise; answered: { ok: boolean } | null; onAnswer: (ok: boolean) => void }) {
  const order = useMemo(() => shuffle(ex.options!.map((_, i) => i)), [ex])
  const [picked, setPicked] = useState<number | null>(null)
  return (
    <div>
      <Prompt q={ex.q} />
      <div className="mt-5 grid gap-2.5">
        {order.map((i) => {
          const isCorrect = i === ex.correct
          const state = answered ? (isCorrect ? 'ok' : picked === i ? 'bad' : 'idle') : 'idle'
          return (
            <button
              key={i}
              disabled={!!answered}
              onClick={() => {
                setPicked(i)
                onAnswer(isCorrect)
              }}
              className={`min-h-13 rounded-xl border-2 px-4 py-3 text-left text-[1.08rem] transition ${
                state === 'ok'
                  ? 'border-ok bg-ok-bg font-semibold'
                  : state === 'bad'
                    ? 'border-bad bg-bad-bg'
                    : 'border-line bg-surface active:border-ink'
              } ${answered && state === 'idle' ? 'opacity-50' : ''}`}
            >
              {inline(ex.options![i])}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function TypeIn({ ex, answered, onAnswer }: { ex: Exercise; answered: { ok: boolean } | null; onAnswer: (ok: boolean, note?: string) => void }) {
  const gaps = ex.answers!.length
  const [vals, setVals] = useState<string[]>(() => Array(gaps).fill(''))
  const [checks, setChecks] = useState<Check[] | null>(null)
  const refs = useRef<(HTMLInputElement | null)[]>([])
  const lastFocus = useRef(0)

  useEffect(() => {
    refs.current[0]?.focus()
  }, [])

  const submit = () => {
    if (answered) return
    const c = vals.map((v, i) => checkAnswer(v, ex.answers![i]))
    setChecks(c)
    const ok = c.every((x) => x.ok)
    onAnswer(ok, c.map((x) => x.note).filter(Boolean).join(' '))
  }

  const insert = (ch: string) => {
    const i = lastFocus.current
    const el = refs.current[i]
    if (!el || answered) return
    const start = el.selectionStart ?? vals[i].length
    const end = el.selectionEnd ?? start
    const v = vals[i].slice(0, start) + ch + vals[i].slice(end)
    setVals(vals.map((x, j) => (j === i ? v : x)))
    requestAnimationFrame(() => {
      el.focus()
      el.setSelectionRange(start + 1, start + 1)
    })
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        submit()
      }}
    >
      <Prompt q={ex.q}>
        {(i) => {
          const longest = Math.max(...ex.answers![i].map((a) => a.length))
          const c = checks?.[i]
          return (
            <input
              ref={(el) => {
                refs.current[i] = el
              }}
              value={vals[i]}
              disabled={!!answered}
              onFocus={() => (lastFocus.current = i)}
              onChange={(e) => setVals(vals.map((x, j) => (j === i ? e.target.value : x)))}
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              aria-label={`Boşluk ${i + 1}`}
              style={{ width: `${Math.max(4, longest + 2)}ch` }}
              className={`mx-1 rounded-t-md border-b-2 bg-sunken px-1.5 py-0.5 text-center font-semibold outline-none ${
                c ? (c.ok ? 'border-ok text-ok' : 'border-bad text-bad') : 'border-ink'
              }`}
            />
          )
        }}
      </Prompt>
      {checks && checks.some((c) => !c.ok) && (
        <p className="mt-3">
          Doğrusu: <strong>{ex.answers!.map((a) => a[0]).join(' … ')}</strong>
        </p>
      )}
      {!answered && (
        <div className="mt-5 space-y-4">
          <UmlautBar onInsert={insert} />
          <Btn type="submit" className="w-full" disabled={vals.some((v) => !v.trim())}>
            Kontrol et
          </Btn>
        </div>
      )}
    </form>
  )
}

function Order({ ex, answered, onAnswer }: { ex: Exercise; answered: { ok: boolean } | null; onAnswer: (ok: boolean) => void }) {
  const [pool, setPool] = useState(() => {
    let s = shuffle(ex.tokens!.map((t, i) => ({ t, i })))
    // avoid presenting the tokens already in the correct order
    if (s.every((x, k) => x.i === k) && s.length > 1) s = [...s.slice(1), s[0]]
    return s
  })
  const [built, setBuilt] = useState<{ t: string; i: number }[]>([])
  const sentence = built.map((b) => b.t).join(' ')

  const check = () => onAnswer(ex.answers![0].some((a) => a === sentence))

  return (
    <div>
      <p className="mb-2 text-sm text-muted">Kelimeleri doğru sıraya diz.</p>
      <Prompt q={ex.q}>
        {() => (
          <span className="mx-1 inline-flex min-h-10 min-w-24 flex-wrap items-center gap-1.5 border-b-2 border-ink px-1 py-1 align-middle">
            {built.map((b, k) => (
              <button
                key={b.i}
                disabled={!!answered}
                onClick={() => {
                  setBuilt(built.filter((_, j) => j !== k))
                  setPool([...pool, b])
                }}
                className="rounded-lg bg-ink px-2.5 py-1 text-base font-semibold text-paper"
              >
                {b.t}
              </button>
            ))}
          </span>
        )}
      </Prompt>
      {!answered && (
        <>
          <div className="mt-5 flex flex-wrap gap-2">
            {pool.map((p, k) => (
              <button
                key={p.i}
                onClick={() => {
                  setPool(pool.filter((_, j) => j !== k))
                  setBuilt([...built, p])
                }}
                className="rounded-lg border-2 border-line bg-surface px-3 py-2 text-[1.05rem] font-medium active:border-ink"
              >
                {p.t}
              </button>
            ))}
          </div>
          <Btn className="mt-5 w-full" disabled={pool.length > 0} onClick={check}>
            Kontrol et
          </Btn>
        </>
      )}
      {answered && !answered.ok && (
        <p className="mt-3">
          Doğrusu: <strong>{ex.answers![0][0]}</strong>
        </p>
      )}
    </div>
  )
}
