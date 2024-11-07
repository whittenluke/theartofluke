'use client'

const Planets = () => {
  return (
    <svg
      viewBox="0 0 1440 6400"
      className="w-full h-full"
      preserveAspectRatio="xMidYMax slice"
    >
      {/* Test planet - should be very visible if rendering correctly */}
      <circle
        cx="720"
        cy="1000"
        r="200"
        fill="#FF0000"
        className="opacity-80"
      />
    </svg>
  )
}

export default Planets