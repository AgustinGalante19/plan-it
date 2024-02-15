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

  const currentColumn = boardData.columns.find(
    (c: Column) => c.id.toString() === source.droppableId
  )

  if (!currentColumn) return boardData

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
