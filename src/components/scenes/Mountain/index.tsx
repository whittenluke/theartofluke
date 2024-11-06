'use client'

import { useScroll } from '@/hooks/useScroll'

interface MountainSceneProps {
  className?: string
}

const MountainScene = ({ className = '' }: MountainSceneProps) => {
  const { y } = useScroll()

  return (
    <div className={`relative h-screen overflow-hidden ${className}`}>
      {/* Scene Container */}
      <div className="absolute inset-0">
        {/* Sky Layer */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-mountain-peak/50 to-mountain-base"
          style={{
            transform: `translateY(${y * 0.1}px)`
          }}
        />

        {/* Far Mountains Layer */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-[70%]"
          style={{
            transform: `translateY(${y * 0.2}px)`
          }}
        >
          {/* We'll add SVG mountains here */}
        </div>

        {/* Mid Mountains Layer */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-[60%]"
          style={{
            transform: `translateY(${y * 0.3}px)`
          }}
        >
          {/* We'll add SVG mountains here */}
        </div>

        {/* Trees Layer */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-[40%]"
          style={{
            transform: `translateY(${y * 0.4}px)`
          }}
        >
          {/* We'll add SVG trees here */}
        </div>

        {/* River Layer */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-[20%]"
          style={{
            transform: `translateY(${y * 0.5}px)`
          }}
        >
          {/* We'll add SVG river here */}
        </div>
      </div>
    </div>
  )
}

export default MountainScene 