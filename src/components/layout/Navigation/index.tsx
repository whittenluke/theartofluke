'use client'

import { useCallback } from 'react'
import Link from 'next/link'
import { useScroll } from '@/hooks/useScroll'

const Navigation = () => {
  const { y, direction } = useScroll({
    threshold: 50,
    delay: 50
  })

  // Simplified visibility logic
  const isVisible = useCallback(() => {
    // Always show at top
    if (y < 100) return true
    // Show when scrolling up
    return direction === 'up'
  }, [y, direction])

  return (
    <nav 
      className={`
        fixed top-0 left-0 w-full z-50 
        transition-all duration-500 ease-out
        ${isVisible() ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'}
        ${y > 50 ? 'bg-black/75 backdrop-blur-sm' : 'bg-transparent'}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo/Home Link */}
          <Link 
            href="/" 
            className="text-white hover:text-gray-300 transition-colors"
          >
            The Art of Luke
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="#about" 
              className="text-white hover:text-gray-300 transition-colors"
            >
              About
            </Link>
            <Link 
              href="#gallery" 
              className="text-white hover:text-gray-300 transition-colors"
            >
              Gallery
            </Link>
            <Link 
              href="#contact" 
              className="text-white hover:text-gray-300 transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button - We'll implement the mobile menu later */}
          <button 
            className="md:hidden text-white"
            aria-label="Toggle menu"
          >
            <svg 
              className="h-6 w-6" 
              fill="none" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navigation 