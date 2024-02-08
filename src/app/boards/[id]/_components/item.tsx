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
          className='bg-white flex flex-col my-2 p-1.5'
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className='bg-green-400'>
            <h5 className='text-xl font-semibold text-black'>{task.title}</h5>
          </div>
          <div className='bg-blue-400'>
            <p>{task.content}</p>
          </div>
        </div>
      )}
    </Draggable>
  )
}

export default Item
