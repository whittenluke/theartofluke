'use client'

import { Suspense, useCallback, useState, useEffect, CSSProperties } from 'react'
import { useScroll } from '@/hooks/useScroll'
import SpaceScene from '@/components/scenes/Space'

// Page metadata for dynamic routes
export const dynamic = 'force-dynamic'

// Add this rocket component (you can move it to a separate file later)
const RocketShip = ({ onClick, className = "", position = "first" }: { 
  onClick: () => void, 
  className?: string,
  position?: "first" | "second" | "third"
}) => {
  const { y, direction } = useScroll({ threshold: 10, delay: 50 })
  const [isAnimating, setIsAnimating] = useState(false)
  const [flightProgress, setFlightProgress] = useState(0)
  const [isLeadingScroll, setIsLeadingScroll] = useState(false)

  // Track current section
  const getCurrentSection = useCallback(() => {
    if (y < window.innerHeight * 0.8) return 'title'
    if (y < window.innerHeight * 1.8) return 'about'
    if (y < window.innerHeight * 2.8) return 'journey'
    return 'other'
  }, [y])

  // Handle scroll-based behavior
  useEffect(() => {
    if (direction === 'down' && y > 100) {
      setIsLeadingScroll(true)
    } else if (direction === 'up' && y < 100) {
      setIsLeadingScroll(false)
    }
  }, [y, direction])

  // Handle click animation and scroll
  const handleClick = async () => {
    const currentSection = getCurrentSection()
    if (isAnimating) return // Prevent multiple clicks during animation
    
    setIsAnimating(true)
    
    // Much slower animation (4 seconds total)
    const startTime = Date.now()
    const duration = 4000
    
    const animateFlight = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Smooth easing
      const eased = -(Math.cos(Math.PI * progress) - 1) / 2
      setFlightProgress(eased)
      
      if (progress < 1) {
        requestAnimationFrame(animateFlight)
      } else {
        // Determine next section based on current position
        const nextY = currentSection === 'title' ? window.innerHeight + 100 :
                     currentSection === 'about' ? window.innerHeight * 2 + 100 :
                     window.innerHeight * 3 + 100

        // Slow scroll to next section
        window.scrollTo({
          top: nextY,
          behavior: 'smooth'
        })
        
        // Reset after animation completes
        setTimeout(() => {
          setIsAnimating(false)
          setFlightProgress(0)
        }, 1000)
      }
    }
    
    requestAnimationFrame(animateFlight)
  }

  // Calculate styles based on state
  const getFlightStyles = (): CSSProperties => {
    if (isAnimating) {
      return {
        position: 'fixed',
        left: '50%',
        top: '80%',
        transform: `translate(-50%, -50%) rotate(${180 * flightProgress}deg)`,
        transition: 'transform 1s ease-out',
        zIndex: 100
      }
    }

    if (isLeadingScroll) {
      return {
        position: 'fixed',
        left: '50%',
        bottom: '20%',
        transform: `translate(-50%, 0) rotate(${direction === 'down' ? '180deg' : '0deg'})`,
        transition: 'transform 0.5s ease-out',
        zIndex: 100
      }
    }

    // Default position
    return {
      position: 'relative',
      transition: 'transform 0.5s ease-out'
    }
  }

  return (
    <div 
      onClick={handleClick}
      className={`group cursor-pointer ${className}`}
      style={getFlightStyles()}
    >
      <div className="relative transform transition-all duration-700">
        {/* Text - Only show on initial load */}
        {getCurrentSection() === 'title' && !isLeadingScroll && !isAnimating && (
          <div className="text-white text-xl mb-4 opacity-75 text-center whitespace-nowrap
                       transition-opacity duration-300 group-hover:opacity-100">
            Scroll down or click spaceship
          </div>
        )}

        {/* Rocket */}
        <div className="transform transition-all duration-1000">
          <svg 
            className="w-16 h-16"
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

          {/* Engine glow */}
          <div 
            className={`
              absolute bottom-0 left-1/2 transform -translate-x-1/2 
              w-4 h-4 bg-orange-500 rounded-full blur-md
              ${(isAnimating || isLeadingScroll) ? 'animate-pulse-fast scale-150' : 'animate-pulse'}
            `}
          />
        </div>
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
              {/* Title content */}
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
              </div>

              {/* Single Spaceship */}
              <div className="absolute left-1/2 -translate-x-1/2 bottom-[20%]">
                <RocketShip 
                  onClick={() => scrollToSection(window.innerHeight + 100)}
                  position="first"
                />
              </div>
            </Suspense>
          </section>

          {/* First About Section */}
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
          </section>

          {/* Second About Section */}
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
