import { useEffect, useState } from 'react'
import { HashRouter, Link, Route, Routes, useLocation } from 'react-router-dom'
import { useApp } from './lib/store'
import { Icon } from './components/ui'
import { Today } from './screens/Today'
import { SessionBlock } from './screens/SessionBlock'
import { Onboarding } from './screens/Onboarding'
import { Placement } from './screens/Placement'
import { Practice } from './screens/Practice'
import { FreeVocab, QuickFilter } from './screens/VocabScreens'
import { ArticleTrainer } from './screens/ArticleTrainer'
import { GrammarList, GrammarTopicScreen } from './screens/GrammarScreens'
import { ReadingList, ReadingScreen } from './screens/ReadingScreens'
import { SpeakingList, SpeakingScreen } from './screens/SpeakingScreens'
import { ErrorNotebook } from './screens/ErrorNotebook'
import { Resources } from './screens/Resources'
import { ProgressScreen } from './screens/ProgressScreen'
import { SettingsScreen } from './screens/SettingsScreen'
import { PlanScreen } from './screens/PlanScreen'

function useHydrated() {
  const [ok, setOk] = useState(useApp.persist.hasHydrated())
  useEffect(() => {
    const unsub = useApp.persist.onFinishHydration(() => setOk(true))
    setOk(useApp.persist.hasHydrated())
    return unsub
  }, [])
  return ok
}

function useTheme() {
  const pref = useApp((s) => s.settings.theme)
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const apply = () => {
      const dark = pref === 'dark' || (pref === 'system' && media.matches)
      document.documentElement.dataset.theme = dark ? 'dark' : 'light'
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#12171f' : '#f3f5f7')
    }
    apply()
    media.addEventListener('change', apply)
    return () => media.removeEventListener('change', apply)
  }, [pref])
}

const PRACTICE_PATHS = ['/pratik', '/gramer', '/okuma', '/konusma', '/hata-defteri', '/kaynaklar', '/plan']

const TABS = [
  { to: '/', label: 'Bugün', icon: 'today', match: (p: string) => p === '/' },
  { to: '/pratik', label: 'Pratik', icon: 'practice', match: (p: string) => PRACTICE_PATHS.some((x) => p.startsWith(x)) },
  { to: '/ilerleme', label: 'İlerleme', icon: 'chart', match: (p: string) => p.startsWith('/ilerleme') },
  { to: '/ayarlar', label: 'Ayarlar', icon: 'settings', match: (p: string) => p.startsWith('/ayarlar') },
]

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function BottomNav() {
  const { pathname } = useLocation()
  if (pathname.startsWith('/blok/') || pathname === '/seviye-testi') return null
  return (
    <nav className="pb-safe fixed inset-x-0 bottom-0 z-30 border-t border-line bg-surface/95 backdrop-blur" aria-label="Ana menü">
      <ul className="mx-auto flex max-w-xl">
        {TABS.map((t) => {
          const active = t.match(pathname)
          return (
            <li key={t.to} className="flex-1">
              <Link
                to={t.to}
                aria-current={active ? 'page' : undefined}
                className={`flex flex-col items-center gap-0.5 pt-2 text-xs font-medium ${active ? 'text-ink' : 'text-muted'}`}
              >
                <span className={`flex h-8 w-14 items-center justify-center rounded-full ${active ? 'bg-signal text-signal-ink' : ''}`}>
                  <Icon name={t.icon} size={21} />
                </span>
                {t.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export function App() {
  const hydrated = useHydrated()
  const onboarded = useApp((s) => s.onboarded)
  useTheme()

  if (!hydrated) return <div className="min-h-dvh bg-paper" />

  return (
    <HashRouter>
      <ScrollToTop />
      {!onboarded ? (
        <Routes>
          <Route path="/seviye-testi" element={<Placement />} />
          <Route path="*" element={<Onboarding />} />
        </Routes>
      ) : (
        <>
          <Routes>
            <Route path="/" element={<Today />} />
            <Route path="/blok/:id" element={<SessionBlock />} />
            <Route path="/seviye-testi" element={<Placement />} />
            <Route path="/pratik" element={<Practice />} />
            <Route path="/pratik/kelime" element={<FreeVocab />} />
            <Route path="/pratik/eleme" element={<QuickFilter />} />
            <Route path="/pratik/artikel" element={<ArticleTrainer />} />
            <Route path="/gramer" element={<GrammarList />} />
            <Route path="/gramer/:id" element={<GrammarTopicScreen />} />
            <Route path="/okuma" element={<ReadingList />} />
            <Route path="/okuma/:id" element={<ReadingScreen />} />
            <Route path="/konusma" element={<SpeakingList />} />
            <Route path="/konusma/:id" element={<SpeakingScreen />} />
            <Route path="/hata-defteri" element={<ErrorNotebook />} />
            <Route path="/kaynaklar" element={<Resources />} />
            <Route path="/ilerleme" element={<ProgressScreen />} />
            <Route path="/plan" element={<PlanScreen />} />
            <Route path="/ayarlar" element={<SettingsScreen />} />
            <Route path="*" element={<Today />} />
          </Routes>
          <BottomNav />
        </>
      )}
    </HashRouter>
  )
}
