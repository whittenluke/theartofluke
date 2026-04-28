'use client'

import { useScroll } from '@/hooks/useScroll'
import { 
  CommandLineIcon, RocketLaunchIcon, SparklesIcon,
  LightBulbIcon, MusicalNoteIcon, SignalIcon,
  Bars3Icon, XMarkIcon
} from '@heroicons/react/24/outline'
import { useState, useEffect } from 'react'

interface QuickNavProps {
  currentSection?: string
  onNavigate: (section: string) => void
}

export const QuickNav = ({ currentSection, onNavigate }: QuickNavProps) => {
  const [mounted, setMounted] = useState(false)
  const { y } = useScroll({ threshold: 50 })
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  const shouldShow = mounted && y > 800 && y < 8000

  const navItems = [
    { 
      id: 'missionControl', 
      icon: CommandLineIcon, 
      label: ['Mission', 'Control'],
      color: 'text-blue-500' 
    },
    { 
      id: 'innovationSector', 
      icon: LightBulbIcon, 
      label: ['Innovation', 'Sector'],
      color: 'text-yellow-500' 
    },
    { 
      id: 'artNebula', 
      icon: SparklesIcon, 
      label: ['Art', 'Nebula'],
      color: 'text-purple-500' 
    },
    { 
      id: 'harmonicTransmission', 
      icon: MusicalNoteIcon, 
      label: ['Harmonic', 'Transmission'],
      color: 'text-red-500' 
    },
    { 
      id: 'professionalJourney', 
      icon: RocketLaunchIcon, 
      label: ['Professional', 'Journey'],
      color: 'text-green-500' 
    },
    { 
      id: 'communicationArray', 
      icon: SignalIcon, 
      label: ['Contact', 'Zone'],
      color: 'text-cyan-500' 
    }
  ]

  const handleNavigation = (id: string) => {
    onNavigate(id)
    setIsMenuOpen(false)
  }

  if (!mounted) return null

  return (
    <nav className={`
      fixed top-0 left-0 w-full z-[100]
      transition-all duration-500 ease-out
      ${shouldShow 
        ? 'translate-y-0 opacity-100' 
        : '-translate-y-full opacity-0'
      }
    `}>
      <div className="
        mx-auto px-4 backdrop-blur-md bg-black/40
        border-b border-white/10 shadow-lg
      ">
        <div className="max-w-7xl mx-auto h-20">
          <div className="hidden sm:flex justify-center items-center h-full">
            <div className="flex space-x-3">
              {navItems.map(({ id, icon: Icon, label, color }) => {
                const isActive = currentSection === id
                return (
                  <button
                    key={id}
                    onClick={() => handleNavigation(id)}
                    className={`
                      group px-5 py-2.5 rounded-lg
                      transition-all duration-300
                      ${isActive 
                        ? 'bg-white/20' 
                        : 'hover:bg-white/10'
                      }
                    `}
                  >
                    <div className="flex flex-col items-center">
                      <Icon className={`
                        w-6 h-6 mb-1.5
                        ${color}
                        ${isActive ? 'animate-pulse' : ''}
                      `} />
                      <div className="flex flex-col items-center">
                        {label.map((line, i) => (
                          <span
                            key={i}
                            className={`
                              text-[11px] leading-tight
                              transition-colors duration-300
                              ${isActive ? 'text-white' : 'text-white/70 group-hover:text-white/90'}
                            `}
                          >
                            {line}
                          </span>
                        ))}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="sm:hidden flex items-center h-full justify-end">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="p-2 text-white/70 hover:text-white"
            >
              <Bars3Icon className="w-8 h-8" />
            </button>
          </div>
        </div>
      </div>

      <div className={`
        sm:hidden fixed inset-0 bg-black/95 backdrop-blur-lg z-[110]
        transition-all duration-300
        ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
      `}>
        <div className="flex flex-col h-full">
          <div className="flex justify-end p-4">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 text-white hover:text-white"
            >
              <XMarkIcon className="w-8 h-8" />
            </button>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center space-y-6 p-4">
            {navItems.map(({ id, icon: Icon, label, color }) => {
              const isActive = currentSection === id
              return (
                <button
                  key={id}
                  onClick={() => handleNavigation(id)}
                  className={`
                    w-full max-w-sm p-4 rounded-lg
                    transition-all duration-300
                    backdrop-blur-md
                    ${isActive 
                      ? 'bg-black/90 shadow-lg border border-white/20' 
                      : 'bg-black/80 hover:bg-black/90 border border-white/10'
                    }
                  `}
                >
                  <div className="flex items-center space-x-4">
                    <Icon className={`
                      w-8 h-8
                      ${color}
                      ${isActive ? 'animate-pulse' : ''}
                    `} />
                    <div className="text-left">
                      {label.map((line, i) => (
                        <span
                          key={i}
                          className={`
                            block text-lg font-medium
                            ${isActive ? 'text-white' : 'text-white/95'}
                          `}
                        >
                          {line}
                        </span>
                      ))}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
} 