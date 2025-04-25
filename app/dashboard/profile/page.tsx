"use client"

import type React from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { getUserSession, setUserSession, type UserSession } from "@/lib/sessionHelper"

export default function ProfilePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [profileData, setProfileData] = useState<UserSession>({
    id: "",
    name: "",
    email: "",
    bio: "",
    location: "",
    website: "",
    github: "",
    linkedin: "",
  })

  useEffect(() => {
    const user = getUserSession()
    if (!user) {
      router.push('/login')
      return
    }
    setProfileData(user)
  }, [router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfileData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/profile/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData),
      })

      if (!response.ok) {
        throw new Error('Failed to update profile')
      }

      setUserSession(profileData)
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container max-w-4xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Profile</h1>
        <p className="mt-2 text-gray-500">Manage your personal information</p>
      </div>
      <div className="grid gap-8 md:grid-cols-[1fr_3fr]">
        <Card className="h-fit border-none bg-white/80 backdrop-blur-sm shadow-xl">
          <CardContent className="p-6 flex flex-col items-center">
            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mb-4">
              <User className="h-16 w-16 text-gray-500" />
            </div>
            <div className="text-center">
              <h2 className="font-medium text-lg">{profileData.name}</h2>
              <p className="text-sm text-gray-500">{profileData.email}</p>
            </div>
          </CardContent>
        </Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="border-none bg-white/80 backdrop-blur-sm shadow-xl">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" value={profileData.name} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={profileData.email} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" name="bio" value={profileData.bio} onChange={handleChange} rows={4} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" name="location" value={profileData.location} onChange={handleChange} />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit">Save Changes</Button>
            </CardFooter>
          </Card>
          <Card className="border-none bg-white/80 backdrop-blur-sm shadow-xl">
            <CardHeader>
              <CardTitle>Social Links</CardTitle>
              <CardDescription>Add your social media profiles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input id="website" name="website" value={profileData.website} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="github">GitHub</Label>
                <Input id="github" name="github" value={profileData.github} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input id="linkedin" name="linkedin" value={profileData.linkedin} onChange={handleChange} />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit">Save Changes</Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  )
}
