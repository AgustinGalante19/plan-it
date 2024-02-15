"use client"

import { DroppableProvided } from "@hello-pangea/dnd"
import { Column } from "@prisma/client"
import { ColWithItems } from "../types/board-data"
import { Check, Pencil, Trash } from "lucide-react"
import { useState } from "react"

interface Props {
  provided: DroppableProvided
  children: React.ReactNode
  column: Column
  columns: ColWithItems[]
  updateCols: (newCols: ColWithItems[]) => void
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
      <div className='flex'>
        {isEditing ? (
          <input
            className='w-full border bg-secondary border-primary  text-black dark:border-secondary rounded-md h-9 dark:bg-primary dark:text-white font-bold text-xl px-1'
            value={colTitle}
            onChange={(e) => setColTitle(e.target.value)}
          />
        ) : (
          <h4 className='dark:text-white font-bold text-xl w-full'>
            {column.title}
          </h4>
        )}
        <div className='space-x-2 flex ml-2 items-center'>
          {!isEditing ? (
            <button
              className='py-1 px-1.5 rounded-lg'
              onClick={() => setIsEditing(true)}
            >
              <Pencil size={18} />
            </button>
          ) : (
            <button>
              <Check size={18} onClick={handleUpdateTitle} />
            </button>
          )}
          <button
            className='py-1 px-1.5 rounded-lg bg-red-500 hover:bg-red-500/70 transition-colors'
            onClick={handleRemoveCol}
          >
            <Trash size={18} />
          </button>
        </div>
      </div>
      <div ref={provided.innerRef} {...provided.droppableProps}>
        {children}
      </div>
    </div>
  )
}

export default Column
