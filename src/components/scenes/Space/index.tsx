'use client'

import { useScroll } from '@/hooks/useScroll'
import Stars from './layers/Stars'

interface SpaceSceneProps {
  className?: string
}

const SpaceScene = ({ className = '' }: SpaceSceneProps) => {
  const { y } = useScroll()

  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* Scene Container */}
      <div className="w-full h-full">
        {/* Stars Layer */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            transform: `translateY(${y * 0.1}px)`
          }}
        >
          <Stars />
        </div>
      </div>
    </div>
  )
}

export default SpaceScene 