import { useEffect, useRef, useState } from 'react'
import type { WritingPrompt } from '../../content/types'
import { useApp, type CustomCard } from '../../lib/store'
import { copyText, openLink } from '../../lib/platform'
import { countWords } from '../../lib/answer'
import { dateKey } from '../../lib/date'
import type { DayPlan } from '../../lib/program'
import { Btn, Icon, UmlautBar } from '../../components/ui'

function correctionPrompt(p: WritingPrompt, text: string) {
  return `Sen deneyimli bir Almanca öğretmenisin. Ben Türküm, seviyem A2 ile B1 arası. Aşağıdaki Almanca metnimi düzelt.

Görev: ${p.title} – ${p.task}
Kullanmam gereken yapılar: ${p.targets}

Lütfen şöyle cevap ver:
1. Metnimin düzeltilmiş hâli (anlamı değiştirmeden, B1 seviyesinde doğal Almanca).
2. Bir tablo: Benim cümlem | Doğrusu | Kısa açıklama (Türkçe). En önemli hatalarla başla.
3. Hedef yapıları doğru kullanmış mıyım? Kısa değerlendirme.
4. Metni daha doğal yapacak 2 ifade önerisi (Almanca + Türkçe anlamı).
Kısa ve net yaz.

Metnim:
"""
${text.trim()}
"""`
}

function readDraft(id: string) {
  try {
    return localStorage.getItem(`draft:${id}`) ?? ''
  } catch {
    return ''
  }
}

export function YazmaBlock({ plan }: { plan: DayPlan }) {
  return <WritingTask prompt={plan.writing} />
}

export function WritingTask({ prompt }: { prompt: WritingPrompt }) {
  const saveWriting = useApp((s) => s.saveWriting)
  const [text, setText] = useState(() => readDraft(prompt.id))
  const [copied, setCopied] = useState(false)
  const [saved, setSaved] = useState(false)
  const ta = useRef<HTMLTextAreaElement>(null)
  const words = countWords(text)

  useEffect(() => {
    try {
      localStorage.setItem(`draft:${prompt.id}`, text)
    } catch {
      /* drafts are a convenience */
    }
  }, [text, prompt.id])

  const insert = (ch: string) => {
    const el = ta.current
    if (!el) return
    const start = el.selectionStart
    const end = el.selectionEnd
    setText(text.slice(0, start) + ch + text.slice(end))
    requestAnimationFrame(() => {
      el.focus()
      el.setSelectionRange(start + ch.length, start + ch.length)
    })
  }

  return (
    <div>
      <p className="text-sm text-muted">Günün yazma görevi</p>
      <h2 className="font-display text-3xl font-bold leading-tight">{prompt.title}</h2>
      <p className="mt-2">{prompt.task}</p>
      <p className="mt-3 rounded-xl bg-surface px-3 py-2 text-sm">
        <strong>Hedef:</strong> {prompt.targets}. En az {prompt.minWords} kelime.
      </p>
      <p className="mt-3 text-sm text-muted">Sözlüğe bakmadan önce kendin dene. Kuramadığın cümle tam da öğrenmen gereken şey.</p>

      {prompt.starter && !text && (
        <button onClick={() => setText(prompt.starter + ' ')} className="mt-4 text-left text-sm underline underline-offset-4">
          Başlangıç cümlesini kullan: „{prompt.starter}“
        </button>
      )}

      <textarea
        ref={ta}
        value={text}
        onChange={(e) => {
          setText(e.target.value)
          setSaved(false)
        }}
        rows={9}
        lang="de"
        spellCheck={false}
        placeholder="Almanca yaz…"
        className="mt-3 w-full rounded-2xl border-2 border-line bg-surface p-4 text-[1.08rem] leading-relaxed outline-none focus:border-ink"
      />
      <div className="mt-2 flex items-center justify-between gap-3">
        <UmlautBar onInsert={insert} />
        <span className={`shrink-0 text-sm tabular-nums ${words >= prompt.minWords ? 'font-semibold text-ok' : 'text-muted'}`}>
          {words}/{prompt.minWords}
        </span>
      </div>

      <section className="mt-8">
        <h3 className="font-display text-xl font-bold">Düzelttir</h3>
        <p className="mt-1 text-sm text-muted">
          Metnini ve hazır öğretmen talimatını kopyala, ChatGPT ya da Gemini'ye yapıştır. Ücretsiz hesap yeterli.
        </p>
        <Btn
          className="mt-3 w-full"
          disabled={words < 5}
          onClick={async () => {
            const ok = await copyText(correctionPrompt(prompt, text))
            setCopied(ok)
            if (!saved) {
              saveWriting({ date: dateKey(), promptId: prompt.id, text })
              setSaved(true)
            }
          }}
        >
          <Icon name="copy" /> {copied ? 'Kopyalandı' : 'Metni ve talimatı kopyala'}
        </Btn>
        <div className="mt-2.5 grid grid-cols-2 gap-2.5">
          <Btn variant="secondary" onClick={() => openLink('https://chatgpt.com/')}>
            ChatGPT
          </Btn>
          <Btn variant="secondary" onClick={() => openLink('https://gemini.google.com/app')}>
            Gemini
          </Btn>
        </div>
      </section>

      <FixForm />
    </div>
  )
}

export function FixForm() {
  const addCustom = useApp((s) => s.addCustom)
  const [wrong, setWrong] = useState('')
  const [right, setRight] = useState('')
  const [note, setNote] = useState('')
  const [added, setAdded] = useState<CustomCard[]>([])
  return (
    <section className="mt-8">
      <h3 className="font-display text-xl font-bold">Hata defterine ekle</h3>
      <p className="mt-1 text-sm text-muted">Düzeltmeden en çok öğrendiğin 2–3 cümleyi ekle. Kelime kartlarının arasında tekrar karşına çıkar.</p>
      <form
        className="mt-3 space-y-2.5"
        onSubmit={(e) => {
          e.preventDefault()
          if (!wrong.trim() || !right.trim()) return
          const c: CustomCard = { id: `f${Date.now()}`, kind: 'fix', wrong: wrong.trim(), right: right.trim(), note: note.trim(), created: Date.now() }
          addCustom(c)
          setAdded([...added, c])
          setWrong('')
          setRight('')
          setNote('')
        }}
      >
        <input value={wrong} onChange={(e) => setWrong(e.target.value)} placeholder="Benim cümlem (yanlış)" className="min-h-12 w-full rounded-xl border-2 border-line bg-surface px-3" />
        <input value={right} onChange={(e) => setRight(e.target.value)} placeholder="Doğrusu" className="min-h-12 w-full rounded-xl border-2 border-line bg-surface px-3" />
        <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Kısa not (isteğe bağlı)" className="min-h-12 w-full rounded-xl border-2 border-line bg-surface px-3" />
        <Btn type="submit" variant="quiet" className="w-full" disabled={!wrong.trim() || !right.trim()}>
          <Icon name="plus" /> Ekle
        </Btn>
      </form>
      {added.length > 0 && (
        <ul className="mt-3 space-y-2">
          {added.map((c) =>
            c.kind === 'fix' ? (
              <li key={c.id} className="rounded-xl bg-surface p-3 text-sm">
                <span className="text-bad line-through">{c.wrong}</span>
                <br />
                <span className="font-semibold text-ok">{c.right}</span>
              </li>
            ) : null,
          )}
        </ul>
      )}
    </section>
  )
}
