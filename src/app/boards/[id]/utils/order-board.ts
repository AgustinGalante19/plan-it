import { DropResult } from "@hello-pangea/dnd"
import BoardData, { Column } from "../types/board-data"
import orderItems from "./order-items"

export default function orderBoard(
  boardData: BoardData,
  result: DropResult
): BoardData {
  const { destination, draggableId, source } = result
  if (!destination) return boardData
  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  )
    return boardData

  let currentColumn: Column = boardData.columns.find(
    (c: Column) => c.id.toString() === source.droppableId
  )
  if (!currentColumn) return boardData

  const currentItem = currentColumn.items.find(
    (item) => item.id === draggableId
  )

  if (!currentItem) return boardData

  let updatedDestinationColumn: Column | null = null

  if (currentItem.columnId !== destination.droppableId) {
    currentColumn.items = currentColumn.items.filter(
      (item) => item.id !== draggableId
    )

    const destinationColumn = boardData.columns.find(
      (col: Column) => col.id === destination.droppableId
    )
    currentItem.columnId = destination.droppableId
    updatedDestinationColumn = {
      ...destinationColumn,
      items: orderItems(
        [...destinationColumn.items, currentItem],
        draggableId,
        destination.index
      ),
    }

    const updatedResult = boardData.columns.map((e: Column) => {
      if (e.id === destination.droppableId) {
        return updatedDestinationColumn
      }
      if (e.id === currentColumn.id) {
        return currentColumn
      }
      return e
    })

    return {
      ...boardData,
      columns: updatedResult,
    }
  }

  const updatedColumn: Column = {
    ...currentColumn,
    items: orderItems(currentColumn.items, draggableId, destination.index),
  }

  const updatedResult = boardData.columns.map((e: Column) => {
    if (e.id === source.droppableId) {
      return updatedColumn
    }
    return e
  })

  return {
    ...boardData,
    columns: updatedResult,
  }
}
