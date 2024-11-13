import { 
  CommandLineIcon, RocketLaunchIcon, SparklesIcon,
  LightBulbIcon, MusicalNoteIcon, SignalIcon
} from '@heroicons/react/24/outline'

interface QuickNavProps {
  variant?: 'horizontal' | 'vertical'
  size?: 'small' | 'medium'
  currentSection?: string
  onNavigate: (section: string) => void
}

export const QuickNav = ({ 
  variant = 'horizontal', 
  size = 'medium',
  currentSection,
  onNavigate
}: QuickNavProps) => {
  const navItems = [
    { id: 'missionControl', icon: CommandLineIcon, label: 'Mission Control', color: 'text-blue-500' },
    { id: 'professionalJourney', icon: RocketLaunchIcon, label: 'Professional Journey', color: 'text-green-500' },
    { id: 'innovationSector', icon: LightBulbIcon, label: 'Innovation Sector', color: 'text-yellow-500' },
    { id: 'artNebula', icon: SparklesIcon, label: 'Art Nebula', color: 'text-purple-500' },
    { id: 'harmonicTransmission', icon: MusicalNoteIcon, label: 'Harmonic Transmission', color: 'text-red-500' },
    { id: 'communicationArray', icon: SignalIcon, label: 'Communication Array', color: 'text-cyan-500' }
  ]

  return (
    <div className={`
      flex flex-wrap justify-center gap-3 backdrop-blur-md 
      rounded-2xl p-4 max-w-[90vw] mx-auto
      ${variant === 'horizontal' ? 'flex-row' : 'flex-col'}
    `}>
      {navItems.map(({ id, icon: Icon, label, color }) => {
        const isActive = currentSection === id
        return (
          <button 
            key={id}
            className={`
              flex items-center gap-2 p-2 rounded-xl
              transition-all duration-300
              ${isActive 
                ? 'bg-white/20 shadow-lg scale-105' 
                : 'bg-white/10 hover:bg-white/15'
              }
            `}
            onClick={() => onNavigate(id)}
          >
            <Icon className={`
              w-6 h-6 md:w-5 md:h-5
              ${color}
              ${isActive ? 'animate-pulse' : ''}
            `} />
            <span className={`
              text-sm md:text-xs whitespace-nowrap
              ${isActive ? 'text-white' : 'text-white/70'}
            `}>
              {label}
            </span>
          </button>
        )
      })}
    </div>
  )
} 