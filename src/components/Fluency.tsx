import { useEffect, useRef, useState } from 'react'
import type { Reading, SpeakingTopic } from '../content/types'
import { formatClock } from '../lib/date'
import { recordingSupported, speak, startRecording, stopSpeaking, type Recording } from '../lib/platform'
import { Btn, Icon } from './ui'
import { TapText } from './TapText'

interface Take {
  label: string
  url: string
}

/** One countdown round, optionally recorded */
function useCountdown(seconds: number, running: boolean, onEnd: () => void) {
  const [left, setLeft] = useState(seconds)
  const end = useRef(onEnd)
  end.current = onEnd
  useEffect(() => setLeft(seconds), [seconds])
  useEffect(() => {
    if (!running) return
    const iv = window.setInterval(() => {
      setLeft((l) => {
        if (l <= 1) {
          window.clearInterval(iv)
          end.current()
          return 0
        }
        return l - 1
      })
    }, 1000)
    return () => window.clearInterval(iv)
  }, [running])
  return left
}

/**
 * Shrinking-time speaking (4/3/2 by default): the same topic three times, each round shorter.
 * Rounds are recorded so the learner can hear the difference.
 */
export function ShrinkingTalk({ rounds, prompt, onFinished }: { rounds: number[]; prompt: string; onFinished?: () => void }) {
  const [round, setRound] = useState(-1)
  const [running, setRunning] = useState(false)
  const [takes, setTakes] = useState<Take[]>([])
  const [record, setRecord] = useState(recordingSupported())
  const [micError, setMicError] = useState('')
  const rec = useRef<Recording | null>(null)
  const roundRef = useRef(round)
  roundRef.current = round

  const finishRound = async () => {
    setRunning(false)
    const r = roundRef.current
    if (rec.current) {
      const url = await rec.current.stop()
      rec.current = null
      setTakes((t) => [...t, { label: `${rounds[r] / 60} dakikalık tur`, url }])
    }
    if (r + 1 >= rounds.length) {
      setRound(rounds.length)
      onFinished?.()
    } else {
      setRound(r + 1)
    }
  }

  const left = useCountdown(round >= 0 && round < rounds.length ? rounds[round] : 0, running, () => void finishRound())

  const start = async () => {
    const r = round < 0 ? 0 : round
    setRound(r)
    setMicError('')
    if (record) {
      try {
        rec.current = await startRecording()
      } catch {
        setMicError('Mikrofona erişilemedi. Kayıtsız devam ediyorsun.')
        setRecord(false)
      }
    }
    setRunning(true)
  }

  useEffect(() => () => rec.current?.cancel(), [])

  const done = round >= rounds.length
  const current = round < 0 ? 0 : Math.min(round, rounds.length - 1)

  return (
    <div>
      <ol className="flex gap-2" aria-label="Turlar">
        {rounds.map((sec, i) => (
          <li
            key={i}
            className={`flex-1 rounded-xl border-2 py-2 text-center font-display text-xl font-bold tabular-nums ${
              i < (done ? rounds.length : round) ? 'border-ink bg-ink text-paper' : i === current && !done ? 'border-ink' : 'border-line text-muted'
            }`}
          >
            {sec / 60} dk
          </li>
        ))}
      </ol>

      {!done && (
        <div className="mt-6 text-center">
          <p className="font-display text-6xl font-bold tabular-nums">{formatClock(running ? left : rounds[current])}</p>
          <p className="mt-2 text-muted">
            {running ? (record ? 'Kaydediliyor. Durmadan konuş, takılırsan başka kelimeyle anlat.' : 'Durmadan konuş.') : round < 0 ? prompt : 'Aynı konuyu bu kez daha kısa sürede anlat.'}
          </p>
          {micError && <p className="mt-2 text-sm text-bad">{micError}</p>}
          {!running ? (
            <Btn className="mt-5 w-full" onClick={() => void start()}>
              <Icon name={record ? 'mic' : 'play'} /> {round < 0 ? `${rounds[0] / 60} dakikayı başlat` : `${rounds[current] / 60} dakikayı başlat`}
            </Btn>
          ) : (
            <Btn variant="secondary" className="mt-5 w-full" onClick={() => void finishRound()}>
              <Icon name="stop" /> Turu bitir
            </Btn>
          )}
          {round < 0 && recordingSupported() && (
            <label className="mt-4 flex items-center justify-center gap-2 text-sm">
              <input type="checkbox" checked={record} onChange={(e) => setRecord(e.target.checked)} className="h-5 w-5 accent-current" />
              Sesimi kaydet (sadece bu cihazda kalır)
            </label>
          )}
        </div>
      )}

      {done && <p className="mt-6 font-semibold">Üç tur bitti. Son turda ilkinden daha az duraksadın mı? Kayıtları dinle.</p>}

      {takes.length > 0 && (
        <div className="mt-6 space-y-3">
          {takes.map((t, i) => (
            <div key={i}>
              <p className="mb-1 text-sm text-muted">{t.label}</p>
              <audio controls src={t.url} className="w-full" />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export function Talk432({ topic, onFinished }: { topic: SpeakingTopic; onFinished?: () => void }) {
  return (
    <div>
      <p className="text-sm text-muted">4/3/2 konuşma</p>
      <h2 className="font-display text-3xl font-bold leading-tight">{topic.title}</h2>
      <p className="text-muted">{topic.titleTr}</p>
      <ul className="mt-4 space-y-1.5">
        {topic.hints.map((h, i) => (
          <li key={i} className="flex gap-2">
            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink" />
            <span>{h}</span>
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <ShrinkingTalk rounds={[240, 180, 120]} prompt="Konuyu 4 dakika anlat, sonra 3, sonra 2 dakikada tekrarla." onFinished={onFinished} />
      </div>
    </div>
  )
}

const READ_PASSES = [
  { label: 'Yavaş ve dikkatli', rate: 0.8 },
  { label: 'Normal hızda', rate: 1 },
  { label: 'Biraz daha hızlı', rate: 1.15 },
]

/** Repeated Reading with Retelling: listen, read aloud three times faster, then retell without the text */
export function RRR({ reading, onFinished }: { reading: Reading; onFinished?: () => void }) {
  const [pass, setPass] = useState(0)
  const [retell, setRetell] = useState(false)
  const [playing, setPlaying] = useState(false)

  useEffect(() => () => stopSpeaking(), [])

  const listen = async (rate: number) => {
    setPlaying(true)
    await speak(reading.text, rate)
    setPlaying(false)
  }

  if (retell) {
    return (
      <div>
        <p className="text-sm text-muted">Tekrarlı okuma: anlatma</p>
        <h2 className="font-display text-3xl font-bold leading-tight">{reading.title}</h2>
        <p className="mt-2">Metni kapattın. Şimdi kendi cümlelerinle anlat: 3, sonra 2, sonra 1 dakika.</p>
        <div className="mt-6">
          <ShrinkingTalk rounds={[180, 120, 60]} prompt="Metinde ne oluyordu? Kim, ne, neden?" onFinished={onFinished} />
        </div>
        <Btn variant="ghost" className="mt-4" onClick={() => setRetell(false)}>
          Metne geri dön
        </Btn>
      </div>
    )
  }

  return (
    <div>
      <p className="text-sm text-muted">Tekrarlı okuma (RRR)</p>
      <h2 className="font-display text-3xl font-bold leading-tight">{reading.title}</h2>
      <p className="mt-2 text-muted">Önce bir kez dinle. Sonra metni üç kez sesli oku, her seferinde biraz daha hızlı. En sonda metni kapatıp anlat.</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Btn variant="quiet" onClick={() => (playing ? (stopSpeaking(), setPlaying(false)) : void listen(0.9))}>
          <Icon name={playing ? 'stop' : 'speaker'} /> {playing ? 'Durdur' : 'Metni dinle'}
        </Btn>
      </div>
      <div className="mt-5 rounded-2xl bg-surface p-4 text-[1.1rem] leading-relaxed">
        <TapText text={reading.text} glossary={reading.glossary} />
      </div>
      <ol className="mt-5 space-y-2">
        {READ_PASSES.map((p, i) => (
          <li key={i}>
            <button
              disabled={i > pass}
              onClick={() => setPass(Math.max(pass, i + 1))}
              className={`flex w-full items-center gap-3 rounded-xl border-2 px-4 py-3 text-left disabled:opacity-40 ${i < pass ? 'border-ink bg-ink text-paper' : 'border-line bg-surface'}`}
            >
              <span className="font-display text-xl font-bold">{i + 1}.</span>
              <span className="flex-1">Sesli oku: {p.label}</span>
              {i < pass && <Icon name="check" />}
            </button>
          </li>
        ))}
      </ol>
      <Btn className="mt-5 w-full" disabled={pass < 3} onClick={() => setRetell(true)}>
        Metni kapat ve anlat
      </Btn>
    </div>
  )
}
