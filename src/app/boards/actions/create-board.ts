"use server"

import client from "@/lib/client-prisma"
import { currentUser } from "@clerk/nextjs"
import { revalidatePath } from "next/cache"

export default async function createBoard(formData: FormData) {
  try {
    const user = await currentUser()
    if (!user?.id) return { message: "You must be logged in", ok: false }

    const rawFormData = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
    }

    if (rawFormData.title === "") {
      return { message: "⚠️ Title is required", ok: false }
    }
    await client.board.create({
      data: {
        userId: user.id,
        title: rawFormData.title,
        description: rawFormData.description ?? "",
      },
    })

    revalidatePath("/boards")
    return { message: "👍 Board created successfully", ok: true }
  } catch (err) {
    return { message: "⚠️ Unexpected error on board creation", ok: false }
  }
}
