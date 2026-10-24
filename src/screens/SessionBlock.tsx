import { useEffect, useMemo, useRef } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useApp, BLOCK_ORDER, BLOCK_STRAND, type BlockId } from '../lib/store'
import { BLOCK_INFO, buildDayPlan, currentDay } from '../lib/program'
import { useStudyTimer } from '../lib/useStudyTimer'
import { formatClock } from '../lib/date'
import { Btn, Page, TopBar } from '../components/ui'
import { KelimeBlock } from './blocks/KelimeBlock'
import { GramerBlock } from './blocks/GramerBlock'
import { GirdiBlock } from './blocks/GirdiBlock'
import { YazmaBlock } from './blocks/YazmaBlock'
import { AkicilikBlock } from './blocks/AkicilikBlock'

export function SessionBlock() {
  const { id } = useParams()
  const valid = BLOCK_ORDER.includes(id as BlockId)
  if (!valid) return <Navigate to="/" replace />
  return <BlockInner block={id as BlockId} />
}

function BlockInner({ block }: { block: BlockId }) {
  const nav = useNavigate()
  const completedDays = useApp((s) => s.completedDays)
  const ensureSession = useApp((s) => s.ensureSession)
  const completeBlock = useApp((s) => s.completeBlock)
  const day = currentDay({ completedDays })
  // Freeze the plan for this visit so the content doesn't shift while working
  const plan = useMemo(() => buildDayPlan(useApp.getState(), day), [day, block])
  const before = useRef(useApp.getState().session?.blocks[block]?.sec ?? 0)
  const done = useApp((s) => !!s.session?.blocks[block]?.done)

  useEffect(() => {
    ensureSession(day)
  }, [day, ensureSession])

  const elapsed = useStudyTimer(BLOCK_STRAND[block], block)
  const spent = before.current + elapsed
  const target = plan.minutes[block] * 60
  const timeUp = spent >= target

  const finish = () => {
    const finishedDay = completeBlock(block)
    nav(finishedDay ? `/?bitti=${day}` : '/', { replace: true })
  }

  return (
    <>
      <TopBar
        title={BLOCK_INFO[block].name}
        back="/"
        right={
          <span className={`rounded-full px-3 py-1 text-sm font-semibold tabular-nums ${timeUp ? 'bg-signal text-signal-ink' : 'bg-sunken'}`} aria-label="Bu blokta geçen süre">
            {formatClock(spent)} / {plan.minutes[block]}:00
          </span>
        }
      />
      <div className="h-1 bg-sunken">
        <div className="h-full bg-ink transition-[width]" style={{ width: `${Math.min(100, (spent / target) * 100)}%` }} />
      </div>
      <Page className="pt-5">
        {block === 'kelime' && <KelimeBlock plan={plan} />}
        {block === 'gramer' && <GramerBlock plan={plan} />}
        {block === 'girdi' && <GirdiBlock plan={plan} />}
        {block === 'yazma' && <YazmaBlock plan={plan} />}
        {block === 'akicilik' && <AkicilikBlock plan={plan} />}

        <div className="mt-10 border-t border-line pt-5">
          {timeUp && !done && <p className="mb-3 text-sm text-muted">Bu bloğun süresi doldu. Yarım kalan bir şey yoksa bitirebilirsin.</p>}
          <Btn variant={timeUp ? 'primary' : 'secondary'} className="w-full" onClick={finish}>
            {done ? 'Bugünün planına dön' : `${BLOCK_INFO[block].name} bloğunu bitir`}
          </Btn>
        </div>
      </Page>
    </>
  )
}
