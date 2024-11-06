import { Suspense } from 'react'

// Page metadata for dynamic routes
export const dynamic = 'force-dynamic'

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Initial landing section */}
      <section className="relative h-screen flex items-center justify-center bg-black">
        <Suspense fallback={<div className="text-white">Loading...</div>}>
          <h1 className="text-6xl md:text-8xl text-white font-bold opacity-0 animate-fade-in">
            The Art of Luke
          </h1>
        </Suspense>
      </section>

      {/* Mountain Scene Section */}
      <section className="relative h-screen">
        {/* Mountain scene component will be added here */}
      </section>

      {/* About Section */}
      <section className="relative min-h-screen bg-gradient-to-b from-mountain-base to-beach-water py-24">
        {/* About content will be added here */}
      </section>

      {/* Beach Scene Section */}
      <section className="relative h-screen">
        {/* Beach scene component will be added here */}
      </section>

      {/* Gallery Section */}
      <section className="relative min-h-screen bg-gradient-to-b from-beach-deep to-space-dark py-24">
        {/* Gallery content will be added here */}
      </section>

      {/* Space Scene Section */}
      <section className="relative h-screen">
        {/* Space scene component will be added here */}
      </section>
    </div>
  )
}
