'use client'

import { useMemo, useEffect, useState } from 'react'
import { useScroll } from '@/hooks/useScroll'

interface Star {
  x: number
  y: number
  size: number
  opacity: number
  color: string
  shouldTwinkle: boolean
}

const Stars = () => {
  const [mounted, setMounted] = useState(false)
  const [stars, setStars] = useState<Star[]>([])
  const [twinklingStars, setTwinklingStars] = useState<Set<number>>(new Set())
  const { y } = useScroll()

  // Generate stars only after component mounts (client-side)
  useEffect(() => {
    if (!mounted) return
    
    const starCount = 350
    const generatedStars = Array.from({ length: starCount }, () => ({
      x: Math.random() * 1440,
      y: Math.random() * 2000,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.5 + 0.25,
      color: Math.random() > 0.3 ? '#FFFFFF' : '#FFF4EA',
      shouldTwinkle: Math.random() > 0.8
    }))
    
    setStars(generatedStars)
  }, [mounted])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const interval = setInterval(() => {
      setTwinklingStars(prev => {
        const next = new Set(prev)
        stars.forEach((star, index) => {
          if (star.shouldTwinkle && Math.random() > 0.5) {
            if (next.has(index)) next.delete(index)
            else next.add(index)
          }
        })
        return next
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [stars, mounted])

  if (!mounted || stars.length === 0) return null

  // Calculate viewport height and required repetitions
  const viewportHeight = 6400
  const patternHeight = 2000
  const scrollOffset = y * 0.1
  const visibleRange = viewportHeight + scrollOffset + patternHeight

  // Calculate how many repetitions we need
  const repetitions = Math.ceil(visibleRange / patternHeight) + 1

  return (
    <svg
      viewBox={`0 0 1440 ${viewportHeight}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      preserveAspectRatio="xMidYMin slice"
      style={{ mixBlendMode: 'screen' }}
    >
      {Array.from({ length: repetitions }, (_, i) => {
        // Calculate the y position for this group of stars
        const basePosition = i * patternHeight
        const adjustedPosition = basePosition - (scrollOffset % patternHeight)

        return (
          <g 
            key={i} 
            className="star-field" 
            transform={`translate(0, ${adjustedPosition})`}
          >
            {stars.map((star, index) => (
              <circle
                key={`${i}-${index}`}
                cx={star.x}
                cy={star.y}
                r={star.size}
                fill={star.color}
                opacity={twinklingStars.has(index) ? 1 : star.opacity}
                className="transition-opacity duration-2000"
              />
            ))}
          </g>
        )
      })}
    </svg>
  )
}

export default Stars