"use server"

import client from "@/lib/client-prisma"
import { revalidatePath } from "next/cache"

export default async function removeBoard(boardId: string) {
  try {
    await client.board.delete({
      where: {
        id: boardId,
      },
    })

    revalidatePath("/boards")
    return true
  } catch (err) {
    return false
  }
}
