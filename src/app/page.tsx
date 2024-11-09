'use client'

import { Suspense, useCallback } from 'react'
import { useScroll } from '@/hooks/useScroll'
import SpaceScene from '@/components/scenes/Space'

// Page metadata for dynamic routes
export const dynamic = 'force-dynamic'

// Add this rocket component (you can move it to a separate file later)
const RocketShip = ({ onClick, className = "" }: { onClick: () => void, className?: string }) => {
  return (
    <div 
      onClick={onClick}
      className={`group cursor-pointer ${className}`}
    >
      <div className="relative transform transition-transform duration-500 
                    group-hover:-translate-y-2 group-active:rotate-180"
    >
        <svg 
          className="w-16 h-16 transform -rotate-180 transition-all duration-500
                    group-active:translate-y-10"
          viewBox="0 0 64 64"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Main body */}
          <path 
            d="M32 4L44 32L32 56L20 32L32 4Z" 
            fill="rgba(255,255,255,0.2)"
          />
          
          {/* Wings */}
          <path 
            d="M20 32L8 44L20 40L32 56L44 40L56 44L44 32"
            fill="rgba(255,255,255,0.1)"
          />
          
          {/* Window */}
          <circle 
            cx="32" 
            cy="24" 
            r="4" 
            fill="rgba(135,206,250,0.6)"
          />
          
          {/* Detail lines */}
          <line x1="28" y1="16" x2="36" y2="16" />
          <line x1="26" y1="32" x2="38" y2="32" />

          {/* Rocket Boost - Animated */}
          <g className="rocket-boost">
            <path
              d="M28 56L32 64L36 56"
              className="animate-pulse"
              fill="rgba(255,166,0,0.6)"
            />
            <path
              d="M30 56L32 62L34 56"
              className="animate-pulse"
              fill="rgba(255,69,0,0.8)"
            />
          </g>
        </svg>

        {/* Engine glow effect */}
        <div 
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 
                    w-4 h-4 bg-orange-500 rounded-full blur-md animate-pulse"
        />
      </div>
    </div>
  )
}

export default function Home() {
  const { y } = useScroll({
    threshold: 10,
    delay: 50
  })
  
  // Smooth scroll function
  const scrollToSection = useCallback((yPosition: number) => {
    window.scrollTo({
      top: yPosition,
      behavior: 'smooth'
    })
  }, [])
  
  // Fade calculations for both About sections
  const aboutOneOpacity = Math.min(
    Math.max(0, (y - 400) / 400),
    1
  )

  const aboutTwoOpacity = Math.min(
    Math.max(0, (y - 1000) / 400), // Starts fading in at 1000px
    1
  )

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
          {/* Title Section with Spaceship */}
          <section className="relative h-screen flex flex-col items-center justify-center z-20">
            <Suspense fallback={<div className="text-white">Loading...</div>}>
              <div 
                className="transition-all duration-300 ease-out text-center"
                style={{
                  opacity: Math.max(0, 1 - (y / 300)),
                  transform: `translateY(${Math.min(y / 10, 20)}px)`
                }}
              >
                <h1 
                  className="text-6xl md:text-8xl text-white font-bold 
                           opacity-0 animate-fade-in [animation-duration:2s] 
                           [animation-fill-mode:forwards] mb-16"
                >
                  The Art of Luke
                </h1>

                {/* Spaceship and Begin Button */}
                <div className="flex flex-col items-center">
                  <div className="text-white text-xl mb-4 opacity-75 
                                group-hover:opacity-100 transition-opacity">
                    Scroll down to begin
                  </div>
                  <RocketShip 
                    onClick={() => scrollToSection(window.innerHeight + 100)}
                  />
                </div>
              </div>
            </Suspense>
          </section>

          {/* First About Section with Continue */}
          <section 
            className="relative min-h-screen flex flex-col items-center justify-center z-20 px-4 md:px-8"
            style={{
              opacity: aboutOneOpacity,
              transform: `translateY(${Math.max(0, 50 - (y - 400) / 8)}px)`
            }}
          >
            <div className="max-w-3xl mx-auto text-white">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">
                About Me
              </h2>
              
              <div className="space-y-6 text-lg md:text-xl leading-relaxed">
                <p>
                Hi and welcome! I'm Luke, and I created this space to share
                my thoughts, my creative journey, and my passions with others.  
                </p>
                <p>
                As a Product Manager working in insurtech, I get to tackle
                fascinating challenges every day alongside a talented team of product,
                design, and engineering pros. Together, we transform complex
                insurance problems into elegant digital solutions that make a
                real difference in people's lives.
                </p>
                <p>
                My team specifically focuses on creating intuitive and delightful 
                user experiences. What does that mean? Bascially, that we care about the
                people that are going to use our software and we design with them in mind.
                </p>
                <p>
                But that's just one dimension of my career, my life, and my journey
                thus far. Continue further to learn more.
                </p>
              </div>
            </div>

            {/* Continue to Next Section */}
            <div className="mt-16 flex flex-col items-center">
              <div className="text-white text-xl mb-4 opacity-75 
                            group-hover:opacity-100 transition-opacity">
                Continue scrolling
              </div>
              <RocketShip 
                onClick={() => scrollToSection(window.innerHeight * 2 + 100)}
              />
            </div>
          </section>

          {/* Second About Section with Continue */}
          <section 
            className="relative min-h-screen flex flex-col items-center justify-center z-20 px-4 md:px-8 mt-[50vh]"
            style={{
              opacity: aboutTwoOpacity,
              transform: `translateY(${Math.max(0, 50 - (y - 1000) / 8)}px)`
            }}
          >
            <div className="max-w-3xl mx-auto text-white">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">
                My Journey
              </h2>
              
              <div className="space-y-6 text-lg md:text-xl leading-relaxed">
                <p>
                By day, I work as a Technical Product Manager for an insurance company.
                I know, insurance sounds boring, but I get to work in a really special
                software space with people that care about technology. It's a really
                cool gig. While I spend most of my time orchestrating technical solutions
                and driving product innovation, my world extends far beyond this role. 
                </p>
                <p>
                My journey is rich with experiences, woven from threads of code, color,
                and chords. I'm constantly seeking my ideal dynamic where technology and
                art intersect, giving rise to something truly unique and captivating.
                </p>
              </div>
            </div>

            {/* Continue to Next Section */}
            <div className="mt-16 flex flex-col items-center">
              <div className="text-white text-xl mb-4 opacity-75 
                            group-hover:opacity-100 transition-opacity">
                Continue
              </div>
              <RocketShip 
                onClick={() => scrollToSection(window.innerHeight * 3 + 100)}
              />
            </div>
          </section>

          {/* Rest of content with adjusted z-index */}
          <div className="relative z-10">
            {/* Initial cosmic journey section */}
            <section className="h-[800vh]" aria-hidden="true" />

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
