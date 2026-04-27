import { NextResponse } from "next/server"
import { z } from "zod"

import { prisma } from "@/lib/prisma"

const createUserSchema = z.object({
  supabaseId: z.string().min(1),
  email: z.email(),
  role: z.enum(["FOUNDER", "INVESTOR"]),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const data = createUserSchema.parse(body)

    const user = await prisma.user.upsert({
      where: {
        supabaseId: data.supabaseId,
      },
      update: {
        email: data.email,
        role: data.role,
      },
      create: {
        supabaseId: data.supabaseId,
        email: data.email,
        role: data.role,
      },
    })

    return NextResponse.json({ user }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid user payload", details: error.flatten() },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: "Failed to create user record" },
      { status: 500 }
    )
  }
}
