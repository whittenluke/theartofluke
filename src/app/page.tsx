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
import { QuickNav } from '@/components/navigation/QuickNav'
import Image from 'next/image'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

// Page metadata for dynamic routes
export const dynamic = 'force-dynamic'

// Add this near the top of the file, after imports
const TITLE_DISPLAY_DURATION = 3000 // Duration in ms to show title

// Add this after the TITLE_DISPLAY_DURATION constant
const SECTION_DESTINATIONS = {
  missionControl: 750,
  professionalJourney: 1000,
  innovationSector: 1600,
  artNebula: 2200,
  harmonicTransmission: 2800,
  communicationArray: 3400
} as const

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

  const [showTitle, setShowTitle] = useState(true)
  // Add state for Mission Control visibility
  const [showMissionControl, setShowMissionControl] = useState(false)

  useEffect(() => {
    const titleTimer = setTimeout(() => {
      setShowTitle(false)
      // Increase delay before showing Mission Control to 2000ms (2 seconds)
      setTimeout(() => {
        setShowMissionControl(true)
      }, 2000) // Increased from 1000ms to 2000ms for a clearer separation
    }, TITLE_DISPLAY_DURATION)

    return () => clearTimeout(titleTimer)
  }, [])

  // Add refs for each section
  const missionControlRef = useRef<HTMLElement>(null)
  const professionalJourneyRef = useRef<HTMLElement>(null)
  const innovationSectorRef = useRef<HTMLElement>(null)
  const artNebulaRef = useRef<HTMLElement>(null)
  const harmonicTransmissionRef = useRef<HTMLElement>(null)
  const communicationArrayRef = useRef<HTMLElement>(null)

  // Update scrollToSection to use element positions
  const scrollToSection = useCallback((target: number | HTMLElement | null) => {
    if (target === null) return
    
    const position = typeof target === 'number' 
      ? target 
      : target.getBoundingClientRect().top + window.scrollY

    window.scrollTo({
      top: position,
      behavior: 'smooth'
    })
  }, [])

  // Add state to track current section
  const [currentSection, setCurrentSection] = useState('missionControl')

  // Update handleCardClick to also set current section
  const handleCardClick = (ref: React.RefObject<HTMLElement>, sectionId: string) => {
    if (ref.current) {
      scrollToSection(ref.current)
      setCurrentSection(sectionId)
    }
  }

  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  return (
    <div className="relative min-h-[2000vh] bg-black" ref={missionControlRef}>
      {/* Add QuickNav at top level */}
      <QuickNav 
        currentSection={currentSection}
        onNavigate={(sectionId) => {
          const refs = {
            missionControl: missionControlRef,
            professionalJourney: professionalJourneyRef,
            innovationSector: innovationSectorRef,
            artNebula: artNebulaRef,
            harmonicTransmission: harmonicTransmissionRef,
            communicationArray: communicationArrayRef
          }
          handleCardClick(refs[sectionId as keyof typeof refs], sectionId)
        }}
      />

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
          <section className="relative h-screen flex flex-col items-center z-20">
            <Suspense fallback={<div className="text-white">Loading...</div>}>
              <div 
                className="transition-all duration-300 ease-out text-center mt-32"
                style={{
                  opacity: Math.max(0, 1 - (y / 300)),
                  transform: `translateY(${Math.min(y / 10, 20)}px)`
                }}
              >
                <h1 
                  className={`
                    flex flex-col items-center gap-4
                    text-6xl md:text-8xl text-white font-bold 
                    opacity-0 animate-fade-in [animation-duration:2s] 
                    [animation-fill-mode:forwards] mb-16
                    ${!showTitle ? 'animate-fade-out' : ''}
                  `}
                >
                  <span className="text-4xl md:text-6xl">Welcome to</span>
                  <span>The Art of Luke</span>
                </h1>
              </div>

              {/* Mission Control - Positioned at top */}
              <div 
                ref={missionControlRef}
                className={`
                  absolute top-32 left-1/2 -translate-x-1/2
                  w-full max-w-4xl px-4 transition-all duration-1000
                  ${showMissionControl ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}
                `}
              >
                <div className="text-white w-full">
                  <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
                    Mission Control
                  </h2>
                  
                  {/* Navigation Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Mission Control Card */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300 cursor-pointer"
                      onClick={() => handleCardClick(missionControlRef, 'missionControl')}
                    >
                      <div className="h-12 w-12 mb-4 mx-auto">
                        <CommandLineIcon className="w-full h-full text-blue-500" />
                      </div>
                      <h3 className="text-xl font-semibold text-center mb-2">Mission Control</h3>
                      <p className="text-sm text-center text-gray-300">Navigation Hub</p>
                    </div>

                    {/* Professional Journey Card */}
                    <div 
                      className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300 cursor-pointer"
                      onClick={() => handleCardClick(professionalJourneyRef, 'professionalJourney')}
                    >
                      <div className="h-12 w-12 mb-4 mx-auto">
                        <RocketLaunchIcon className="w-full h-full text-green-500" />
                      </div>
                      <h3 className="text-xl font-semibold text-center mb-2">Professional Journey</h3>
                      <p className="text-sm text-center text-gray-300">Career & Experience</p>
                    </div>

                    {/* Innovation Sector Card */}
                    <div 
                      className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300 cursor-pointer"
                      onClick={() => handleCardClick(innovationSectorRef, 'innovationSector')}
                    >
                      <div className="h-12 w-12 mb-4 mx-auto">
                        <LightBulbIcon className="w-full h-full text-yellow-500" />
                      </div>
                      <h3 className="text-xl font-semibold text-center mb-2">Innovation Sector</h3>
                      <p className="text-sm text-center text-gray-300">Tech & Ideas</p>
                    </div>

                    {/* Art Nebula Card */}
                    <div 
                      className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300 cursor-pointer"
                      onClick={() => handleCardClick(artNebulaRef, 'artNebula')}
                    >
                      <div className="h-12 w-12 mb-4 mx-auto">
                        <SparklesIcon className="w-full h-full text-purple-500" />
                      </div>
                      <h3 className="text-xl font-semibold text-center mb-2">Art Nebula</h3>
                      <p className="text-sm text-center text-gray-300">Creative Works</p>
                    </div>

                    {/* Harmonic Transmission Card */}
                    <div 
                      className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300 cursor-pointer"
                      onClick={() => handleCardClick(harmonicTransmissionRef, 'harmonicTransmission')}
                    >
                      <div className="h-12 w-12 mb-4 mx-auto">
                        <MusicalNoteIcon className="w-full h-full text-red-500" />
                      </div>
                      <h3 className="text-xl font-semibold text-center mb-2">Harmonic Transmission</h3>
                      <p className="text-sm text-center text-gray-300">Music & Sound</p>
                    </div>

                    {/* Communication Array Card */}
                    <div 
                      className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300 cursor-pointer"
                      onClick={() => handleCardClick(communicationArrayRef, 'communicationArray')}
                    >
                      <div className="h-12 w-12 mb-4 mx-auto">
                        <SignalIcon className="w-full h-full text-cyan-500" />
                      </div>
                      <h3 className="text-xl font-semibold text-center mb-2">Contact Zone</h3>
                      <p className="text-sm text-center text-gray-300">Contact & Connect</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Spaceship */}
              <div className="relative mt-auto mb-32">
                <RocketShip 
                  onClick={() => scrollToSection(750)}
                  position="first"
                />
              </div>
            </Suspense>
          </section>

          {/* Professional Journey Section */}
          <section 
            ref={professionalJourneyRef}
            className="relative min-h-screen flex flex-col items-center justify-center z-20 px-4 md:px-8 mt-[50vh]"
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

          {/* Innovation Sector Section */}
          <section 
            ref={innovationSectorRef}
            className="relative min-h-screen flex flex-col items-center justify-center z-20 px-4 md:px-8 mt-[50vh]"
          >
            <div className="max-w-6xl mx-auto text-white">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">
                Innovation Sector
              </h2>
              
              {/* Introduction text - keep narrower width */}
              <div className="max-w-3xl mx-auto space-y-6 text-lg md:text-xl leading-relaxed mb-16">
                <p>
                  At the intersection of technology and creativity, the Innovation Sector
                  serves as a laboratory for exploring cutting-edge ideas and solutions.
                </p>
              </div>

              {/* Projects Grid - adjust sizing and spacing */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 max-w-5xl mx-auto">
                {/* Higher Quotes - Fixed spacing and consistent height */}
                <div className="group relative h-full">
                  <a 
                    href="https://www.higherquotes.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block h-full"
                  >
                    <div className="
                      relative h-full flex flex-col
                      overflow-hidden rounded-xl
                      bg-gradient-to-br from-blue-500/20 to-purple-500/20
                      backdrop-blur-sm border border-white/10
                      p-6 transition-all duration-500
                      group-hover:border-white/20 group-hover:from-blue-500/30 group-hover:to-purple-500/30
                    ">
                      {/* Project Title - Moved up */}
                      <h3 className="text-xl font-bold mb-4">Higher Quotes</h3>

                      {/* Tech Stack Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="text-xs px-2 py-1 rounded-full bg-white/10">HTML</span>
                        <span className="text-xs px-2 py-1 rounded-full bg-white/10">CSS</span>
                        <span className="text-xs px-2 py-1 rounded-full bg-white/10">JavaScript</span>
                        <span className="text-xs px-2 py-1 rounded-full bg-white/10">Firestore</span>
                      </div>

                      {/* Project Description */}
                      <p className="text-sm text-white/70 flex-grow">
                        A wisdom-sharing platform featuring daily quotes, searchable by author or topic,
                        built with modern web technologies and AI assistance.
                      </p>

                      {/* Visit Link */}
                      <div className="
                        mt-4 opacity-0 transform translate-y-2
                        group-hover:opacity-100 group-hover:translate-y-0
                        transition-all duration-300
                      ">
                        <span className="text-sm text-white/90 flex items-center gap-1">
                          Visit Site →
                        </span>
                      </div>
                    </div>
                  </a>
                </div>

                {/* The Art of Luke - Consistent styling */}
                <div className="group relative h-full">
                  <div className="
                    relative h-full flex flex-col
                    overflow-hidden rounded-xl
                    bg-gradient-to-br from-purple-500/20 to-pink-500/20
                    backdrop-blur-sm border border-white/10
                    p-6 transition-all duration-500
                    group-hover:border-white/20 group-hover:from-purple-500/30 group-hover:to-pink-500/30
                  ">
                    <h3 className="text-xl font-bold mb-4">The Art of Luke</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-xs px-2 py-1 rounded-full bg-white/10">Next.js</span>
                      <span className="text-xs px-2 py-1 rounded-full bg-white/10">TypeScript</span>
                      <span className="text-xs px-2 py-1 rounded-full bg-white/10">Tailwind</span>
                    </div>
                    <p className="text-sm text-white/70 flex-grow">
                      A cosmic journey through technology, art, and innovation. Built with modern
                      web technologies and AI pair programming.
                    </p>
                  </div>
                </div>

                {/* WisdomQuest - Consistent styling */}
                <div className="group relative h-full">
                  <div className="
                    relative h-full flex flex-col
                    overflow-hidden rounded-xl
                    bg-gradient-to-br from-green-500/20 to-yellow-500/20
                    backdrop-blur-sm border border-white/10
                    p-6 transition-all duration-500
                    group-hover:border-white/20 group-hover:from-green-500/30 group-hover:to-yellow-500/30
                  ">
                    {/* Project Status Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="text-xs px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-300">
                        In Development
                      </span>
                    </div>

                    <h3 className="text-xl font-bold mb-4">WisdomQuest</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-xs px-2 py-1 rounded-full bg-white/10">C#</span>
                      <span className="text-xs px-2 py-1 rounded-full bg-white/10">Unity</span>
                      <span className="text-xs px-2 py-1 rounded-full bg-white/10">3D Adventure</span>
                    </div>
                    <p className="text-sm text-white/70 flex-grow">
                      An immersive 3D adventure game where players embark on real-world wisdom quests,
                      from beekeeping to bridge building. Launch expected mid-2025.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Art Nebula Section */}
          <section 
            ref={artNebulaRef}
            className="relative min-h-screen flex flex-col items-center justify-center z-20 px-4 md:px-8 mt-[50vh]"
          >
            <div className="max-w-7xl mx-auto text-white">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">
                Art Nebula
              </h2>
              
              {/* Introduction text - kept brief */}
              <div className="max-w-3xl mx-auto space-y-6 text-lg md:text-xl leading-relaxed mb-16">
                <p>
                  Within the Art Nebula, creative expression takes flight across multiple
                  mediums and dimensions.
                </p>
              </div>

              {/* Art Gallery Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
                {[...Array(17)].map((_, i) => (
                  <div 
                    key={i}
                    className="relative rounded-xl overflow-hidden bg-white/5 backdrop-blur-sm aspect-square cursor-pointer"
                    onClick={() => setSelectedImage(i)}
                  >
                    <Image
                      src={`/images/art/art${i + 1}.png`}
                      alt={`Artwork ${i + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 to-transparent pointer-events-none" />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Image Modal */}
          <Transition show={selectedImage !== null} as={Fragment}>
            <Dialog 
              open={selectedImage !== null} 
              onClose={() => setSelectedImage(null)}
              className="relative z-50"
            >
              {/* Backdrop */}
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
              </Transition.Child>

              {/* Modal */}
              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="relative transform rounded-xl overflow-hidden bg-black/50 backdrop-blur-md shadow-xl transition-all max-w-4xl w-full aspect-square">
                      {selectedImage !== null && (
                        <Image
                          src={`/images/art/art${selectedImage + 1}.png`}
                          alt={`Artwork ${selectedImage + 1}`}
                          fill
                          sizes="(max-width: 1536px) 100vw, 1536px"
                          className="object-contain"
                          priority
                        />
                      )}
                      {/* Close button */}
                      <button
                        onClick={() => setSelectedImage(null)}
                        className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white/70 hover:text-white hover:bg-black/70 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>

          {/* Harmonic Transmission Section */}
          <section 
            ref={harmonicTransmissionRef}
            className="relative min-h-screen flex flex-col items-center justify-center z-20 px-4 md:px-8 mt-[50vh]"
          >
            <div className="max-w-3xl mx-auto text-white">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">
                Harmonic Transmission
              </h2>
              
              <div className="space-y-6 text-lg md:text-xl leading-relaxed">
                <p>
                The Harmonic Transmission sector resonates with the rhythms and melodies
                of musical exploration. Here, sound waves ripple through the digital void,
                creating patterns of harmony and creative expression.
                </p>
                <p>
                This audio observatory captures the fusion of traditional musicianship
                with modern digital production, broadcasting sonic experiments across
                the vastness of our digital space.
                </p>
              </div>
            </div>
          </section>

          {/* Communication Array Section */}
          <section 
            ref={communicationArrayRef}
            className="relative min-h-screen flex flex-col items-center justify-center z-20 px-4 md:px-8 mt-[50vh]"
          >
            <div className="max-w-3xl mx-auto text-white">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">
                Contact Zone
              </h2>
              
              {/* Contact Links Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Email Contact */}
                <a 
                  href="mailto:whittenluke@gmail.com"
                  className="group relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 p-6
                    hover:bg-white/10 transition-all duration-500 hover:border-white/20"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-green-500/20">
                      <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Email me</h3>
                      <p className="text-sm text-white/70 group-hover:text-white/90 transition-colors">whittenluke@gmail.com</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/5 to-green-500/0 
                    translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </a>

                {/* GitHub Link */}
                <a 
                  href="https://github.com/whittenluke"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 p-6
                    hover:bg-white/10 transition-all duration-500 hover:border-white/20"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-purple-500/20">
                      <svg className="w-6 h-6 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Github</h3>
                      <p className="text-sm text-white/70 group-hover:text-white/90 transition-colors">github.com/whittenluke</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-purple-500/0 
                    translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </a>

                {/* LinkedIn Link */}
                <a 
                  href="https://www.linkedin.com/in/luke-whitten/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 p-6
                    hover:bg-white/10 transition-all duration-500 hover:border-white/20"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-cyan-500/20">
                      <svg className="w-6 h-6 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">LinkedIn</h3>
                      <p className="text-sm text-white/70 group-hover:text-white/90 transition-colors">linkedin.com/in/luke-whitten</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 
                    translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </a>

                {/* Facebook Link */}
                <a 
                  href="https://www.facebook.com/whittenluke/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 p-6
                    hover:bg-white/10 transition-all duration-500 hover:border-white/20"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-blue-500/20">
                      <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Facebook</h3>
                      <p className="text-sm text-white/70 group-hover:text-white/90 transition-colors">facebook.com/whittenluke</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 
                    translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </a>
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
