'use client'

import { Suspense, useCallback, useState, useEffect, useRef } from 'react'
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
import { ScrollProgress } from '@/components/navigation/ScrollProgress'

// Page metadata for dynamic routes
export const dynamic = 'force-dynamic'

// Add this near the top of the file, after imports
const TITLE_DISPLAY_DURATION = 3000 // Duration in ms to show title

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const { y } = useScroll({
    threshold: 10
  })

  // Add all the necessary state
  const [showTitle, setShowTitle] = useState(true)
  const [showMissionControl, setShowMissionControl] = useState(false)
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [currentSection, setCurrentSection] = useState('missionControl')
  const [spaceSceneLoaded, setSpaceSceneLoaded] = useState(false)
  const [showContent, setShowContent] = useState(false)

  // Add refs for each section
  const missionControlRef = useRef<HTMLDivElement>(null)
  const professionalJourneyRef = useRef<HTMLDivElement>(null)
  const innovationSectorRef = useRef<HTMLDivElement>(null)
  const artNebulaRef = useRef<HTMLDivElement>(null)
  const harmonicTransmissionRef = useRef<HTMLDivElement>(null)
  const communicationArrayRef = useRef<HTMLDivElement>(null)

  // Add handleCardClick
  const handleCardClick = useCallback((ref: React.RefObject<HTMLElement>, sectionId: string) => {
    if (sectionId === 'missionControl') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    } else if (ref.current) {
      const navHeight = 80
      const position = ref.current.getBoundingClientRect().top + window.scrollY - navHeight

      window.scrollTo({
        top: position,
        behavior: 'smooth'
      })
    }
    setCurrentSection(sectionId)
  }, [])

  // Add mounted effect
  useEffect(() => {
    setMounted(true)
  }, [])

  // Update space scene loading effect
  useEffect(() => {
    if (spaceSceneLoaded) {
      // Only start showing content after space scene is loaded
      setTimeout(() => {
        setShowContent(true)
      }, 100) // Small delay to ensure smooth transition
    }
  }, [spaceSceneLoaded])

  // Update title timer to wait for content to be ready
  useEffect(() => {
    if (!showContent) return

    const titleTimer = setTimeout(() => {
      setShowTitle(false)
      setTimeout(() => {
        setShowMissionControl(true)
      }, 2000)
    }, TITLE_DISPLAY_DURATION)

    return () => clearTimeout(titleTimer)
  }, [showContent])

  // Add section detection effect
  useEffect(() => {
    const isElementInViewport = (element: HTMLElement | null) => {
      if (!element) return false
      const rect = element.getBoundingClientRect()
      const windowHeight = window.innerHeight || document.documentElement.clientHeight
      const offset = windowHeight * 0.4

      return (rect.top >= -offset && rect.top <= windowHeight - offset)
    }

    const handleScroll = () => {
      const sections = {
        missionControl: missionControlRef.current,
        professionalJourney: professionalJourneyRef.current,
        innovationSector: innovationSectorRef.current,
        artNebula: artNebulaRef.current,
        harmonicTransmission: harmonicTransmissionRef.current,
        communicationArray: communicationArrayRef.current
      }

      for (const [sectionId, sectionRef] of Object.entries(sections)) {
        if (isElementInViewport(sectionRef)) {
          setCurrentSection(sectionId)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Update the style calculation to handle initial render
  const getTitleStyle = () => {
    if (!mounted) return {
      opacity: 1,
      transform: 'translateY(0px)'
    }

    return {
      opacity: Math.max(0, 1 - (y / 300)),
      transform: `translateY(${Math.min(y / 10, 20)}px)`
    }
  }

  // In your JSX, update the style prop
  return (
    <div className="relative min-h-[400vh] bg-black" ref={missionControlRef}>
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
      
      <ScrollProgress currentSection={currentSection} />

      {/* Main Content with Space Background */}
      <div className="relative">
        {/* Space Scene as fixed background */}
        <div className="fixed top-0 left-0 w-full h-[100vh] z-0">
          <SpaceScene onLoad={() => setSpaceSceneLoaded(true)} />
        </div>
        
        {/* Content - Only show after space scene loads */}
        <div className={`
          relative transition-opacity duration-1000
          ${showContent ? 'opacity-100' : 'opacity-0'}
        `}>
          {/* Title Section */}
          <section className="relative h-screen flex flex-col items-center z-20">
            <Suspense fallback={<div className="text-white">Loading...</div>}>
              <div 
                className={`
                  transition-all duration-1000 ease-out text-center mt-32
                  ${spaceSceneLoaded ? 'opacity-100' : 'opacity-0'}
                `}
                style={getTitleStyle()}
              >
                <h1 
                  className={`
                    flex flex-col items-center gap-4
                    text-6xl md:text-8xl text-white font-bold 
                    opacity-0 animate-fade-in [animation-duration:2s] 
                    [animation-fill-mode:forwards]
                    ${!showTitle ? 'animate-fade-out' : ''}
                    ${!spaceSceneLoaded ? 'animation-play-state: paused' : ''}
                  `}
                >
                  <span className="text-4xl md:text-6xl">Welcome to</span>
                  <span>The Art of Luke</span>
                </h1>
              </div>

              {/* Mission Control - wait for space scene and title */}
              <div 
                ref={missionControlRef}
                className={`
                  absolute top-16 left-1/2 -translate-x-1/2
                  w-full max-w-4xl px-4 
                  transition-all duration-1000
                  ${showMissionControl && spaceSceneLoaded 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 -translate-y-8'
                  }
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
            </Suspense>
          </section>

          {/* Professional Journey Section */}
          <section 
            ref={professionalJourneyRef}
            className="relative min-h-screen flex flex-col items-center justify-center z-20 px-4 md:px-8 mt-[100vh] lg:mt-[50vh]"
          >
            <div className="max-w-4xl mx-auto text-white w-full">
              <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
                Professional Journey
              </h2>
              
              {/* Introduction - Remove text-center class */}
              <div className="mb-16 text-lg md:text-xl leading-relaxed">
                <p className="text-white/90">
                  My path to product management has been anything but conventional. It's a journey that began with 
                  entrepreneurship, creativity, and a deep passion for building experiences that matter.
                </p>
              </div>

              {/* Timeline/Journey Points */}
              <div className="space-y-16">
                {/* Creative Foundation */}
                <div className="group relative flex items-center gap-8">
                  <div className="hidden md:block w-24 shrink-0">
                    <span className="text-indigo-400 opacity-60">2004+</span>
                  </div>
                  <div className="
                    flex-grow backdrop-blur-sm bg-white/5 rounded-2xl p-6 md:p-8
                    border border-white/10 hover:border-white/20
                    transition-all duration-300
                  ">
                    <h3 className="text-2xl font-semibold mb-4 text-indigo-400">Creative Foundations</h3>
                    <p className="text-white/80 leading-relaxed">
                      Built a diverse creative practice through commissioned artwork and live music performance. 
                      From portraits and landscapes to pet illustrations and custom signage, developed a 
                      keen eye for client needs and artistic execution. This foundation in creative 
                      problem-solving would later influence my approach to product development.
                    </p>
                  </div>
                </div>

                {/* Early Entrepreneurship */}
                <div className="group relative flex items-center gap-8">
                  <div className="hidden md:block w-24 shrink-0">
                    <span className="text-blue-400 opacity-60">2010s</span>
                  </div>
                  <div className="
                    flex-grow backdrop-blur-sm bg-white/5 rounded-2xl p-6 md:p-8
                    border border-white/10 hover:border-white/20
                    transition-all duration-300
                  ">
                    <h3 className="text-2xl font-semibold mb-4 text-blue-400">The First Venture</h3>
                    <p className="text-white/80 leading-relaxed">
                      Founded a coffeehouse in my early twenties with a $30,000 investment, 
                      building the operation from ground up—managing everything from equipment 
                      procurement to staffing.
                    </p>
                  </div>
                </div>

                {/* Coffee Industry */}
                <div className="group relative flex items-center gap-8">
                  <div className="hidden md:block w-24 shrink-0">
                    <span className="text-green-400 opacity-60">Mid 2010s</span>
                  </div>
                  <div className="
                    flex-grow backdrop-blur-sm bg-white/5 rounded-2xl p-6 md:p-8
                    border border-white/10 hover:border-white/20
                    transition-all duration-300
                  ">
                    <h3 className="text-2xl font-semibold mb-4 text-green-400">Coffee Craftsmanship</h3>
                    <p className="text-white/80 leading-relaxed">
                      Apprenticed as a coffee roaster, mastering beans from over 20 single-origin producers. 
                      Later became General Manager for a growing coffeehouse and bakery, leading expansion 
                      into new territories.
                    </p>
                  </div>
                </div>

                {/* Tech Transition */}
                <div className="group relative flex items-center gap-8">
                  <div className="hidden md:block w-24 shrink-0">
                    <span className="text-purple-400 opacity-60">2018</span>
                  </div>
                  <div className="
                    flex-grow backdrop-blur-sm bg-white/5 rounded-2xl p-6 md:p-8
                    border border-white/10 hover:border-white/20
                    transition-all duration-300
                  ">
                    <h3 className="text-2xl font-semibold mb-4 text-purple-400">The Tech Leap</h3>
                    <p className="text-white/80 leading-relaxed">
                      Joined an early-stage GPS tracking startup, where my experience in customer service 
                      and business operations positioned me to bridge the gap between users and technology.
                    </p>
                  </div>
                </div>

                {/* Product Evolution */}
                <div className="group relative flex items-center gap-8">
                  <div className="hidden md:block w-24 shrink-0">
                    <span className="text-rose-400 opacity-60">2021</span>
                  </div>
                  <div className="
                    flex-grow backdrop-blur-sm bg-white/5 rounded-2xl p-6 md:p-8
                    border border-white/10 hover:border-white/20
                    transition-all duration-300
                  ">
                    <h3 className="text-2xl font-semibold mb-4 text-rose-400">Product Evolution</h3>
                    <p className="text-white/80 leading-relaxed">
                      This marked a pivotal shift in my career, becoming fully immersed in product 
                      management—translating user needs into technical solutions, and driving business 
                      outcomes through data-driven decisions.
                    </p>
                  </div>
                </div>

                {/* Current Role */}
                <div className="group relative flex items-center gap-8">
                  <div className="hidden md:block w-24 shrink-0">
                    <span className="text-cyan-400 opacity-60">Present</span>
                  </div>
                  <div className="
                    flex-grow backdrop-blur-sm bg-white/5 rounded-2xl p-6 md:p-8
                    border border-white/10 hover:border-white/20
                    transition-all duration-300
                  ">
                    <h3 className="text-2xl font-semibold mb-4 text-cyan-400">Product Leadership</h3>
                    <p className="text-white/80 leading-relaxed">
                      As a Product Manager at SageSure, I leverage my unique blend of 
                      creative, entrepreneurial, and technical experience to build innovative solutions. 
                      My journey from artist to entrepreneur to product leader has equipped me with a 
                      holistic approach to product development—combining user empathy, business acumen, 
                      and technical understanding.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* Innovation Sector Section */}
          <section 
            ref={innovationSectorRef}
            className="relative min-h-screen flex flex-col items-center justify-center z-20 px-4 md:px-8 mt-[50vh]"
          >
            <div className="max-w-6xl mx-auto text-white w-full">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">
                Innovation Sector
              </h2>
              
              {/* Introduction text */}
              <div className="max-w-3xl mx-auto space-y-6 text-lg md:text-xl leading-relaxed mb-16">
                <p>
                  At the intersection of technology and creativity, the Innovation Sector
                  serves as a laboratory for exploring cutting-edge ideas and solutions.
                </p>
              </div>

              {/* Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 max-w-5xl mx-auto">
                {/* Higher Quotes */}
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
                      {/* Project Title */}
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

                {/* The Art of Luke */}
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

                {/* WisdomQuest */}
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
            <div className="max-w-4xl mx-auto text-white w-full">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">
                Harmonic Transmission
              </h2>
              
              {/* Musical Dimensions Card */}
              <div className="
                backdrop-blur-sm bg-white/5 rounded-2xl p-8
                border border-white/10 hover:border-white/20
                transition-all duration-300 mb-12
              ">
                <h3 className="text-2xl font-semibold mb-6 text-red-400 text-center">Musical Dimensions</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white/80">
                  <li className="flex items-start gap-3">
                    <MusicalNoteIcon className="text-red-400 w-6 h-6" />
                    <span>Self-taught musician</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <MusicalNoteIcon className="text-red-400 w-6 h-6" />
                    <span>Plays by ear and reads notation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <MusicalNoteIcon className="text-red-400 w-6 h-6" />
                    <span>Multi-instrumentalist: Guitar, Piano, Saxophone</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <MusicalNoteIcon className="text-red-400 w-6 h-6" />
                    <span>Vocal performance and harmony</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <MusicalNoteIcon className="text-red-400 w-6 h-6" />
                    <span>Preferred genres: Soul, Latin, Blues, Jazz</span>
                  </li>
                </ul>
              </div>

              {/* Current Frequencies */}
              <div className="
                backdrop-blur-sm bg-white/5 rounded-2xl p-8
                border border-white/10 hover:border-white/20
                transition-all duration-300 mb-12
              ">
                <h3 className="text-2xl font-semibold mb-4 text-red-400 text-center">Current Frequencies</h3>
                <p className="text-white/80 leading-relaxed">
                  While my public performances are mostly on pause, music remains a daily part of my life. 
                  These days, my most important audience is my daughter, as we create melodies together and 
                  explore the joy of musical expression. Our living room sessions range from improvised silly 
                  songs to classic favorites, cultivating her discovery and love for music.
                </p>
              </div>

              {/* Future Broadcasts */}
              <div className="
                backdrop-blur-sm bg-white/5 rounded-2xl p-8
                border border-white/10 hover:border-white/20
                transition-all duration-300
              ">
                <h3 className="text-2xl font-semibold mb-6 text-red-400 text-center">Future Broadcasts</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {['Upcoming recordings', 'Collaborative projects', 'Musical experiments', 'Teaching moments'].map((item, index) => (
                    <div 
                      key={index}
                      className="
                        p-4 rounded-lg bg-white/5
                        border border-white/10
                        text-center text-white/70
                        hover:text-white/90 hover:border-white/20
                        transition-all duration-300
                      "
                    >
                      {item}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-white/60 mt-8 italic text-center">
                  Note: This section will evolve as new content becomes available, but for now serves as a 
                  window into this vital part of my creative identity.
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

          {/* Footer */}
          <footer className="
            relative z-20 py-8 px-4 mt-16
            text-center text-white/60
            border-t border-white/10
            backdrop-blur-sm
          ">
            <div className="max-w-4xl mx-auto space-y-2">
              <p className="text-sm">Created by Luke Whitten</p>
              <p className="text-xs">© 2024 The Art of Luke. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}
