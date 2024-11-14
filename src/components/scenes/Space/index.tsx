'use client'

import { useScroll } from '@/hooks/useScroll'
import Stars from './layers/Stars'
import Nebula from './layers/Nebula'
import Planets from './layers/Planets'
import { useState, useEffect } from 'react'

interface SpaceSceneProps {
  className?: string
  onLoad?: () => void
}

const SpaceScene = ({ className = '', onLoad }: SpaceSceneProps) => {
  const [mounted, setMounted] = useState(false)
  const [starsReady, setStarsReady] = useState(false)
  const [nebulaReady, setNebulaReady] = useState(false)
  const { y } = useScroll()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Only notify parent when both stars and nebula are ready
  useEffect(() => {
    if (starsReady && nebulaReady) {
      onLoad?.()
    }
  }, [starsReady, nebulaReady, onLoad])

  if (!mounted) return null

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <div className="absolute inset-0 w-full h-[300vh]">
        {/* Background color to ensure no transparency */}
        <div className="absolute inset-0 bg-black" />
        
        {/* Stars Layer - Base layer */}
        <div 
          className={`
            absolute inset-0 w-full h-full
            transition-opacity duration-500
            ${starsReady ? 'opacity-100' : 'opacity-0'}
          `}
          style={{
            transform: mounted ? `translateY(${-y * 0.1}px)` : 'translateY(0px)',
            zIndex: 1
          }}
          onLoad={() => setStarsReady(true)}
        >
          <Stars onLoad={() => setStarsReady(true)} />
        </div>

        {/* Nebula Layer - Middle layer */}
        <div 
          className={`
            absolute inset-0 w-full h-full
            transition-opacity duration-500
            ${nebulaReady ? 'opacity-100' : 'opacity-0'}
          `}
          style={{
            transform: mounted ? `translateY(${-y * 0.01}px)` : 'translateY(0px)',
            zIndex: 2
          }}
        >
          <Nebula onLoad={() => setNebulaReady(true)} />
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