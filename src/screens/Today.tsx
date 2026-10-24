import { useNavigate, useSearchParams } from 'react-router-dom'
import { TOPIC_BY_ID } from '../content/grammar'
import { useApp, BLOCK_ORDER, type BlockId, type Strand } from '../lib/store'
import {
  BLOCK_INFO,
  PHASES,
  STRAND_NAMES,
  TOTAL_DAYS,
  WEEKLY_TARGET_SEC,
  buildDayPlan,
  currentDay,
  dueCardKeys,
  newWordKeys,
  streak,
  weekStrandSeconds,
  type DayPlan,
} from '../lib/program'
import { formatMinutes } from '../lib/date'
import { Btn, Icon, Page } from '../components/ui'

const STRAND_SHADE: Record<Strand, string> = {
  language: 'bg-ink',
  input: 'bg-der',
  output: 'bg-die',
  fluency: 'bg-das',
}

function blockDetail(b: BlockId, plan: DayPlan, due: number, fresh: number, placementPending: boolean): string {
  switch (b) {
    case 'kelime':
      if (due + fresh === 0) return 'Bugünlük kart kalmadı'
      return [due && `${due} tekrar`, fresh && `${fresh} yeni kelime`].filter(Boolean).join(', ')
    case 'gramer':
      return placementPending ? 'Seviye testi (yaklaşık 10 dk)' : TOPIC_BY_ID[plan.grammarFocus[0]]?.titleTr ?? ''
    case 'girdi':
      return plan.nicos ? `Nicos Weg ${plan.nicos.n}: ${plan.nicos.title}` : plan.extra.name
    case 'yazma':
      return plan.writing.title
    case 'akicilik':
      return plan.fluency.kind === '432' ? `4/3/2: ${plan.fluency.topic.title}` : `Tekrarlı okuma: ${plan.fluency.reading.title}`
  }
}

