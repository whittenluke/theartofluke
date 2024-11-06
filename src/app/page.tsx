'use client'

import { Suspense } from 'react'
import { useScroll } from '@/hooks/useScroll'

// Page metadata for dynamic routes
export const dynamic = 'force-dynamic'

export default function Home() {
  const { y } = useScroll({
    threshold: 10,
    delay: 50
  })

  // Debug values
  console.log('Scroll Y:', y)

  return (
    <div className="relative min-h-screen">
      {/* Debug display */}
      <div className="fixed top-4 right-4 bg-black/50 text-white p-2 z-50">
        Scroll: {y}px
      </div>

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

      {/* Mountain Scene Section */}
      <section className="relative h-screen">
        {/* Mountain scene component will be added here */}
      </section>

      {/* About Section */}
      <section className="relative min-h-screen bg-gradient-to-b from-mountain-base to-beach-water py-24">
        {/* About content will be added here */}
      </section>

      {/* Beach Scene Section */}
      <section className="relative h-screen">
        {/* Beach scene component will be added here */}
      </section>

      {/* Gallery Section */}
      <section className="relative min-h-screen bg-gradient-to-b from-beach-deep to-space-dark py-24">
        {/* Gallery content will be added here */}
      </section>

      {/* Space Scene Section */}
      <section className="relative h-screen">
        {/* Space scene component will be added here */}
      </section>
    </div>
  )
}
