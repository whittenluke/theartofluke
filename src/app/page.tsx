'use client'

import { Suspense, useCallback, useState, useEffect, CSSProperties, useRef } from 'react'
import { useScroll } from '@/hooks/useScroll'
import SpaceScene from '@/components/scenes/Space'
import { 
  CommandLineIcon,    // Mission Control
  RocketLaunchIcon,   // Professional Journey
  SparklesIcon,       // Art Nebula
  LightBulbIcon,      // Innovation Sector
  MusicalNoteIcon,    // Harmonic Transmission
  SignalIcon          // Communication Array
} from '@heroicons/react/24/outline'

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

  // Remove the isInLockZone function and replace with this simpler check
  const isInDefaultState = () => {
    return y === 0 || (y >= 750 && y <= 850) || (y >= 1820 && y <= 1920)
  }

  // Update the useEffect to properly handle both clickable zones
  useEffect(() => {
    if (y > 0 && !isInDefaultState()) {  
      setIsLeadingScroll(true)
    } else {
      setIsLeadingScroll(false)
    }
  }, [y])

  // Handle click animation and scroll
  const handleClick = async () => {
    const currentSection = getCurrentSection()
    if (isAnimating) return
    
    setIsAnimating(true)
    
    const startTime = Date.now()
    const duration = 2000
    
    const animateFlight = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Smooth easing
      const eased = -(Math.cos(Math.PI * progress) - 1) / 2
      setFlightProgress(eased)
      
      if (progress < 1) {
        requestAnimationFrame(animateFlight)
      } else {
        let nextY
        if (currentSection === 'title') {
          nextY = 750  // First click from top
        } else if (y >= 750 && y <= 850) {
          nextY = 1820  // Second click from About Me
        } else if (y >= 1820 && y <= 1920) {
          nextY = window.innerHeight * 3 + 100  // Third click from Journey
        }

        window.scrollTo({
          top: nextY,
          behavior: 'smooth'
        })
        
        setTimeout(() => {
          setFlightProgress(2)
          setTimeout(() => {
            setIsAnimating(false)
            setFlightProgress(0)
            setIsLeadingScroll(false)
          }, 500)
        }, 1000)
      }
    }
    
    requestAnimationFrame(animateFlight)
  }

  // Calculate styles based on state
  const getFlightStyles = (): CSSProperties => {
    if (isAnimating) {
      // Handle both initial and return rotation
      const rotationDegrees = flightProgress <= 1 
        ? 180 * flightProgress  // Initial rotation down
        : 180 * (2 - flightProgress) // Return rotation up
      
      return {
        position: 'fixed',
        left: '50%',
        top: '80%',
        transform: `translate(-50%, -50%) rotate(${rotationDegrees}deg)`,
        transition: 'transform 0.5s ease-out',
        zIndex: 100
      }
    }

    if (isLeadingScroll) {
      // Scroll behavior
      const rotationProgress = Math.min(y / 100, 1)
      
      if (y < 1) {
        return {
          position: 'relative',
          transform: 'rotate(0deg)',
          transition: 'all 0.3s ease-out',
          zIndex: 100
        }
      }

      const rotationDegrees = direction === 'down'
        ? 180 * rotationProgress
        : 0

      return {
        position: 'fixed',
        left: '50%',
        top: '80%',
        transform: `translate(-50%, -50%) rotate(${rotationDegrees}deg)`,
        transition: 'all 0.3s ease-out',
        zIndex: 100
      }
    }

    // Default state (used at both y=0 and 850-1000px)
    return {
      position: 'fixed',
      left: '50%',
      top: '80%',
      transform: 'translate(-50%, -50%) rotate(0deg)',
      transition: 'all 0.3s ease-out',
      zIndex: 100,
      cursor: 'pointer'
    }
  }

  return (
    <div 
      onClick={(e) => {
        // Debug logs
        console.log({
          y,
          isLeadingScroll,
          flightProgress,
          isInDefaultState: isInDefaultState(),
          isUpright: !isLeadingScroll && flightProgress === 0 && (y < 100 || (y >= 750 && y <= 850) || (y >= 1820 && y <= 1920))
        })
        
        const isUpright = !isLeadingScroll && flightProgress === 0 && 
                         (y < 100 || (y >= 750 && y <= 850) || (y >= 1820 && y <= 1920))
        
        if (isInDefaultState() && isUpright && !isAnimating) {
          handleClick()
        } else {
          e.preventDefault()
        }
      }}
      className={`group ${isInDefaultState() && !isLeadingScroll && flightProgress === 0 ? 'cursor-pointer' : 'cursor-default'} ${className}`}
      style={getFlightStyles()}
    >
      <div className="relative duration-700 flex flex-col items-center">
        {/* Text - Modified conditions for both sections */}
        {((getCurrentSection() === 'title' && (y === 0 || (!isLeadingScroll && !isAnimating)) && !isAnimating) ||
          (isInDefaultState() && !isAnimating && flightProgress === 0) ||
          (getCurrentSection() === 'about' && !isLeadingScroll && !isAnimating && flightProgress === 0)) && (
          <div className="text-white text-xl mb-4 opacity-75 text-center whitespace-nowrap
                       transition-opacity duration-300 group-hover:opacity-100">
            Scroll down or click spaceship
          </div>
        )}

        {/* Rocket */}
        <div className="flex justify-center duration-1000">
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

  // Simplify scrollToSection back to its basic form
  const scrollToSection = useCallback((target: number) => {
    window.scrollTo({
      top: target,
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
              <div className="relative">
                <RocketShip 
                  onClick={() => scrollToSection(750)}
                  position="first"
                />
              </div>
            </Suspense>
          </section>

          {/* Mission Control Section */}
          <section 
            className="relative flex flex-col items-center justify-center z-20 px-4 md:px-8"
            style={{
              opacity: aboutOneOpacity,
              transform: `translateY(${Math.max(0, 50 - (y - 400) / 8)}px)`
            }}
          >
            <div className="max-w-4xl mx-auto text-white w-full">
              <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
                Mission Control
              </h2>
              
              {/* Navigation Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Mission Control Card */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300">
                  <div className="h-12 w-12 mb-4 mx-auto">
                    <CommandLineIcon className="w-full h-full text-blue-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-2">Mission Control</h3>
                  <p className="text-sm text-center text-gray-300">Navigation Hub</p>
                </div>

                {/* Professional Journey Card */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300">
                  <div className="h-12 w-12 mb-4 mx-auto">
                    <RocketLaunchIcon className="w-full h-full text-green-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-2">Professional Journey</h3>
                  <p className="text-sm text-center text-gray-300">Career & Experience</p>
                </div>

                {/* Innovation Sector Card */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300">
                  <div className="h-12 w-12 mb-4 mx-auto">
                    <LightBulbIcon className="w-full h-full text-yellow-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-2">Innovation Sector</h3>
                  <p className="text-sm text-center text-gray-300">Tech & Ideas</p>
                </div>

                {/* Art Nebula Card */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300">
                  <div className="h-12 w-12 mb-4 mx-auto">
                    <SparklesIcon className="w-full h-full text-purple-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-2">Art Nebula</h3>
                  <p className="text-sm text-center text-gray-300">Creative Works</p>
                </div>

                {/* Harmonic Transmission Card */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300">
                  <div className="h-12 w-12 mb-4 mx-auto">
                    <MusicalNoteIcon className="w-full h-full text-red-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-2">Harmonic Transmission</h3>
                  <p className="text-sm text-center text-gray-300">Music & Sound</p>
                </div>

                {/* Communication Array Card */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300">
                  <div className="h-12 w-12 mb-4 mx-auto">
                    <SignalIcon className="w-full h-full text-cyan-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-2">Communication Array</h3>
                  <p className="text-sm text-center text-gray-300">Contact & Connect</p>
                </div>
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
                Professional Journey
              </h2>
              
              <div className="space-y-6 text-lg md:text-xl leading-relaxed">
                <p>
                As a Product Manager working in insurtech, I get to tackle
                fascinating challenges every day alongside a talented team
                of product, design, and engineering pros. Together, we
                transform complex insurance problems into elegant digital
                solutions that make a real difference in people's lives.
                </p>
                <p>
                My team specifically focuses on creating intuitive and
                delightful user experiences. What does that mean? Bascially,
                that we care about the people that are going to use our 
                software and we design with them in mind.
                </p>
                <p>
                But that's just one dimension of my career, my life, and my journey thus far. Continue further to learn more.
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
