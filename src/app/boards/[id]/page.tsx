"use client"

import { DragDropContext, DropResult, Droppable } from "@hello-pangea/dnd"
import Item from "./_components/item"
import Column from "./_components/column"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Item as ItemType, Column as ColumnType } from "./types/drag-list"

const initialData = {
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
  columnOrder: [1, 2],
}

function orderItems(items: ItemType[], id: number, newPosition: number) {
  const source = items.find((tarea) => tarea.id === id)
  if (!source || newPosition < 0 || newPosition >= items.length) {
    return items
  }

  const excludedItems = items.filter((item) => item.id !== id)
  const newItemsOrder = [
    ...excludedItems.slice(0, newPosition),
    source,
    ...excludedItems.slice(newPosition),
  ]

  return newItemsOrder
}

function Board() {
  const [boardData, setBoardData] = useState(initialData)

  const onDragEnd = (result: DropResult) => {
    const { destination, draggableId, source } = result
    if (!destination) return
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return

    const currentColumn = boardData.columns.find(
      (c) => c.id.toString() === source.droppableId
    )

    if (!currentColumn) return

    const updatedColumn: ColumnType = {
      ...currentColumn,
      tasks: orderItems(
        currentColumn.tasks,
        Number(draggableId),
        destination.index
      ),
    }

    const updatedResult = boardData.columns.map((e) => {
      if (e.id === Number(source.droppableId)) {
        return updatedColumn
      }
      return e
    })

    setBoardData({
      ...boardData,
      columns: updatedResult,
    })
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
        <DragDropContext onDragEnd={onDragEnd}>
          {boardData.columns.map((column) => (
            <Droppable droppableId={column.id.toString()} key={column.id}>
              {(provided) => (
                <Column provided={provided} column={column}>
                  {column.tasks.map((task, index) => (
                    <Item index={index} task={task} key={task.id} />
                  ))}
                  {provided.placeholder}
                </Column>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
    </div>
  )
}

export default Board
