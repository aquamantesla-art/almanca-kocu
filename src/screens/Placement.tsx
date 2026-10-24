import { useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { PLACEMENT } from '../content/placement'
import { A2_ORDER, TOPIC_BY_ID } from '../content/grammar'
import { useApp } from '../lib/store'
import { shuffle } from '../lib/answer'
import { useStudyTimer } from '../lib/useStudyTimer'
import { ExerciseRunner, type RunnerResult } from '../components/ExerciseRunner'
import { Btn, Page, TopBar } from '../components/ui'

const LABEL = ['Zayıf', 'Zayıf', 'Orta', 'İyi']

export function Placement() {
  const nav = useNavigate()
  const [params] = useSearchParams()
  const back = params.get('geri')
  const onboarded = useApp((s) => s.onboarded)
  const setPlacement = useApp((s) => s.setPlacement)
  const finishOnboarding = useApp((s) => s.finishOnboarding)
  const items = useMemo(() => shuffle(PLACEMENT), [])
  const [scores, setScores] = useState<Record<string, number> | null>(null)
  useStudyTimer('language', back === 'gramer' ? 'gramer' : undefined)

  const done = (r: RunnerResult) => {
    const sc: Record<string, number> = {}
    for (const id of A2_ORDER) sc[id] = r.byTopic[id]?.correct ?? 0
    setPlacement(sc)
    setScores(sc)
  }

  const go = () => {
    if (!onboarded) finishOnboarding()
    nav(back === 'gramer' ? '/blok/gramer' : '/', { replace: true })
  }

  return (
    <>
      <TopBar title="Seviye testi" back={back === 'gramer' ? '/blok/gramer' : onboarded ? true : false} />
      <Page className="pt-5">
        {!scores ? (
          <ExerciseRunner items={items} onDone={done} doneLabel="Sonuçları gör" showTopic={false} />
        ) : (
          <div>
            <h2 className="font-display text-3xl font-bold">Sonuç</h2>
            <p className="mt-2 text-muted">İlk 3 hafta zayıf konularından başlayacak. "İyi" konular sadece karışık tekrarlarda gelecek.</p>
            <ul className="mt-5 divide-y divide-line rounded-2xl bg-surface">
              {[...A2_ORDER]
                .sort((a, b) => scores[a] - scores[b])
                .map((id) => (
                  <li key={id} className="flex items-center gap-3 px-4 py-3">
                    <span className="flex-1">{TOPIC_BY_ID[id].titleTr}</span>
                    <span className="flex gap-1" aria-label={`${scores[id]} / 3`}>
                      {[0, 1, 2].map((i) => (
                        <span key={i} className={`h-2.5 w-5 rounded-full ${i < scores[id] ? 'bg-ink' : 'bg-line'}`} />
                      ))}
                    </span>
                    <span className={`w-12 text-right text-sm font-semibold ${scores[id] >= 3 ? 'text-ok' : scores[id] <= 1 ? 'text-bad' : ''}`}>{LABEL[scores[id]]}</span>
                  </li>
                ))}
            </ul>
            <Btn className="mt-6 w-full" onClick={go}>
              {back === 'gramer' ? 'Gramer bloğuna dön' : 'Başlayalım'}
            </Btn>
          </div>
        )}
      </Page>
    </>
  )
}
