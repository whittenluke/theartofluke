const FarMountains = () => (
  <svg
    viewBox="0 0 1440 800"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
    preserveAspectRatio="xMidYMax slice"
  >
    <defs>
      <linearGradient id="mountainGradient1" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#A3ADFF" />
        <stop offset="100%" stopColor="#8E96FF" />
      </linearGradient>
      
      <linearGradient id="mountainGradient2" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#8E96FF" />
        <stop offset="100%" stopColor="#7D84FF" />
      </linearGradient>

      <linearGradient id="mountainGradient3" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#7D84FF" />
        <stop offset="100%" stopColor="#6B71FF" />
      </linearGradient>
    </defs>

    {/* Back section: big mountains with high peaks */}
    <path
      d="M-200 800 L-100 500 L0 300 L100 500 L200 200 L300 400 L400 100 
         L500 300 L600 500 L1200 100 L1100 300 
         L1200 50 L1300 200 L1400 100 L1500 300 L1600 200 L1700 400 L1800 300 
         L1800 800 Z"
      fill="url(#mountainGradient1)"
      opacity="0.9"
    />

    {/* Middle section: less high, different pattern */}
    <path
      d="M-200 800 L-100 600 L0 500 L100 650 L200 450 L300 600 L400 500 
         L500 650 L800 500 L900 600 L1000 450 L1100 550 
         L1200 500 L1300 600 L1400 550 L1500 650 L1600 550 L1700 600 L1800 500 
         L1800 800 Z"
      fill="url(#mountainGradient2)"
      opacity="0.95"
    />

    {/* Closest section: different pattern, darker */}
    <path
      d="M-200 800 L-150 700 L-50 750 L50 650 L150 750 L250 700 L350 750 
         L450 650 L550 700 L650 750 L750 650 L850 750 L950 700 L1050 750 
         L1150 650 L1250 700 L1350 750 L1450 700 L1550 750 L1650 700 L1800 750 
         L1800 800 Z"
      fill="url(#mountainGradient3)"
      opacity="1"
    />
  </svg>
)

export default FarMountains