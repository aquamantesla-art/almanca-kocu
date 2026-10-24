import { Link } from 'react-router-dom'
import { TOPICS } from '../content/grammar'
import { useApp, type Strand } from '../lib/store'
import {
  PHASES,
  STRAND_NAMES,
  TOTAL_DAYS,
  phaseOf,
  secondsOn,
  topicAccuracy,
  totalSeconds,
  vocabStats,
  weekStrandSeconds,
  type Phase,
} from '../lib/program'
import { addDays, dateKey, formatMinutes } from '../lib/date'
import { Page, Progress } from '../components/ui'

const DAY_LETTERS = ['Pz', 'Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct']

function strandTargets(phase: Phase): Record<Strand, number> {
  const m = PHASES[phase].minutes
  return {
    language: (m.kelime + m.gramer) * 6,
    input: m.girdi * 6,
    output: m.yazma * 6,
    fluency: m.akicilik * 6,
  }
}

export function ProgressScreen() {
  const s = useApp()
  const total = totalSeconds(s)
  const week = weekStrandSeconds(s)
  const phase = phaseOf(Math.min(12, Math.ceil((s.completedDays + 1) / 6)))
  const targets = strandTargets(phase)
  const v = vocabStats(s)
  const last7 = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i - 6))
  const max7 = Math.max(3600, ...last7.map((d) => secondsOn(s, dateKey(d))))
  const topics = TOPICS.map((t) => ({ t, acc: topicAccuracy(s, t.id) })).filter((x) => x.acc !== null)

  return (
    <Page className="pt-safe">
      <h1 className="font-display pt-6 text-4xl font-bold">İlerleme</h1>

      <section className="mt-6">
        <p className="font-display text-5xl font-bold tabular-nums">
          {s.completedDays}
          <span className="text-2xl text-muted"> / {TOTAL_DAYS} gün</span>
        </p>
        <p className="mt-1 text-muted">Toplam çalışma: {formatMinutes(total)}</p>
        <div className="mt-5 space-y-2" aria-label="72 günün haritası">
          {Array.from({ length: 12 }, (_, w) => {
            const ph = phaseOf(w + 1)
            const newPhase = w === 0 || phaseOf(w) !== ph
            return (
              <div key={w}>
                {newPhase && <p className="mt-3 mb-1 text-sm font-semibold text-muted">{PHASES[ph].name}</p>}
                <div className="flex items-center gap-3">
                  <span className="w-12 text-sm tabular-nums text-muted">{w + 1}. hf</span>
                  <div className="flex flex-1 items-center">
                    {Array.from({ length: 6 }, (_, d) => {
                      const dayNo = w * 6 + d + 1
                      const done = dayNo <= s.completedDays
                      const today = dayNo === s.completedDays + 1
                      return (
                        <span key={d} className="flex flex-1 items-center">
                          <span
                            className={`h-4 w-4 shrink-0 rounded-full border-[3px] ${done ? 'border-ink bg-ink' : today ? 'border-ink bg-signal' : 'border-line bg-paper'}`}
                            title={`${dayNo}. gün`}
                          />
                          {d < 5 && <span className={`h-1 flex-1 ${dayNo < s.completedDays ? 'bg-ink' : 'bg-line'}`} />}
                        </span>
                      )
                    })}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl font-bold">Bu hafta, çizgi çizgi</h2>
        <p className="text-sm text-muted">{PHASES[phase].name} döneminin önerdiği dağılıma göre</p>
        <ul className="mt-3 space-y-3">
          {(Object.keys(week) as Strand[]).map((st) => (
            <li key={st}>
              <div className="flex justify-between text-sm">
                <span className="font-medium">{STRAND_NAMES[st]}</span>
                <span className="tabular-nums text-muted">
                  {Math.round(week[st] / 60)} / {targets[st]} dk
                </span>
              </div>
              <Progress value={week[st]} max={targets[st] * 60} className="mt-1" />
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl font-bold">Son 7 gün</h2>
        <div className="mt-3 flex h-32 items-end gap-2">
          {last7.map((d) => {
            const sec = secondsOn(s, dateKey(d))
            return (
              <div key={d.toISOString()} className="flex flex-1 flex-col items-center gap-1">
                <span className="text-xs tabular-nums text-muted">{sec ? Math.round(sec / 60) : ''}</span>
                <div className="w-full rounded-t-md bg-ink" style={{ height: `${Math.max(2, (sec / max7) * 96)}px`, opacity: sec ? 1 : 0.15 }} />
                <span className="text-xs text-muted">{DAY_LETTERS[d.getDay()]}</span>
              </div>
            )
          })}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl font-bold">Kelimeler</h2>
        <div className="mt-3 grid grid-cols-3 gap-2 text-center">
          {[
            { n: v.mature, l: 'oturdu (21+ gün)' },
            { n: v.young + v.learning, l: 'öğreniliyor' },
            { n: v.unseen, l: 'henüz görülmedi' },
          ].map((x) => (
            <div key={x.l} className="rounded-2xl bg-surface px-2 py-3">
              <p className="font-display text-3xl font-bold tabular-nums">{x.n}</p>
              <p className="text-xs text-muted">{x.l}</p>
            </div>
          ))}
        </div>
        <p className="mt-2 text-sm text-muted">Listede toplam {v.total} kelime var. Şu an tekrar zamanı gelmiş {v.dueNow} kart.</p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl font-bold">Gramer</h2>
        {topics.length === 0 ? (
          <p className="mt-2 text-muted">Konular alıştırma yaptıkça burada görünecek.</p>
        ) : (
          <ul className="mt-3 space-y-2.5">
            {topics
              .sort((a, b) => (a.acc ?? 0) - (b.acc ?? 0))
              .map(({ t, acc }) => (
                <li key={t.id}>
                  <Link to={`/gramer/${t.id}`} className="block">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{t.titleTr}</span>
                      <span className={`tabular-nums ${acc! >= 0.8 ? 'text-ok' : acc! < 0.6 ? 'text-bad' : 'text-muted'}`}>%{Math.round(acc! * 100)}</span>
                    </div>
                    <Progress value={acc!} max={1} className="mt-1" />
                  </Link>
                </li>
              ))}
          </ul>
        )}
      </section>
    </Page>
  )
}
