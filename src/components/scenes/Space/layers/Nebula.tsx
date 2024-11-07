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

const NEBULA_COLORS = [
  '#6B46C1',  // space-nebula
  '#805AD5',  // space-nebula-light
  '#553C9A',  // space-nebula-dark
] as const

const Nebula = () => {
  const clouds: NebulaCloud[] = useMemo(() => {
    const cloudCount = 20
    
    return Array.from({ length: cloudCount }, (_, i) => {
      const column = i % 3
      const x = (column * 480) + 240
      
      return {
        id: `nebula-${i}`,
        x: x + (Math.random() * 300 - 150),
        y: ((i * 300) + Math.random() * 200),
        scale: 10 + Math.random() * 25,
        rotation: Math.random() * 360,
        color: NEBULA_COLORS[Math.floor(Math.random() * NEBULA_COLORS.length)]
      }
    })
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
          <feGaussianBlur stdDeviation="35" />
        </filter>
        {NEBULA_COLORS.map((color, i) => (
          <radialGradient
            key={i}
            id={`nebula-gradient-${i}`}
            cx="50%"
            cy="50%"
            r="50%"
          >
            <stop offset="0%" stopColor={color} stopOpacity="0.5" />
            <stop offset="40%" stopColor={color} stopOpacity="0.3" />
            <stop offset="70%" stopColor={color} stopOpacity="0.1" />
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
              d="M0 0C20 10 40 5 60 15S100 0 120 10S160 5 180 0S140 -5 120 -10S80 0 60 -15S20 -10 0 0Z"
              fill={`url(#nebula-gradient-${index % NEBULA_COLORS.length})`}
              className="opacity-60 mix-blend-screen"
            />
          </g>
        ))}
      </g>
    </svg>
  )
}

export default Nebula