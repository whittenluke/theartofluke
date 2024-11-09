'use client'

import { useState, useEffect } from 'react'

interface PlanetsProps {
  scrollY: number
}

const Planets = ({ scrollY }: PlanetsProps) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 1000
  
  // Start positions below the viewport (after title)
  const orangePlanetY = windowHeight + 1500 - (scrollY * 0.3)
  const bluePlanetY = windowHeight + 1700 - (scrollY * 0.2)
  const greenPlanetY = windowHeight + 1300 - (scrollY * 0.1)

  return (
    <svg
      viewBox={`0 0 1440 ${windowHeight * 3}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full absolute inset-0"
      preserveAspectRatio="xMidYMin meet"
      style={{ isolation: 'isolate' }}
    >
      <g style={{ mixBlendMode: 'screen', isolation: 'isolate' }}>
        {/* First planet - Orange/Red gas giant */}
        <g>
          <circle
            cx="825"
            cy={orangePlanetY}
            r="50"
            fill="url(#orangePlanetGradient)"
            className="opacity-90"
          />
          <circle
            cx="825"
            cy={orangePlanetY}
            r="60"
            className="opacity-30"
            fill="url(#orangeGlow)"
          />
        </g>

        {/* Second planet - Blue ice planet */}
        <g>
          <circle
            cx="300"
            cy={bluePlanetY}
            r="60"
            fill="url(#bluePlanetGradient)"
            className="opacity-90"
          />
          <circle
            cx="300"
            cy={bluePlanetY}
            r="70"
            className="opacity-30"
            fill="url(#blueGlow)"
          />
        </g>

        {/* Third planet - Green terrestrial planet */}
        <g>
          <circle
            cx="1000"
            cy={greenPlanetY}
            r="40"
            fill="url(#greenPlanetGradient)"
            className="opacity-90"
          />
          <circle
            cx="1000"
            cy={greenPlanetY}
            r="50"
            className="opacity-30"
            fill="url(#greenGlow)"
          />
        </g>
      </g>

      {/* Gradient definitions */}
      <defs>
        <radialGradient id="orangePlanetGradient" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
          gradientTransform={`translate(720 ${orangePlanetY}) rotate(90) scale(150)`}>
          <stop offset="0%" stopColor="#F6AD55" />
          <stop offset="100%" stopColor="#C05621" />
        </radialGradient>
        <radialGradient id="orangeGlow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
          gradientTransform={`translate(720 ${orangePlanetY}) rotate(90) scale(160)`}>
          <stop offset="0%" stopColor="#F6AD55" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#F6AD55" stopOpacity="0" />
        </radialGradient>

        <radialGradient id="bluePlanetGradient" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
          gradientTransform={`translate(300 ${bluePlanetY}) rotate(90) scale(100)`}>
          <stop offset="0%" stopColor="#4299E1" />
          <stop offset="100%" stopColor="#2B6CB0" />
        </radialGradient>
        <radialGradient id="blueGlow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
          gradientTransform={`translate(300 ${bluePlanetY}) rotate(90) scale(110)`}>
          <stop offset="0%" stopColor="#4299E1" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#4299E1" stopOpacity="0" />
        </radialGradient>

        <radialGradient id="greenPlanetGradient" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
          gradientTransform={`translate(1000 ${greenPlanetY}) rotate(90) scale(120)`}>
          <stop offset="0%" stopColor="#68D391" />
          <stop offset="100%" stopColor="#2F855A" />
        </radialGradient>
        <radialGradient id="greenGlow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
          gradientTransform={`translate(1000 ${greenPlanetY}) rotate(90) scale(130)`}>
          <stop offset="0%" stopColor="#68D391" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#68D391" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  )
}

export default Planets