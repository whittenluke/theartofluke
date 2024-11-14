import { useState, useEffect, useCallback, useRef } from 'react'

interface ScrollState {
  y: number
  lastY: number
  direction: 'up' | 'down' | null
  progress: number
}

interface ScrollOptions {
  threshold?: number
  throttleMs?: number    
}

export function useScroll(options: ScrollOptions = {}) {
  const { threshold = 0, throttleMs = 16 } = options
  const lastRun = useRef(0)

  const [state, setState] = useState<ScrollState>({
    y: typeof window !== 'undefined' ? window.scrollY : 0,
    lastY: 0,
    direction: null,
    progress: 0,
  })

  const handleScroll = useCallback(() => {
    const window = globalThis.window
    const document = globalThis.document
    const now = Date.now()

    if (!window || !document) return
    if (now - lastRun.current < throttleMs) return

    lastRun.current = now

    setState(prev => {
      const currentY = window.scrollY
      const diff = Math.abs(currentY - prev.y)

      const direction = diff >= threshold
        ? currentY > prev.y ? 'down' : 'up'
        : prev.direction || 'up'

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = maxScroll ? currentY / maxScroll : 0

      return {
        y: currentY,
        lastY: prev.y,
        direction,
        progress,
      }
    })
  }, [threshold, throttleMs])

  useEffect(() => {
    const window = globalThis.window
    if (!window) return

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return state
}
