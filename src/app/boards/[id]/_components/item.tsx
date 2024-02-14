import { Draggable } from "@hello-pangea/dnd"
import React from "react"
import { Task } from "../types/drag-list"

interface Props {
  task: Task
  index: number
}

function Item({ task, index }: Props) {
  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided) => (
        <div
          className='dark:bg-secondary/30 bg-primary/80 text-white rounded-md flex flex-col my-2 p-1.5'
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className='p-1'>
            <h5 className='text-xl font-semibold'>{task.title}</h5>
          </div>
          <div className='p-1'>
            <p>{task.content}</p>
          </div>
        </div>
      )}
    </Draggable>
  )
}

export default Item
