import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@styles/globals.css'

// Initialize font
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

// Metadata configuration
export const metadata: Metadata = {
  title: 'The Art of Luke',
  description: 'Explore the creative world of Luke Whitten - Technical Product Manager, Artist, and Technology Enthusiast',
  keywords: ['Luke Whitten', 'Art', 'Technology', 'Product Management', 'Creative'],
  authors: [{ name: 'Luke Whitten' }],
  creator: 'Luke Whitten',
  icons: {
    icon: [
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
      },
      {
        url: '/favicon.png',
        type: 'image/png',
      }
    ],
    shortcut: ['/favicon.svg'],
    apple: [
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
      }
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://theartofluke.com',
    siteName: 'The Art of Luke',
    title: 'The Art of Luke',
    description: 'Explore the creative world of Luke Whitten',
    images: [
      {
        url: '/og-image.jpg', // We'll need to create this
        width: 1200,
        height: 630,
        alt: 'The Art of Luke',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Art of Luke',
    description: 'Explore the creative world of Luke Whitten',
    images: ['/og-image.jpg'], // Same as OG image
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="min-h-screen bg-black antialiased">
        {/* Smooth scroll container */}
        <div className="relative h-full">
          {/* Skip to main content for accessibility */}
          <a 
            href="#main-content" 
            className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4"
          >
            Skip to main content
          </a>
          
          {/* Main content wrapper */}
          <main id="main-content" className="relative">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
