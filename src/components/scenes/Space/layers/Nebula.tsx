'use client'

import { useMemo } from 'react'

interface NebulaCloud {
  id: string
  x: number
  y: number
  scale: number
  rotation: number
  color: typeof NEBULA_COLORS[number]
}

// Use the exact hex values from our Tailwind config
const NEBULA_COLORS = [
  '#6B46C1',  // space-nebula
  '#805AD5',  // space-nebula-light
  '#553C9A',  // space-nebula-dark
] as const

const Nebula = () => {
  const clouds: NebulaCloud[] = useMemo(() => {
    const cloudCount = 5
    const seed = 456
    
    return Array.from({ length: cloudCount }, (_, i) => ({
      id: `nebula-${i}`,
      x: (seed * (i + 1)) % 1440,
      y: ((seed * (i + 2)) % 4800) + 800,
      scale: ((seed * (i + 3)) % 30) + 20,
      rotation: (seed * (i + 4)) % 360,
      color: NEBULA_COLORS[i % NEBULA_COLORS.length]
    }))
  }, [])

  return (
    <svg
      viewBox={`0 0 1440 6400`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
    >
      <defs>
        <filter id="nebula-blur">
          <feGaussianBlur stdDeviation="20" />
        </filter>
        {NEBULA_COLORS.map((color, i) => (
          <radialGradient
            key={i}
            id={`nebula-gradient-${i}`}
            cx="50%"
            cy="50%"
            r="50%"
          >
            <stop offset="0%" stopColor={color} stopOpacity="0.8" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </radialGradient>
        ))}
      </defs>

      <g className="nebula-field" filter="url(#nebula-blur)">
        {clouds.map((cloud, index) => (
          <g
            key={cloud.id}
            transform={`translate(${cloud.x}, ${cloud.y}) rotate(${cloud.rotation}) scale(${cloud.scale})`}
          >
            <path
              d="M0 0C30 15 60 0 90 15C120 30 150 15 180 0C150 -15 120 0 90 -15C60 -30 30 -15 0 0Z"
              fill={`url(#nebula-gradient-${index % NEBULA_COLORS.length})`}
              className="opacity-70 mix-blend-screen"
            />
          </g>
        ))}
      </g>
    </svg>
  )
}

export default Nebula