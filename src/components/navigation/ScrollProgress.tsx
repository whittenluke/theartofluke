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
  const [lastY, setLastY] = useState(0)

  // Track last scroll position
  useEffect(() => {
    setLastY(y)
  }, [y])

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
            {/* Main rocket body */}
            <path 
              d="M32 4L38 32L32 56L26 32L32 4Z" 
              fill="rgba(255,255,255,0.4)"
              className="transition-all duration-300"
            />
            
            {/* Side boosters */}
            <path
              d="M26 32L20 40L26 38L32 56L38 38L44 40L38 32"
              fill="url(#wingGradient)"
              className="transition-all duration-300"
            />
            
            {/* Nose cone detail */}
            <path
              d="M30 8L32 4L34 8"
              stroke="rgba(255,255,255,0.6)"
              strokeWidth="1"
              fill="none"
            />
            
            {/* Window */}
            <circle 
              cx="32" 
              cy="20" 
              r="3" 
              fill="rgba(135,206,250,0.8)"
              className="animate-pulse"
            />

            {/* Define gradients */}
            <defs>
              <linearGradient id="wingGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.2)" />
              </linearGradient>
            </defs>
          </svg>

          {/* Enhanced engine glow effect */}
          <g>
            {/* Base glow - always visible but subtle */}
            <circle
              cx="0"
              cy="16"
              r="8"
              className="fill-orange-500/30 blur-md"
            />
            {/* Active glow - only visible during scroll */}
            <circle
              cx="0"
              cy="16"
              r="8"
              className={`
                fill-orange-500/50 blur-md
                transition-all duration-300
                ${Math.abs(y - window.lastY) > 0 ? 'opacity-100 scale-125' : 'opacity-0 scale-75'}
              `}
            />
            {/* Inner bright core - pulses during scroll */}
            <circle
              cx="0"
              cy="16"
              r="4"
              className={`
                fill-orange-300 blur-sm
                transition-all duration-300
                ${Math.abs(y - window.lastY) > 0 ? 'opacity-100 scale-110' : 'opacity-50 scale-90'}
              `}
            />
          </g>
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