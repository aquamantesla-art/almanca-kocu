import { useState } from 'react'
import { Link } from 'react-router-dom'
import { NICOS_B1 } from '../../content/resources'
import type { Article } from '../../content/types'
import { useApp } from '../../lib/store'
import { openLink } from '../../lib/platform'
import type { DayPlan } from '../../lib/program'
import { Btn, Icon } from '../../components/ui'

function Check({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <button
      onClick={onChange}
      aria-pressed={checked}
      className={`flex min-h-12 w-full items-center gap-3 rounded-xl border-2 px-4 text-left font-medium ${checked ? 'border-ink bg-ink text-paper' : 'border-line bg-surface'}`}
    >
      <span className={`flex h-6 w-6 items-center justify-center rounded-md border-2 ${checked ? 'border-paper' : 'border-ink'}`}>
        {checked && <Icon name="check" size={16} />}
      </span>
      {label}
    </button>
  )
}

export function GirdiBlock({ plan }: { plan: DayPlan }) {
  const session = useApp((s) => s.session)
  const nicosDone = useApp((s) => s.nicosDone)
  const toggleNicos = useApp((s) => s.toggleNicos)
  const toggleInputDone = useApp((s) => s.toggleInputDone)
  const done = session?.inputDone ?? []
  const lesson = plan.nicos
  const reading = plan.readings[plan.dow % 2 === 1 ? 0 : 1] ?? plan.readings[0]

  return (
    <div className="space-y-6">
      {lesson ? (
        <section className="rounded-2xl bg-surface p-4">
          <p className="text-sm text-muted">
            Nicos Weg B1, ders {lesson.n} / {NICOS_B1.length}
          </p>
          <h2 className="font-display text-3xl font-bold leading-tight">{lesson.title}</h2>
          <p className="text-muted">
            {lesson.topic}
            {lesson.grammar ? `. Gramer: ${lesson.grammar}` : ''}
          </p>
          <p className="mt-3 text-[0.95rem]">
            Videoyu önce altyazısız izle, sonra Almanca altyazıyla bir kez daha. Ardından dersin alıştırmalarını yap.
          </p>
          <Btn className="mt-4 w-full" onClick={() => openLink(lesson.url)}>
            <Icon name="external" /> Dersi aç (DW)
          </Btn>
          <div className="mt-2.5">
            <Check
              checked={nicosDone.includes(lesson.id)}
              label="İzledim, alıştırmaları yaptım"
              onChange={() => {
                toggleNicos(lesson.id)
                toggleInputDone('nicos')
              }}
            />
          </div>
        </section>
      ) : (
        <p className="rounded-2xl bg-surface p-4">Nicos Weg B1'in bütün derslerini bitirdin. Bugün aşağıdaki kaynakla devam et.</p>
      )}

      <section className="rounded-2xl bg-surface p-4">
        <p className="text-sm text-muted">{plan.extraRequired || !lesson ? 'Bugünün ikinci kaynağı' : 'Bonus: vaktin ya da yolda dinleyecek zamanın varsa'}</p>
        <h2 className="font-display text-2xl font-bold leading-tight">{plan.extra.name}</h2>
        <p className="text-muted">{plan.extra.what}</p>
        <p className="mt-3 text-[0.95rem]">{plan.extra.task}</p>
        <Btn variant="secondary" className="mt-4 w-full" onClick={() => openLink(plan.extra.url)}>
          <Icon name="external" /> Aç
        </Btn>
        <div className="mt-2.5">
          <Check checked={done.includes(plan.extra.id)} label="Yaptım" onChange={() => toggleInputDone(plan.extra.id)} />
        </div>
      </section>

      {reading && (
        <section>
          <p className="text-sm text-muted">Uygulama içi okuma (dokunduğun kelimenin anlamı çıkar)</p>
          <Link to={`/okuma/${reading.id}`} className="mt-1 flex items-center justify-between rounded-2xl bg-surface p-4 font-semibold">
            {reading.title}
            <Icon name="next" />
          </Link>
        </section>
      )}

      <AddWord />

      <p className="text-sm text-muted">
        İpucu: Bilgisayarda YouTube izlerken Language Reactor eklentisi Almanca ve Türkçe altyazıyı alt alta gösterir. Bilinmeyen bir kalıp görünce durdur ve aşağıya ekle.
      </p>
    </div>
  )
}

export function AddWord() {
  const addCustom = useApp((s) => s.addCustom)
  const [de, setDe] = useState('')
  const [tr, setTr] = useState('')
  const [art, setArt] = useState<Article | ''>('')
  const [saved, setSaved] = useState(0)
  return (
    <section className="rounded-2xl border-2 border-dashed border-line p-4">
      <h3 className="font-semibold">Duyduğun yeni kelimeyi ekle</h3>
      <form
        className="mt-3 space-y-2.5"
        onSubmit={(e) => {
          e.preventDefault()
          if (!de.trim() || !tr.trim()) return
          addCustom({ id: `u${Date.now()}`, kind: 'word', de: de.trim(), tr: tr.trim(), art: art || undefined, created: Date.now() })
          setDe('')
          setTr('')
          setArt('')
          setSaved((n) => n + 1)
        }}
      >
        <div className="flex gap-2">
          <select
            value={art}
            onChange={(e) => setArt(e.target.value as Article | '')}
            aria-label="Artikel"
            className="min-h-12 rounded-xl border-2 border-line bg-surface px-2"
          >
            <option value="">–</option>
            <option value="der">der</option>
            <option value="die">die</option>
            <option value="das">das</option>
          </select>
          <input
            value={de}
            onChange={(e) => setDe(e.target.value)}
            placeholder="Almanca"
            autoCapitalize="none"
            className="min-h-12 min-w-0 flex-1 rounded-xl border-2 border-line bg-surface px-3"
          />
        </div>
        <input value={tr} onChange={(e) => setTr(e.target.value)} placeholder="Türkçe anlamı" className="min-h-12 w-full rounded-xl border-2 border-line bg-surface px-3" />
        <Btn type="submit" variant="quiet" className="w-full" disabled={!de.trim() || !tr.trim()}>
          <Icon name="plus" /> Kartlarıma ekle
        </Btn>
        {saved > 0 && <p className="text-sm font-semibold text-ok">{saved} kelime eklendi. Kelime bloğunda karşına çıkacak.</p>}
      </form>
    </section>
  )
}
