'use client'

import { useScroll } from '@/hooks/useScroll'
import { 
  CommandLineIcon, RocketLaunchIcon, SparklesIcon,
  LightBulbIcon, MusicalNoteIcon, SignalIcon
} from '@heroicons/react/24/outline'

interface QuickNavProps {
  currentSection?: string
  onNavigate: (section: string) => void
}

export const QuickNav = ({ currentSection, onNavigate }: QuickNavProps) => {
  const { y } = useScroll({ threshold: 50 })
  
  // Only show nav after scrolling past Mission Control (around 800px)
  const shouldShow = y > 800 && y < 8000

  const navItems = [
    { 
      id: 'missionControl', 
      icon: CommandLineIcon, 
      label: ['Mission', 'Control'],
      color: 'text-blue-500' 
    },
    { 
      id: 'professionalJourney', 
      icon: RocketLaunchIcon, 
      label: ['Professional', 'Journey'],
      color: 'text-green-500' 
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
      id: 'communicationArray', 
      icon: SignalIcon, 
      label: ['Contact', 'Zone'],
      color: 'text-cyan-500' 
    }
  ]

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
        <div className="max-w-7xl mx-auto flex justify-center items-center h-20">
          <div className="flex space-x-3">
            {navItems.map(({ id, icon: Icon, label, color }) => {
              const isActive = currentSection === id
              return (
                <button
                  key={id}
                  onClick={() => onNavigate(id)}
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
      </div>
    </nav>
  )
} 