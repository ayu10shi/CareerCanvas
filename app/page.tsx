import Link from "next/link"
import { ArrowRight, FileEdit, Briefcase, Users } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-8 md:py-16 lg:py-24 xl:py-32 bg-gradient-to-b from-emerald-50 to-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center max-w-5xl mx-auto text-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-emerald-800">
                  Craft your professional story with precision
                </h1>
                <p className="text-gray-500 md:text-xl dark:text-gray-400 max-w-[800px] mx-auto">
                  Choose from dozens of templates, customize your design, and download your perfect resume or
                  portfolio.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row mt-8">
                <Link href="/templates">
                  <Button size="lg" className="px-8 bg-emerald-600 hover:bg-emerald-700">
                    Browse Templates
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/register">
                  <Button
                    size="lg"
                    variant="outline"
                    className="px-8 border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                  >
                    Create Account
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-8 md:py-16 lg:py-24 bg-gradient-to-b from-white to-emerald-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-emerald-800">How It Works</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Create your perfect resume or portfolio in just a few simple steps
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600 text-white">
                  <FileEdit className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-emerald-800">Choose a Template</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Browse our collection of professionally designed templates for resumes and portfolios.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600 text-white">
                  <Briefcase className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-emerald-800">Customize Your Content</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Add your personal information, work experience, skills, and more with our easy-to-use editor.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600 text-white">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-emerald-800">Download & Share</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Export your finished resume as a PDF or share it online with a custom link.
                </p>
              </div>
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
