import { DropResult } from "@hello-pangea/dnd"
import BoardData, { ColWithItems } from "../types/board-data"
import { Column } from "../types/drag-list"
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
    (c) => c.id.toString() === source.droppableId
  )

  if (!currentColumn) return boardData

  const updatedColumn: ColWithItems = {
    ...currentColumn,
    items: orderItems(currentColumn.items, draggableId, destination.index),
  }

  const updatedResult = boardData.columns.map((e) => {
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
