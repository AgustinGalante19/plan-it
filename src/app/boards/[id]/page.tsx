"use client"

import { DragDropContext, DropResult, Droppable } from "@hello-pangea/dnd"
import Item from "./_components/item"
import Column from "./_components/column"

const initialData = {
  columns: [
    {
      id: 1,
      colName: "To do",
      taskIds: [1, 2, 3, 4],
      tasks: [
        { id: 1, title: "Home", content: "Take out the garbage" },
        { id: 2, title: "Entretaiment", content: "Watch my favorite show" },
        { id: 3, title: "My devices", content: "Charge my phone" },
        { id: 4, title: "My stuff", content: "Cook dinner" },
      ],
    },
    {
      id: 2,
      colName: "Work",
      taskIds: [5, 6],
      tasks: [
        { id: 5, title: "Blog", content: "Fix bug on comments section" },
        {
          id: 6,
          title: "Stream platform",
          content: "Migrate from nextjs 12 to 14.0.1 ",
        },
      ],
    },
  ],

  columnOrder: [1],
}

function Board() {
  const onDragEnd = (result: DropResult) => {}

  return (
    <div className='bg-neutral-500 flex container mx-auto gap-x-4 p-8'>
      <DragDropContext onDragEnd={onDragEnd}>
        {initialData.columns.map((column) => (
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
    </div>
  )
}

export default Board
