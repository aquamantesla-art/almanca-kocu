import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TOPICS } from '../content/grammar'
import { useApp } from '../lib/store'
import { PHASES } from '../lib/program'
import { Btn, Page } from '../components/ui'

export function Onboarding() {
  const nav = useNavigate()
  const settings = useApp((s) => s.settings)
  const setSettings = useApp((s) => s.setSettings)
  const finishOnboarding = useApp((s) => s.finishOnboarding)
  const [step, setStep] = useState(0)

  return (
    <Page className="pt-safe flex min-h-dvh flex-col pb-10">
      <div className="flex gap-1.5 pt-6" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <span key={i} className={`h-1.5 flex-1 rounded-full ${i <= step ? 'bg-ink' : 'bg-line'}`} />
        ))}
      </div>

      {step === 0 && (
        <section className="flex flex-1 flex-col pt-10">
          <h1 className="font-display text-5xl font-bold leading-[0.95]">
            Haftada 6 saat.
            <br />
            12 hafta.
            <br />
            <span className="text-der">der</span> <span className="text-die">die</span> <span className="text-das">das</span>.
          </h1>
          <p className="mt-6 text-lg">
            Her gün tek tuşla yaklaşık 60 dakikalık bir oturum: kelime, gramer, dinleme, yazma ve konuşma. Ne yapacağını uygulama söyler; sen sadece başlarsın.
          </p>
          <ol className="mt-8 space-y-4">
            {([1, 2, 3] as const).map((p) => (
              <li key={p} className="flex gap-4">
                <span className="font-display text-3xl font-bold text-muted">{p}</span>
                <span>
                  <strong className="block">{PHASES[p].name}</strong>
                  <span className="text-muted">
                    {PHASES[p].weeks}: {PHASES[p].goal}
                  </span>
                </span>
              </li>
            ))}
          </ol>
          <div className="mt-auto pt-10">
            <Btn className="w-full" onClick={() => setStep(1)}>
              Devam
            </Btn>
          </div>
        </section>
      )}

      {step === 1 && (
        <section className="flex flex-1 flex-col pt-10">
          <h1 className="font-display text-4xl font-bold leading-tight">Birkaç ayar</h1>

          <fieldset className="mt-8">
            <legend className="font-semibold">Günde kaç yeni kelime?</legend>
            <p className="text-sm text-muted">15 önerilir. Fazlası birkaç hafta sonra tekrar yükünü çok artırır.</p>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {[10, 15, 20].map((n) => (
                <button
                  key={n}
                  onClick={() => setSettings({ dailyNew: n })}
                  aria-pressed={settings.dailyNew === n}
                  className={`min-h-12 rounded-xl border-2 text-lg font-semibold ${settings.dailyNew === n ? 'border-ink bg-ink text-paper' : 'border-line bg-surface'}`}
                >
                  {n}
                </button>
              ))}
            </div>
          </fieldset>

          <label className="mt-8 block">
            <span className="font-semibold">Kursta şu an hangi gramer konusundasınız?</span>
            <span className="block text-sm text-muted">Netzwerk neu'de işlediğiniz konuyu seçersen her gün ondan da soru gelir. Sonra Ayarlar'dan değiştirebilirsin.</span>
            <select
              value={settings.courseTopic ?? ''}
              onChange={(e) => setSettings({ courseTopic: e.target.value || null })}
              className="mt-3 min-h-12 w-full rounded-xl border-2 border-line bg-surface px-3"
            >
              <option value="">Seçmiyorum</option>
              {TOPICS.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.level}: {t.titleTr}
                </option>
              ))}
            </select>
          </label>

          <div className="mt-auto pt-10">
            <Btn className="w-full" onClick={() => setStep(2)}>
              Devam
            </Btn>
          </div>
        </section>
      )}

      {step === 2 && (
        <section className="flex flex-1 flex-col pt-10">
          <h1 className="font-display text-4xl font-bold leading-tight">Neyi unuttuğunu bulalım</h1>
          <p className="mt-4 text-lg">
            30 kısa soruluk seviye testi A2'nin 10 temel konusunu yoklar. Sonuca göre ilk 3 hafta önce zayıf konularına odaklanır.
          </p>
          <p className="mt-3 text-muted">Yaklaşık 10 dakika sürer. Bilmediğin soruda tahmin etme; en mantıklı geleni seç ve geç.</p>
          <div className="mt-auto space-y-2.5 pt-10">
            <Btn className="w-full" onClick={() => nav('/seviye-testi')}>
              Teste başla
            </Btn>
            <Btn variant="quiet" className="w-full" onClick={finishOnboarding}>
              Testi sonra yap
            </Btn>
          </div>
        </section>
      )}
    </Page>
  )
}
