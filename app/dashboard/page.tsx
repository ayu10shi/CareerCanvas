"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { FileEdit, Plus, Settings, User, Download, Share2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { getUserSession } from "@/lib/sessionHelper"

export default function DashboardPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [documents, setDocuments] = useState([
    { id: 1, name: "My Resume", type: "resume", lastEdited: "2 days ago" },
    { id: 2, name: "Portfolio", type: "portfolio", lastEdited: "1 week ago" },
    { id: 3, name: "Academic CV", type: "cv", lastEdited: "3 weeks ago" },
  ])

  useEffect(() => {
    const user = getUserSession()
    if (!user) {
      router.push('/login')
      return
    }
  }, [router])

  const handleSignOut = () => {
    sessionStorage.clear()
    router.push('/login')
  }

  const handleDownload = (id: number) => {
    // Simulate download process
    toast({
      title: "Downloading template",
      description: "Your template is being prepared for download",
    })

    setTimeout(() => {
      toast({
        title: "Download complete",
        description: "Your template has been downloaded successfully",
      })
    }, 2000)
  }

  const handleShare = (id: number) => {
    // Copy a mock URL to clipboard
    navigator.clipboard.writeText(`https://careercanvas.com/share/${id}`)

    toast({
      title: "Link copied to clipboard",
      description: "You can now share this template with others",
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 bg-gradient-to-b from-gray-50 to-white px-4 py-8">
        <div className="container mx-auto">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">Dashboard</h1>
              <p className="mt-2 text-gray-500">Manage your professional documents</p>
            </div>
            <Link href="/templates">
              <Button className="group relative overflow-hidden bg-emerald-600 hover:bg-emerald-700">
                <span className="relative z-10 flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Create New
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 transition-opacity group-hover:opacity-100"></div>
              </Button>
            </Link>
          </div>
          <Tabs defaultValue="all" className="mt-6">
            <TabsList>
              <TabsTrigger value="all">All Documents</TabsTrigger>
              <TabsTrigger value="resume">Resumes</TabsTrigger>
              <TabsTrigger value="portfolio">Portfolios</TabsTrigger>
              <TabsTrigger value="cv">CVs</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {documents.map((doc) => (
                  <Card key={doc.id} className="group hover:shadow-md transition-all">
                    <CardHeader className="pb-3">
                      <CardTitle>{doc.name}</CardTitle>
                      <CardDescription>
                        {doc.type.charAt(0).toUpperCase() + doc.type.slice(1)} • Last edited {doc.lastEdited}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="aspect-[3/4] relative bg-gradient-to-br from-emerald-50 to-teal-100 overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center p-4">
                        <div className="w-full h-full bg-white rounded-lg shadow-md p-4 flex flex-col">
                          <div className="w-[70%] h-6 bg-emerald-100 rounded-md mb-3"></div>
                          <div className="w-[40%] h-3 bg-emerald-50 rounded-md mb-4"></div>
                          <div className="flex-1 flex flex-col space-y-2">
                            <div className="w-full h-3 bg-gray-100 rounded-md"></div>
                            <div className="w-full h-3 bg-gray-100 rounded-md"></div>
                            <div className="w-full h-3 bg-gray-100 rounded-md"></div>
                            <div className="w-[60%] h-3 bg-gray-100 rounded-md"></div>
                            <div className="mt-2 flex flex-wrap gap-1">
                              <div className="h-2 w-10 bg-emerald-100 rounded-full"></div>
                              <div className="h-2 w-8 bg-emerald-100 rounded-full"></div>
                              <div className="h-2 w-12 bg-emerald-100 rounded-full"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          className="bg-white hover:bg-gray-100"
                          onClick={() => handleShare(doc.id)}
                        >
                          <Share2 className="h-4 w-4 mr-1" />
                          Share
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          className="bg-white hover:bg-gray-100"
                          onClick={() => handleDownload(doc.id)}
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">
                        Preview
                      </Button>
                      <Link href={`/templates/${doc.id}`}>
                        <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                          Edit
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="resume" className="mt-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {documents
                  .filter((doc) => doc.type === "resume")
                  .map((doc) => (
                    <Card key={doc.id} className="group hover:shadow-md transition-all">
                      <CardHeader className="pb-3">
                        <CardTitle>{doc.name}</CardTitle>
                        <CardDescription>
                          {doc.type.charAt(0).toUpperCase() + doc.type.slice(1)} • Last edited {doc.lastEdited}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="aspect-[3/4] relative bg-gradient-to-br from-emerald-50 to-teal-100 overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center p-4">
                          <div className="w-full h-full bg-white rounded-lg shadow-md p-4 flex flex-col">
                            <div className="w-[70%] h-6 bg-emerald-100 rounded-md mb-3"></div>
                            <div className="w-[40%] h-3 bg-emerald-50 rounded-md mb-4"></div>
                            <div className="flex-1 flex flex-col space-y-2">
                              <div className="w-full h-3 bg-gray-100 rounded-md"></div>
                              <div className="w-full h-3 bg-gray-100 rounded-md"></div>
                              <div className="w-full h-3 bg-gray-100 rounded-md"></div>
                              <div className="w-[60%] h-3 bg-gray-100 rounded-md"></div>
                              <div className="mt-2 flex flex-wrap gap-1">
                                <div className="h-2 w-10 bg-emerald-100 rounded-full"></div>
                                <div className="h-2 w-8 bg-emerald-100 rounded-full"></div>
                                <div className="h-2 w-12 bg-emerald-100 rounded-full"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <Button
                            variant="secondary"
                            size="sm"
                            className="bg-white hover:bg-gray-100"
                            onClick={() => handleShare(doc.id)}
                          >
                            <Share2 className="h-4 w-4 mr-1" />
                            Share
                          </Button>
                          <Button
                            variant="secondary"
                            size="sm"
                            className="bg-white hover:bg-gray-100"
                            onClick={() => handleDownload(doc.id)}
                          >
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" size="sm">
                          Preview
                        </Button>
                        <Link href={`/templates/${doc.id}`}>
                          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                            Edit
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="portfolio" className="mt-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {documents
                  .filter((doc) => doc.type === "portfolio")
                  .map((doc) => (
                    <Card key={doc.id} className="group hover:shadow-md transition-all">
                      <CardHeader className="pb-3">
                        <CardTitle>{doc.name}</CardTitle>
                        <CardDescription>
                          {doc.type.charAt(0).toUpperCase() + doc.type.slice(1)} • Last edited {doc.lastEdited}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="aspect-[3/4] relative bg-gradient-to-br from-purple-50 to-pink-100 overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center p-4">
                          <div className="w-full h-full bg-white rounded-lg shadow-md p-4 flex flex-col">
                            <div className="w-[70%] h-6 bg-purple-100 rounded-md mb-3"></div>
                            <div className="w-[40%] h-3 bg-purple-50 rounded-md mb-4"></div>
                            <div className="grid grid-cols-2 gap-2 mb-4">
                              <div className="aspect-square bg-purple-100 rounded-md"></div>
                              <div className="aspect-square bg-pink-100 rounded-md"></div>
                              <div className="aspect-square bg-pink-100 rounded-md"></div>
                              <div className="aspect-square bg-purple-100 rounded-md"></div>
                            </div>
                            <div className="flex-1 flex flex-col space-y-2">
                              <div className="w-full h-3 bg-gray-100 rounded-md"></div>
                              <div className="w-full h-3 bg-gray-100 rounded-md"></div>
                            </div>
                          </div>
                        </div>
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <Button
                            variant="secondary"
                            size="sm"
                            className="bg-white hover:bg-gray-100"
                            onClick={() => handleShare(doc.id)}
                          >
                            <Share2 className="h-4 w-4 mr-1" />
                            Share
                          </Button>
                          <Button
                            variant="secondary"
                            size="sm"
                            className="bg-white hover:bg-gray-100"
                            onClick={() => handleDownload(doc.id)}
                          >
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" size="sm">
                          Preview
                        </Button>
                        <Link href={`/templates/${doc.id}`}>
                          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                            Edit
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="cv" className="mt-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {documents
                  .filter((doc) => doc.type === "cv")
                  .map((doc) => (
                    <Card key={doc.id} className="group hover:shadow-md transition-all">
                      <CardHeader className="pb-3">
                        <CardTitle>{doc.name}</CardTitle>
                        <CardDescription>
                          {doc.type.charAt(0).toUpperCase() + doc.type.slice(1)} • Last edited {doc.lastEdited}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="aspect-[3/4] relative bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center p-4">
                          <div className="w-full h-full bg-white rounded-lg shadow-md p-4 flex flex-col">
                            <div className="w-[70%] h-6 bg-blue-100 rounded-md mb-3"></div>
                            <div className="w-[40%] h-3 bg-blue-50 rounded-md mb-4"></div>
                            <div className="flex-1 flex flex-col space-y-2">
                              <div className="w-full h-3 bg-gray-100 rounded-md"></div>
                              <div className="w-full h-3 bg-gray-100 rounded-md"></div>
                              <div className="w-full h-3 bg-gray-100 rounded-md"></div>
                              <div className="w-[60%] h-3 bg-gray-100 rounded-md"></div>
                            </div>
                          </div>
                        </div>
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <Button
                            variant="secondary"
                            size="sm"
                            className="bg-white hover:bg-gray-100"
                            onClick={() => handleShare(doc.id)}
                          >
                            <Share2 className="h-4 w-4 mr-1" />
                            Share
                          </Button>
                          <Button
                            variant="secondary"
                            size="sm"
                            className="bg-white hover:bg-gray-100"
                            onClick={() => handleDownload(doc.id)}
                          >
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" size="sm">
                          Preview
                        </Button>
                        <Link href={`/templates/${doc.id}`}>
                          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                            Edit
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
