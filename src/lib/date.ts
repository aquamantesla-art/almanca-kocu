const pad = (n: number) => String(n).padStart(2, '0')

/** Local calendar date as YYYY-MM-DD */
export function dateKey(d: Date = new Date()): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

export function parseKey(key: string): Date {
  const [y, m, d] = key.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function addDays(d: Date, n: number): Date {
  const r = new Date(d)
  r.setDate(r.getDate() + n)
  return r
}

/** Monday of the week containing d */
export function weekStart(d: Date = new Date()): Date {
  const r = new Date(d.getFullYear(), d.getMonth(), d.getDate())
  const dow = (r.getDay() + 6) % 7
  return addDays(r, -dow)
}

/** The 7 date keys Monday..Sunday of the current week */
export function currentWeekKeys(d: Date = new Date()): string[] {
  const start = weekStart(d)
  return Array.from({ length: 7 }, (_, i) => dateKey(addDays(start, i)))
}

export function formatMinutes(sec: number): string {
  const m = Math.round(sec / 60)
  if (m < 60) return `${m} dk`
  const h = Math.floor(m / 60)
  const rest = m % 60
  return rest ? `${h} sa ${rest} dk` : `${h} sa`
}

export function formatClock(sec: number): string {
  const s = Math.max(0, Math.round(sec))
  return `${Math.floor(s / 60)}:${pad(s % 60)}`
}

const DAY_NAMES = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi']
export function dayName(d: Date): string {
  return DAY_NAMES[d.getDay()]
}
