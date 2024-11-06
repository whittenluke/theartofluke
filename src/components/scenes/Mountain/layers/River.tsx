const River = () => (
  <svg
    viewBox="0 0 1440 800"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
    preserveAspectRatio="xMidYMax slice"
  >
    {/* River bed - slightly darker */}
    <path
      d="M0,700 
         C160,690 320,710 480,700
         C640,690 800,680 960,690
         C1120,700 1280,710 1440,700
         L1440,800 L0,800 Z"
      fill="#1E40AF"
      fillOpacity="0.3"
    />
    {/* River surface - animated */}
    <path
      d="M0,695
         C160,685 320,705 480,695
         C640,685 800,675 960,685
         C1120,695 1280,705 1440,695
         L1440,800 L0,800 Z"
      fill="#3B82F6"
      fillOpacity="0.6"
    >
      <animate
        attributeName="d"
        dur="3s"
        repeatCount="indefinite"
        values="
          M0,695 C160,685 320,705 480,695 C640,685 800,675 960,685 C1120,695 1280,705 1440,695 L1440,800 L0,800 Z;
          M0,690 C160,700 320,680 480,690 C640,700 800,710 960,700 C1120,690 1280,680 1440,690 L1440,800 L0,800 Z;
          M0,695 C160,685 320,705 480,695 C640,685 800,675 960,685 C1120,695 1280,705 1440,695 L1440,800 L0,800 Z"
      />
    </path>
  </svg>
)

export default River 