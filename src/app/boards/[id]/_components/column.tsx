import { DroppableProvided } from "@hello-pangea/dnd"
import { Column } from "@prisma/client"

interface Props {
  provided: DroppableProvided
  children: React.ReactNode
  column: Column
}

function Column({ children, provided, column }: Props) {
  return (
    <div className='p-4 bg-secondary dark:bg-primary rounded-md w-96 space-y-2 flex-col overflow-y-auto'>
      <h4 className='dark:text-white font-bold text-xl'>{column.title}</h4>
      <div ref={provided.innerRef} {...provided.droppableProps}>
        {children}
      </div>
    </div>
  )
}

export default Column
