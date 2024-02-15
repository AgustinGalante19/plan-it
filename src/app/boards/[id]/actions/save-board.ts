"use server"

import client from "@/lib/client-prisma"
import BoardData from "../types/board-data"
import { revalidatePath } from "next/cache"

export default async function saveBoard(
  boardId: string,
  boardState: BoardData
) {
  try {
    await client.board.update({
      where: {
        id: boardId,
      },
      data: {
        columns: boardState.columns as any,
        createdAt: boardState.createdAt,
        title: boardState.title,
        userId: boardState.userId,
        description: boardState.description,
      },
    })
    revalidatePath(`/boards/${boardId}`)
  } catch (err) {
    console.log("error on update board", err)
  }
}
