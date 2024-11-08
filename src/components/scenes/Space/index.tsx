'use client'

import { useScroll } from '@/hooks/useScroll'
import Stars from './layers/Stars'
import Nebula from './layers/Nebula'
import Planets from './layers/Planets'

interface SpaceSceneProps {
  className?: string
}

const SpaceScene = ({ className = '' }: SpaceSceneProps) => {
  const { y } = useScroll()

  return (
    <div className={`relative w-full h-full ${className}`}>
      <div className="w-full h-full">
        {/* Nebula Layer - Behind everything */}
        <div 
          className="absolute inset-0 w-full h-full mix-blend-screen"
          style={{
            transform: `translateY(${y * 0.01}px)`,
            zIndex: 0
          }}
        >
          <Nebula />
        </div>

        {/* Stars Layer */}
        <div 
          className="absolute inset-0 w-full h-full mix-blend-screen"
          style={{
            transform: `translateY(${y * 0.1}px)`,
            zIndex: 1
          }}
        >
          <Stars />
        </div>

        {/* Planets Layer */}
        <div 
          className="absolute inset-0 w-full h-full mix-blend-screen"
          style={{
            zIndex: 2
          }}
        >
          <Planets scrollY={y} />
        </div>
      </div>
    </div>
  )
}

export default SpaceScene 