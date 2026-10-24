import { LINK_GROUPS, NICOS_B1 } from '../content/resources'
import { useApp } from '../lib/store'
import { openLink } from '../lib/platform'
import { Icon, Page, Progress, TopBar } from '../components/ui'

export function Resources() {
  const nicosDone = useApp((s) => s.nicosDone)
  const toggleNicos = useApp((s) => s.toggleNicos)

  return (
    <>
      <TopBar title="Kaynaklar" />
      <Page className="pt-4">
        <p className="text-muted">Hepsi ücretsiz. Günlük planın bunlardan her gün birini sırayla önerir.</p>

        {LINK_GROUPS.map((g) => (
          <section key={g.title} className="mt-7">
            <h2 className="font-display mb-2 text-xl font-bold">{g.title}</h2>
            <ul className="divide-y divide-line overflow-hidden rounded-2xl bg-surface">
              {g.items.map((it) => (
                <li key={it.url}>
                  <button onClick={() => openLink(it.url)} className="flex w-full items-center gap-3 px-4 py-3 text-left active:bg-sunken">
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold">{it.name}</span>
                      <span className="block text-sm text-muted">{it.what}</span>
                    </span>
                    <Icon name="external" size={18} className="shrink-0 text-muted" />
                  </button>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <section className="mt-9">
          <div className="flex items-baseline justify-between">
            <h2 className="font-display text-xl font-bold">Nicos Weg B1 dersleri</h2>
            <span className="text-sm tabular-nums text-muted">
              {nicosDone.length}/{NICOS_B1.length}
            </span>
          </div>
          <Progress value={nicosDone.length} max={NICOS_B1.length} className="mt-2" />
          <ol className="mt-4 divide-y divide-line overflow-hidden rounded-2xl bg-surface">
            {NICOS_B1.map((l) => {
              const done = nicosDone.includes(l.id)
              return (
                <li key={l.id} className="flex items-center gap-2 pr-2">
                  <button
                    aria-label={done ? 'İzlenmedi olarak işaretle' : 'İzlendi olarak işaretle'}
                    aria-pressed={done}
                    onClick={() => toggleNicos(l.id)}
                    className="flex h-12 w-12 shrink-0 items-center justify-center"
                  >
                    <span className={`flex h-6 w-6 items-center justify-center rounded-md border-2 ${done ? 'border-ink bg-ink text-paper' : 'border-line'}`}>
                      {done && <Icon name="check" size={16} />}
                    </span>
                  </button>
                  <button onClick={() => openLink(l.url)} className="flex min-w-0 flex-1 items-center gap-2 py-2.5 text-left">
                    <span className="w-7 shrink-0 text-sm tabular-nums text-muted">{l.n}</span>
                    <span className="min-w-0 flex-1">
                      <span className={`block font-medium ${done ? 'text-muted' : ''}`}>{l.title}</span>
                      {l.grammar && <span className="block truncate text-sm text-muted">{l.grammar}</span>}
                    </span>
                    <Icon name="external" size={16} className="shrink-0 text-muted" />
                  </button>
                </li>
              )
            })}
          </ol>
        </section>
      </Page>
    </>
  )
}
