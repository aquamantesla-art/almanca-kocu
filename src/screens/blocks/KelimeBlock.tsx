import { useMemo, useState } from 'react'
import { useApp } from '../../lib/store'
import { buildVocabQueue, type DayPlan } from '../../lib/program'
import { VocabSession } from '../../components/VocabSession'
import { QuickFilterPanel, unfilteredA2 } from '../VocabScreens'
import { Btn } from '../../components/ui'

export function KelimeBlock({ plan }: { plan: DayPlan }) {
  const queue = useMemo(() => buildVocabQueue(useApp.getState()), [])
  const cards = useApp((s) => s.cards)
  const filterSeen = useApp((s) => s.filterSeen)
  const leftA2 = unfilteredA2(cards, filterSeen).length
  const [mode, setMode] = useState<'cards' | 'filter'>(queue.length === 0 && leftA2 > 0 ? 'filter' : 'cards')

  return (
    <div>
      {plan.phase === 1 && leftA2 > 40 && mode === 'cards' && (
        <div className="mb-5 rounded-2xl border-2 border-dashed border-line p-4">
          <p className="font-semibold">Önce bildiklerini ayıkla</p>
          <p className="mt-1 text-sm text-muted">
            A2 listesinde henüz görmediğin {leftA2} kelime var. Bildiklerini hızlıca işaretlersen tekrar kartlarında sadece gerçekten bilmediklerin kalır.
          </p>
          <Btn variant="quiet" className="mt-3" onClick={() => setMode('filter')}>
            Hızlı elemeye geç
          </Btn>
        </div>
      )}
      {mode === 'filter' ? (
        <div>
          <QuickFilterPanel />
          <Btn variant="ghost" className="mt-4" onClick={() => setMode('cards')}>
            Tekrar kartlarına dön
          </Btn>
        </div>
      ) : (
        <VocabSession initial={queue} />
      )}
    </div>
  )
}
