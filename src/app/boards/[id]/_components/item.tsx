import { Draggable } from "@hello-pangea/dnd"
import ItemDialog from "./item-dialog"
import { useState } from "react"
import { Pencil, Trash } from "lucide-react"
import { Item } from "../types/board-data"

interface Props {
  item: Item
  index: number
}

function Item({ item, index }: Props) {
  const [isEditOpen, setIsEditOpen] = useState(false)

  const handleClose = () => setIsEditOpen(false)

  return (
    <>
      <Draggable draggableId={item.id.toString()} index={index}>
        {(provided) => (
          <div
            className='dark:bg-secondary/30 bg-primary/80 text-white rounded-md flex flex-col my-2 p-1.5 w-full'
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <div className='p-1 flex justify-between'>
              <h5 className='text-xl font-semibold'>{item.title}</h5>
              <div className='flex items-center gap-2'>
                <button onClick={() => setIsEditOpen(true)}>
                  <Pencil size={18} />
                </button>
                <button
                  className='py-1 px-1.5 rounded-lg'
                  /* onClick={handleRemoveItem} */
                >
                  <Trash size={18} color='rgb(239 68 68)' />
                </button>
              </div>
            </div>
            <div className='p-1'>
              <p>{item.description}</p>
            </div>
          </div>
        )}
      </Draggable>
      <ItemDialog
        isOpen={isEditOpen}
        itemData={item}
        handleClose={handleClose}
      />
    </>
  )
}

export default Item
