import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { TOPICS } from '../content/grammar'
import { exportData, useApp, type ThemePref } from '../lib/store'
import { copyText, isNative, openLink, speak } from '../lib/platform'
import { dateKey } from '../lib/date'
import { APK_URL, WEB_URL } from '../config'
import { Btn, Page } from '../components/ui'

function Segmented<T extends string | number>({ value, options, onChange, label }: { value: T; options: { v: T; l: string }[]; onChange: (v: T) => void; label: string }) {
  return (
    <div className="mt-2 flex rounded-xl bg-sunken p-1" role="group" aria-label={label}>
      {options.map((o) => (
        <button
          key={String(o.v)}
          aria-pressed={value === o.v}
          onClick={() => onChange(o.v)}
          className={`min-h-10 flex-1 rounded-lg text-sm font-semibold ${value === o.v ? 'bg-surface' : 'text-muted'}`}
        >
          {o.l}
        </button>
      ))}
    </div>
  )
}

export function SettingsScreen() {
  const settings = useApp((s) => s.settings)
  const setSettings = useApp((s) => s.setSettings)
  const importData = useApp((s) => s.importData)
  const resetAll = useApp((s) => s.resetAll)
  const placementDone = useApp((s) => s.placement.done)
  const [msg, setMsg] = useState('')
  const [paste, setPaste] = useState('')
  const [confirmReset, setConfirmReset] = useState(false)
  const file = useRef<HTMLInputElement>(null)

  const doImport = (json: string) => {
    try {
      importData(json)
      setMsg('Yedek geri yüklendi.')
      setPaste('')
    } catch (e) {
      setMsg(e instanceof Error ? e.message : 'Dosya okunamadı.')
    }
  }

  const download = () => {
    const blob = new Blob([exportData()], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `almanca-kocu-yedek-${dateKey()}.json`
    a.click()
    URL.revokeObjectURL(a.href)
  }

  return (
    <Page className="pt-safe">
      <h1 className="font-display pt-6 text-4xl font-bold">Ayarlar</h1>

      <section className="mt-7 space-y-7">
        <div>
          <p className="font-semibold">Günde yeni kelime: {settings.dailyNew}</p>
          <input
            type="range"
            min={5}
            max={30}
            step={5}
            value={settings.dailyNew}
            onChange={(e) => setSettings({ dailyNew: Number(e.target.value) })}
            className="mt-2 w-full accent-[var(--ink)]"
            aria-label="Günde yeni kelime"
          />
          <p className="text-sm text-muted">Tekrarlar birikirse bunu düşür. Tekrar yükü yeni kelime sayısının yaklaşık 5–7 katı olur.</p>
        </div>

        <div>
          <p className="font-semibold">Hedef hatırlama oranı</p>
          <Segmented
            label="Hedef hatırlama oranı"
            value={settings.retention}
            onChange={(v) => setSettings({ retention: v })}
            options={[
              { v: 0.85, l: '%85' },
              { v: 0.9, l: '%90' },
              { v: 0.95, l: '%95' },
            ]}
          />
          <p className="mt-1 text-sm text-muted">%90 önerilir. %95 daha sık tekrar demek, zaman kısıtlıysa verimsiz.</p>
        </div>

        <div>
          <p className="font-semibold">Seslendirme hızı</p>
          <Segmented
            label="Seslendirme hızı"
            value={settings.ttsRate}
            onChange={(v) => setSettings({ ttsRate: v })}
            options={[
              { v: 0.75, l: 'Yavaş' },
              { v: 0.9, l: 'Orta' },
              { v: 1, l: 'Normal' },
            ]}
          />
          <Btn variant="quiet" className="mt-2" onClick={() => void speak('Guten Tag! Wie geht es dir? Ich lerne jeden Tag ein bisschen Deutsch.')}>
            Sesi dene
          </Btn>
          {isNative && <p className="mt-1 text-sm text-muted">Ses gelmiyorsa telefon ayarlarından "Metin okuma" motoruna Almanca dil paketini indir.</p>}
        </div>

        <div>
          <p className="font-semibold">Görünüm</p>
          <Segmented<ThemePref>
            label="Tema"
            value={settings.theme}
            onChange={(v) => setSettings({ theme: v })}
            options={[
              { v: 'system', l: 'Sistem' },
              { v: 'light', l: 'Açık' },
              { v: 'dark', l: 'Koyu' },
            ]}
          />
        </div>

        <label className="block">
          <span className="font-semibold">Kursta şu an işlenen konu</span>
          <span className="block text-sm text-muted">Netzwerk neu'de yeni konuya geçince burayı güncelle. Her gün bu konudan da 3 soru gelir.</span>
          <select
            value={settings.courseTopic ?? ''}
            onChange={(e) => setSettings({ courseTopic: e.target.value || null })}
            className="mt-2 min-h-12 w-full rounded-xl border-2 border-line bg-surface px-3"
          >
            <option value="">Seçili değil</option>
            {TOPICS.map((t) => (
              <option key={t.id} value={t.id}>
                {t.level}: {t.titleTr}
              </option>
            ))}
          </select>
        </label>

        <div>
          <p className="font-semibold">Seviye testi</p>
          <p className="text-sm text-muted">{placementDone ? 'Yapıldı. Tekrar yaparsan ilk 3 haftanın sırası yeni sonuca göre değişir.' : 'Henüz yapılmadı.'}</p>
          <Link to="/seviye-testi" className="mt-2 inline-flex min-h-12 items-center rounded-xl bg-sunken px-5 font-medium">
            {placementDone ? 'Testi tekrar yap' : 'Teste başla'}
          </Link>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl font-bold">Yedek</h2>
        <p className="mt-1 text-sm text-muted">
          İlerlemen sadece bu cihazda saklanır. Telefon değiştirirken ya da uygulamayı silmeden önce yedek al.
        </p>
        <div className="mt-3 grid gap-2.5">
          {!isNative && (
            <Btn variant="secondary" onClick={download}>
              Yedeği dosya olarak indir
            </Btn>
          )}
          <Btn
            variant="secondary"
            onClick={async () => {
              const ok = await copyText(exportData())
              setMsg(ok ? 'Yedek panoya kopyalandı. Bir nota ya da kendine mesaj olarak yapıştır.' : 'Kopyalanamadı.')
            }}
          >
            Yedeği panoya kopyala
          </Btn>
          <Btn variant="quiet" onClick={() => file.current?.click()}>
            Dosyadan geri yükle
          </Btn>
          <input
            ref={file}
            type="file"
            accept="application/json,.json"
            className="hidden"
            onChange={async (e) => {
              const f = e.target.files?.[0]
              if (f) doImport(await f.text())
              e.target.value = ''
            }}
          />
          <textarea
            value={paste}
            onChange={(e) => setPaste(e.target.value)}
            placeholder="ya da yedek metnini buraya yapıştır"
            rows={2}
            className="w-full rounded-xl border-2 border-line bg-surface p-3 text-sm"
          />
          {paste.trim() && (
            <Btn variant="quiet" onClick={() => doImport(paste)}>
              Yapıştırılan yedeği yükle
            </Btn>
          )}
          {msg && (
            <p className="text-sm font-semibold" role="status">
              {msg}
            </p>
          )}
        </div>
      </section>

      {(APK_URL || WEB_URL) && (
        <section className="mt-10">
          <h2 className="font-display text-xl font-bold">Paylaş ve indir</h2>
          <div className="mt-3 grid gap-2.5">
            {APK_URL && !isNative && (
              <Btn variant="secondary" onClick={() => openLink(APK_URL)}>
                Android uygulamasını indir (APK)
              </Btn>
            )}
            {WEB_URL && (
              <Btn
                variant="secondary"
                onClick={async () => {
                  const ok = await copyText(WEB_URL)
                  setMsg(ok ? 'Bağlantı kopyalandı.' : WEB_URL)
                }}
              >
                Uygulama bağlantısını kopyala
              </Btn>
            )}
          </div>
        </section>
      )}

      <section className="mt-10">
        <h2 className="font-display text-xl font-bold">Yöntem</h2>
        <p className="mt-2 text-[0.95rem]">
          Program dört çizgiye dayanır: anlama odaklı girdi (dinle, oku), anlam odaklı çıktı (yaz, konuş), dil odaklı çalışma (kelime, gramer) ve akıcılık. Kelimeler FSRS algoritmasıyla
          tekrar edilir; gramer soruları konular karışık gelecek şekilde seçilir; artikeller renk kodludur.
        </p>
      </section>

      <section className="mt-10 mb-6">
        <h2 className="font-display text-xl font-bold text-bad">Sıfırla</h2>
        {!confirmReset ? (
          <Btn variant="quiet" className="mt-3" onClick={() => setConfirmReset(true)}>
            Tüm ilerlemeyi sil
          </Btn>
        ) : (
          <div className="mt-3 rounded-2xl bg-bad-bg p-4">
            <p className="font-semibold">Kartlar, süreler ve notların hepsi silinecek. Geri alınamaz.</p>
            <div className="mt-3 flex gap-2.5">
              <Btn variant="secondary" onClick={() => setConfirmReset(false)}>
                Vazgeç
              </Btn>
              <button
                onClick={() => {
                  resetAll()
                  setConfirmReset(false)
                }}
                className="min-h-12 rounded-xl bg-bad px-5 font-semibold text-white"
              >
                Evet, sil
              </button>
            </div>
          </div>
        )}
      </section>
    </Page>
  )
}
