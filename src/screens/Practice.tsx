import { Link } from 'react-router-dom'
import { useApp } from '../lib/store'
import { dueCardKeys } from '../lib/program'
import { TOPICS } from '../content/grammar'
import { READINGS } from '../content/readings'
import { SPEAKING_TOPICS } from '../content/speaking'
import { Icon, Page } from '../components/ui'
import { unfilteredA2 } from './VocabScreens'

interface Tool {
  to: string
  name: string
  what: string
  count?: string
}

export function Practice() {
  const s = useApp()
  const due = dueCardKeys(s, ['w:', 'c:']).length
  const fixes = Object.values(s.custom).filter((c) => c.kind === 'fix').length
  const left = unfilteredA2(s.cards, s.filterSeen).length

  const groups: { title: string; tools: Tool[] }[] = [
    {
      title: 'Kelime',
      tools: [
        { to: '/pratik/kelime', name: 'Kelime tekrarı', what: 'Zamanı gelen kartlar ve günlük yeni kelimeler', count: due ? `${due} hazır` : undefined },
        { to: '/pratik/eleme', name: 'Hızlı eleme', what: 'A2 kelimelerinden bildiklerini ayıkla', count: left ? `${left} kaldı` : undefined },
        { to: '/pratik/artikel', name: 'Artikel ustası', what: 'Son ek kuralları ve der/die/das oyunu' },
      ],
    },
    {
      title: 'Gramer ve okuma',
      tools: [
        { to: '/gramer', name: 'Gramer konuları', what: 'Anlatımlar ve konu bazlı alıştırmalar', count: `${TOPICS.length} konu` },
        { to: '/okuma', name: 'Okuma metinleri', what: 'Kelimeye dokununca anlamı çıkar, sesli dinle', count: `${READINGS.length} metin` },
        { to: '/hata-defteri', name: 'Hata defteri', what: 'Yazılarından çıkan düzeltmeler ve eklediğin kelimeler', count: fixes ? `${fixes} not` : undefined },
      ],
    },
    {
      title: 'Konuşma ve kaynaklar',
      tools: [
        { to: '/konusma', name: '4/3/2 konuşma', what: 'Aynı konuyu 4, 3, 2 dakikada anlat', count: `${SPEAKING_TOPICS.length} konu` },
        { to: '/kaynaklar', name: 'Kaynaklar', what: 'Nicos Weg, haberler, podcast, Netzwerk neu alıştırmaları' },
        { to: '/plan', name: '12 haftalık plan', what: 'Hangi hafta ne var' },
      ],
    },
  ]

  return (
    <Page className="pt-safe">
      <h1 className="font-display pt-6 text-4xl font-bold">Pratik</h1>
      <p className="mt-1 text-muted">Günlük oturumun dışında, istediğin zaman. Süre yine haftalık hedefe sayılır.</p>
      {groups.map((g) => (
        <section key={g.title} className="mt-7">
          <h2 className="font-display mb-2 text-xl font-bold text-muted">{g.title}</h2>
          <ul className="divide-y divide-line overflow-hidden rounded-2xl bg-surface">
            {g.tools.map((t) => (
              <li key={t.to}>
                <Link to={t.to} className="flex items-center gap-3 px-4 py-3.5 active:bg-sunken">
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold">{t.name}</span>
                    <span className="block text-sm text-muted">{t.what}</span>
                  </span>
                  {t.count && <span className="shrink-0 text-sm tabular-nums text-muted">{t.count}</span>}
                  <Icon name="next" size={18} className="shrink-0 text-muted" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </Page>
  )
}
