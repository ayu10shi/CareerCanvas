import Link from "next/link"
import { Search, FileEdit, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TemplatesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="/">
          <FileEdit className="h-6 w-6 mr-2 text-emerald-600" />
          <span className="font-bold">CareerCanvas</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/templates">
            Templates
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/pricing">
            Pricing
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/about">
            About
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Login
            </Button>
          </Link>
          <Link href="/register">
            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
              Sign Up
            </Button>
          </Link>
        </div>
      </header> */}
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-emerald-50 to-white dark:from-gray-900 dark:to-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-emerald-800 dark:text-emerald-400">
                  Browse Templates
                </h1>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Find the perfect template for your resume or portfolio
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search templates..."
                    className="w-full bg-white pl-8 dark:bg-gray-950 border-emerald-200 focus-visible:ring-emerald-500"
                  />
                </div>
              </div>
            </div>
            <div className="mx-auto max-w-6xl py-8">
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
                  <TabsTrigger
                    value="all"
                    className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-emerald-600 data-[state=active]:text-emerald-700"
                  >
                    All
                  </TabsTrigger>
                  <TabsTrigger
                    value="resume"
                    className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-emerald-600 data-[state=active]:text-emerald-700"
                  >
                    Resume
                  </TabsTrigger>
                  <TabsTrigger
                    value="portfolio"
                    className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-emerald-600 data-[state=active]:text-emerald-700"
                  >
                    Portfolio
                  </TabsTrigger>
                  <TabsTrigger
                    value="cv"
                    className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-emerald-600 data-[state=active]:text-emerald-700"
                  >
                    CV
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="pt-6">
                  <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {/* Modern Resume Template */}
                    <Card className="overflow-hidden group hover:shadow-lg transition-all">
                      <div className="aspect-[3/4] relative bg-gradient-to-br from-emerald-50 to-teal-100 overflow-hidden">
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
                      </div>
                      <CardContent className="p-4">
                        <CardTitle className="text-emerald-700">Modern Resume</CardTitle>
                        <CardDescription>Clean and contemporary design</CardDescription>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Link href={`/templates/1`} className="w-full">
                          <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Use Template</Button>
                        </Link>
                      </CardFooter>
                    </Card>

                    {/* Professional CV Template */}
                    <Card className="overflow-hidden group hover:shadow-lg transition-all">
                      <div className="aspect-[3/4] relative bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center p-4">
                          <div className="w-full h-full bg-white rounded-lg shadow-md p-4 flex flex-col">
                            <div className="flex justify-between mb-3">
                              <div className="w-32 h-6 bg-blue-100 rounded-md"></div>
                              <div className="w-6 h-6 rounded-full bg-blue-100"></div>
                            </div>
                            <div className="w-[40%] h-3 bg-blue-50 rounded-md mb-4"></div>
                            <div className="flex-1 flex flex-col space-y-2">
                              <div className="flex gap-2 items-center">
                                <div className="w-4 h-4 rounded-full bg-blue-100"></div>
                                <div className="w-full h-3 bg-gray-100 rounded-md"></div>
                              </div>
                              <div className="flex gap-2 items-center">
                                <div className="w-4 h-4 rounded-full bg-blue-100"></div>
                                <div className="w-full h-3 bg-gray-100 rounded-md"></div>
                              </div>
                              <div className="flex gap-2 items-center">
                                <div className="w-4 h-4 rounded-full bg-blue-100"></div>
                                <div className="w-full h-3 bg-gray-100 rounded-md"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <CardTitle className="text-blue-700">Professional CV</CardTitle>
                        <CardDescription>Structured and detailed layout</CardDescription>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Link href={`/templates/2`} className="w-full">
                          <Button className="w-full bg-blue-600 hover:bg-blue-700">Use Template</Button>
                        </Link>
                      </CardFooter>
                    </Card>

                    {/* Creative Portfolio Template */}
                    <Card className="overflow-hidden group hover:shadow-lg transition-all">
                      <div className="aspect-[3/4] relative bg-gradient-to-br from-purple-50 to-pink-100 overflow-hidden">
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
                      </div>
                      <CardContent className="p-4">
                        <CardTitle className="text-purple-700">Creative Portfolio</CardTitle>
                        <CardDescription>Showcase your creative work</CardDescription>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Link href={`/templates/3`} className="w-full">
                          <Button className="w-full bg-purple-600 hover:bg-purple-700">Use Template</Button>
                        </Link>
                      </CardFooter>
                    </Card>

                    {/* Minimalist Resume Template */}
                    <Card className="overflow-hidden group hover:shadow-lg transition-all">
                      <div className="aspect-[3/4] relative bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center p-4">
                          <div className="w-full h-full bg-white rounded-lg shadow-md p-4 flex flex-col">
                            <div className="flex justify-between items-center mb-4">
                              <div>
                                <div className="w-40 h-6 bg-gray-200 rounded-md mb-1"></div>
                                <div className="w-24 h-3 bg-gray-100 rounded-md"></div>
                              </div>
                              <div className="w-12 h-12 rounded-full bg-gray-200"></div>
                            </div>
                            <div className="w-full h-px bg-gray-200 mb-3"></div>
                            <div className="flex-1 flex flex-col space-y-2">
                              <div className="w-24 h-4 bg-gray-200 rounded-md mb-1"></div>
                              <div className="w-full h-3 bg-gray-100 rounded-md"></div>
                              <div className="w-full h-3 bg-gray-100 rounded-md"></div>
                              <div className="w-24 h-4 bg-gray-200 rounded-md mt-2 mb-1"></div>
                              <div className="w-full h-3 bg-gray-100 rounded-md"></div>
                              <div className="w-full h-3 bg-gray-100 rounded-md"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <CardTitle className="text-gray-700">Minimalist Resume</CardTitle>
                        <CardDescription>Simple and elegant design</CardDescription>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Link href={`/templates/4`} className="w-full">
                          <Button className="w-full bg-gray-600 hover:bg-gray-700">Use Template</Button>
                        </Link>
                      </CardFooter>
                    </Card>

                    {/* Executive Resume Template */}
                    <Card className="overflow-hidden group hover:shadow-lg transition-all">
                      <div className="aspect-[3/4] relative bg-gradient-to-br from-amber-50 to-yellow-100 overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center p-4">
                          <div className="w-full h-full bg-white rounded-lg shadow-md p-4 flex flex-col">
                            <div className="h-8 w-full bg-amber-100 rounded-md mb-4"></div>
                            <div className="flex gap-4 mb-3">
                              <div className="w-3/4 space-y-2">
                                <div className="w-3/4 h-5 bg-amber-50 rounded-md"></div>
                                <div className="w-1/2 h-3 bg-gray-100 rounded-md"></div>
                              </div>
                              <div className="w-1/4 h-16 bg-amber-100 rounded-md"></div>
                            </div>
                            <div className="flex-1 flex flex-col space-y-2">
                              <div className="w-1/3 h-4 bg-amber-100 rounded-md mb-1"></div>
                              <div className="w-full h-3 bg-gray-100 rounded-md"></div>
                              <div className="w-full h-3 bg-gray-100 rounded-md"></div>
                              <div className="w-1/3 h-4 bg-amber-100 rounded-md mt-2 mb-1"></div>
                              <div className="w-full h-3 bg-gray-100 rounded-md"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <CardTitle className="text-amber-700">Executive Resume</CardTitle>
                        <CardDescription>Professional and authoritative</CardDescription>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Link href={`/templates/5`} className="w-full">
                          <Button className="w-full bg-amber-600 hover:bg-amber-700">Use Template</Button>
                        </Link>
                      </CardFooter>
                    </Card>

                    {/* Tech Portfolio Template */}
                    <Card className="overflow-hidden group hover:shadow-lg transition-all">
                      <div className="aspect-[3/4] relative bg-gradient-to-br from-cyan-50 to-sky-100 overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center p-4">
                          <div className="w-full h-full bg-white rounded-lg shadow-md p-4 flex flex-col">
                            <div className="flex justify-between items-center mb-4">
                              <div className="w-32 h-8 bg-cyan-100 rounded-md"></div>
                              <div className="flex gap-1">
                                <div className="w-4 h-4 rounded-full bg-cyan-200"></div>
                                <div className="w-4 h-4 rounded-full bg-cyan-200"></div>
                                <div className="w-4 h-4 rounded-full bg-cyan-200"></div>
                              </div>
                            </div>
                            <div className="flex-1 grid grid-cols-2 gap-2">
                              <div className="col-span-2 aspect-video bg-cyan-100 rounded-md mb-2"></div>
                              <div className="aspect-square bg-sky-100 rounded-md"></div>
                              <div className="aspect-square bg-sky-100 rounded-md"></div>
                              <div className="col-span-2 h-4 bg-cyan-50 rounded-md mt-2"></div>
                              <div className="col-span-2 h-3 bg-gray-100 rounded-md"></div>
                              <div className="col-span-2 h-3 bg-gray-100 rounded-md"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <CardTitle className="text-cyan-700">Tech Portfolio</CardTitle>
                        <CardDescription>Modern tech-focused layout</CardDescription>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Link href={`/templates/6`} className="w-full">
                          <Button className="w-full bg-cyan-600 hover:bg-cyan-700">Use Template</Button>
                        </Link>
                      </CardFooter>
                    </Card>

                    {/* Academic CV Template */}
                    <Card className="overflow-hidden group hover:shadow-lg transition-all">
                      <div className="aspect-[3/4] relative bg-gradient-to-br from-red-50 to-rose-100 overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center p-4">
                          <div className="w-full h-full bg-white rounded-lg shadow-md p-4 flex flex-col">
                            <div className="w-full flex justify-center mb-3">
                              <div className="w-3/4 h-6 bg-red-100 rounded-md"></div>
                            </div>
                            <div className="w-full flex justify-center mb-4">
                              <div className="w-1/2 h-3 bg-red-50 rounded-md"></div>
                            </div>
                            <div className="flex-1 flex flex-col space-y-2">
                              <div className="w-1/3 h-4 bg-red-100 rounded-md mb-1"></div>
                              <div className="w-full h-3 bg-gray-100 rounded-md"></div>
                              <div className="w-full h-3 bg-gray-100 rounded-md"></div>
                              <div className="w-1/3 h-4 bg-red-100 rounded-md mt-2 mb-1"></div>
                              <div className="w-full h-3 bg-gray-100 rounded-md"></div>
                              <div className="w-full h-3 bg-gray-100 rounded-md"></div>
                              <div className="w-1/3 h-4 bg-red-100 rounded-md mt-2 mb-1"></div>
                              <div className="w-full h-3 bg-gray-100 rounded-md"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <CardTitle className="text-red-700">Academic CV</CardTitle>
                        <CardDescription>Detailed academic credentials</CardDescription>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Link href={`/templates/7`} className="w-full">
                          <Button className="w-full bg-red-600 hover:bg-red-700">Use Template</Button>
                        </Link>
                      </CardFooter>
                    </Card>

                    {/* Creative Designer Template */}
                    <Card className="overflow-hidden group hover:shadow-lg transition-all">
                      <div className="aspect-[3/4] relative bg-gradient-to-br from-violet-50 to-fuchsia-100 overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center p-4">
                          <div className="w-full h-full bg-white rounded-lg shadow-md p-4 flex flex-col">
                            <div className="flex mb-4">
                              <div className="w-1/3 h-20 bg-violet-100 rounded-md"></div>
                              <div className="w-2/3 pl-3 flex flex-col justify-center">
                                <div className="w-full h-5 bg-violet-100 rounded-md mb-2"></div>
                                <div className="w-2/3 h-3 bg-violet-50 rounded-md"></div>
                              </div>
                            </div>
                            <div className="flex-1 flex flex-col space-y-2">
                              <div className="grid grid-cols-3 gap-2 mb-2">
                                <div className="aspect-square bg-fuchsia-100 rounded-md"></div>
                                <div className="aspect-square bg-fuchsia-100 rounded-md"></div>
                                <div className="aspect-square bg-fuchsia-100 rounded-md"></div>
                              </div>
                              <div className="w-full h-3 bg-gray-100 rounded-md"></div>
                              <div className="w-full h-3 bg-gray-100 rounded-md"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <CardTitle className="text-violet-700">Designer Portfolio</CardTitle>
                        <CardDescription>Showcase your design work</CardDescription>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Link href={`/templates/8`} className="w-full">
                          <Button className="w-full bg-violet-600 hover:bg-violet-700">Use Template</Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  </div>
                  <div className="mt-8 text-center">
                    <Link href="/templates/all">
                      <Button variant="outline" className="border-emerald-200 text-emerald-700 hover:bg-emerald-50">
                        View All Templates
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </TabsContent>
                <TabsContent value="resume" className="pt-6">
                  <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {/* Modern Resume Template */}
                    <Card className="overflow-hidden group hover:shadow-lg transition-all">
                      <div className="aspect-[3/4] relative bg-gradient-to-br from-emerald-50 to-teal-100 overflow-hidden">
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
                      </div>
                      <CardContent className="p-4">
                        <CardTitle className="text-emerald-700">Modern Resume</CardTitle>
                        <CardDescription>Clean and contemporary design</CardDescription>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Link href={`/templates/1`} className="w-full">
                          <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Use Template</Button>
                        </Link>
                      </CardFooter>
                    </Card>

                    {/* Minimalist Resume Template */}
                    <Card className="overflow-hidden group hover:shadow-lg transition-all">
                      <div className="aspect-[3/4] relative bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center p-4">
                          <div className="w-full h-full bg-white rounded-lg shadow-md p-4 flex flex-col">
                            <div className="flex justify-between items-center mb-4">
                              <div>
                                <div className="w-40 h-6 bg-gray-200 rounded-md mb-1"></div>
                                <div className="w-24 h-3 bg-gray-100 rounded-md"></div>
                              </div>
                              <div className="w-12 h-12 rounded-full bg-gray-200"></div>
                            </div>
                            <div className="w-full h-px bg-gray-200 mb-3"></div>
                            <div className="flex-1 flex flex-col space-y-2">
                              <div className="w-24 h-4 bg-gray-200 rounded-md mb-1"></div>
                              <div className="w-full h-3 bg-gray-100 rounded-md"></div>
                              <div className="w-full h-3 bg-gray-100 rounded-md"></div>
                              <div className="w-24 h-4 bg-gray-200 rounded-md mt-2 mb-1"></div>
                              <div className="w-full h-3 bg-gray-100 rounded-md"></div>
                              <div className="w-full h-3 bg-gray-100 rounded-md"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <CardTitle className="text-gray-700">Minimalist Resume</CardTitle>
                        <CardDescription>Simple and elegant design</CardDescription>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Link href={`/templates/4`} className="w-full">
                          <Button className="w-full bg-gray-600 hover:bg-gray-700">Use Template</Button>
                        </Link>
                      </CardFooter>
                    </Card>

                    {/* Executive Resume Template */}
                    <Card className="overflow-hidden group hover:shadow-lg transition-all">
                      <div className="aspect-[3/4] relative bg-gradient-to-br from-amber-50 to-yellow-100 overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center p-4">
                          <div className="w-full h-full bg-white rounded-lg shadow-md p-4 flex flex-col">
                            <div className="h-8 w-full bg-amber-100 rounded-md mb-4"></div>
                            <div className="flex gap-4 mb-3">
                              <div className="w-3/4 space-y-2">
                                <div className="w-3/4 h-5 bg-amber-50 rounded-md"></div>
                                <div className="w-1/2 h-3 bg-gray-100 rounded-md"></div>
                              </div>
                              <div className="w-1/4 h-16 bg-amber-100 rounded-md"></div>
                            </div>
                            <div className="flex-1 flex flex-col space-y-2">
                              <div className="w-1/3 h-4 bg-amber-100 rounded-md mb-1"></div>
                              <div className="w-full h-3 bg-gray-100 rounded-md"></div>
                              <div className="w-full h-3 bg-gray-100 rounded-md"></div>
                              <div className="w-1/3 h-4 bg-amber-100 rounded-md mt-2 mb-1"></div>
                              <div className="w-full h-3 bg-gray-100 rounded-md"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <CardTitle className="text-amber-700">Executive Resume</CardTitle>
                        <CardDescription>Professional and authoritative</CardDescription>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Link href={`/templates/5`} className="w-full">
                          <Button className="w-full bg-amber-600 hover:bg-amber-700">Use Template</Button>
                        </Link>
                      </CardFooter>
                    </Card>

                    {/* Creative Resume Template */}
                    <Card className="overflow-hidden group hover:shadow-lg transition-all">
                      <div className="aspect-[3/4] relative bg-gradient-to-br from-pink-50 to-rose-100 overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center p-4">
                          <div className="w-full h-full bg-white rounded-lg shadow-md p-4 flex flex-col">
                            <div className="flex mb-4">
                              <div className="w-1/3 h-20 bg-pink-100 rounded-md"></div>
                              <div className="w-2/3 pl-3 flex flex-col justify-center">
                                <div className="w-full h-5 bg-pink-100 rounded-md mb-2"></div>
                                <div className="w-2/3 h-3 bg-pink-50 rounded-md"></div>
                              </div>
                            </div>
                            <div className="flex-1 flex flex-col space-y-2">
                              <div className="w-1/3 h-4 bg-pink-100 rounded-md mb-1"></div>
                              <div className="w-full h-3 bg-gray-100 rounded-md"></div>
                              <div className="w-full h-3 bg-gray-100 rounded-md"></div>
                              <div className="w-1/3 h-4 bg-pink-100 rounded-md mt-2 mb-1"></div>
                              <div className="w-full h-3 bg-gray-100 rounded-md"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <CardTitle className="text-pink-700">Creative Resume</CardTitle>
                        <CardDescription>Stand out with style</CardDescription>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Link href={`/templates/9`} className="w-full">
                          <Button className="w-full bg-pink-600 hover:bg-pink-700">Use Template</Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  </div>
                  <div className="mt-8 text-center">
                    <Link href="/templates/resume">
                      <Button variant="outline" className="border-emerald-200 text-emerald-700 hover:bg-emerald-50">
                        View All Resume Templates
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </TabsContent>
                <TabsContent value="portfolio" className="pt-6">
                  <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {/* Creative Portfolio Template */}
                    <Card className="overflow-hidden group hover:shadow-lg transition-all">
                      <div className="aspect-[3/4] relative bg-gradient-to-br from-purple-50 to-pink-100 overflow-hidden">
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
                      </div>
                      <CardContent className="p-4">
                        <CardTitle className="text-purple-700">Creative Portfolio</CardTitle>
                        <CardDescription>Showcase your creative work</CardDescription>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Link href={`/templates/3`} className="w-full">
                          <Button className="w-full bg-purple-600 hover:bg-purple-700">Use Template</Button>
                        </Link>
                      </CardFooter>
                    </Card>

                    {/* Tech Portfolio Template */}
                    <Card className="overflow-hidden group hover:shadow-lg transition-all">
                      <div className="aspect-[3/4] relative bg-gradient-to-br from-cyan-50 to-sky-100 overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center p-4">
                          <div className="w-full h-full bg-white rounded-lg shadow-md p-4 flex flex-col">
                            <div className="flex justify-between items-center mb-4">
                              <div className="w-32 h-8 bg-cyan-100 rounded-md"></div>
                              <div className="flex gap-1">
                                <div className="w-4 h-4 rounded-full bg-cyan-200"></div>
                                <div className="w-4 h-4 rounded-full bg-cyan-200"></div>
                                <div className="w-4 h-4 rounded-full bg-cyan-200"></div>
                              </div>
                            </div>
                            <div className="flex-1 grid grid-cols-2 gap-2">
                              <div className="col-span-2 aspect-video bg-cyan-100 rounded-md mb-2"></div>
                              <div className="aspect-square bg-sky-100 rounded-md"></div>
                              <div className="aspect-square bg-sky-100 rounded-md"></div>
                              <div className="col-span-2 h-4 bg-cyan-50 rounded-md mt-2"></div>
                              <div className="col-span-2 h-3 bg-gray-100 rounded-md"></div>
                              <div className="col-span-2 h-3 bg-gray-100 rounded-md"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <CardTitle className="text-cyan-700">Tech Portfolio</CardTitle>
                        <CardDescription>Modern tech-focused layout</CardDescription>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Link href={`/templates/6`} className="w-full">
                          <Button className="w-full bg-cyan-600 hover:bg-cyan-700">Use Template</Button>
                        </Link>
                      </CardFooter>
                    </Card>

                    {/* Creative Designer Template */}
                    <Card className="overflow-hidden group hover:shadow-lg transition-all">
                      <div className="aspect-[3/4] relative bg-gradient-to-br from-violet-50 to-fuchsia-100 overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center p-4">
                          <div className="w-full h-full bg-white rounded-lg shadow-md p-4 flex flex-col">
                            <div className="flex mb-4">
                              <div className="w-1/3 h-20 bg-violet-100 rounded-md"></div>
                              <div className="w-2/3 pl-3 flex flex-col justify-center">
                                <div className="w-full h-5 bg-violet-100 rounded-md mb-2"></div>
                                <div className="w-2/3 h-3 bg-violet-50 rounded-md"></div>
                              </div>
                            </div>
                            <div className="flex-1 flex flex-col space-y-2">
                              <div className="grid grid-cols-3 gap-2 mb-2">
                                <div className="aspect-square bg-fuchsia-100 rounded-md"></div>
                                <div className="aspect-square bg-fuchsia-100 rounded-md"></div>
                                <div className="aspect-square bg-fuchsia-100 rounded-md"></div>
                              </div>
                              <div className="w-full h-3 bg-gray-100 rounded-md"></div>
                              <div className="w-full h-3 bg-gray-100 rounded-md"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <CardTitle className="text-violet-700">Designer Portfolio</CardTitle>
                        <CardDescription>Showcase your design work</CardDescription>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Link href={`/templates/8`} className="w-full">
                          <Button className="w-full bg-violet-600 hover:bg-violet-700">Use Template</Button>
                        </Link>
                      </CardFooter>
                    </Card>

                    {/* Photography Portfolio Template */}
                    <Card className="overflow-hidden group hover:shadow-lg transition-all">
                      <div className="aspect-[3/4] relative bg-gradient-to-br from-neutral-50 to-stone-100 overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center p-4">
                          <div className="w-full h-full bg-white rounded-lg shadow-md p-4 flex flex-col">
                            <div className="w-full flex justify-center mb-4">
                              <div className="w-1/2 h-6 bg-neutral-200 rounded-md"></div>
                            </div>
                            <div className="flex-1 grid grid-cols-2 gap-2">
                              <div className="aspect-square bg-neutral-100 rounded-md"></div>
                              <div className="aspect-square bg-stone-100 rounded-md"></div>
                              <div className="aspect-square bg-stone-100 rounded-md"></div>
                              <div className="aspect-square bg-neutral-100 rounded-md"></div>
                              <div className="col-span-2 h-4 bg-neutral-200 rounded-md mt-2"></div>
                              <div className="col-span-2 h-3 bg-gray-100 rounded-md"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <CardTitle className="text-neutral-700">Photography Portfolio</CardTitle>
                        <CardDescription>Highlight your best shots</CardDescription>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Link href={`/templates/10`} className="w-full">
                          <Button className="w-full bg-neutral-600 hover:bg-neutral-700">Use Template</Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  </div>
                  <div className="mt-8 text-center">
                    <Link href="/templates/portfolio">
                      <Button variant="outline" className="border-emerald-200 text-emerald-700 hover:bg-emerald-50">
                        View All Portfolio Templates
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </TabsContent>
                <TabsContent value="cv" className="pt-6">
                  <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {/* Professional CV Template */}
                    <Card className="overflow-hidden group hover:shadow-lg transition-all">
                      <div className="aspect-[3/4] relative bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center p-4">
                          <div className="w-full h-full bg-white rounded-lg shadow-md p-4 flex flex-col">
                            <div className="flex justify-between mb-3">
                              <div className="w-32 h-6 bg-blue-100 rounded-md"></div>
                              <div className="w-6 h-6 rounded-full bg-blue-100"></div>
                            </div>
                            <div className="w-[40%] h-3 bg-blue-50 rounded-md mb-4"></div>
                            <div className="flex-1 flex flex-col space-y-2">
                              <div className="flex gap-2 items-center">
                                <div className="w-4 h-4 rounded-full bg-blue-100"></div>
                                <div className="w-full h-3 bg-gray-100 rounded-md"></div>
                              </div>
                              <div className="flex gap-2 items-center">
                                <div className="w-4 h-4 rounded-full bg-blue-100"></div>
                                <div className="w-full h-3 bg-gray-100 rounded-md"></div>
                              </div>
                              <div className="flex gap-2 items-center">
                                <div className="w-4 h-4 rounded-full bg-blue-100"></div>
                                <div className="w-full h-3 bg-gray-100 rounded-md"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <CardTitle className="text-blue-700">Professional CV</CardTitle>
                        <CardDescription>Structured and detailed layout</CardDescription>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Link href={`/templates/2`} className="w-full">
                          <Button className="w-full bg-blue-600 hover:bg-blue-700">Use Template</Button>
                        </Link>
                      </CardFooter>
                    </Card>

                    {/* Academic CV Template */}
                    <Card className="overflow-hidden group hover:shadow-lg transition-all">
                      <div className="aspect-[3/4] relative bg-gradient-to-br from-red-50 to-rose-100 overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center p-4">
                          <div className="w-full h-full bg-white rounded-lg shadow-md p-4 flex flex-col">
                            <div className="w-full flex justify-center mb-3">
                              <div className="w-3/4 h-6 bg-red-100 rounded-md"></div>
                            </div>
                            <div className="w-full flex justify-center mb-4">
                              <div className="w-1/2 h-3 bg-red-50 rounded-md"></div>
                            </div>
                            <div className="flex-1 flex flex-col space-y-2">
                              <div className="w-1/3 h-4 bg-red-100 rounded-md mb-1"></div>
                              <div className="w-full h-3 bg-gray-100 rounded-md"></div>
                              <div className="w-full h-3 bg-gray-100 rounded-md"></div>
                              <div className="w-1/3 h-4 bg-red-100 rounded-md mt-2 mb-1"></div>
                              <div className="w-full h-3 bg-gray-100 rounded-md"></div>
                              <div className="w-full h-3 bg-gray-100 rounded-md"></div>
                              <div className="w-1/3 h-4 bg-red-100 rounded-md mt-2 mb-1"></div>
                              <div className="w-full h-3 bg-gray-100 rounded-md"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <CardTitle className="text-red-700">Academic CV</CardTitle>
                        <CardDescription>Detailed academic credentials</CardDescription>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Link href={`/templates/7`} className="w-full">
                          <Button className="w-full bg-red-600 hover:bg-red-700">Use Template</Button>
                        </Link>
                      </CardFooter>
                    </Card>

                    {/* Medical CV Template */}
                    <Card className="overflow-hidden group hover:shadow-lg transition-all">
                      <div className="aspect-[3/4] relative bg-gradient-to-br from-green-50 to-emerald-100 overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center p-4">
                          <div className="w-full h-full bg-white rounded-lg shadow-md p-4 flex flex-col">
                            <div className="flex justify-between mb-3">
                              <div className="w-32 h-6 bg-green-100 rounded-md"></div>
                              <div className="w-6 h-6 rounded-full bg-green-100"></div>
                            </div>
                            <div className="w-[40%] h-3 bg-green-50 rounded-md mb-4"></div>
                            <div className="flex-1 flex flex-col space-y-2">
                              <div className="w-1/3 h-4 bg-green-100 rounded-md mb-1"></div>
                              <div className="w-full h-3 bg-gray-100 rounded-md"></div>
                              <div className="w-full h-3 bg-gray-100 rounded-md"></div>
                              <div className="w-1/3 h-4 bg-green-100 rounded-md mt-2 mb-1"></div>
                              <div className="w-full h-3 bg-gray-100 rounded-md"></div>
                              <div className="w-full h-3 bg-gray-100 rounded-md"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <CardTitle className="text-green-700">Medical CV</CardTitle>
                        <CardDescription>For healthcare professionals</CardDescription>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Link href={`/templates/11`} className="w-full">
                          <Button className="w-full bg-green-600 hover:bg-green-700">Use Template</Button>
                        </Link>
                      </CardFooter>
                    </Card>

                    {/* Legal CV Template */}
                    <Card className="overflow-hidden group hover:shadow-lg transition-all">
                      <div className="aspect-[3/4] relative bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center p-4">
                          <div className="w-full h-full bg-white rounded-lg shadow-md p-4 flex flex-col">
                            <div className="h-8 w-full bg-slate-200 rounded-md mb-4"></div>
                            <div className="flex gap-4 mb-3">
                              <div className="w-3/4 space-y-2">
                                <div className="w-3/4 h-5 bg-slate-100 rounded-md"></div>
                                <div className="w-1/2 h-3 bg-gray-100 rounded-md"></div>
                              </div>
                              <div className="w-1/4 h-16 bg-slate-100 rounded-md"></div>
                            </div>
                            <div className="flex-1 flex flex-col space-y-2">
                              <div className="w-1/3 h-4 bg-slate-100 rounded-md mb-1"></div>
                              <div className="w-full h-3 bg-gray-100 rounded-md"></div>
                              <div className="w-full h-3 bg-gray-100 rounded-md"></div>
                              <div className="w-1/3 h-4 bg-slate-100 rounded-md mt-2 mb-1"></div>
                              <div className="w-full h-3 bg-gray-100 rounded-md"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <CardTitle className="text-slate-700">Legal CV</CardTitle>
                        <CardDescription>Professional legal format</CardDescription>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Link href={`/templates/12`} className="w-full">
                          <Button className="w-full bg-slate-600 hover:bg-slate-700">Use Template</Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  </div>
                  <div className="mt-8 text-center">
                    <Link href="/templates/cv">
                      <Button variant="outline" className="border-emerald-200 text-emerald-700 hover:bg-emerald-50">
                        View All CV Templates
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2025 CareerCanvas. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}
