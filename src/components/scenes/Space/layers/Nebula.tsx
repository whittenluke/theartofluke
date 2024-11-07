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
    // Increase number of clouds and use better distribution
    const cloudCount = 8
    
    return Array.from({ length: cloudCount }, (_, i) => {
      // Calculate position using sine waves for more natural distribution
      const angle = (i / cloudCount) * Math.PI * 2
      const radius = 200 + Math.sin(angle * 2) * 100
      
      return {
        id: `nebula-${i}`,
        // Distribute in a more circular pattern across viewport
        x: 720 + Math.cos(angle) * radius * 2,
        y: 2400 + Math.sin(angle) * radius * 3,
        // Larger scale range
        scale: 40 + Math.sin(angle * 3) * 20,
        rotation: angle * (180 / Math.PI),
        color: NEBULA_COLORS[i % NEBULA_COLORS.length]
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