export function Today() {
  const s = useApp()
  const nav = useNavigate()
  const [params] = useSearchParams()
  const day = currentDay(s)
  const plan = buildDayPlan(s, day)
  const session = s.session?.day === day ? s.session : null
  const next = BLOCK_ORDER.find((b) => !session?.blocks[b]?.done) ?? 'kelime'
  const started = !!session && BLOCK_ORDER.some((b) => (session.blocks[b]?.sec ?? 0) > 0 || session.blocks[b]?.done)
  const due = dueCardKeys(s, ['w:', 'c:']).length
  const fresh = newWordKeys(s).length
  const placementPending = day <= 6 && !s.placement.done
  const week = weekStrandSeconds(s)
  const weekTotal = Object.values(week).reduce((a, b) => a + b, 0)
  const st = streak(s)
  const finishedDay = params.get('bitti')

  const open = (b: BlockId) => {
    s.ensureSession(day)
    nav(`/blok/${b}`)
  }

  return (
    <Page className="pt-safe">
      <header className="flex items-end justify-between pt-6">
        <div>
          <p className="font-display text-[3.25rem] font-bold leading-none tracking-tight">
            {day}. gün
            <span className="ml-1 text-2xl font-semibold text-muted">/ {TOTAL_DAYS}</span>
          </p>
          <p className="mt-1 text-muted">
            {plan.week}. hafta, {PHASES[plan.phase].name}
          </p>
        </div>
        {st > 0 && (
          <p className="flex items-center gap-1 rounded-full bg-surface px-3 py-1.5 font-semibold" title="Üst üste çalışılan gün">
            <Icon name="flame" size={18} className="text-die" />
            {st} gün
          </p>
        )}
      </header>

      {finishedDay && !session && (
        <div className="mt-5 rounded-2xl bg-ink p-4 text-paper">
          <p className="font-display text-2xl font-bold">{finishedDay}. gün tamam.</p>
          <p className="mt-1 opacity-80">Yarın {day}. günle devam. Vaktin varsa Pratik'ten ekstra tekrar yapabilirsin.</p>
        </div>
      )}
      {day > TOTAL_DAYS && (
        <p className="mt-5 rounded-2xl bg-surface p-4">
          12 haftalık plan bitti. Uygulama en zayıf konularından alıştırmalarla devam ediyor.
        </p>
      )}

      <ol className="mt-7" aria-label="Bugünün oturumu">
        {BLOCK_ORDER.map((b, i) => {
          const done = !!session?.blocks[b]?.done
          const current = b === next
          const last = i === BLOCK_ORDER.length - 1
          const spent = session?.blocks[b]?.sec ?? 0
          return (
            <li key={b} className="relative flex gap-4">
              <div className="relative flex w-7 shrink-0 justify-center">
                {!last && (
                  <span
                    className={`absolute top-7 bottom-0 w-1.5 ${done ? 'bg-ink' : 'bg-line'}`}
                    aria-hidden="true"
                  />
                )}
                <span
                  className={`relative z-10 mt-1 flex h-7 w-7 items-center justify-center rounded-full border-[5px] ${
                    done ? 'border-ink bg-ink text-paper' : current ? 'border-ink bg-signal' : 'border-line bg-paper'
                  }`}
                  aria-hidden="true"
                >
                  {done && <Icon name="check" size={14} />}
                </span>
              </div>
              <button onClick={() => open(b)} className="mb-3 flex min-h-16 flex-1 items-start justify-between gap-3 rounded-xl px-1 pb-3 text-left active:bg-sunken">
                <span className="min-w-0">
                  <span className={`block text-[1.15rem] font-semibold ${done ? 'text-muted line-through decoration-2' : ''}`}>
                    {BLOCK_INFO[b].name}
                  </span>
                  <span className="block truncate text-[0.95rem] text-muted">
                    {blockDetail(b, plan, due, fresh, placementPending)}
                  </span>
                </span>
                <span className="shrink-0 pt-0.5 text-sm tabular-nums text-muted">
                  {spent >= 60 && !done ? `${Math.round(spent / 60)}/` : ''}
                  {plan.minutes[b]} dk
                </span>
              </button>
            </li>
          )
        })}
      </ol>

      <div className="sticky bottom-[calc(env(safe-area-inset-bottom,0px)+4.5rem)] z-10 -mx-4 bg-gradient-to-t from-paper from-70% to-transparent px-4 pt-4 pb-2">
        <Btn className="w-full text-lg shadow-lg" onClick={() => open(next)}>
          {started ? `Devam et: ${BLOCK_INFO[next].name}` : `Başla: ${BLOCK_INFO[next].name}`}
          <Icon name="next" />
        </Btn>
      </div>

      <section className="mt-10" aria-labelledby="week-h">
        <div className="flex items-baseline justify-between">
          <h2 id="week-h" className="font-display text-xl font-bold">
            Bu hafta
          </h2>
          <p className="tabular-nums text-muted">
            {formatMinutes(weekTotal)} / 6 sa
          </p>
        </div>
        <div className="mt-2 flex h-3 overflow-hidden rounded-full bg-sunken">
          {(Object.keys(week) as Strand[]).map((st2) => (
            <div key={st2} className={STRAND_SHADE[st2]} style={{ width: `${Math.min(100, (week[st2] / WEEKLY_TARGET_SEC) * 100)}%` }} />
          ))}
        </div>
        <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
          {(Object.keys(week) as Strand[]).map((st2) => (
            <li key={st2} className="flex items-center gap-2">
              <span className={`h-2.5 w-2.5 rounded-full ${STRAND_SHADE[st2]}`} />
              <span className="flex-1">{STRAND_NAMES[st2]}</span>
              <span className="tabular-nums text-muted">{Math.round(week[st2] / 60)} dk</span>
            </li>
          ))}
        </ul>
        <button onClick={() => nav('/plan')} className="mt-4 flex items-center gap-1 font-medium underline-offset-4 hover:underline">
          12 haftalık planın tamamı <Icon name="next" size={18} />
        </button>
      </section>
    </Page>
  )
}
