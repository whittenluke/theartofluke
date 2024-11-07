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
    <div className="relative min-h-screen">
      {/* Debug display - Only show after hydration */}
      <Suspense fallback={null}>
        <div className="fixed top-4 right-4 bg-black/50 text-white p-2 z-50">
          Scroll: {Math.round(y)}px
        </div>
      </Suspense>

      {/* Initial landing section */}
      <section className="relative h-screen flex items-center justify-center bg-black">
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

      {/* Space Journey Section */}
      <section className="relative">
        <SpaceScene />
        
        {/* Content Sections will be integrated within the space scene */}
        <div className="relative z-10">
          {/* About Section */}
          <div className="h-screen flex items-center justify-center">
            {/* About content will be integrated here */}
          </div>

          {/* Gallery Section */}
          <div className="h-screen flex items-center justify-center">
            {/* Gallery content will be integrated here */}
          </div>

          {/* Contact Section */}
          <div className="h-screen flex items-center justify-center">
            {/* Contact content will be integrated here */}
          </div>
        </div>
      </section>
    </div>
  )
}
