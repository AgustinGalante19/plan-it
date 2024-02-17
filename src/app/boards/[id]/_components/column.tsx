"use client"

import { DroppableProvided } from "@hello-pangea/dnd"
import { Column as ColType } from "../types/board-data"
import { Check } from "lucide-react"
import { useState } from "react"
import ColOptions from "./col-options"
import { motion } from "framer-motion"

interface Props {
  provided: DroppableProvided
  children: React.ReactNode
  column: ColType
  columns: ColType[]
  updateCols: (newCols: ColType[]) => void
}

function Column({ children, provided, column, columns, updateCols }: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const [colTitle, setColTitle] = useState(column.title)

  const handleUpdateTitle = () => {
    const newCols = columns.map((col) => {
      if (col.id === column.id) {
        return {
          ...col,
          title: colTitle,
        }
      }
      return col
    })
    setIsEditing(false)
    updateCols(newCols)
  }

  const handleRemoveCol = () => {
    const newCols = columns.filter((e) => e.id !== column.id)
    updateCols(newCols)
  }

  return (
    <div className='p-4 bg-secondary dark:bg-primary rounded-md min-w-[24rem] space-y-2 flex-col overflow-y-auto'>
      <div className='flex justify-between items-center'>
        {isEditing ? (
          <>
            <motion.input
              initial={{
                scale: 0.4,
              }}
              animate={{
                scale: 1,
              }}
              className='w-full bg-primary/80  dark:bg-secondary text-white dark:text-black rounded pl-2 h-9  font-bold text-xl'
              value={colTitle}
              onChange={(e) => setColTitle(e.target.value)}
            />
            <button className='mx-1 bg-green-500 text-white dark:bg-green-600 p-1 rounded'>
              <Check onClick={handleUpdateTitle} size={18} />
            </button>
          </>
        ) : (
          <h4 className='dark:text-white font-bold text-xl w-full'>
            {column.title}
          </h4>
        )}
        <ColOptions
          handleClickEdit={() => setIsEditing(true)}
          handleClickRemove={handleRemoveCol}
        />
      </div>
      <div ref={provided.innerRef} {...provided.droppableProps}>
        {children}
      </div>
    </div>
  )
}

export default Column
