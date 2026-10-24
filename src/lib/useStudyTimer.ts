import { useEffect, useRef, useState } from 'react'
import { useApp, type BlockId, type Strand } from './store'

/**
 * Counts seconds while the page is visible and writes them to the time log every 15 s and on unmount.
 * Inside a session block the seconds also count towards that block.
 */
export function useStudyTimer(strand: Strand, block?: BlockId, active = true): number {
  const [elapsed, setElapsed] = useState(0)
  const pending = useRef(0)
  const opts = useRef({ strand, block })
  opts.current = { strand, block }

  useEffect(() => {
    const flush = () => {
      const sec = pending.current
      if (sec <= 0) return
      pending.current = 0
      const { strand: st, block: bl } = opts.current
      const s = useApp.getState()
      if (bl && s.session) s.addBlockTime(bl, sec)
      else s.logTime(st, sec)
    }
    const tick = window.setInterval(() => {
      if (!active || document.visibilityState !== 'visible') return
      pending.current += 1
      setElapsed((e) => e + 1)
      if (pending.current >= 15) flush()
    }, 1000)
    const onHide = () => {
      if (document.visibilityState !== 'visible') flush()
    }
    document.addEventListener('visibilitychange', onHide)
    return () => {
      window.clearInterval(tick)
      document.removeEventListener('visibilitychange', onHide)
      flush()
    }
  }, [active])

  return elapsed
}
