"use server"

import client from "@/lib/client-prisma"
import BoardData from "../types/board-data"
import { redirect } from "next/navigation"

export default async function getBoard(boardId: string): Promise<BoardData> {
  const board = await client.board.findUnique({
    where: {
      id: boardId,
    },
  })

  if (!board) {
    redirect("/boards")
  }

  return board
}
