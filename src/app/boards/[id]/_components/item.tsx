import { Draggable } from "@hello-pangea/dnd"
import { Item } from "@prisma/client"
import React from "react"

interface Props {
  item: Item
  index: number
}

function Item({ item, index }: Props) {
  return (
    <Draggable draggableId={item.id.toString()} index={index}>
      {(provided) => (
        <div
          className='dark:bg-secondary/30 bg-primary/80 text-white rounded-md flex flex-col my-2 p-1.5'
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className='p-1'>
            <h5 className='text-xl font-semibold'>{item.title}</h5>
          </div>
          <div className='p-1'>
            <p>{item.description}</p>
          </div>
        </div>
      )}
    </Draggable>
  )
}

export default Item
