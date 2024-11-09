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

          {/* First About Section */}
          <section 
            className="relative min-h-screen flex items-center justify-center z-20 px-4 md:px-8"
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
                As a Product Manager in insurtech, I get to work on fascinating
                challenges daily with an incredible team. Together, we transform
                complex insurance problems into elegant digital solutions that
                make a real difference in people's lives. My team focuses on  
                creating unexpected and delightful experiences, and it's exactly
                the kind of space where groundbreaking experiences are born. 
                </p>
                <p>
                But that's just one dimension of my life, and my journey thus far
                through the cosmic expanse of technology and creativity. Continue
                your journey further to learn more.
                </p>
              </div>
            </div>
          </section>

          {/* Second About Section */}
          <section 
            className="relative min-h-screen flex items-center justify-center z-20 px-4 md:px-8 mt-[50vh]"
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
