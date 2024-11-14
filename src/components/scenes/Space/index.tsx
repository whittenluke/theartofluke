'use client'

import { useScroll } from '@/hooks/useScroll'
import Stars from './layers/Stars'
import Nebula from './layers/Nebula'
import Planets from './layers/Planets'
import { useState, useEffect } from 'react'

interface SpaceSceneProps {
  className?: string
}

const SpaceScene = ({ className = '' }: SpaceSceneProps) => {
  const [mounted, setMounted] = useState(false)
  const { y } = useScroll()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <div className="absolute inset-0 w-full h-[300vh]">
        {/* Background color to ensure no transparency */}
        <div className="absolute inset-0 bg-black" />
        
        {/* Stars Layer - Base layer */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            transform: mounted ? `translateY(${-y * 0.1}px)` : 'translateY(0px)',
            zIndex: 1
          }}
        >
          <Stars />
        </div>

        {/* Nebula Layer - Middle layer */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            transform: mounted ? `translateY(${-y * 0.01}px)` : 'translateY(0px)',
            zIndex: 2
          }}
        >
          <Nebula />
        </div>

        {/* Planets Layer - Top layer */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{ zIndex: 3 }}
        >
          <Planets scrollY={mounted ? y : 0} />
        </div>
      </div>
    </div>
  )
}

export default SpaceScene 