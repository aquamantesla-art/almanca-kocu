import { Link } from 'react-router-dom'
import { TOPIC_BY_ID, WEEK_TOPICS } from '../content/grammar'
import { NICOS_B1 } from '../content/resources'
import { READINGS } from '../content/readings'
import { SPEAKING_TOPICS } from '../content/speaking'
import { useApp } from '../lib/store'
import { PHASES, a2Queue, phaseOf, weekOf, type Phase } from '../lib/program'
import { Page, TopBar } from '../components/ui'

export function PlanScreen() {
  const s = useApp()
  const queue = a2Queue(s)
  const thisWeek = weekOf(s.completedDays + 1)

  const grammarFor = (w: number): string[] => {
    if (w <= 3) {
      const per = Math.ceil(queue.length / 3)
      return queue.slice((w - 1) * per, w * per)
    }
    return WEEK_TOPICS[w] ?? []
  }

  return (
    <>
      <TopBar title="12 haftalık plan" />
      <Page className="pt-4">
        <p className="text-muted">Haftada 6 oturum, her biri yaklaşık 60 dakika. Bir günü kaçırırsan plan seni bekler; takvime değil bitirdiğin oturumlara göre ilerler.</p>
        {([1, 2, 3] as Phase[]).map((p) => (
          <section key={p} className="mt-8">
            <h2 className="font-display text-2xl font-bold">{PHASES[p].name}</h2>
            <p className="text-sm text-muted">
              {PHASES[p].weeks}: {PHASES[p].goal}. Günlük: kelime {PHASES[p].minutes.kelime}, gramer {PHASES[p].minutes.gramer}, dinle-oku {PHASES[p].minutes.girdi}, yazma {PHASES[p].minutes.yazma}, konuşma {PHASES[p].minutes.akicilik} dk.
            </p>
            <ol className="mt-3 space-y-3">
              {Array.from({ length: 12 }, (_, i) => i + 1)
                .filter((w) => phaseOf(w) === p)
                .map((w) => {
                  const nicos = NICOS_B1.slice((w - 1) * 6, w * 6)
                  const g = grammarFor(w)
                  return (
                    <li key={w} className={`rounded-2xl bg-surface p-4 ${w === thisWeek ? 'ring-2 ring-ink' : ''}`}>
                      <p className="font-display text-lg font-bold">
                        {w}. hafta{w === thisWeek ? ' (şu an)' : ''}
                      </p>
                      <dl className="mt-1 space-y-1 text-[0.95rem]">
                        <div>
                          <dt className="inline font-semibold">Gramer: </dt>
                          <dd className="inline">
                            {w === 12
                              ? 'En zayıf konularının karışık tekrarı'
                              : g.map((id, k) => (
                                  <span key={id}>
                                    {k > 0 && ', '}
                                    <Link to={`/gramer/${id}`} className="underline underline-offset-2">
                                      {TOPIC_BY_ID[id].titleTr}
                                    </Link>
                                  </span>
                                ))}
                            {w <= 3 && s.placement.done && ' (seviye testine göre)'}
                          </dd>
                        </div>
                        {nicos.length > 0 && (
                          <div>
                            <dt className="inline font-semibold">Nicos Weg: </dt>
                            <dd className="inline">
                              ders {nicos[0].n}–{nicos[nicos.length - 1].n} ({nicos[0].title} …)
                            </dd>
                          </div>
                        )}
                        <div>
                          <dt className="inline font-semibold">Okuma: </dt>
                          <dd className="inline">
                            {READINGS.filter((r) => r.week === w)
                              .map((r) => r.title)
                              .join(', ')}
                          </dd>
                        </div>
                        <div>
                          <dt className="inline font-semibold">Konuşma: </dt>
                          <dd className="inline">
                            {SPEAKING_TOPICS.filter((t) => t.week === w)
                              .map((t) => t.title)
                              .join(', ')}
                          </dd>
                        </div>
                      </dl>
                    </li>
                  )
                })}
            </ol>
          </section>
        ))}
      </Page>
    </>
  )
}
