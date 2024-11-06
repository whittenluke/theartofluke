'use client'

import { useScroll } from '@/hooks/useScroll'
import FarMountains from './layers/FarMountains'
import MidMountains from './layers/MidMountains'
import Trees from './layers/Trees'
import River from './layers/River'

interface MountainSceneProps {
  className?: string
}

const MountainScene = ({ className = '' }: MountainSceneProps) => {
  const { y } = useScroll()

  return (
    <div className={`relative min-h-[300vh] overflow-hidden ${className}`}>
      {/* Scene Container */}
      <div className="sticky top-0 h-screen">
        {/* Sky Layer */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-blue-400 to-blue-600"
          style={{
            transform: `translateY(${y * 0.05}px)`
          }}
        />

        {/* Far Mountains Layer */}
        <div 
          className="absolute inset-0 h-screen"
          style={{
            transform: `translateY(${y * 0.15}px)`
          }}
        >
          <FarMountains />
        </div>

        {/* Mid Mountains Layer */}
        <div 
          className="absolute bottom-[-40%] left-[-15%] right-[-15%] h-[100%]"
          style={{
            transform: `translateY(${y * 0.25}px)`
          }}
        >
          <MidMountains />
        </div>

        {/* Trees Layer */}
        <div 
          className="absolute bottom-[-60%] left-[-20%] right-[-20%] h-[80%]"
          style={{
            transform: `translateY(${y * 0.35}px)`
          }}
        >
          <Trees />
        </div>

        {/* River Layer */}
        <div 
          className="absolute bottom-[-80%] left-[-25%] right-[-25%] h-[60%]"
          style={{
            transform: `translateY(${y * 0.45}px)`
          }}
        >
          <River />
        </div>
      </div>
    </div>
  )
}

export default MountainScene 