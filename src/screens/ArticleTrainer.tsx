import { useMemo, useState } from 'react'
import { WORDS } from '../content/vocab'
import { GENDER_SHARE, RULES, findRule } from '../content/articleRules'
import type { Article, Word } from '../content/types'
import { useStudyTimer } from '../lib/useStudyTimer'
import { shuffle } from '../lib/answer'
import { speak } from '../lib/platform'
import { Btn, Page, TopBar, articleColor } from '../components/ui'

const ARTS: Article[] = ['der', 'die', 'das']
const ROUND = 20

export function ArticleTrainer() {
  useStudyTimer('language')
  const [tab, setTab] = useState<'game' | 'rules'>('game')
  return (
    <>
      <TopBar title="Artikel ustası" />
      <Page className="pt-4">
        <div className="mb-5 grid grid-cols-2 rounded-xl bg-sunken p-1" role="tablist">
          {(['game', 'rules'] as const).map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={`min-h-10 rounded-lg font-semibold ${tab === t ? 'bg-surface' : 'text-muted'}`}
            >
              {t === 'game' ? 'Oyun' : 'Kurallar'}
            </button>
          ))}
        </div>
        {tab === 'game' ? <Game /> : <Rules />}
      </Page>
    </>
  )
}

function Game() {
  const [seed, setSeed] = useState(0)
  const words = useMemo(() => shuffle(WORDS.filter((w) => w.art)).slice(0, ROUND), [seed])
  const [i, setI] = useState(0)
  const [picked, setPicked] = useState<Article | null>(null)
  const [score, setScore] = useState(0)
  const w: Word | undefined = words[i]

  if (!w) {
    return (
      <div className="py-6">
        <p className="font-display text-5xl font-bold">
          {score}/{ROUND}
        </p>
        <p className="mt-2 text-muted">Yanlış yaptıklarının son eklerine bak: çoğu bir kurala uyuyor.</p>
        <Btn
          className="mt-6 w-full"
          onClick={() => {
            setSeed(seed + 1)
            setI(0)
            setScore(0)
            setPicked(null)
          }}
        >
          Yeni tur
        </Btn>
      </div>
    )
  }

  const rule = findRule(w.de)
  const pick = (a: Article) => {
    if (picked) return
    setPicked(a)
    if (a === w.art) setScore(score + 1)
    void speak(`${w.art} ${w.de}`)
  }

  return (
    <div>
      <p className="text-sm tabular-nums text-muted">
        {i + 1}/{ROUND}, doğru {score}
      </p>
      <div className="mt-3 rounded-2xl bg-surface p-6 text-center">
        <p className={`font-display text-5xl font-bold ${picked ? articleColor(w.art) : ''}`}>
          {picked && <span>{w.art} </span>}
          {w.de}
        </p>
        <p className="mt-2 text-muted">{w.tr}</p>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2.5">
        {ARTS.map((a) => {
          const state = picked ? (a === w.art ? 'ok' : a === picked ? 'bad' : 'idle') : 'idle'
          return (
            <button
              key={a}
              onClick={() => pick(a)}
              className={`min-h-16 rounded-xl border-2 text-2xl font-bold ${articleColor(a)} ${
                state === 'ok' ? 'border-current bg-surface ring-4 ring-current/25' : state === 'bad' ? 'border-bad bg-bad-bg opacity-70' : 'border-current bg-surface'
              } ${picked && state === 'idle' ? 'opacity-30' : ''}`}
            >
              {a}
            </button>
          )
        })}
      </div>
      {picked && (
        <div className="mt-4">
          {rule ? (
            <p className="rounded-xl bg-surface p-3 text-sm">
              <strong className={articleColor(rule.art)}>{rule.ending}</strong>: {rule.how} <strong className={articleColor(rule.art)}>{rule.art}</strong>.{' '}
              {rule.exceptions ? `İstisna: ${rule.exceptions}.` : ''}
            </p>
          ) : (
            <p className="rounded-xl bg-surface p-3 text-sm text-muted">Bu kelime için kural yok: ezberlemek gerek. Kartlarda rengiyle birlikte gör.</p>
          )}
          <Btn
            className="mt-3 w-full"
            onClick={() => {
              setPicked(null)
              setI(i + 1)
            }}
            autoFocus
          >
            Sonraki
          </Btn>
        </div>
      )}
    </div>
  )
}

function Rules() {
  return (
    <div>
      <p>
        Sık kullanılan isimlerin yaklaşık <strong className="text-die">%{GENDER_SHARE.die}'i die</strong>,{' '}
        <strong className="text-der">%{GENDER_SHARE.der}'ü der</strong>, <strong className="text-das">%{GENDER_SHARE.das}'si das</strong>. Hiç bilmiyorsan die tahmini en sık
        tutar. Ama önce son eke bak:
      </p>
      {(['die', 'das', 'der'] as Article[]).map((a) => (
        <section key={a} className="mt-6">
          <h2 className={`font-display text-2xl font-bold ${articleColor(a)}`}>{a}</h2>
          <ul className="mt-2 divide-y divide-line rounded-2xl bg-surface">
            {RULES.filter((r) => r.art === a).map((r) => (
              <li key={r.ending} className="px-4 py-3">
                <p className="flex items-baseline justify-between gap-2">
                  <strong className={`text-lg ${articleColor(a)}`}>{r.ending}</strong>
                  <span className="text-sm text-muted">{r.how}</span>
                </p>
                <p className="text-sm">{r.examples}</p>
                {r.exceptions && <p className="text-sm text-muted">İstisna: {r.exceptions}</p>}
              </li>
            ))}
          </ul>
        </section>
      ))}
      <p className="mt-6 text-sm text-muted">
        Kurala uymayan sık kelimeleri (der Name, das Ende…) kartlarda renkleriyle ezberle. Renk kodlaması (der mavi, die kırmızı, das yeşil) artikeli görsel hafızaya taşır.
      </p>
    </div>
  )
}
