"use client"

import { useState, useRef, useEffect, use } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Download, Share2, Check, Eye, Save } from "lucide-react"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"

// Template formats
const TEMPLATE_FORMATS = {
  "1": {
    name: "Modern Resume",
    colors: {
      primary: "emerald",
      secondary: "teal",
      accent: "emerald",
    },
    layout: "split",
    style: "modern",
  },
  "2": {
    name: "Professional CV",
    colors: {
      primary: "blue",
      secondary: "indigo",
      accent: "blue",
    },
    layout: "traditional",
    style: "professional",
  },
  "3": {
    name: "Creative Portfolio",
    colors: {
      primary: "purple",
      secondary: "pink",
      accent: "violet",
    },
    layout: "grid",
    style: "creative",
  },
  "4": {
    name: "Minimalist Resume",
    colors: {
      primary: "gray",
      secondary: "slate",
      accent: "gray",
    },
    layout: "minimal",
    style: "clean",
  },
  "5": {
    name: "Executive Resume",
    colors: {
      primary: "amber",
      secondary: "yellow",
      accent: "amber",
    },
    layout: "executive",
    style: "bold",
  },
  "6": {
    name: "Tech Portfolio",
    colors: {
      primary: "cyan",
      secondary: "sky",
      accent: "cyan",
    },
    layout: "tech",
    style: "modern",
  },
  "7": {
    name: "Academic CV",
    colors: {
      primary: "red",
      secondary: "rose",
      accent: "red",
    },
    layout: "academic",
    style: "formal",
  },
  "8": {
    name: "Designer Portfolio",
    colors: {
      primary: "violet",
      secondary: "fuchsia",
      accent: "violet",
    },
    layout: "designer",
    style: "creative",
  },
}

