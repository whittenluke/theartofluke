export default function CanvassCaseStudyPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-24 md:py-28">
      <div className="mx-auto max-w-4xl">
        <section className="mb-14 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold">Canvass</h1>
          <p className="text-lg md:text-xl text-white/85 leading-relaxed">
            A lightweight canvassing app for assigning neighborhoods, tracking visited addresses, and giving field
            volunteers a simple map and address list to work from.
          </p>
          <p className="text-white/80 leading-relaxed">
            Canvass was built to make local canvassing more organized and visible. Admins can draw geofenced areas on
            a shared map, assign them to users, and track progress. Canvassers can sign in, see only the areas
            assigned to them, and mark addresses as canvassed from either the map or a grouped address list.
          </p>
        </section>

        <section className="mb-14 rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
          <h2 className="text-2xl font-semibold mb-5 text-cyan-300">Project Snapshot</h2>
          <div className="space-y-3 text-white/85">
            <p>
              <span className="font-semibold text-white">Type:</span> Progressive web app
            </p>
            <p>
              <span className="font-semibold text-white">Built with:</span> React, Supabase, Leaflet, Netlify
            </p>
            <p>
              <span className="font-semibold text-white">Purpose:</span> Canvassing coordination
            </p>
            <p>
              <span className="font-semibold text-white">Core features:</span> Geofences, shared map, grouped address
              list, magic link sign-in
            </p>
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold mb-4 text-cyan-300">The Problem</h2>
          <div className="space-y-4 text-white/80 leading-relaxed">
            <p>
              Local canvassing gets messy fast when there is no shared system behind it. Addresses live in
              spreadsheets, area assignments happen in conversation, and it becomes hard to tell which neighborhoods
              have been worked and which have not.
            </p>
            <p>
              I built Canvass to solve that in a simple way. Instead of relying on disconnected tools, the app gives
              admins a shared map of addresses, lets them assign areas to specific users, and gives canvassers a clear
              view of what belongs to them.
            </p>
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold mb-6 text-cyan-300">How It Works</h2>
          <div className="space-y-8">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
              <h3 className="text-xl font-semibold mb-3 text-emerald-300">Admin Tools</h3>
              <p className="text-white/80 leading-relaxed">
                Admins use the map to create and manage work areas. A geofence can be drawn around a neighborhood or
                subdivision, named, and assigned to a user by email. From there, the admin can see that area&apos;s
                progress and manage access without relying on separate spreadsheets or messages.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
              <h3 className="text-xl font-semibold mb-3 text-emerald-300">Canvasser Map</h3>
              <p className="text-white/80 leading-relaxed">
                Canvassers sign in through a magic link and see a full map with their assigned areas clearly
                highlighted. Address points inside those areas can be marked as canvassed. Outside areas stay visible
                for context, but the working area is what stands out.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
              <h3 className="text-xl font-semibold mb-3 text-emerald-300">Address List View</h3>
              <p className="text-white/80 leading-relaxed">
                The app also includes a grouped address list so canvassers are not forced to rely only on tapping map
                points. Addresses are grouped by street, progress is shown at the top, and a user can expand a section
                and mark addresses canvassed directly from the list.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold mb-4 text-cyan-300">UX Decisions</h2>
          <div className="space-y-4 text-white/80 leading-relaxed">
            <p>
              This project became just as much about usability as it was about mapping and data.
            </p>
            <p>
              One of the first issues was touch accuracy. When many address points are close together, a dense map
              becomes hard to use on a phone. To make that workable, grouped markers help reduce clutter, and the
              address list gives canvassers a second way to move through an assigned area without fighting the map.
            </p>
            <p>
              Another major consideration was visual clarity. Assigned areas needed to stand out clearly against the
              base map, and color choices needed to work better for red-green colorblind users. That led to refining
              how geofences and status states were shown so the interface was easier to read at a glance.
            </p>
            <p>
              I also cut back on unnecessary metrics. Instead of filling the UI with repetitive numbers that do not
              add much, the design focuses on the progress information that is actually useful while someone is
              organizing or canvassing an area.
            </p>
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold mb-4 text-cyan-300">Stack and Architecture</h2>
          <p className="text-white/80 leading-relaxed">
            Canvass is built as a React and Vite progressive web app hosted on Netlify. Supabase handles
            authentication and data storage, including address points, user profiles, and geofences. Leaflet and
            OpenStreetMap power the mapping experience, with GIS-derived address data imported into the database and
            rendered as interactive map points.
          </p>
          <p className="text-white/80 leading-relaxed mt-4">
            The app uses role-based access so admins and canvassers see different controls, while still working from
            the same underlying map and address data.
          </p>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold mb-4 text-cyan-300">What Makes It Interesting</h2>
          <div className="space-y-4 text-white/80 leading-relaxed">
            <p>
              This project sits in a space I like a lot: operational software that has to be useful in the real world,
              not just technically correct.
            </p>
            <p>
              It combines GIS data, role-based permissions, map interaction, mobile-first thinking, and a real local
              use case. It also forced good product decisions. A dense map alone was not enough. A field tool like
              this needs multiple ways to work, clear assignment boundaries, and an interface simple enough for people
              who are not technical.
            </p>
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold mb-4 text-cyan-300">Screen Gallery</h2>
          <p className="text-white/80 leading-relaxed">
            Below are a few screens from the current build, showing the admin map, geofence assignment flow, grouped
            map markers, and the canvasser-facing address list.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-cyan-300">Reflection</h2>
          <div className="space-y-4 text-white/80 leading-relaxed">
            <p>
              Canvass pushed me to think through the gap between raw data and usable software. Importing thousands of
              addresses is one problem. Turning that into something a real person can use while out in the field is a
              different one.
            </p>
            <p>
              The most valuable part of building it has been working through those practical details: how to assign
              work clearly, how to make dense map data usable on mobile, and how to keep the experience simple enough
              that the tool helps rather than slows people down.
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}
