"use client"

import Button from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import useBoardStore from "../../store/board-store"
import { FormEvent, useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Column, Item } from "../types/board-data"

interface Props {
  isOpen: boolean
  itemData: Item
  handleClose: () => void
  currentColumn: Column
}

function ItemDialog({ isOpen, itemData, handleClose, currentColumn }: Props) {
  const { boardState, setBoardState } = useBoardStore()
  const [formData, setFormData] = useState({
    title: itemData.title,
    description: itemData.description,
  })

  const handleSaveItem = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const newItems = currentColumn.items.map((item: Item) => {
      if (item.id === itemData.id) {
        return {
          ...item,
          title: formData.title,
          description: formData.description,
        }
      }
      return item
    })

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
    handleClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Item</DialogTitle>
          <DialogDescription>
            Here you can edit the item card information.
          </DialogDescription>
        </DialogHeader>
        <div>
          <form>
            <div className='my-2'>
              <Label>Title</Label>
              <Input
                name='title'
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder='title'
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                className='text-white'
                name='description'
                value={formData.description ?? ""}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder='description'
              />
            </div>
            <div className='flex justify-end mt-2'>
              <Button type='button' onClick={handleSaveItem}>
                Save
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ItemDialog
