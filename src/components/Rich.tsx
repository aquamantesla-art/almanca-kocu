import { Fragment, type ReactNode } from 'react'

const COLOR: Record<string, string> = { m: 'text-der', f: 'text-die', n: 'text-das', p: 'text-pl' }

/** Inline markup: **bold**, ==highlight==, {m:der Mann} {f:…} {n:…} {p:…} article colors */
export function inline(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|==[^=]+==|\{[mfnp]:[^}]+\})/g)
  return parts.map((p, i) => {
    if (p.startsWith('**') && p.endsWith('**')) return <strong key={i}>{inline(p.slice(2, -2))}</strong>
    if (p.startsWith('==') && p.endsWith('==')) return <mark key={i}>{p.slice(2, -2)}</mark>
    const m = /^\{([mfnp]):([^}]+)\}$/.exec(p)
    if (m)
      return (
        <span key={i} className={`font-semibold ${COLOR[m[1]]}`}>
          {inline(m[2])}
        </span>
      )
    return <Fragment key={i}>{p}</Fragment>
  })
}

function Table({ rows }: { rows: string[] }) {
  const cells = rows
    .filter((r) => !/^\|\s*-+/.test(r))
    .map((r) =>
      r
        .replace(/^\|/, '')
        .replace(/\|$/, '')
        .split('|')
        .map((c) => c.trim()),
    )
  const [head, ...body] = cells
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            {head.map((c, i) => (
              <th key={i}>{inline(c)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((r, i) => (
            <tr key={i}>
              {r.map((c, j) => (
                <td key={j}>{inline(c)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/** Tiny block renderer for lesson text: ### headings, - lists, | tables |, > tips, paragraphs */
export function Rich({ text, className = '' }: { text: string; className?: string }) {
  const lines = text.split('\n')
  const blocks: ReactNode[] = []
  let i = 0
  while (i < lines.length) {
    const line = lines[i]
    if (!line.trim()) {
      i++
      continue
    }
    if (line.startsWith('### ')) {
      blocks.push(<h3 key={i}>{inline(line.slice(4))}</h3>)
      i++
    } else if (line.trim().startsWith('|')) {
      const rows: string[] = []
      while (i < lines.length && lines[i].trim().startsWith('|')) rows.push(lines[i++].trim())
      blocks.push(<Table key={i} rows={rows} />)
    } else if (/^\s*- /.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^\s*- /.test(lines[i])) items.push(lines[i++].replace(/^\s*- /, ''))
      blocks.push(
        <ul key={i}>
          {items.map((it, j) => (
            <li key={j}>{inline(it)}</li>
          ))}
        </ul>,
      )
    } else if (line.startsWith('> ')) {
      blocks.push(
        <div key={i} className="tip">
          {inline(line.slice(2))}
        </div>,
      )
      i++
    } else {
      const para: string[] = []
      while (
        i < lines.length &&
        lines[i].trim() &&
        !lines[i].startsWith('### ') &&
        !lines[i].trim().startsWith('|') &&
        !/^\s*- /.test(lines[i]) &&
        !lines[i].startsWith('> ')
      )
        para.push(lines[i++])
      blocks.push(
        <p key={i}>
          {para.map((p, j) => (
            <Fragment key={j}>
              {j > 0 && <br />}
              {inline(p)}
            </Fragment>
          ))}
        </p>,
      )
    }
  }
  return <div className={`rich ${className}`}>{blocks}</div>
}