export default function TemplatePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const router = useRouter()
  const { toast } = useToast()
  const resumeRef = useRef<HTMLDivElement>(null)
  const [isDownloading, setIsDownloading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showDownloadDialog, setShowDownloadDialog] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [downloadFormat, setDownloadFormat] = useState<"pdf" | "docx" | "txt">("pdf")
  const [templateFormat, setTemplateFormat] = useState(TEMPLATE_FORMATS["1"])

  // Template data state
  const [templateData, setTemplateData] = useState({
    personal: {
      name: "John Doe",
      title: "Software Engineer",
      email: "john.doe@example.com",
      phone: "(123) 456-7890",
      location: "San Francisco, CA",
      linkedin: "linkedin.com/in/johndoe",
      github: "github.com/johndoe",
      website: "johndoe.com",
      summary:
        "Experienced software engineer with a passion for creating efficient, scalable applications. Specialized in frontend development with React and TypeScript.",
    },
    experience: [
      {
        title: "Senior Software Engineer",
        company: "Tech Company",
        startDate: "2020",
        endDate: "Present",
        description:
          "Led development of key features for the company's flagship product. Improved application performance by 40% through code optimization. Mentored junior developers and conducted code reviews.",
      },
      {
        title: "Software Engineer",
        company: "Previous Company",
        startDate: "2018",
        endDate: "2020",
        description:
          "Developed and maintained web applications using React and Node.js. Collaborated with cross-functional teams to deliver features on time. Implemented automated testing that reduced bugs by 30%.",
      },
    ],
    education: [
      {
        degree: "Bachelor of Science in Computer Science",
        school: "University Name",
        startYear: "2014",
        endYear: "2018",
        gpa: "3.8/4.0",
      },
    ],
    skills: ["JavaScript", "TypeScript", "React", "Node.js", "Next.js", "GraphQL", "SQL", "Git", "AWS", "Docker"],
    languages: ["English (Native)", "Spanish (Intermediate)", "French (Basic)"],
    certifications: ["AWS Certified Developer", "Google Cloud Professional"],
    projects: [
      {
        title: "E-commerce Platform",
        description: "Built a full-stack e-commerce platform with React, Node.js, and MongoDB",
        link: "github.com/johndoe/ecommerce",
      },
      {
        title: "Task Management App",
        description: "Developed a task management application with real-time updates using Socket.io",
        link: "github.com/johndoe/taskmanager",
      },
    ],
  })

  // Set template format based on ID
  // useEffect(() => {
  //   if (params.id in TEMPLATE_FORMATS) {
  //     setTemplateFormat(TEMPLATE_FORMATS[params.id as keyof typeof TEMPLATE_FORMATS])
  //   }
  // }, [params.id])

  const handleInputChange = (section: string, field: string, value: string) => {
    setTemplateData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value,
      },
    }))
  }

  const handleArrayInputChange = (section: string, index: number, field: string, value: string) => {
    setTemplateData((prev) => {
      const newArray = [...(prev[section as keyof typeof prev] as any[])]
      newArray[index] = {
        ...newArray[index],
        [field]: value,
      }
      return {
        ...prev,
        [section]: newArray,
      }
    })
  }

  const handleDownload = () => {
    setShowDownloadDialog(true)
  }

  const processDownload = async () => {
    setIsDownloading(true)

    try {
      if (!resumeRef.current) {
        throw new Error("Resume element not found")
      }

      if (downloadFormat === "pdf") {
        // Generate PDF
        const canvas = await html2canvas(resumeRef.current, {
          scale: 2,
          logging: false,
          useCORS: true,
          allowTaint: true,
        })

        const imgData = canvas.toDataURL("image/png")
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: "a4",
        })

        const imgWidth = 210
        const imgHeight = (canvas.height * imgWidth) / canvas.width

        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight)
        pdf.save(`resume-${templateFormat.name.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}.pdf`)
      } else if (downloadFormat === "docx") {
        // For demo purposes, we'll just create a text file with .docx extension
        const content = resumeRef.current.innerText
        const blob = new Blob([content], {
          type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `resume-${templateFormat.name.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}.docx`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      } else if (downloadFormat === "txt") {
        // Create a text file
        const content = resumeRef.current.innerText
        const blob = new Blob([content], { type: "text/plain" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `resume-${templateFormat.name.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}.txt`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      }

      toast({
        title: "Template downloaded successfully",
        description: `Your template has been downloaded as ${downloadFormat.toUpperCase()}`,
      })
    } catch (error) {
      console.error("Download error:", error)
      toast({
        title: "Download failed",
        description: "There was an error downloading your template. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDownloading(false)
      setShowDownloadDialog(false)
    }
  }

  const handleSaveChanges = () => {
    setIsSaving(true)

    // Simulate saving to server
    setTimeout(() => {
      setIsSaving(false)
      toast({
        title: "Changes saved",
        description: "Your template has been updated successfully.",
      })
    }, 1500)
  }

  const handleShare = () => {
    // Copy the current URL to clipboard
    navigator.clipboard.writeText(window.location.href)

    toast({
      title: "Link copied to clipboard",
      description: "You can now share this template with others",
    })
  }

  const handlePreview = () => {
    setShowPreview(true)
  }

  // Render the appropriate template based on the ID
  const renderTemplate = () => {
    switch (resolvedParams.id) {
      case "1": // Modern Resume
        return (
          <div className="w-full h-full p-8 flex flex-col bg-white">
            <div className="text-3xl font-bold mb-2 text-emerald-700">{templateData.personal.name}</div>
            <div className="text-gray-500 mb-6">{templateData.personal.title}</div>
            <div className="grid grid-cols-[2fr_1fr] gap-6 flex-1">
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold border-b border-emerald-200 pb-1 mb-2 text-emerald-700">
                    Summary
                  </h2>
                  <p className="text-sm text-gray-600">{templateData.personal.summary}</p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold border-b border-emerald-200 pb-1 mb-2 text-emerald-700">
                    Experience
                  </h2>
                  <div className="space-y-3">
                    {templateData.experience.map((exp, index) => (
                      <div key={index}>
                        <div className="text-sm font-medium">{exp.title}</div>
                        <div className="text-xs text-gray-500">
                          {exp.company} • {exp.startDate} - {exp.endDate}
                        </div>
                        <ul className="text-xs text-gray-600 list-disc list-inside mt-1">
                          {exp.description
                            .split(". ")
                            .filter(Boolean)
                            .map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h2 className="text-lg font-semibold border-b border-emerald-200 pb-1 mb-2 text-emerald-700">
                    Education
                  </h2>
                  {templateData.education.map((edu, index) => (
                    <div key={index}>
                      <div className="text-sm font-medium">{edu.degree}</div>
                      <div className="text-xs text-gray-500">
                        {edu.school} • {edu.startYear} - {edu.endYear}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">GPA: {edu.gpa}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold border-b border-emerald-200 pb-1 mb-2 text-emerald-700">
                    Contact
                  </h2>
                  <div className="space-y-1 text-xs">
                    <div>{templateData.personal.email}</div>
                    <div>{templateData.personal.phone}</div>
                    <div>{templateData.personal.location}</div>
                    <div>{templateData.personal.linkedin}</div>
                    <div>{templateData.personal.github}</div>
                  </div>
                </div>
                <div>
                  <h2 className="text-lg font-semibold border-b border-emerald-200 pb-1 mb-2 text-emerald-700">
                    Skills
                  </h2>
                  <div className="flex flex-wrap gap-1">
                    {templateData.skills.map((skill, index) => (
                      <div key={index} className="text-xs bg-emerald-100 px-2 py-1 rounded-full text-emerald-700">
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h2 className="text-lg font-semibold border-b border-emerald-200 pb-1 mb-2 text-emerald-700">
                    Languages
                  </h2>
                  <div className="space-y-1 text-xs">
                    {templateData.languages.map((language, index) => (
                      <div key={index}>{language}</div>
                    ))}
                  </div>
                </div>
                <div>
                  <h2 className="text-lg font-semibold border-b border-emerald-200 pb-1 mb-2 text-emerald-700">
                    Certifications
                  </h2>
                  <div className="space-y-1 text-xs">
                    {templateData.certifications.map((cert, index) => (
                      <div key={index}>{cert}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case "2": // Professional CV
        return (
          <div className="w-full h-full bg-white">
            <div className="bg-blue-700 text-white p-6">
              <div className="text-3xl font-bold">{templateData.personal.name}</div>
              <div className="text-blue-100 mt-1">{templateData.personal.title}</div>
            </div>
            <div className="p-6 grid grid-cols-3 gap-6">
              <div className="col-span-2 space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-blue-700 mb-3">Professional Summary</h2>
                  <p className="text-sm text-gray-700">{templateData.personal.summary}</p>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-blue-700 mb-3">Work Experience</h2>
                  <div className="space-y-4">
                    {templateData.experience.map((exp, index) => (
                      <div key={index} className="border-l-4 border-blue-200 pl-4">
                        <div className="text-lg font-semibold text-blue-800">{exp.title}</div>
                        <div className="text-sm font-medium text-blue-600">{exp.company}</div>
                        <div className="text-xs text-gray-500 mb-2">
                          {exp.startDate} - {exp.endDate}
                        </div>
                        <p className="text-sm text-gray-700">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-blue-700 mb-3">Education</h2>
                  {templateData.education.map((edu, index) => (
                    <div key={index} className="mb-3">
                      <div className="text-lg font-semibold text-blue-800">{edu.degree}</div>
                      <div className="text-sm font-medium text-blue-600">{edu.school}</div>
                      <div className="text-xs text-gray-500">
                        {edu.startYear} - {edu.endYear} | GPA: {edu.gpa}
                      </div>
                    </div>
                  ))}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-blue-700 mb-3">Projects</h2>
                  {templateData.projects.map((project, index) => (
                    <div key={index} className="mb-3">
                      <div className="text-lg font-semibold text-blue-800">{project.title}</div>
                      <div className="text-sm text-gray-700">{project.description}</div>
                      <div className="text-xs text-blue-600">{project.link}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-6 bg-blue-50 p-4 rounded-lg">
                <div>
                  <h2 className="text-lg font-bold text-blue-700 mb-2">Contact Information</h2>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-blue-200 mr-2 flex items-center justify-center text-blue-700 text-xs">
                        @
                      </div>
                      <div>{templateData.personal.email}</div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-blue-200 mr-2 flex items-center justify-center text-blue-700 text-xs">
                        T
                      </div>
                      <div>{templateData.personal.phone}</div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-blue-200 mr-2 flex items-center justify-center text-blue-700 text-xs">
                        L
                      </div>
                      <div>{templateData.personal.location}</div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-blue-200 mr-2 flex items-center justify-center text-blue-700 text-xs">
                        IN
                      </div>
                      <div>{templateData.personal.linkedin}</div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-blue-200 mr-2 flex items-center justify-center text-blue-700 text-xs">
                        GH
                      </div>
                      <div>{templateData.personal.github}</div>
                    </div>
                  </div>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-blue-700 mb-2">Skills</h2>
                  <div className="grid grid-cols-2 gap-2">
                    {templateData.skills.map((skill, index) => (
                      <div key={index} className="text-sm flex items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-blue-700 mb-2">Languages</h2>
                  <div className="space-y-1">
                    {templateData.languages.map((language, index) => (
                      <div key={index} className="text-sm">
                        {language}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-blue-700 mb-2">Certifications</h2>
                  <div className="space-y-1">
                    {templateData.certifications.map((cert, index) => (
                      <div key={index} className="text-sm bg-white p-1 rounded border border-blue-200">
                        {cert}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case "3": // Creative Portfolio
        return (
          <div className="w-full h-full bg-white">
            <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white p-8 flex justify-between items-center">
              <div>
                <div className="text-4xl font-bold">{templateData.personal.name}</div>
                <div className="text-purple-100 mt-1">{templateData.personal.title}</div>
              </div>
              <div className="w-24 h-24 rounded-full bg-white p-1">
                <div className="w-full h-full rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-white text-2xl font-bold">
                  {templateData.personal.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
              </div>
            </div>
            <div className="p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-purple-600 mb-3">About Me</h2>
                <p className="text-gray-700">{templateData.personal.summary}</p>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h2 className="text-2xl font-bold text-purple-600 mb-4">Projects</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {templateData.projects.map((project, index) => (
                      <div
                        key={index}
                        className="bg-purple-50 p-4 rounded-lg border border-purple-200 hover:shadow-md transition-shadow"
                      >
                        <div className="text-lg font-semibold text-purple-700">{project.title}</div>
                        <div className="text-sm text-gray-600 mt-1">{project.description}</div>
                        <div className="text-xs text-purple-500 mt-2">{project.link}</div>
                      </div>
                    ))}
                  </div>
                  <h2 className="text-2xl font-bold text-purple-600 mt-8 mb-4">Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {templateData.skills.map((skill, index) => (
                      <div
                        key={index}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm"
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-purple-600 mb-4">Experience</h2>
                  <div className="space-y-4">
                    {templateData.experience.map((exp, index) => (
                      <div
                        key={index}
                        className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-gradient-to-b before:from-purple-500 before:to-pink-500 before:rounded-full"
                      >
                        <div className="text-lg font-semibold text-purple-700">{exp.title}</div>
                        <div className="text-sm font-medium text-purple-500">{exp.company}</div>
                        <div className="text-xs text-gray-500 mb-1">
                          {exp.startDate} - {exp.endDate}
                        </div>
                        <p className="text-sm text-gray-600">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                  <h2 className="text-2xl font-bold text-purple-600 mt-8 mb-4">Education</h2>
                  {templateData.education.map((edu, index) => (
                    <div key={index} className="mb-3">
                      <div className="text-lg font-semibold text-purple-700">{edu.degree}</div>
                      <div className="text-sm font-medium text-purple-500">{edu.school}</div>
                      <div className="text-xs text-gray-500">
                        {edu.startYear} - {edu.endYear} | GPA: {edu.gpa}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-purple-200">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-bold text-purple-600 mb-2">Contact Me</h2>
                    <div className="flex gap-4 text-sm">
                      <div>{templateData.personal.email}</div>
                      <div>{templateData.personal.phone}</div>
                      <div>{templateData.personal.location}</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                      IN
                    </div>
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                      GH
                    </div>
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                      WEB
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case "4": // Minimalist Resume
        return (
          <div className="w-full h-full bg-white p-10">
            <div className="flex justify-between items-center mb-8">
              <div>
                <div className="text-3xl font-light tracking-tight">{templateData.personal.name}</div>
                <div className="text-gray-500 mt-1">{templateData.personal.title}</div>
              </div>
              <div className="text-right text-sm text-gray-600">
                <div>{templateData.personal.email}</div>
                <div>{templateData.personal.phone}</div>
                <div>{templateData.personal.location}</div>
              </div>
            </div>
            <div className="w-full h-px bg-gray-200 mb-8"></div>
            <div className="grid grid-cols-3 gap-10">
              <div className="col-span-2 space-y-8">
                <div>
                  <h2 className="text-lg font-normal text-gray-800 mb-3">ABOUT</h2>
                  <p className="text-sm text-gray-600 leading-relaxed">{templateData.personal.summary}</p>
                </div>
                <div>
                  <h2 className="text-lg font-normal text-gray-800 mb-3">EXPERIENCE</h2>
                  <div className="space-y-6">
                    {templateData.experience.map((exp, index) => (
                      <div key={index}>
                        <div className="text-base font-medium">{exp.title}</div>
                        <div className="text-sm text-gray-500 mb-2">
                          {exp.company} | {exp.startDate} - {exp.endDate}
                        </div>
                        <p className="text-sm text-gray-600">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h2 className="text-lg font-normal text-gray-800 mb-3">EDUCATION</h2>
                  {templateData.education.map((edu, index) => (
                    <div key={index} className="mb-3">
                      <div className="text-base font-medium">{edu.degree}</div>
                      <div className="text-sm text-gray-500">
                        {edu.school} | {edu.startYear} - {edu.endYear}
                      </div>
                      <div className="text-sm text-gray-600">GPA: {edu.gpa}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-8">
                <div>
                  <h2 className="text-lg font-normal text-gray-800 mb-3">SKILLS</h2>
                  <div className="space-y-2">
                    {templateData.skills.map((skill, index) => (
                      <div key={index} className="text-sm text-gray-600">
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h2 className="text-lg font-normal text-gray-800 mb-3">LANGUAGES</h2>
                  <div className="space-y-2">
                    {templateData.languages.map((language, index) => (
                      <div key={index} className="text-sm text-gray-600">
                        {language}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h2 className="text-lg font-normal text-gray-800 mb-3">CERTIFICATIONS</h2>
                  <div className="space-y-2">
                    {templateData.certifications.map((cert, index) => (
                      <div key={index} className="text-sm text-gray-600">
                        {cert}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h2 className="text-lg font-normal text-gray-800 mb-3">LINKS</h2>
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600">{templateData.personal.linkedin}</div>
                    <div className="text-sm text-gray-600">{templateData.personal.github}</div>
                    <div className="text-sm text-gray-600">{templateData.personal.website}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case "5": // Executive Resume
        return (
          <div className="w-full h-full bg-white">
            <div className="bg-amber-800 text-white p-8">
              <div className="text-4xl font-bold tracking-tight">{templateData.personal.name}</div>
              <div className="text-amber-100 mt-1 text-lg">{templateData.personal.title}</div>
            </div>
            <div className="p-8 grid grid-cols-12 gap-8">
              <div className="col-span-8 space-y-6">
                <div className="bg-amber-50 p-4 border-l-4 border-amber-500">
                  <h2 className="text-xl font-bold text-amber-800 mb-2">Executive Summary</h2>
                  <p className="text-gray-700">{templateData.personal.summary}</p>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-amber-800 mb-4 border-b-2 border-amber-200 pb-2">
                    Professional Experience
                  </h2>
                  <div className="space-y-6">
                    {templateData.experience.map((exp, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-center mb-1">
                          <div className="text-lg font-bold text-amber-900">{exp.title}</div>
                          <div className="text-sm text-amber-700">
                            {exp.startDate} - {exp.endDate}
                          </div>
                        </div>
                        <div className="text-base font-semibold text-amber-700 mb-2">{exp.company}</div>
                        <p className="text-gray-700">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-amber-800 mb-4 border-b-2 border-amber-200 pb-2">Education</h2>
                  {templateData.education.map((edu, index) => (
                    <div key={index} className="mb-4">
                      <div className="flex justify-between items-center">
                        <div className="text-lg font-bold text-amber-900">{edu.degree}</div>
                        <div className="text-sm text-amber-700">
                          {edu.startYear} - {edu.endYear}
                        </div>
                      </div>
                      <div className="text-base text-amber-700">{edu.school}</div>
                      <div className="text-sm text-gray-600">GPA: {edu.gpa}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-span-4 space-y-6">
                <div className="bg-amber-50 p-4 rounded-lg">
                  <h2 className="text-lg font-bold text-amber-800 mb-3 border-b border-amber-200 pb-2">
                    Contact Information
                  </h2>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="w-8 text-amber-700 font-bold">Email:</div>
                      <div className="text-sm text-gray-700">{templateData.personal.email}</div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-8 text-amber-700 font-bold">Phone:</div>
                      <div className="text-sm text-gray-700">{templateData.personal.phone}</div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-8 text-amber-700 font-bold">Location:</div>
                      <div className="text-sm text-gray-700">{templateData.personal.location}</div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-8 text-amber-700 font-bold">LinkedIn:</div>
                      <div className="text-sm text-gray-700">{templateData.personal.linkedin}</div>
                    </div>
                  </div>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-amber-800 mb-3 border-b border-amber-200 pb-2">
                    Core Competencies
                  </h2>
                  <div className="grid grid-cols-2 gap-2">
                    {templateData.skills.map((skill, index) => (
                      <div key={index} className="text-sm bg-amber-100 p-2 rounded text-amber-800">
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-amber-800 mb-3 border-b border-amber-200 pb-2">Languages</h2>
                  <div className="space-y-1">
                    {templateData.languages.map((language, index) => (
                      <div key={index} className="text-sm text-gray-700">
                        {language}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-amber-800 mb-3 border-b border-amber-200 pb-2">
                    Certifications
                  </h2>
                  <div className="space-y-2">
                    {templateData.certifications.map((cert, index) => (
                      <div
                        key={index}
                        className="text-sm bg-white p-2 border border-amber-200 rounded-lg text-amber-800"
                      >
                        {cert}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case "6": // Tech Portfolio
        return (
          <div className="w-full h-full bg-gray-900 text-white">
            <div className="p-8 border-b border-cyan-800">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-3xl font-bold text-cyan-400">{templateData.personal.name}</div>
                  <div className="text-gray-400 mt-1">{templateData.personal.title}</div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-cyan-800 flex items-center justify-center text-cyan-200">
                    IN
                  </div>
                  <div className="w-8 h-8 rounded-full bg-cyan-800 flex items-center justify-center text-cyan-200">
                    GH
                  </div>
                  <div className="w-8 h-8 rounded-full bg-cyan-800 flex items-center justify-center text-cyan-200">
                    @
                  </div>
                </div>
              </div>
            </div>
            <div className="p-8 grid grid-cols-12 gap-8">
              <div className="col-span-8 space-y-8">
                <div className="bg-gray-800 p-6 rounded-lg border border-cyan-900">
                  <h2 className="text-xl font-bold text-cyan-400 mb-3">// About Me</h2>
                  <p className="text-gray-300">{templateData.personal.summary}</p>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-cyan-400 mb-4">// Projects</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {templateData.projects.map((project, index) => (
                      <div
                        key={index}
                        className="bg-gray-800 p-4 rounded-lg border border-cyan-900 hover:border-cyan-500 transition-colors"
                      >
                        <div className="text-lg font-bold text-cyan-300">{project.title}</div>
                        <div className="text-sm text-gray-400 mt-2 mb-3">{project.description}</div>
                        <div className="text-xs text-cyan-400">{project.link}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-cyan-400 mb-4">// Work Experience</h2>
                  <div className="space-y-6">
                    {templateData.experience.map((exp, index) => (
                      <div key={index} className="bg-gray-800 p-4 rounded-lg border border-cyan-900">
                        <div className="text-lg font-bold text-cyan-300">{exp.title}</div>
                        <div className="text-sm text-cyan-500">{exp.company}</div>
                        <div className="text-xs text-gray-400 mb-2">
                          {exp.startDate} - {exp.endDate}
                        </div>
                        <p className="text-gray-300">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-span-4 space-y-6">
                <div className="bg-gray-800 p-4 rounded-lg border border-cyan-900">
                  <h2 className="text-lg font-bold text-cyan-400 mb-3">// Contact</h2>
                  <div className="space-y-2 text-sm text-gray-300">
                    <div>{templateData.personal.email}</div>
                    <div>{templateData.personal.phone}</div>
                    <div>{templateData.personal.location}</div>
                    <div>{templateData.personal.linkedin}</div>
                    <div>{templateData.personal.github}</div>
                  </div>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-cyan-400 mb-3">// Tech Stack</h2>
                  <div className="flex flex-wrap gap-2">
                    {templateData.skills.map((skill, index) => (
                      <div key={index} className="text-xs bg-cyan-900 text-cyan-300 px-3 py-1 rounded-full">
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-cyan-400 mb-3">// Education</h2>
                  {templateData.education.map((edu, index) => (
                    <div key={index} className="mb-3 bg-gray-800 p-3 rounded-lg border border-cyan-900">
                      <div className="text-base font-bold text-cyan-300">{edu.degree}</div>
                      <div className="text-sm text-cyan-500">{edu.school}</div>
                      <div className="text-xs text-gray-400">
                        {edu.startYear} - {edu.endYear}
                      </div>
                    </div>
                  ))}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-cyan-400 mb-3">// Languages</h2>
                  <div className="space-y-1 text-sm text-gray-300">
                    {templateData.languages.map((language, index) => (
                      <div key={index}>{language}</div>
                    ))}
                  </div>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-cyan-400 mb-3">// Certifications</h2>
                  <div className="space-y-2">
                    {templateData.certifications.map((cert, index) => (
                      <div key={index} className="text-sm bg-cyan-900 p-2 rounded-lg text-cyan-300">
                        {cert}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case "7": // Academic CV
        return (
          <div className="w-full h-full bg-white">
            <div className="text-center p-8 border-b border-red-200">
              <div className="text-3xl font-serif font-bold text-red-800">{templateData.personal.name}</div>
              <div className="text-red-600 mt-1 font-serif">{templateData.personal.title}</div>
              <div className="flex justify-center gap-4 mt-3 text-sm text-gray-600">
                <div>{templateData.personal.email}</div>
                <div>|</div>
                <div>{templateData.personal.phone}</div>
                <div>|</div>
                <div>{templateData.personal.location}</div>
              </div>
            </div>
            <div className="p-8">
              <div className="mb-8">
                <h2 className="text-xl font-serif font-bold text-red-800 border-b border-red-200 pb-1 mb-3">
                  RESEARCH INTERESTS
                </h2>
                <p className="text-gray-700">{templateData.personal.summary}</p>
              </div>
              <div className="mb-8">
                <h2 className="text-xl font-serif font-bold text-red-800 border-b border-red-200 pb-1 mb-3">
                  EDUCATION
                </h2>
                {templateData.education.map((edu, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between">
                      <div className="text-lg font-serif font-bold">{edu.degree}</div>
                      <div className="text-gray-600">
                        {edu.startYear} - {edu.endYear}
                      </div>
                    </div>
                    <div className="text-base text-red-700">{edu.school}</div>
                    <div className="text-sm text-gray-600">GPA: {edu.gpa}</div>
                  </div>
                ))}
              </div>
              <div className="mb-8">
                <h2 className="text-xl font-serif font-bold text-red-800 border-b border-red-200 pb-1 mb-3">
                  PROFESSIONAL EXPERIENCE
                </h2>
                <div className="space-y-4">
                  {templateData.experience.map((exp, index) => (
                    <div key={index}>
                      <div className="flex justify-between">
                        <div className="text-lg font-serif font-bold">{exp.title}</div>
                        <div className="text-gray-600">
                          {exp.startDate} - {exp.endDate}
                        </div>
                      </div>
                      <div className="text-base text-red-700">{exp.company}</div>
                      <p className="text-gray-700 mt-1">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mb-8">
                <h2 className="text-xl font-serif font-bold text-red-800 border-b border-red-200 pb-1 mb-3">
                  PUBLICATIONS & PROJECTS
                </h2>
                <div className="space-y-3">
                  {templateData.projects.map((project, index) => (
                    <div
                      key={index}
                      className="pl-6 relative before:content-['•'] before:absolute before:left-0 before:top-0 before:text-red-800"
                    >
                      <div className="text-base font-serif font-bold">{project.title}</div>
                      <div className="text-sm text-gray-700">{project.description}</div>
                      <div className="text-sm text-red-600 italic">{project.link}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h2 className="text-xl font-serif font-bold text-red-800 border-b border-red-200 pb-1 mb-3">
                    SKILLS & EXPERTISE
                  </h2>
                  <div className="grid grid-cols-2 gap-2">
                    {templateData.skills.map((skill, index) => (
                      <div key={index} className="text-sm text-gray-700 flex items-center">
                        <div className="w-2 h-2 bg-red-700 rounded-full mr-2"></div>
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-serif font-bold text-red-800 border-b border-red-200 pb-1 mb-3">
                    CERTIFICATIONS & LANGUAGES
                  </h2>
                  <div className="mb-4">
                    <div className="text-lg font-serif">Certifications</div>
                    <ul className="list-disc list-inside text-sm text-gray-700">
                      {templateData.certifications.map((cert, index) => (
                        <li key={index}>{cert}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="text-lg font-serif">Languages</div>
                    <ul className="list-disc list-inside text-sm text-gray-700">
                      {templateData.languages.map((language, index) => (
                        <li key={index}>{language}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case "8": // Designer Portfolio
        return (
          <div className="w-full h-full bg-white">
            <div className="grid grid-cols-3">
              <div className="col-span-1 bg-violet-900 text-white p-8 h-full">
                <div className="mb-8">
                  <div className="text-3xl font-bold">{templateData.personal.name}</div>
                  <div className="text-violet-200 mt-1">{templateData.personal.title}</div>
                </div>
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-bold text-violet-300 mb-3">Contact</h2>
                    <div className="space-y-2 text-sm">
                      <div>{templateData.personal.email}</div>
                      <div>{templateData.personal.phone}</div>
                      <div>{templateData.personal.location}</div>
                      <div>{templateData.personal.linkedin}</div>
                      <div>{templateData.personal.github}</div>
                      <div>{templateData.personal.website}</div>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-violet-300 mb-3">Skills</h2>
                    <div className="flex flex-wrap gap-2">
                      {templateData.skills.map((skill, index) => (
                        <div key={index} className="text-xs bg-violet-800 px-2 py-1 rounded-full">
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-violet-300 mb-3">Languages</h2>
                    <div className="space-y-1 text-sm">
                      {templateData.languages.map((language, index) => (
                        <div key={index}>{language}</div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-violet-300 mb-3">Education</h2>
                    {templateData.education.map((edu, index) => (
                      <div key={index} className="mb-3">
                        <div className="text-base font-bold">{edu.degree}</div>
                        <div className="text-sm text-violet-300">{edu.school}</div>
                        <div className="text-xs text-violet-400">
                          {edu.startYear} - {edu.endYear}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-violet-300 mb-3">Certifications</h2>
                    <div className="space-y-1 text-sm">
                      {templateData.certifications.map((cert, index) => (
                        <div key={index}>{cert}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-2 p-8">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-violet-900 mb-3">About Me</h2>
                  <p className="text-gray-700">{templateData.personal.summary}</p>
                </div>
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-violet-900 mb-4">Portfolio Projects</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {templateData.projects.map((project, index) => (
                      <div key={index} className="bg-violet-50 p-4 rounded-lg border border-violet-200">
                        <div className="text-lg font-bold text-violet-800">{project.title}</div>
                        <div className="text-sm text-gray-600 mt-1 mb-2">{project.description}</div>
                        <div className="text-xs text-violet-600">{project.link}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-violet-900 mb-4">Work Experience</h2>
                  <div className="space-y-6">
                    {templateData.experience.map((exp, index) => (
                      <div key={index} className="border-l-4 border-violet-300 pl-4">
                        <div className="text-lg font-bold text-violet-800">{exp.title}</div>
                        <div className="text-sm font-medium text-violet-600">{exp.company}</div>
                        <div className="text-xs text-gray-500 mb-2">
                          {exp.startDate} - {exp.endDate}
                        </div>
                        <p className="text-gray-700">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return (
          <div className="w-full h-full p-8 flex flex-col bg-white">
            <div className="text-3xl font-bold mb-2">{templateData.personal.name}</div>
            <div className="text-gray-500 mb-6">{templateData.personal.title}</div>
            <div className="grid grid-cols-[2fr_1fr] gap-6 flex-1">
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold border-b pb-1 mb-2">Summary</h2>
                  <p className="text-sm text-gray-600">{templateData.personal.summary}</p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold border-b pb-1 mb-2">Experience</h2>
                  <div className="space-y-3">
                    {templateData.experience.map((exp, index) => (
                      <div key={index}>
                        <div className="text-sm font-medium">{exp.title}</div>
                        <div className="text-xs text-gray-500">
                          {exp.company} • {exp.startDate} - {exp.endDate}
                        </div>
                        <ul className="text-xs text-gray-600 list-disc list-inside mt-1">
                          {exp.description
                            .split(". ")
                            .filter(Boolean)
                            .map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h2 className="text-lg font-semibold border-b pb-1 mb-2">Education</h2>
                  {templateData.education.map((edu, index) => (
                    <div key={index}>
                      <div className="text-sm font-medium">{edu.degree}</div>
                      <div className="text-xs text-gray-500">
                        {edu.school} • {edu.startYear} - {edu.endYear}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">GPA: {edu.gpa}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold border-b pb-1 mb-2">Contact</h2>
                  <div className="space-y-1 text-xs">
                    <div>{templateData.personal.email}</div>
                    <div>{templateData.personal.phone}</div>
                    <div>{templateData.personal.location}</div>
                    <div>{templateData.personal.linkedin}</div>
                    <div>{templateData.personal.github}</div>
                  </div>
                </div>
                <div>
                  <h2 className="text-lg font-semibold border-b pb-1 mb-2">Skills</h2>
                  <div className="flex flex-wrap gap-1">
                    {templateData.skills.map((skill, index) => (
                      <div key={index} className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-700">
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h2 className="text-lg font-semibold border-b pb-1 mb-2">Languages</h2>
                  <div className="space-y-1 text-xs">
                    {templateData.languages.map((language, index) => (
                      <div key={index}>{language}</div>
                    ))}
                  </div>
                </div>
                <div>
                  <h2 className="text-lg font-semibold border-b pb-1 mb-2">Certifications</h2>
                  <div className="space-y-1 text-xs">
                    {templateData.certifications.map((cert, index) => (
                      <div key={index}>{cert}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
    }
  }

  // Render the appropriate preview template based on the ID
  const renderPreviewTemplate = () => {
    return renderTemplate()
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center px-4 md:px-6">
          <Link href="/templates" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Templates</span>
          </Link>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700" onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container grid md:grid-cols-[1fr_300px] lg:grid-cols-[1fr_350px] gap-6 px-4 md:px-6 py-6">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">{templateFormat.name}</h1>
              <Button variant="outline" onClick={handlePreview}>
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </Button>
            </div>
            <div ref={resumeRef} className="aspect-[8.5/11] bg-white border rounded-lg shadow-sm overflow-hidden">
              {renderTemplate()}
            </div>
          </div>
          <div className="space-y-6">
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-emerald-50 px-4 py-3 font-medium text-emerald-800">Edit Template</div>
              <div className="p-4">
                <Tabs defaultValue="personal" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="personal">Personal</TabsTrigger>
                    <TabsTrigger value="experience">Experience</TabsTrigger>
                    <TabsTrigger value="education">Education</TabsTrigger>
                  </TabsList>
                  <TabsContent value="personal" className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium" htmlFor="name">
                        Full Name
                      </label>
                      <input
                        id="name"
                        className="w-full rounded-md border px-3 py-2 text-sm"
                        value={templateData.personal.name}
                        onChange={(e) => handleInputChange("personal", "name", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium" htmlFor="title">
                        Professional Title
                      </label>
                      <input
                        id="title"
                        className="w-full rounded-md border px-3 py-2 text-sm"
                        value={templateData.personal.title}
                        onChange={(e) => handleInputChange("personal", "title", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium" htmlFor="email">
                        Email
                      </label>
                      <input
                        id="email"
                        className="w-full rounded-md border px-3 py-2 text-sm"
                        value={templateData.personal.email}
                        onChange={(e) => handleInputChange("personal", "email", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium" htmlFor="phone">
                        Phone
                      </label>
                      <input
                        id="phone"
                        className="w-full rounded-md border px-3 py-2 text-sm"
                        value={templateData.personal.phone}
                        onChange={(e) => handleInputChange("personal", "phone", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium" htmlFor="location">
                        Location
                      </label>
                      <input
                        id="location"
                        className="w-full rounded-md border px-3 py-2 text-sm"
                        value={templateData.personal.location}
                        onChange={(e) => handleInputChange("personal", "location", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium" htmlFor="summary">
                        Summary
                      </label>
                      <textarea
                        id="summary"
                        className="w-full rounded-md border px-3 py-2 text-sm"
                        rows={3}
                        value={templateData.personal.summary}
                        onChange={(e) => handleInputChange("personal", "summary", e.target.value)}
                      />
                    </div>
                  </TabsContent>
                  <TabsContent value="experience" className="space-y-4 pt-4">
                    {templateData.experience.map((exp, index) => (
                      <div key={index} className="space-y-4 border rounded-md p-3">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">Job {index + 1}</h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setTemplateData((prev) => ({
                                ...prev,
                                experience: prev.experience.filter((_, i) => i !== index),
                              }))
                            }}
                          >
                            Remove
                          </Button>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium" htmlFor={`job-title-${index}`}>
                            Job Title
                          </label>
                          <input
                            id={`job-title-${index}`}
                            className="w-full rounded-md border px-3 py-2 text-sm"
                            value={exp.title}
                            onChange={(e) => handleArrayInputChange("experience", index, "title", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium" htmlFor={`company-${index}`}>
                            Company
                          </label>
                          <input
                            id={`company-${index}`}
                            className="w-full rounded-md border px-3 py-2 text-sm"
                            value={exp.company}
                            onChange={(e) => handleArrayInputChange("experience", index, "company", e.target.value)}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-2">
                            <label className="text-sm font-medium" htmlFor={`start-date-${index}`}>
                              Start Date
                            </label>
                            <input
                              id={`start-date-${index}`}
                              className="w-full rounded-md border px-3 py-2 text-sm"
                              value={exp.startDate}
                              onChange={(e) => handleArrayInputChange("experience", index, "startDate", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium" htmlFor={`end-date-${index}`}>
                              End Date
                            </label>
                            <input
                              id={`end-date-${index}`}
                              className="w-full rounded-md border px-3 py-2 text-sm"
                              value={exp.endDate}
                              onChange={(e) => handleArrayInputChange("experience", index, "endDate", e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium" htmlFor={`description-${index}`}>
                            Description
                          </label>
                          <textarea
                            id={`description-${index}`}
                            className="w-full rounded-md border px-3 py-2 text-sm"
                            rows={3}
                            value={exp.description}
                            onChange={(e) => handleArrayInputChange("experience", index, "description", e.target.value)}
                          />
                        </div>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        setTemplateData((prev) => ({
                          ...prev,
                          experience: [
                            ...prev.experience,
                            {
                              title: "New Position",
                              company: "Company Name",
                              startDate: "20XX",
                              endDate: "Present",
                              description: "Describe your responsibilities and achievements",
                            },
                          ],
                        }))
                      }}
                    >
                      Add Job
                    </Button>
                  </TabsContent>
                  <TabsContent value="education" className="space-y-4 pt-4">
                    {templateData.education.map((edu, index) => (
                      <div key={index} className="space-y-4 border rounded-md p-3">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">Education {index + 1}</h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setTemplateData((prev) => ({
                                ...prev,
                                education: prev.education.filter((_, i) => i !== index),
                              }))
                            }}
                          >
                            Remove
                          </Button>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium" htmlFor={`degree-${index}`}>
                            Degree
                          </label>
                          <input
                            id={`degree-${index}`}
                            className="w-full rounded-md border px-3 py-2 text-sm"
                            value={edu.degree}
                            onChange={(e) => handleArrayInputChange("education", index, "degree", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium" htmlFor={`school-${index}`}>
                            School
                          </label>
                          <input
                            id={`school-${index}`}
                            className="w-full rounded-md border px-3 py-2 text-sm"
                            value={edu.school}
                            onChange={(e) => handleArrayInputChange("education", index, "school", e.target.value)}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-2">
                            <label className="text-sm font-medium" htmlFor={`start-year-${index}`}>
                              Start Year
                            </label>
                            <input
                              id={`start-year-${index}`}
                              className="w-full rounded-md border px-3 py-2 text-sm"
                              value={edu.startYear}
                              onChange={(e) => handleArrayInputChange("education", index, "startYear", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium" htmlFor={`end-year-${index}`}>
                              End Year
                            </label>
                            <input
                              id={`end-year-${index}`}
                              className="w-full rounded-md border px-3 py-2 text-sm"
                              value={edu.endYear}
                              onChange={(e) => handleArrayInputChange("education", index, "endYear", e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium" htmlFor={`gpa-${index}`}>
                            GPA
                          </label>
                          <input
                            id={`gpa-${index}`}
                            className="w-full rounded-md border px-3 py-2 text-sm"
                            value={edu.gpa}
                            onChange={(e) => handleArrayInputChange("education", index, "gpa", e.target.value)}
                          />
                        </div>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        setTemplateData((prev) => ({
                          ...prev,
                          education: [
                            ...prev.education,
                            {
                              degree: "Degree Name",
                              school: "School Name",
                              startYear: "20XX",
                              endYear: "20XX",
                              gpa: "X.X/X.X",
                            },
                          ],
                        }))
                      }}
                    >
                      Add Education
                    </Button>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            <Button
              className="w-full bg-emerald-600 hover:bg-emerald-700"
              onClick={handleSaveChanges}
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>
      </main>

      {/* Download Dialog */}
      <Dialog open={showDownloadDialog} onOpenChange={setShowDownloadDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Download Template</DialogTitle>
            <DialogDescription>Choose a format to download your template</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-3 gap-4">
              <div
                className={`relative flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer transition-all ${downloadFormat === "pdf" ? "border-emerald-600 bg-emerald-50" : "hover:border-emerald-200"}`}
                onClick={() => setDownloadFormat("pdf")}
              >
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-2">
                  <span className="text-red-700 font-bold text-sm">PDF</span>
                </div>
                <span className="text-sm font-medium">PDF</span>
                {downloadFormat === "pdf" && (
                  <div className="absolute top-2 right-2">
                    <Check className="h-4 w-4 text-emerald-600" />
                  </div>
                )}
              </div>
              <div
                className={`relative flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer transition-all ${downloadFormat === "docx" ? "border-emerald-600 bg-emerald-50" : "hover:border-emerald-200"}`}
                onClick={() => setDownloadFormat("docx")}
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                  <span className="text-blue-700 font-bold text-sm">DOCX</span>
                </div>
                <span className="text-sm font-medium">Word</span>
                {downloadFormat === "docx" && (
                  <div className="absolute top-2 right-2">
                    <Check className="h-4 w-4 text-emerald-600" />
                  </div>
                )}
              </div>
              <div
                className={`relative flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer transition-all ${downloadFormat === "txt" ? "border-emerald-600 bg-emerald-50" : "hover:border-emerald-200"}`}
                onClick={() => setDownloadFormat("txt")}
              >
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                  <span className="text-gray-700 font-bold text-sm">TXT</span>
                </div>
                <span className="text-sm font-medium">Text</span>
                {downloadFormat === "txt" && (
                  <div className="absolute top-2 right-2">
                    <Check className="h-4 w-4 text-emerald-600" />
                  </div>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDownloadDialog(false)}>
              Cancel
            </Button>
            <Button onClick={processDownload} className="bg-emerald-600 hover:bg-emerald-700" disabled={isDownloading}>
              {isDownloading ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Downloading...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Resume Preview</DialogTitle>
            <DialogDescription>This is how your resume will look when downloaded</DialogDescription>
          </DialogHeader>
          <div className="flex-1 overflow-auto p-4 bg-gray-100">
            <div className="mx-auto max-w-[800px] bg-white shadow-lg rounded-lg overflow-hidden">
              {renderPreviewTemplate()}
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowPreview(false)}>Close Preview</Button>
            <Button onClick={handleDownload} className="bg-emerald-600 hover:bg-emerald-700">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
