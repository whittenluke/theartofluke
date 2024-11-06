import { useState, useEffect, useCallback } from 'react'

interface ScrollState {
  y: number
  lastY: number
  direction: 'up' | 'down' | null
  progress: number
}

interface ScrollOptions {
  threshold?: number    
  delay?: number       
}

export function useScroll(options: ScrollOptions = {}) {
  const { threshold = 10, delay = 50 } = options

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

    const currentY = window.scrollY
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    const progress = maxScroll ? currentY / maxScroll : 0

    setState(prev => {
      const diff = Math.abs(currentY - prev.y)
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

    // Initial call
    handleScroll()

    // Add event listener with throttling
    let ticking = false
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', scrollListener, { passive: true })
    return () => window.removeEventListener('scroll', scrollListener)
  }, [handleScroll])

  return state
}
