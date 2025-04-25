import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const type = searchParams.get("type") as "resume" | "portfolio" | "cv" | null

    let templates

    if (type) {
      templates = await db.getTemplatesByType(type)
    } else {
      templates = await db.getTemplates()
    }

    return NextResponse.json({ templates })
  } catch (error) {
    console.error("Error fetching templates:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
