import { Draggable } from "@hello-pangea/dnd"
import ItemDialog from "./item-dialog"
import { useState } from "react"
import { Pencil, Trash } from "lucide-react"
import { Column, Item } from "../types/board-data"
import useBoardStore from "../../store/board-store"

interface Props {
  item: Item
  index: number
  currentColumn: Column
}

function Item({ item, index, currentColumn }: Props) {
  const [isEditOpen, setIsEditOpen] = useState(false)
  const { boardState, setBoardState } = useBoardStore()

  const handleClose = () => setIsEditOpen(false)

  const handleRemoveItem = () => {
    const newItems = currentColumn.items.filter((e) => e.id !== item.id)

    const resultCols = boardState.columns.map((col: Column) => {
      if (col.id === currentColumn.id) {
        return {
          ...col,
          items: newItems,
        }
      }

      return col
    })

    setBoardState({ ...boardState, columns: resultCols })
  }

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
                  onClick={handleRemoveItem}
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
        currentColumn={currentColumn}
      />
    </>
  )
}

export default Item
