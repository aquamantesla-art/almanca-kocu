import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TOPIC_BY_ID } from '../../content/grammar'
import type { Exercise } from '../../content/types'
import { useApp } from '../../lib/store'
import { pickGrammarItems, type DayPlan } from '../../lib/program'
import { ExerciseRunner } from '../../components/ExerciseRunner'
import { Rich } from '../../components/Rich'
import { Btn, Icon } from '../../components/ui'

type Mode = 'intro' | 'lesson' | 'practice' | 'done'

export function GramerBlock({ plan }: { plan: DayPlan }) {
  const nav = useNavigate()
  const placementDone = useApp((s) => s.placement.done)
  const stats = useApp((s) => s.topicStats)
  const recordGrammar = useApp((s) => s.recordGrammar)
  const markLessonSeen = useApp((s) => s.markLessonSeen)
  const [main, course] = plan.grammarFocus.map((id) => TOPIC_BY_ID[id])
  const [mode, setMode] = useState<Mode>(stats[main.id]?.lessonSeen ? 'intro' : 'lesson')
  const [items, setItems] = useState<Exercise[]>([])
  const [round, setRound] = useState(0)
  const [showCourseLesson, setShowCourseLesson] = useState(false)

  if (plan.day <= 6 && !placementDone) {
    return (
      <div>
        <h2 className="font-display text-3xl font-bold">Önce seviye testi</h2>
        <p className="mt-2">
          30 kısa soru, yaklaşık 10 dakika. Hangi A2 konularını unuttuğunu bulur; ilk 3 haftanın gramer sırası buna göre ayarlanır.
        </p>
        <Btn className="mt-5 w-full" onClick={() => nav('/seviye-testi?geri=gramer')}>
          Teste başla
        </Btn>
      </div>
    )
  }

  const start = () => {
    setItems(pickGrammarItems(useApp.getState(), plan.grammarFocus, 12))
    setRound((r) => r + 1)
    setMode('practice')
  }

  return (
    <div>
      <p className="text-sm text-muted">Bugünün odağı</p>
      <h2 className="font-display text-3xl font-bold leading-tight">{main.titleTr}</h2>
      <p className="text-muted">{main.title}</p>

      {mode === 'intro' && (
        <div className="mt-5">
          <p>{main.summary}</p>
          {course && (
            <p className="mt-3 rounded-xl bg-surface p-3 text-sm">
              Kurs konun da karışık sorular arasında: <strong>{course.titleTr}</strong>
            </p>
          )}
          <p className="mt-3 text-sm text-muted">Sorular karışık gelir: bugünün konusu, kurs konun ve önceki konuların tekrarları. Her soruda hangi kuralın geçerli olduğunu kendin bulmalısın.</p>
          <Btn className="mt-5 w-full" onClick={start}>
            Alıştırmaya başla
          </Btn>
          <Btn variant="quiet" className="mt-2.5 w-full" onClick={() => setMode('lesson')}>
            <Icon name="book" /> Konu anlatımını aç
          </Btn>
        </div>
      )}

      {mode === 'lesson' && (
        <div className="mt-4">
          <Rich text={main.lesson} />
          {course && (
            <div className="mt-6 border-t border-line pt-4">
              <button className="flex items-center gap-1 font-semibold" onClick={() => setShowCourseLesson(!showCourseLesson)}>
                Kurs konun: {course.titleTr} <Icon name="next" size={18} className={showCourseLesson ? 'rotate-90' : ''} />
              </button>
              {showCourseLesson && <Rich text={course.lesson} className="mt-2" />}
            </div>
          )}
          <Btn
            className="mt-6 w-full"
            onClick={() => {
              markLessonSeen(main.id)
              start()
            }}
          >
            Anladım, alıştırmaya geç
          </Btn>
        </div>
      )}

      {mode === 'practice' && (
        <div className="mt-6">
          <ExerciseRunner
            key={round}
            items={items}
            onAnswer={(ex, ok) => recordGrammar(ex.topic, ex.id, ok)}
            onDone={() => setMode('done')}
            doneLabel="Tamam"
          />
        </div>
      )}

      {mode === 'done' && (
        <div className="mt-6">
          <p>Vaktin kaldıysa bir tur daha çöz ya da konu anlatımına tekrar göz at.</p>
          <Btn variant="secondary" className="mt-4 w-full" onClick={start}>
            Bir tur daha
          </Btn>
          <Btn variant="quiet" className="mt-2.5 w-full" onClick={() => setMode('lesson')}>
            <Icon name="book" /> Konu anlatımı
          </Btn>
        </div>
      )}
    </div>
  )
}
