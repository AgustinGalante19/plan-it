import { DroppableProvided } from "@hello-pangea/dnd"
import { Column } from "../types/drag-list"

interface Props {
  provided: DroppableProvided
  children: React.ReactNode
  column: Column
}

function Column({ children, provided, column }: Props) {
  return (
    <div className='p-4 border bg-neutral-200 space-y-2 flex-col'>
      <h4 className='text-black font-bold text-xl'>{column.colName}</h4>
      <div ref={provided.innerRef} {...provided.droppableProps}>
        {children}
      </div>
    </div>
  )
}

export default Column