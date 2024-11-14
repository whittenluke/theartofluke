'use client'

import { useScroll } from '@/hooks/useScroll'
import { useEffect, useState } from 'react'

interface ScrollProgressProps {
  currentSection?: string
}

export const ScrollProgress = ({ currentSection }: ScrollProgressProps) => {
  const { y, direction } = useScroll({ threshold: 10 })
  const [progress, setProgress] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  // Calculate total scroll progress
  useEffect(() => {
    const calculateProgress = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const maxScroll = documentHeight - windowHeight
      const currentProgress = (y / maxScroll) * 100
      setProgress(Math.min(Math.max(currentProgress, 0), 100))
    }

    calculateProgress()
  }, [y])

  // Get color based on current section
  const getColor = () => {
    const colors: { [key: string]: string } = {
      missionControl: '#3B82F6',    // blue-500
      professionalJourney: '#22C55E', // green-500
      innovationSector: '#EAB308',   // yellow-500
      artNebula: '#A855F7',         // purple-500
      harmonicTransmission: '#EF4444', // red-500
      communicationArray: '#06B6D4'   // cyan-500
    }
    return colors[currentSection || 'missionControl']
  }

  // Add these helper functions after the getColor function
  const getPointOnCurve = (progress: number) => {
    const t = progress / 100
    
    // Quadratic bezier curve calculation
    // For path "M24,0 Q40,300 24,600"
    const p0x = 24  // start x
    const p0y = 0   // start y
    const p1x = 40  // control point x
    const p1y = 300 // control point y
    const p2x = 24  // end x
    const p2y = 600 // end y
    
    // Precise quadratic bezier formula
    const x = Math.pow(1-t, 2) * p0x + 
             2 * (1-t) * t * p1x + 
             Math.pow(t, 2) * p2x
             
    const y = Math.pow(1-t, 2) * p0y + 
             2 * (1-t) * t * p1y + 
             Math.pow(t, 2) * p2y

    return { x, y }
  }

  const getRotationAngle = (progress: number) => {
    const currentPoint = getPointOnCurve(progress)
    const nextPoint = getPointOnCurve(Math.min(progress + 0.5, 100))
    
    const dx = nextPoint.x - currentPoint.x
    const dy = nextPoint.y - currentPoint.y
    const angle = Math.atan2(dy, dx) * (180 / Math.PI)
    
    return angle + (direction === 'up' ? -90 : 90)
  }

  return (
    <div 
      className="fixed right-8 top-1/2 -translate-y-1/2 h-[60vh] w-12 z-[60]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg 
        className="w-full h-full" 
        viewBox="0 0 48 600" 
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Background path */}
        <path
          d="M24,0 Q40,300 24,600"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="2"
          fill="none"
        />

        {/* Progress path with gradient */}
        <path
          d="M24,0 Q40,300 24,600"
          stroke={getColor()}
          strokeWidth="2"
          fill="none"
          strokeDasharray="620"
          strokeDashoffset={620 - (620 * progress) / 100}
          className="transition-all duration-300"
        />

        {/* Spaceship */}
        <g
          transform={`
            translate(${getPointOnCurve(progress).x},${Math.max(32, Math.min(getPointOnCurve(progress).y, 576))})
            rotate(${getRotationAngle(progress)})
          `}
          className="transition-all duration-300"
        >
          <svg 
            x="-32"
            y="-32"
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            stroke="white"
            strokeWidth="2"
          >
            <path 
              d="M32 4L44 32L32 56L20 32L32 4Z" 
              fill="rgba(255,255,255,0.2)"
            />
            <path 
              d="M20 32L8 44L20 40L32 56L44 40L56 44L44 32"
              fill="rgba(255,255,255,0.1)"
            />
            <circle cx="32" cy="24" r="4" fill="rgba(135,206,250,0.6)" />
          </svg>

          {/* Engine glow - adjusted for larger ship */}
          <circle
            cx="0"
            cy="16"
            r="8"
            className="fill-orange-500 blur-sm animate-pulse opacity-75"
          />
        </g>
      </svg>

      {/* Hover tooltip */}
      {isHovered && (
        <div 
          className="
            absolute left-full ml-4 whitespace-nowrap
            px-3 py-1.5 rounded-lg
            bg-black/80 backdrop-blur-sm
            text-sm text-white
            transition-all duration-300
          "
          style={{
            top: `${progress}%`,
            transform: 'translateY(-50%)'
          }}
        >
          {currentSection?.replace(/([A-Z])/g, ' $1').trim()}
        </div>
      )}
    </div>
  )
} 