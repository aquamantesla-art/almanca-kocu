import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { READINGS, READING_BY_ID } from '../content/readings'
import { useApp } from '../lib/store'
import { speak, stopSpeaking } from '../lib/platform'
import { useStudyTimer } from '../lib/useStudyTimer'
import { ExerciseRunner } from '../components/ExerciseRunner'
import { TapText } from '../components/TapText'
import { Btn, Icon, Page, TopBar } from '../components/ui'

export function ReadingList() {
  const done = useApp((s) => s.readingsDone)
  const weeks = [...new Set(READINGS.map((r) => r.week))]
  return (
    <>
      <TopBar title="Okuma metinleri" />
      <Page className="pt-4">
        <p className="mb-5 text-muted">Her hafta iki metin, o haftanın konusu ve gramerine uygun. Bilmediğin kelimeye dokun.</p>
        {weeks.map((w) => (
          <section key={w} className="mb-5">
            <h2 className="mb-1.5 text-sm font-semibold text-muted">{w}. hafta</h2>
            <ul className="divide-y divide-line overflow-hidden rounded-2xl bg-surface">
              {READINGS.filter((r) => r.week === w).map((r) => (
                <li key={r.id}>
                  <Link to={`/okuma/${r.id}`} className="flex items-center gap-3 px-4 py-3 active:bg-sunken">
                    <span className="flex-1 font-semibold">{r.title}</span>
                    <span className="text-sm text-muted">{r.level}</span>
                    {done[r.id] !== undefined && (
                      <span className="flex items-center gap-1 text-sm font-semibold text-ok">
                        <Icon name="check" size={16} />
                        {done[r.id]}/{r.questions.length}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </Page>
    </>
  )
}

export function ReadingScreen() {
  const { id } = useParams()
  const reading = id ? READING_BY_ID[id] : undefined
  const saveReading = useApp((s) => s.saveReading)
  const [playing, setPlaying] = useState(false)
  const [quiz, setQuiz] = useState(false)
  const [rate, setRate] = useState(0.9)
  useStudyTimer('input')
  useEffect(() => () => stopSpeaking(), [])
  if (!reading) return <Navigate to="/okuma" replace />

  const play = async () => {
    if (playing) {
      stopSpeaking()
      setPlaying(false)
      return
    }
    setPlaying(true)
    await speak(reading.text, rate)
    setPlaying(false)
  }

  return (
    <>
      <TopBar title={reading.title} />
      <Page className="pt-4">
        <div className="flex flex-wrap items-center gap-2">
          <Btn variant="quiet" onClick={() => void play()}>
            <Icon name={playing ? 'stop' : 'speaker'} /> {playing ? 'Durdur' : 'Sesli dinle'}
          </Btn>
          <div className="flex rounded-xl bg-sunken p-1" role="group" aria-label="Okuma hızı">
            {[0.75, 0.9, 1].map((r) => (
              <button key={r} onClick={() => setRate(r)} aria-pressed={rate === r} className={`min-h-10 rounded-lg px-3 text-sm font-semibold ${rate === r ? 'bg-surface' : 'text-muted'}`}>
                {r === 0.75 ? 'Yavaş' : r === 0.9 ? 'Orta' : 'Normal'}
              </button>
            ))}
          </div>
        </div>
        <article lang="de" className="mt-5 rounded-2xl bg-surface p-5 text-[1.12rem] leading-relaxed">
          <TapText text={reading.text} glossary={reading.glossary} />
        </article>

        <section className="mt-8">
          <h2 className="font-display text-xl font-bold">Anladın mı?</h2>
          {quiz ? (
            <div className="mt-4">
              <ExerciseRunner
                items={reading.questions}
                showTopic={false}
                onDone={(r) => {
                  saveReading(reading.id, r.correct)
                  setQuiz(false)
                }}
                doneLabel="Metne dön"
              />
            </div>
          ) : (
            <Btn variant="secondary" className="mt-3 w-full" onClick={() => setQuiz(true)}>
              {reading.questions.length} soruyu çöz
            </Btn>
          )}
        </section>
      </Page>
    </>
  )
}
