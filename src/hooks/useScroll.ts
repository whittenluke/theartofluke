import { useState, useEffect, useCallback } from 'react'

interface ScrollState {
  y: number
  lastY: number
  direction: 'up' | 'down' | null
  progress: number
}

interface ScrollOptions {
  threshold?: number    // Minimum scroll amount to trigger direction change
  delay?: number       // Debounce delay in ms
}

export function useScroll(options: ScrollOptions = {}) {
  const { threshold = 10, delay = 50 } = options

  const [state, setState] = useState<ScrollState>({
    y: typeof window !== 'undefined' ? window.scrollY : 0,
    lastY: 0,
    direction: null,
    progress: 0,
  })

  // Debounce function to limit scroll event handling
  const debounce = <T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ) => {
    let timeout: NodeJS.Timeout
    return (...args: Parameters<T>) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => func(...args), wait)
    }
  }

  // Handle scroll events
  const handleScroll = useCallback(
    debounce(() => {
      const window = globalThis.window
      const document = globalThis.document

      if (!window || !document) return

      const currentY = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = maxScroll ? currentY / maxScroll : 0

      setState(prev => {
        const diff = Math.abs(currentY - prev.lastY)
        const direction = diff >= threshold
          ? currentY > prev.lastY ? 'down' : 'up'
          : prev.direction

        return {
          y: currentY,
          lastY: prev.lastY,
          direction,
          progress,
        }
      })
    }, delay),
    [threshold, delay]
  )

  useEffect(() => {
    const window = globalThis.window
    if (!window) return

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  return state
}
