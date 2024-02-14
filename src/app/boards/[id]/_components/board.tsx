"use client"

import { DragDropContext, DropResult, Droppable } from "@hello-pangea/dnd"
import React, { useState } from "react"
import Column from "./column"
import Item from "./item"
import BoardData from "../types/board-data"
import { Plus } from "lucide-react"
import orderBoard from "../utils/order-board"
import { Column as ColType } from "../types/drag-list"

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

function Board() {
  const [boardData, setBoardData] = useState<BoardData>(initialData)

  const onDragEnd = (result: DropResult) => {
    const orderResult = orderBoard(boardData, result)

    setBoardData(orderResult)
  }

  const handleAddItem = (column: ColType) => {
    const currentColumn = boardData.columns.find((e) => e.id === column.id)

    if (!currentColumn) return

    const updatedCols = boardData.columns.map((col) => {
      if (col.id === currentColumn.id) {
        return {
          ...currentColumn,
          tasks: [
            ...currentColumn.tasks,
            { id: 0, content: "", title: "new item" },
          ],
        }
      }
      return col
    })
    setBoardData({
      ...boardData,
      columns: updatedCols,
    })
  }

  const handleAddColumn = () =>
    setBoardData({
      ...boardData,
      columns: [
        ...boardData.columns,
        { colName: "New column", id: 0, tasks: [] },
      ],
    })

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {boardData.columns.map((column) => (
        <Droppable droppableId={column.id.toString()} key={column.id}>
          {(provided) => (
            <Column provided={provided} column={column}>
              {column.tasks.map((task, index) => (
                <Item index={index} task={task} key={task.id} />
              ))}
              <button
                className='dark:bg-secondary/15 bg-primary/60 text-white rounded-md flex justify-center items-center p-1 w-full'
                type='button'
                onClick={() => handleAddItem(column)}
              >
                <Plus size={18} />
                <span>Add item</span>
              </button>
              {provided.placeholder}
            </Column>
          )}
        </Droppable>
      ))}
      <button
        className='bg-primary/60 text-white font-semibold rounded-md min-w-96 h-10 flex px-4 items-center justify-center'
        type='button'
        onClick={handleAddColumn}
      >
        <Plus size={18} /> <span>Add column</span>
      </button>
    </DragDropContext>
  )
}

export default Board
