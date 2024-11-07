'use client'

import { useMemo, useEffect, useState } from 'react'

interface Star {
  x: number
  y: number
  size: number
  opacity: number
  color: typeof STAR_COLORS[number]
  twinkleSpeed: number
  shouldTwinkle: boolean
}

const STAR_COLORS = [
  '#FFFFFF',  // Pure white
  '#F8F7FF',  // Slightly blue white
  '#FFF4EA',  // Slightly warm white
  '#FFE3D8',  // Warm white
] as const

const Stars = () => {
  const [mounted, setMounted] = useState(false)
  const [twinklingStars, setTwinklingStars] = useState<Set<number>>(new Set())

  // Generate static stars only after component mounts
  const stars: Star[] = useMemo(() => {
    if (!mounted) return []
    
    const starCount = 1000
    const seed = 123 // Fixed seed for consistency

    return Array.from({ length: starCount }, (_, i) => ({
      x: (seed * (i + 1)) % 1440,
      y: (seed * (i + 2)) % 6400,
      size: ((seed * (i + 3)) % 15) / 10 + 0.5,
      opacity: ((seed * (i + 4)) % 3) / 10 + 0.2,
      color: STAR_COLORS[Math.floor((seed * (i + 5)) % STAR_COLORS.length)],
      twinkleSpeed: ((seed * (i + 6)) % 2000) + 1000,
      shouldTwinkle: ((seed * (i + 7)) % 100) < 15 // Deterministic twinkle selection
    }))
  }, [mounted])

  useEffect(() => {
    setMounted(true)
  }, [])

  // Twinkling effect
  useEffect(() => {
    if (!mounted) return

    const twinkleIntervals: NodeJS.Timeout[] = []

    stars.forEach((star, index) => {
      if (star.shouldTwinkle) {  // Use pre-determined value instead of Math.random()
        const interval = setInterval(() => {
          setTwinklingStars(prev => {
            const next = new Set(prev)
            if (next.has(index)) {
              next.delete(index)
            } else {
              next.add(index)
            }
            return next
          })
        }, star.twinkleSpeed)
        
        twinkleIntervals.push(interval)
      }
    })

    return () => twinkleIntervals.forEach(clearInterval)
  }, [stars, mounted])

  if (!mounted) return null

  return (
    <svg
      viewBox={`0 0 1440 6400`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      preserveAspectRatio="xMidYMax slice"
    >
      <defs>
        {STAR_COLORS.map((color, i) => (
          <radialGradient key={i} id={`starGlow${i}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={color} stopOpacity="1" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </radialGradient>
        ))}
      </defs>

      <g className="star-field">
        {stars.map((star, index) => (
          <g key={index}>
            <circle
              cx={star.x}
              cy={star.y}
              r={star.size}
              fill={star.color}
              opacity={twinklingStars.has(index) ? 1 : star.opacity}
              className="transition-opacity duration-1000"
            />
            {star.size > 1.5 && (
              <circle
                cx={star.x}
                cy={star.y}
                r={star.size * 2}
                fill={`url(#starGlow${STAR_COLORS.indexOf(star.color)})`}
                opacity={twinklingStars.has(index) ? 0.8 : star.opacity * 0.3}
                className="transition-opacity duration-1000"
              />
            )}
          </g>
        ))}
      </g>
    </svg>
  )
}

export default Stars