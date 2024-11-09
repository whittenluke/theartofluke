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
    <div className="relative min-h-[2000vh] bg-black">
      {/* Debug display */}
      <Suspense fallback={null}>
        <div className="fixed top-4 right-4 bg-black/50 text-white p-2 z-50">
          Scroll: {Math.round(y)}px
        </div>
      </Suspense>

      {/* Main Content with Space Background */}
      <div className="relative">
        {/* Space Scene as fixed background */}
        <div className="fixed top-0 left-0 w-full h-[200vh] z-0">
          <SpaceScene />
        </div>
        
        {/* Content Sections */}
        <div className="relative">
          {/* Title Section - Moved inside content but before other sections */}
          <section className="relative h-screen flex items-center justify-center z-20">
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

          {/* Rest of content with adjusted z-index */}
          <div className="relative z-10">
            {/* Initial cosmic journey section */}
            <section className="h-[1200vh]" aria-hidden="true" />

            {/* Content sections with more space between them */}
            <section className="min-h-[200vh] flex items-center justify-center p-8">
              <div className="max-w-4xl mx-auto">
                {/* About content */}
              </div>
            </section>

            {/* Gallery Section with extended space */}
            <section className="min-h-[300vh] flex items-center justify-center p-8">
              <div className="max-w-4xl mx-auto">
                {/* Gallery content */}
              </div>
            </section>

            {/* Contact Section */}
            <section className="min-h-[200vh] flex items-center justify-center p-8">
              <div className="max-w-4xl mx-auto">
                {/* Contact content */}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
