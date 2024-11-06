'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'

const Navigation = () => {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  const controlNavbar = useCallback(() => {
    if (typeof window !== 'undefined') {
      // Hide nav when scrolling down, show when scrolling up
      const currentScrollY = window.scrollY
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 100)
      setLastScrollY(currentScrollY)
    }
  }, [lastScrollY])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar)

      // Cleanup
      return () => {
        window.removeEventListener('scroll', controlNavbar)
      }
    }
  }, [controlNavbar])

  return (
    <nav 
      className={`
        fixed top-0 left-0 w-full z-50 
        transition-all duration-300 ease-in-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'}
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