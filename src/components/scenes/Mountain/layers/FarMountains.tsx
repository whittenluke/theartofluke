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
        <stop offset="0%" stopColor="#2B3544" />
        <stop offset="100%" stopColor="#1F2937" />
      </linearGradient>
    </defs>

    {/* Left mountain mass */}
    <path
      d="M-100,800 
         Q100,600 200,580
         Q300,560 400,450
         Q450,400 500,420
         Q600,450 640,800 Z"
      fill="url(#mountainGradient1)"
    />

    {/* Center dominant mountain */}
    <path
      d="M400,800
         Q500,600 600,550
         T750,350
         Q850,300 900,350
         Q950,400 1000,800 Z"
      fill="#1F2937"
    />

    {/* Right mountain mass */}
    <path
      d="M800,800
         Q900,600 1000,550
         Q1100,500 1200,450
         Q1300,400 1350,450
         Q1400,500 1440,800 Z"
      fill="#374151"
    />
  </svg>
)

export default FarMountains