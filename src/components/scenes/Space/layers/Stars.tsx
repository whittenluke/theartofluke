'use client'

import { useMemo, useEffect, useState } from 'react'

interface Star {
  x: number
  y: number
  size: number
  opacity: number
}

const Stars = () => {
  const [mounted, setMounted] = useState(false)
  const [twinklingStarIndex, setTwinklingStarIndex] = useState<number | null>(null)

  // Generate static stars only after component mounts
  const stars: Star[] = useMemo(() => {
    if (!mounted) return []
    
    const starCount = 200
    const seed = 123 // Using a fixed seed for consistency
    return Array.from({ length: starCount }, (_, i) => ({
      x: (seed * (i + 1)) % 1440,
      y: (seed * (i + 2)) % 800,
      size: ((seed * (i + 3)) % 15) / 10 + 0.5,
      opacity: ((seed * (i + 4)) % 3) / 10 + 0.2,
    }))
  }, [mounted])

  useEffect(() => {
    setMounted(true)
  }, [])

  // Only start twinkling after mount
  useEffect(() => {
    if (!mounted) return

    const twinkleInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * stars.length)
      setTwinklingStarIndex(randomIndex)
      
      setTimeout(() => {
        setTwinklingStarIndex(null)
      }, 1000)
    }, 2000)

    return () => clearInterval(twinkleInterval)
  }, [stars.length, mounted])

  if (!mounted) return null

  return (
    <svg
      viewBox="0 0 1440 800"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      preserveAspectRatio="xMidYMax slice"
    >
      <defs>
        <radialGradient id="starGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
      </defs>

      <g className="star-field">
        {stars.map((star, index) => (
          <g key={index}>
            <circle
              cx={star.x}
              cy={star.y}
              r={star.size}
              fill="white"
              opacity={index === twinklingStarIndex ? 1 : star.opacity}
              className="transition-opacity duration-1000"
            />
            {star.size > 1.5 && (
              <circle
                cx={star.x}
                cy={star.y}
                r={star.size * 2}
                fill="url(#starGlow)"
                opacity={(index === twinklingStarIndex ? 0.8 : star.opacity * 0.3)}
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