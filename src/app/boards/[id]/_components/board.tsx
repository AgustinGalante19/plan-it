import { DragDropContext, DropResult, Droppable } from "@hello-pangea/dnd"
import React from "react"
import Column from "./column"
import Item from "./item"
import BoardData from "../types/board-data"

interface Props {
  boardData: BoardData
  onDragEnd: (result: DropResult) => void
}

function Board({ boardData, onDragEnd }: Props) {
  return (
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
  )
}

export default Board
