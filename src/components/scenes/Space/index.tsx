'use client'

import { useScroll } from '@/hooks/useScroll'
import Stars from './layers/Stars'
// We'll implement these later
// import Planets from './layers/Planets'
// import Spaceships from './layers/Spaceships'
// import NebulaEffects from './layers/NebulaEffects'

interface SpaceSceneProps {
  className?: string
}

const SpaceScene = ({ className = '' }: SpaceSceneProps) => {
  const { y } = useScroll()

  return (
    <div className={`relative min-h-[300vh] overflow-hidden ${className}`}>
      {/* Scene Container */}
      <div className="sticky top-0 h-screen">
        {/* Background Layer */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-space-dark via-space-nebula to-space-dark"
          style={{
            transform: `translateY(${y * 0.05}px)`
          }}
        />

        {/* Stars Layer */}
        <div 
          className="absolute inset-0"
          style={{
            transform: `translateY(${y * 0.1}px)`
          }}
        >
          <Stars />
        </div>

        {/* Temporarily comment out unimplemented components */}
        {/* 
        <div className="absolute inset-0" style={{ transform: `translateY(${y * 0.2}px)` }}>
          <NebulaEffects />
        </div>

        <div className="absolute inset-0" style={{ transform: `translateY(${y * 0.3}px)` }}>
          <Planets />
        </div>

        <div className="absolute inset-0" style={{ transform: `translateY(${y * 0.4}px)` }}>
          <Spaceships />
        </div>
        */}
      </div>
    </div>
  )
}

export default SpaceScene 