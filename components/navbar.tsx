"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { FileEdit, Settings, User } from "lucide-react"
import { Button } from "./ui/button"
import { getUserSession } from "@/lib/sessionHelper"
import type { UserSession } from "@/lib/sessionHelper"

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<UserSession | null>(null)
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
    const userData = getUserSession()
    setUser(userData)
  }, [])

  const isPublicPath = ['/', '/login', '/register'].includes(pathname)

  // Prevent hydration issues by not rendering user-specific content server-side
  if (!mounted) {
    return (
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link className="flex items-center justify-center" href="/">
          <FileEdit className="h-6 w-6 mr-2 text-emerald-600" />
          <span className="font-bold">CareerCanvas</span>
        </Link>
      </header>
    )
  }

  const handleSignOut = () => {
    sessionStorage.clear()
    router.push('/login')
  }

  if (isPublicPath) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 border-b bg-white/80 backdrop-blur-md">
        <div className="container flex h-16 items-center px-6">
          <Link className="flex items-center gap-2 transition-colors hover:text-emerald-600 ml-6" href="/">
            <FileEdit className="h-6 w-6 text-emerald-600" />
            <span className="font-bold">CareerCanvas</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 mx-auto">
            <Link className="text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors" href="/templates">
              Templates
            </Link>
            <Link className="text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors" href="/pricing">
              Pricing
            </Link>
            <Link className="text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors" href="/about">
              About
            </Link>
          </nav>
          <div className="flex items-center gap-4 mr-6">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="hover:text-emerald-600">
                Sign in
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
      <div className="container flex h-16 items-center px-6">
        <Link className="flex items-center gap-2 transition-colors hover:text-emerald-600 ml-6" href="/dashboard">
          <FileEdit className="h-5 w-5 text-emerald-600" />
          <span className="font-bold">CareerCanvas</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 mx-auto">
          <Link 
            className={`text-sm font-medium transition-colors hover:text-emerald-600 ${
              pathname === '/dashboard' ? 'text-emerald-600' : 'text-gray-600'
            }`} 
            href="/dashboard"
          >
            Dashboard
          </Link>
          <Link 
            className={`text-sm font-medium transition-colors hover:text-emerald-600 ${
              pathname === '/templates' ? 'text-emerald-600' : 'text-gray-600'
            }`}
            href="/templates"
          >
            Templates
          </Link>
          <Link 
            className={`text-sm font-medium transition-colors hover:text-emerald-600 ${
              pathname === '/pricing' ? 'text-emerald-600' : 'text-gray-600'
            }`}
            href="/pricing"
          >
            Pricing
          </Link>
        </nav>
        <div className="flex items-center gap-4 mr-6">
          {user && (
            <span className="text-sm text-gray-600">
              Welcome, <span className="font-medium text-emerald-600">{user.name}</span>
            </span>
          )}
          <Link href="/dashboard/profile">
            <Button variant="ghost" size="icon" className="hover:text-emerald-600">
              <User className="h-5 w-5" />
            </Button>
          </Link>
          <Button variant="ghost" size="sm" onClick={handleSignOut} className="hover:text-emerald-600">
            Sign out
          </Button>
        </div>
      </div>
    </header>
  )
}
