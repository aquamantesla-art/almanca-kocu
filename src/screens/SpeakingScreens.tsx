import { Link, Navigate, useParams } from 'react-router-dom'
import { SPEAKING_TOPICS } from '../content/speaking'
import { useStudyTimer } from '../lib/useStudyTimer'
import { Talk432 } from '../components/Fluency'
import { Icon, Page, TopBar } from '../components/ui'

export function SpeakingList() {
  return (
    <>
      <TopBar title="4/3/2 konuşma" />
      <Page className="pt-4">
        <p className="mb-5 text-muted">
          Bir konuyu önce 4 dakika anlat, hemen ardından aynısını 3, sonra 2 dakikada. Daralan süre seni duraksamaları atmaya ve kalıpları otomatikleştirmeye zorlar.
        </p>
        <ul className="divide-y divide-line overflow-hidden rounded-2xl bg-surface">
          {SPEAKING_TOPICS.map((t) => (
            <li key={t.id}>
              <Link to={`/konusma/${t.id}`} className="flex items-center gap-3 px-4 py-3 active:bg-sunken">
                <span className="w-14 shrink-0 text-sm text-muted">{t.week}. hf</span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold">{t.title}</span>
                  <span className="block text-sm text-muted">{t.titleTr}</span>
                </span>
                <Icon name="next" size={18} className="text-muted" />
              </Link>
            </li>
          ))}
        </ul>
      </Page>
    </>
  )
}

export function SpeakingScreen() {
  const { id } = useParams()
  const topic = SPEAKING_TOPICS.find((t) => t.id === id)
  useStudyTimer('fluency')
  if (!topic) return <Navigate to="/konusma" replace />
  return (
    <>
      <TopBar title="Konuşma" />
      <Page className="pt-4">
        <Talk432 topic={topic} />
      </Page>
    </>
  )
}
