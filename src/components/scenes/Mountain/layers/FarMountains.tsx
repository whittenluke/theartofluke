const FarMountains = () => (
  <svg
    viewBox="0 0 1440 800"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
    preserveAspectRatio="xMidYMax slice"
  >
    <defs>
      <linearGradient id="farMountainGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#4A5568" />
        <stop offset="100%" stopColor="#2D3748" />
      </linearGradient>
      
      <linearGradient id="atmosphericGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#718096" />
        <stop offset="100%" stopColor="#4A5568" />
      </linearGradient>
    </defs>

    {/* Furthest range - with MUCH taller, steeper left peak */}
    <path
      d="M-100 800
         L 100 300
         C 150 50, 200 50, 400 400
         C 600 450, 800 400, 1000 350
         C 1200 280, 1400 320, 1600 350
         L 1600 800 L -100 800 Z"
      fill="url(#atmosphericGradient)"
      opacity="0.8"
    />

    {/* Middle range - unchanged */}
    <path
      d="M-200 800
         L -100 600
         C 100 400, 300 450, 500 420
         C 700 450, 900 400, 1100 450
         C 1300 380, 1450 350, 1600 400
         L 1600 800 L -200 800 Z"
      fill="url(#farMountainGradient)"
      opacity="0.9"
    />

    {/* Closest range - unchanged */}
    <path
      d="M-150 800
         C 0 600, 100 450, 300 500
         C 500 550, 700 500, 900 520
         C 1100 480, 1300 400, 1500 450
         L 1600 500 L 1600 800 L -150 800 Z"
      fill="#2D3748"
    />
  </svg>
)

export default FarMountains