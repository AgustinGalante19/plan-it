"use client"

import { DragDropContext, DropResult, Droppable } from "@hello-pangea/dnd"
import React, { useState } from "react"
import Column from "./column"
import Item from "./item"
import BoardData, { ColWithItems } from "../types/board-data"
import { Plus } from "lucide-react"
import orderBoard from "../utils/order-board"
import { Column as ColType } from "@prisma/client"
import ShortUniqueId from "short-unique-id"

function Board({ initialBoardData }: { initialBoardData: BoardData }) {
  const { randomUUID } = new ShortUniqueId({ length: 10 })

  const [boardData, setBoardData] = useState<BoardData>(initialBoardData)

  const onDragEnd = (result: DropResult) => {
    const orderResult = orderBoard(boardData, result)
    setBoardData(orderResult)
  }

  const updateCols = (newCols: ColWithItems[]) =>
    setBoardData({
      ...boardData,
      columns: newCols,
    })

  const handleAddItem = (column: ColType) => {
    const currentColumn = boardData.columns.find((e) => e.id === column.id)

    if (!currentColumn) return

    const updatedCols: ColWithItems[] = boardData.columns.map((col) => {
      if (col.id === currentColumn.id) {
        return {
          ...currentColumn,
          items: [
            ...currentColumn.items,
            {
              id: randomUUID(), //this is temporal
              title: "new item",
              columnId: currentColumn.id,
              description: "",
            },
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
        {
          title: "New column",
          id: randomUUID(),
          boardId: boardData.id,
          items: [],
          createdAt: new Date(),
        },
      ],
    })

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {boardData.columns.map((column) => (
        <Droppable droppableId={column.id.toString()} key={column.id}>
          {(provided) => (
            <Column
              provided={provided}
              column={column}
              updateCols={updateCols}
              columns={boardData.columns}
            >
              {column.items.map((item, index) => (
                <Item index={index} item={item} key={item.id} />
              ))}
              <button
                className='dark:bg-secondary/20 bg-primary/60 text-white rounded-md flex justify-center items-center p-1 w-full'
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
        className='bg-primary/60 text-white font-semibold rounded-md min-w-[24rem] h-10 flex px-4 items-center justify-center'
        type='button'
        onClick={handleAddColumn}
      >
        <Plus size={18} /> <span>Add column</span>
      </button>
    </DragDropContext>
  )
}

export default Board
