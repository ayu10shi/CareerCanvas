import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Navbar } from '@/components/navbar'
import { Toaster } from '@/components/ui/toaster'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CareerCanvas',
  description: 'Create professional resumes and portfolios',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900 antialiased`}>
        <div className="relative flex min-h-screen flex-col">
          <div className="fixed inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none"></div>
          <Navbar />
          <div className="relative flex-1">
            {children}
          </div>
          <Toaster />
        </div>
      </body>
    </html>
  )
}
