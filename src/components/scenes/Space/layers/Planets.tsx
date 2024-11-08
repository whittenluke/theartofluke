'use client'

import { useState, useEffect } from 'react'

const Planets = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <svg
      viewBox="0 0 1440 6400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      preserveAspectRatio="xMidYMax slice"
    >
      <g className="planet-field">
        <g transform={`translate(720, 1000)`}>
          <circle
            r="200"
            fill="#FF0000"
            className="opacity-80 mix-blend-screen"
          />
        </g>
      </g>
    </svg>
  )
}

export default Planets