"use server"

import client from "@/lib/client-prisma"
import { currentUser } from "@clerk/nextjs"
import { revalidatePath } from "next/cache"

export default async function createBoard(formData: FormData) {
  const user = await currentUser()
  if (!user?.id) return
  const rawFormData = Object.fromEntries(formData.entries())
  await client.board.create({
    data: {
      userId: user.id,
      title: rawFormData.title as string,
      description: (rawFormData.description as string | undefined) ?? "",
    },
  })

  revalidatePath("/boards")
}
