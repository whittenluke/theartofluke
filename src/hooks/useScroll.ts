import { useState, useEffect, useCallback } from 'react'

interface ScrollState {
  y: number
  lastY: number
  direction: 'up' | 'down' | null
  progress: number
}

interface ScrollOptions {
  threshold?: number    
}

export function useScroll(options: ScrollOptions = {}) {
  const { threshold = 0 } = options

  const [state, setState] = useState<ScrollState>({
    y: typeof window !== 'undefined' ? window.scrollY : 0,
    lastY: 0,
    direction: null,
    progress: 0,
  })

  const handleScroll = useCallback(() => {
    const window = globalThis.window
    const document = globalThis.document

    if (!window || !document) return

    setState(prev => {
      const currentY = window.scrollY
      const diff = Math.abs(currentY - prev.y)
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = maxScroll ? currentY / maxScroll : 0

      const direction = diff >= threshold
        ? currentY > prev.y ? 'down' : 'up'
        : prev.direction

      return {
        y: currentY,
        lastY: prev.y,
        direction,
        progress,
      }
    })
  }, [threshold])

  useEffect(() => {
    const window = globalThis.window
    if (!window) return

    // Use passive event listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return state
}
