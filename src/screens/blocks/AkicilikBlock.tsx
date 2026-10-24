import { useState } from 'react'
import { SPEAKING_TOPICS } from '../../content/speaking'
import type { DayPlan } from '../../lib/program'
import { RRR, Talk432 } from '../../components/Fluency'
import { Btn } from '../../components/ui'

export function AkicilikBlock({ plan }: { plan: DayPlan }) {
  const [kind, setKind] = useState(plan.fluency.kind)
  const reading = plan.fluency.kind === 'rrr' ? plan.fluency.reading : plan.readings[0]
  const topic = plan.fluency.kind === '432' ? plan.fluency.topic : SPEAKING_TOPICS[Math.min(SPEAKING_TOPICS.length - 1, (plan.week - 1) * 3)]

  return (
    <div>
      {kind === '432' ? <Talk432 key="432" topic={topic} /> : reading && <RRR key="rrr" reading={reading} />}
      <Btn variant="ghost" className="mt-6" onClick={() => setKind(kind === '432' ? 'rrr' : '432')}>
        {kind === '432' ? 'Bugün tekrarlı okuma yap' : 'Bugün 4/3/2 konuşma yap'}
      </Btn>
    </div>
  )
}
