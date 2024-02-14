"use client"

import { useState } from "react"
import { DropResult } from "@hello-pangea/dnd"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import BoardData from "./types/board-data"
import orderBoard from "./utils/order-board"
import Board from "./_components/board"

const initialData: BoardData = {
  boardName: "My first Board",
  description: "This is an description from my first board",
  columns: [
    {
      id: 11,
      colName: "To do",
      tasks: [
        { id: 1, title: "Home", content: "Take out the garbage" },
        { id: 2, title: "Entretaiment", content: "Watch my favorite show" },
        { id: 3, title: "My devices", content: "Charge my phone" },
        { id: 4, title: "My stuff", content: "Cook dinner" },
      ],
    },
    {
      id: 12,
      colName: "Work",
      tasks: [
        { id: 5, title: "Blog", content: "Fix bug on comments section" },
        {
          id: 6,
          title: "Stream platform",
          content: "Migrate from nextjs 12 to 14.0.1 ",
        },
      ],
    },
  ],
}

function Page() {
  const [boardData, setBoardData] = useState<BoardData>(initialData)

  const onDragEnd = (result: DropResult) => {
    const orderResult = orderBoard(boardData, result)

    setBoardData(orderResult)
  }

  const { back } = useRouter()

  return (
    <div>
      <div className='bg-primary bg-opacity-10'>
        <div className=' flex flex-col p-4'>
          <div>
            <button
              className='flex items-center gap-1 hover:bg-secondary dark:hover:bg-opacity-10 py-1 px-2 rounded-md transition-colors mb-2'
              onClick={back}
            >
              <ArrowLeft size={18} />
              <h2 className='text-xl font-semibold'>{boardData.boardName}</h2>
            </button>
          </div>
          <p className='text-sm'>{boardData.description}</p>
        </div>
      </div>
      <div className='flex overflow-auto  h-[650px] gap-4 p-8 mt-4'>
        <Board boardData={boardData} onDragEnd={onDragEnd} />
      </div>
    </div>
  )
}

export default Page
