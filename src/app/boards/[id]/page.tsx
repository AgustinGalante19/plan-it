"use client"

import { useState } from "react"
import { DropResult } from "@hello-pangea/dnd"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import BoardData from "./types/board-data"
import orderBoard from "./utils/order-board"
import Board from "./_components/board"
import { motion } from "framer-motion"

const fakeBoard = {
  boardName: "My first Board",
  description: "This is an description from my first board",
}

function Page() {
  const { boardName, description } = fakeBoard

  const { back } = useRouter()

  return (
    <motion.div
      initial={{
        translateY: -100,
      }}
      animate={{
        translateY: 0,
      }}
    >
      <div className='bg-primary bg-opacity-10'>
        <div className=' flex flex-col p-4'>
          <div>
            <button
              className='flex items-center gap-1 hover:bg-secondary dark:hover:bg-opacity-10 py-1 px-2 rounded-md transition-colors mb-2'
              onClick={back}
            >
              <ArrowLeft size={18} />
              <h2 className='text-xl font-semibold'>{boardName}</h2>
            </button>
          </div>
          <p className='text-sm'>{description}</p>
        </div>
      </div>
      <div className='flex overflow-auto  h-[650px] gap-4 p-8 mt-4'>
        <Board />
      </div>
    </motion.div>
  )
}

export default Page
