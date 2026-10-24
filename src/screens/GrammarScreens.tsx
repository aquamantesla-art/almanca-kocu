import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { TOPICS, TOPIC_BY_ID, WEEK_TOPICS } from '../content/grammar'
import type { Exercise } from '../content/types'
import { useApp } from '../lib/store'
import { topicAccuracy } from '../lib/program'
import { shuffle } from '../lib/answer'
import { useStudyTimer } from '../lib/useStudyTimer'
import { ExerciseRunner } from '../components/ExerciseRunner'
import { Rich } from '../components/Rich'
import { Btn, Icon, Page, TopBar } from '../components/ui'

function weekLabel(id: string): string {
  const w = Object.entries(WEEK_TOPICS).find(([, ids]) => ids.includes(id))
  return w ? `${w[0]}. hafta` : '1–3. hafta'
}

export function GrammarList() {
  const s = useApp()
  return (
    <>
      <TopBar title="Gramer konuları" />
      <Page className="pt-4">
        {(['A2', 'B1'] as const).map((lvl) => (
          <section key={lvl} className="mb-7">
            <h2 className="font-display mb-2 text-xl font-bold text-muted">{lvl === 'A2' ? 'A2 tamiri' : 'B1'}</h2>
            <ul className="divide-y divide-line overflow-hidden rounded-2xl bg-surface">
              {TOPICS.filter((t) => t.level === lvl).map((t) => {
                const acc = topicAccuracy(s, t.id)
                return (
                  <li key={t.id}>
                    <Link to={`/gramer/${t.id}`} className="flex items-center gap-3 px-4 py-3 active:bg-sunken">
                      <span className="min-w-0 flex-1">
                        <span className="block font-semibold">{t.titleTr}</span>
                        <span className="block truncate text-sm text-muted">
                          {t.title}, {weekLabel(t.id)}
                        </span>
                      </span>
                      <span className={`shrink-0 text-sm font-semibold tabular-nums ${acc === null ? 'text-muted' : acc >= 0.8 ? 'text-ok' : acc < 0.6 ? 'text-bad' : ''}`}>
                        {acc === null ? '–' : `%${Math.round(acc * 100)}`}
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </section>
        ))}
      </Page>
    </>
  )
}

export function GrammarTopicScreen() {
  const { id } = useParams()
  const topic = id ? TOPIC_BY_ID[id] : undefined
  const recordGrammar = useApp((s) => s.recordGrammar)
  const markLessonSeen = useApp((s) => s.markLessonSeen)
  const [items, setItems] = useState<Exercise[] | null>(null)
  const [round, setRound] = useState(0)
  useStudyTimer('language')
  if (!topic) return <Navigate to="/gramer" replace />

  return (
    <>
      <TopBar title={topic.titleTr} />
      <Page className="pt-4">
        {!items ? (
          <>
            <p className="text-muted">{topic.title}</p>
            <Rich text={topic.lesson} className="mt-2" />
            <Btn
              className="mt-6 w-full"
              onClick={() => {
                markLessonSeen(topic.id)
                setItems(shuffle(topic.exercises))
                setRound(round + 1)
              }}
            >
              Bu konudan {topic.exercises.length} alıştırma çöz
            </Btn>
          </>
        ) : (
          <>
            <ExerciseRunner key={round} items={items} onAnswer={(ex, ok) => recordGrammar(ex.topic, ex.id, ok)} onDone={() => setItems(null)} doneLabel="Konuya dön" showTopic={false} />
            <Btn variant="ghost" className="mt-6" onClick={() => setItems(null)}>
              <Icon name="book" /> Anlatıma dön
            </Btn>
          </>
        )}
      </Page>
    </>
  )
}
