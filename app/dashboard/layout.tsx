"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { getUserSession } from "@/lib/sessionHelper"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  useEffect(() => {
    const user = getUserSession()
    if (!user) {
      router.push('/login')
    }
  }, [router])

  return <>{children}</>
}
