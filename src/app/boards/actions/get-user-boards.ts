import client from "@/lib/client-prisma"
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"

export default async function getUserBoards() {
  const user = await currentUser()
  if (!user?.id) return redirect("/")

  const userBoards = await client.board.findMany({
    where: {
      userId: user.id,
    },
  })
  return userBoards
}
