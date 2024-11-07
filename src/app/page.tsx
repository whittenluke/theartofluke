'use client'

import { Suspense } from 'react'
import { useScroll } from '@/hooks/useScroll'
import SpaceScene from '@/components/scenes/Space'

// Page metadata for dynamic routes
export const dynamic = 'force-dynamic'

export default function Home() {
  const { y } = useScroll({
    threshold: 10,
    delay: 50
  })
  
  return (
    <div className="relative min-h-screen bg-black">
      {/* Debug display */}
      <Suspense fallback={null}>
        <div className="fixed top-4 right-4 bg-black/50 text-white p-2 z-50">
          Scroll: {Math.round(y)}px
        </div>
      </Suspense>

      {/* Title Section */}
      <section className="relative h-screen flex items-center justify-center">
        <Suspense fallback={<div className="text-white">Loading...</div>}>
          <div 
            className="transition-all duration-300 ease-out"
            style={{
              opacity: Math.max(0, 1 - (y / 300)),
              transform: `translateY(${Math.min(y / 10, 20)}px)`
            }}
          >
            <h1 
              className="text-6xl md:text-8xl text-white font-bold 
                         opacity-0 animate-fade-in [animation-duration:2s] 
                         [animation-fill-mode:forwards]"
            >
              The Art of Luke
            </h1>
          </div>
        </Suspense>
      </section>

      {/* Main Content with Space Background */}
      <div className="relative">
        {/* Space Scene as fixed background */}
        <div className="fixed top-0 left-0 w-full h-full">
          <SpaceScene />
        </div>
        
        {/* Content Sections */}
        <div className="relative">
          {/* About Section */}
          <section className="h-screen flex items-center justify-center">
            {/* About content */}
          </section>

          {/* Gallery Section */}
          <section className="h-screen flex items-center justify-center">
            {/* Gallery content */}
          </section>

          {/* Contact Section */}
          <section className="h-screen flex items-center justify-center">
            {/* Contact content */}
          </section>
        </div>
      </div>
    </div>
  )
}
