'use client'

import { useMemo, useEffect } from 'react'

interface NebulaCloud {
  id: string
  x: number
  y: number
  scale: number
  rotation: number
  color: typeof NEBULA_COLORS[number]
  opacity: number
}

const NEBULA_COLORS = [
  '#6B46C1',  // space-nebula
  '#805AD5',  // space-nebula-light
  '#553C9A',  // space-nebula-dark
] as const

interface NebulaProps {
  onLoad?: () => void
}

const Nebula = ({ onLoad }: NebulaProps) => {
  useEffect(() => {
    // Notify parent when nebula is ready
    onLoad?.()
  }, [onLoad])

  // Diffuse background clouds
  const diffuseClouds: NebulaCloud[] = useMemo(() => {
    const cloudCount = 15
    
    return Array.from({ length: cloudCount }, (_, i) => ({
      id: `diffuse-${i}`,
      x: (i % 2) * 800 + Math.sin(i * 0.8) * 200, // Spread across width in 3 columns
      y: Math.floor(i / 3) * 1000 + Math.cos(i * 0.5) * 550,
      scale: 25 + Math.sin(i * 0.6) * 12,
      rotation: i * 30,
      color: NEBULA_COLORS[i % NEBULA_COLORS.length],
      opacity: 0.4
    }))
  }, [])

  // Denser concentrated clouds
  const denseClouds: NebulaCloud[] = useMemo(() => {
    const cloudCount = 6
    
    return Array.from({ length: cloudCount }, (_, i) => ({
      id: `dense-${i}`,
      x: 200 + Math.sin(i * 1.2) * 1000, // Wider spread
      y: 800 + i * 1000 + Math.cos(i * 0.8) * 200,
      scale: 12 + Math.sin(i * 0.5) * 5, // Smaller scale
      rotation: i * 45,
      color: NEBULA_COLORS[i % NEBULA_COLORS.length],
      opacity: 0.8
    }))
  }, [])

  return (
    <svg
      viewBox="0 0 1440 6400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
    >
      <defs>
        <filter id="nebula-blur">
          <feGaussianBlur stdDeviation="30" />
        </filter>
        <filter id="dense-nebula-blur">
          <feGaussianBlur stdDeviation="15" />
        </filter>
        {NEBULA_COLORS.map((color, i) => (
          <radialGradient
            key={i}
            id={`nebula-gradient-${i}`}
            cx="50%"
            cy="50%"
            r="50%"
          >
            <stop offset="0%" stopColor={color} stopOpacity="0.6" />
            <stop offset="50%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </radialGradient>
        ))}
      </defs>

      {/* Diffuse background layer */}
      <g className="nebula-field" filter="url(#nebula-blur)">
        {diffuseClouds.map((cloud, index) => (
          <g
            key={cloud.id}
            transform={`translate(${cloud.x}, ${cloud.y}) rotate(${cloud.rotation}) scale(${cloud.scale})`}
          >
            <path
              d="M0 0C20 10 40 5 60 15S100 0 120 10S160 5 180 0S140 -5 120 -10S80 0 60 -15S20 -10 0 0Z"
              fill={`url(#nebula-gradient-${index % NEBULA_COLORS.length})`}
              className="mix-blend-screen"
              style={{ opacity: cloud.opacity }}
            />
          </g>
        ))}
      </g>

      {/* Dense concentrated layer */}
      <g className="nebula-field" filter="url(#dense-nebula-blur)">
        {denseClouds.map((cloud, index) => (
          <g
            key={cloud.id}
            transform={`translate(${cloud.x}, ${cloud.y}) rotate(${cloud.rotation}) scale(${cloud.scale})`}
          >
            <path
              d="M0 0C20 10 40 5 60 15S100 0 120 10S160 5 180 0S140 -5 120 -10S80 0 60 -15S20 -10 0 0Z"
              fill={`url(#nebula-gradient-${index % NEBULA_COLORS.length})`}
              className="mix-blend-screen"
              style={{ opacity: cloud.opacity }}
            />
          </g>
        ))}
      </g>
    </svg>
  )
}

export default Nebula