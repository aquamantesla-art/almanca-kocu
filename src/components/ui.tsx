import { useNavigate } from 'react-router-dom'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import type { Article } from '../content/types'
import { speak, ttsAvailable } from '../lib/platform'

type Variant = 'primary' | 'secondary' | 'ghost' | 'quiet'

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-signal text-signal-ink font-semibold active:brightness-95',
  secondary: 'bg-surface text-ink border-2 border-ink font-semibold active:bg-sunken',
  ghost: 'text-ink font-medium underline-offset-4 hover:underline',
  quiet: 'bg-sunken text-ink font-medium active:brightness-95',
}

export function Btn({
  variant = 'primary',
  className = '',
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 text-[1.05rem] transition disabled:opacity-40 ${VARIANTS[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}

export function TopBar({ title, back = true, right }: { title: string; back?: boolean | string; right?: ReactNode }) {
  const nav = useNavigate()
  return (
    <header className="pt-safe sticky top-0 z-20 border-b border-line bg-paper/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-xl items-center gap-2 px-4">
        {back && (
          <button
            aria-label="Geri"
            className="-ml-2 flex h-10 w-10 items-center justify-center rounded-full active:bg-sunken"
            onClick={() => (typeof back === 'string' ? nav(back) : nav(-1))}
          >
            <Icon name="back" />
          </button>
        )}
        <h1 className="font-display min-w-0 flex-1 truncate text-xl font-bold">{title}</h1>
        {right}
      </div>
    </header>
  )
}

export function Page({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <main className={`mx-auto w-full max-w-xl px-4 pb-28 ${className}`}>{children}</main>
}

const ART_COLOR: Record<Article, string> = { der: 'text-der', die: 'text-die', das: 'text-das' }

export function articleColor(art?: Article | 'pl') {
  if (!art) return ''
  return art === 'pl' ? 'text-pl' : ART_COLOR[art]
}

/** German noun with its article in the gender colour (der blue, die red, das green) */
export function GermanWord({ art, word, plural, className = '' }: { art?: Article; word: string; plural?: string; className?: string }) {
  return (
    <span className={className}>
      {art && <span className={`${ART_COLOR[art]} font-semibold`}>{art} </span>}
      <span className={art ? `${ART_COLOR[art]} font-semibold` : ''}>{word}</span>
      {plural && plural !== '–' && <span className="text-pl font-normal">, die {plural}</span>}
    </span>
  )
}

export function SpeakButton({ text, label = 'Dinle', rate = 1, small = false }: { text: string; label?: string; rate?: number; small?: boolean }) {
  if (!ttsAvailable()) return null
  return (
    <button
      type="button"
      aria-label={`${label}: ${text}`}
      onClick={(e) => {
        e.stopPropagation()
        void speak(text, rate)
      }}
      className={`inline-flex items-center justify-center rounded-full bg-sunken text-ink active:brightness-95 ${small ? 'h-9 w-9' : 'h-11 w-11'}`}
    >
      <Icon name="speaker" size={small ? 18 : 22} />
    </button>
  )
}

const UMLAUTS = ['ä', 'ö', 'ü', 'ß', 'Ä', 'Ö', 'Ü']

/** Turkish keyboards lack ä and ß: tap to insert into the last focused field */
export function UmlautBar({ onInsert }: { onInsert: (ch: string) => void }) {
  return (
    <div className="flex flex-wrap gap-1.5" aria-label="Almanca harfler">
      {UMLAUTS.map((c) => (
        <button
          key={c}
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => onInsert(c)}
          className="h-9 min-w-9 rounded-lg border border-line bg-surface px-2 font-semibold active:bg-sunken"
        >
          {c}
        </button>
      ))}
    </div>
  )
}

export function Progress({ value, max, className = '' }: { value: number; max: number; className?: string }) {
  const pct = max > 0 ? Math.min(100, (value / max) * 100) : 0
  return (
    <div className={`h-2 overflow-hidden rounded-full bg-sunken ${className}`} role="progressbar" aria-valuenow={Math.round(pct)} aria-valuemin={0} aria-valuemax={100}>
      <div className="h-full rounded-full bg-ink transition-[width]" style={{ width: `${pct}%` }} />
    </div>
  )
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-2xl bg-surface p-4 ${className}`}>{children}</div>
}

const PATHS: Record<string, ReactNode> = {
  back: <path d="M15 5l-7 7 7 7" />,
  next: <path d="M9 5l7 7-7 7" />,
  speaker: (
    <>
      <path d="M4 9v6h4l5 4V5L8 9H4z" />
      <path d="M16.5 8.5a5 5 0 010 7M19 6a8.5 8.5 0 010 12" />
    </>
  ),
  today: (
    <>
      <circle cx="12" cy="5" r="2.2" />
      <circle cx="12" cy="19" r="2.2" />
      <path d="M12 7.2v9.6" />
    </>
  ),
  practice: (
    <>
      <rect x="4" y="5" width="16" height="14" rx="2.5" />
      <path d="M8 10h8M8 14h5" />
    </>
  ),
  chart: <path d="M5 19V11M12 19V5M19 19v-6" />,
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
    </>
  ),
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  external: (
    <>
      <path d="M14 5h5v5M19 5l-8 8" />
      <path d="M17 14v4a1 1 0 01-1 1H6a1 1 0 01-1-1V8a1 1 0 011-1h4" />
    </>
  ),
  flame: <path d="M12 3c1 3.5 5 5.5 5 10a5 5 0 01-10 0c0-2 1-3.5 2-4.5.3 1.6 1 2.6 2 3 0-3 0-5.5 1-8.5z" />,
  mic: (
    <>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5.5 11a6.5 6.5 0 0013 0M12 17.5V21" />
    </>
  ),
  stop: <rect x="7" y="7" width="10" height="10" rx="1.5" />,
  play: <path d="M8 5.5v13l10-6.5-10-6.5z" />,
  copy: (
    <>
      <rect x="8" y="8" width="11" height="12" rx="2" />
      <path d="M5 15V6a2 2 0 012-2h8" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  book: (
    <>
      <path d="M5 4.5h9a3 3 0 013 3V20H8a3 3 0 01-3-3z" />
      <path d="M17 20H8a3 3 0 01-3-3" />
    </>
  ),
  trash: <path d="M5 7h14M10 7V5h4v2M7 7l1 12h8l1-12" />,
}

export function Icon({ name, size = 22, className = '' }: { name: keyof typeof PATHS | string; size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {PATHS[name]}
    </svg>
  )
}
