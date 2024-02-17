"use client"

import { Draggable } from "@hello-pangea/dnd"
import ItemDialog from "./item-dialog"
import { useState } from "react"
import { Pencil } from "lucide-react"
import { Column, Item } from "../types/board-data"
import useBoardStore from "../../store/board-store"
import { motion } from "framer-motion"

interface Props {
  item: Item
  index: number
  currentColumn: Column
}

function Item({ item, index, currentColumn }: Props) {
  const [isEditOpen, setIsEditOpen] = useState(false)
  const { boardState, setBoardState } = useBoardStore()

  const handleClose = () => setIsEditOpen(false)

  const handleRemoveItem = () => {
    const newItems = currentColumn.items.filter((e) => e.id !== item.id)

    const resultCols = boardState.columns.map((col: Column) => {
      if (col.id === currentColumn.id) {
        return {
          ...col,
          items: newItems,
        }
      }

      return col
    })

    setBoardState({ ...boardState, columns: resultCols })
  }

  return (
    <>
      <Draggable draggableId={item.id.toString()} index={index}>
        {(provided) => (
          <div
            className='dark:bg-secondary/30 bg-primary/80 text-white rounded-md flex flex-col my-2 p-1.5 w-full'
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <motion.div
              className='p-1 flex justify-between'
              initial={{
                scale: 0.4,
              }}
              animate={{
                scale: 1,
              }}
            >
              <h5 className='text-xl font-semibold'>{item.title}</h5>
              <div className='flex items-center gap-2'>
                <button
                  className='p-1 flex items-center justify-center rounded-md hover:bg-neutral-900 hover:bg-opacity-25 transition-colors'
                  onClick={() => setIsEditOpen(true)}
                >
                  <Pencil size={16} />
                </button>
              </div>
            </motion.div>
            <div className='p-1'>
              <p>{item.description}</p>
            </div>
          </div>
        )}
      </Draggable>
      <ItemDialog
        isOpen={isEditOpen}
        itemData={item}
        handleClose={handleClose}
        currentColumn={currentColumn}
        handleRemoveItem={handleRemoveItem}
      />
    </>
  )
}

export default Item
