'use client'

import { useScroll } from '@/hooks/useScroll'
import Stars from './layers/Stars'

interface SpaceSceneProps {
  className?: string
}

const SpaceScene = ({ className = '' }: SpaceSceneProps) => {
  const { y } = useScroll()

  return (
    <div className={`relative min-h-[800vh] overflow-hidden ${className}`}>
      {/* Scene Container */}
      <div className="sticky top-0 h-screen w-full">
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