"use client"

import { DragDropContext, DropResult, Droppable } from "@hello-pangea/dnd"
import React, { useEffect, useState } from "react"
import Column from "./column"
import Item from "./item"
import BoardData, { Column as ColType } from "../types/board-data"
import { Loader2, Plus } from "lucide-react"
import orderBoard from "../utils/order-board"
import ShortUniqueId from "short-unique-id"
import useBoardStore from "../../store/board-store"

function Board({ initialBoardData }: { initialBoardData: BoardData }) {
  const { randomUUID } = new ShortUniqueId({ length: 10 })

  const { boardState, setBoardState } = useBoardStore()

  useEffect(() => {
    setBoardState(initialBoardData)
  }, [initialBoardData, setBoardState])

  const onDragEnd = (result: DropResult) => {
    const orderResult = orderBoard(boardState, result)
    setBoardState(orderResult)
  }

  const updateCols = (newCols: ColType[]) =>
    setBoardState({
      ...boardState,
      columns: newCols,
    })

  const handleAddItem = (column: ColType) => {
    const currentColumn = boardState.columns.find(
      (e: ColType) => e.id === column.id
    )

    if (!currentColumn) return

    const updatedCols: ColType[] = boardState.columns.map((col: ColType) => {
      if (col.id === currentColumn.id) {
        return {
          ...currentColumn,
          items: [
            ...currentColumn.items,
            {
              id: randomUUID(),
              title: "new item",
              columnId: currentColumn.id,
              description: "",
            },
          ],
        }
      }
      return col
    })
    setBoardState({
      ...boardState,
      columns: updatedCols,
    })
  }

  const handleAddColumn = () =>
    setBoardState({
      ...boardState,
      columns: [
        ...boardState.columns,
        {
          title: "New column",
          id: randomUUID(),
          items: [],
          createdAt: new Date(),
        },
      ],
    })

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {boardState.columns.map((column: ColType) => (
        <Droppable droppableId={column.id.toString()} key={column.id}>
          {(provided) => (
            <Column
              provided={provided}
              column={column}
              updateCols={updateCols}
              columns={boardState.columns}
            >
              {column.items.map((item, index) => (
                <Item
                  currentColumn={column}
                  index={index}
                  item={item}
                  key={item.id}
                />
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
        className='bg-primary/60 text-white font-semibold rounded-md min-w-[24rem] h-10 flex px-4 items-center justify-center disabled:bg-primary/20'
        type='button'
        onClick={handleAddColumn}
        title='add column'
      >
        <Plus size={18} /> <span>Add column</span>
      </button>
    </DragDropContext>
  )
}

export default Board
