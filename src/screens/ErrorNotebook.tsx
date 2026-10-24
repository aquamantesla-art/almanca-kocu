import { useApp } from '../lib/store'
import { FixForm } from './blocks/YazmaBlock'
import { AddWord } from './blocks/GirdiBlock'
import { GermanWord, Icon, Page, TopBar } from '../components/ui'

export function ErrorNotebook() {
  const custom = useApp((s) => s.custom)
  const removeCustom = useApp((s) => s.removeCustom)
  const items = Object.values(custom).sort((a, b) => b.created - a.created)
  const fixes = items.filter((c) => c.kind === 'fix')
  const words = items.filter((c) => c.kind === 'word')

  return (
    <>
      <TopBar title="Hata defteri" />
      <Page className="pt-4">
        <p className="text-muted">Yazılarından çıkan düzeltmeler ve kendi eklediğin kelimeler. Hepsi kelime kartlarıyla birlikte aralıklı tekrar edilir.</p>

        <section className="mt-6">
          <h2 className="font-display text-xl font-bold">Düzeltmeler ({fixes.length})</h2>
          {fixes.length === 0 ? (
            <p className="mt-2 text-sm text-muted">Henüz yok. Yazma bloğunda düzeltilmiş cümlelerini buraya ekle.</p>
          ) : (
            <ul className="mt-3 space-y-2">
              {fixes.map((c) =>
                c.kind === 'fix' ? (
                  <li key={c.id} className="flex gap-3 rounded-2xl bg-surface p-4">
                    <div className="min-w-0 flex-1">
                      <p className="text-bad line-through">{c.wrong}</p>
                      <p className="font-semibold text-ok">{c.right}</p>
                      {c.note && <p className="mt-1 text-sm text-muted">{c.note}</p>}
                    </div>
                    <button aria-label="Sil" onClick={() => removeCustom(c.id)} className="h-9 w-9 shrink-0 rounded-full text-muted active:bg-sunken">
                      <Icon name="trash" size={18} className="mx-auto" />
                    </button>
                  </li>
                ) : null,
              )}
            </ul>
          )}
        </section>

        <section className="mt-8">
          <h2 className="font-display text-xl font-bold">Eklediğin kelimeler ({words.length})</h2>
          {words.length > 0 && (
            <ul className="mt-3 divide-y divide-line rounded-2xl bg-surface">
              {words.map((c) =>
                c.kind === 'word' ? (
                  <li key={c.id} className="flex items-center gap-3 px-4 py-3">
                    <span className="min-w-0 flex-1">
                      <GermanWord art={c.art} word={c.de} className="font-semibold" />
                      <span className="block text-sm text-muted">{c.tr}</span>
                    </span>
                    <button aria-label="Sil" onClick={() => removeCustom(c.id)} className="h-9 w-9 rounded-full text-muted active:bg-sunken">
                      <Icon name="trash" size={18} className="mx-auto" />
                    </button>
                  </li>
                ) : null,
              )}
            </ul>
          )}
          <div className="mt-4">
            <AddWord />
          </div>
        </section>

        <FixForm />
      </Page>
    </>
  )
}
