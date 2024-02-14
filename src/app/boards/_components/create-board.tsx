"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import Button from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import createBoard from "../actions/create-board"

function CreateBoard() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        variant='rounded'
        title='Create board'
        onClick={() => setIsOpen(true)}
        type='button'
      >
        <Plus size={15} />
      </Button>
      <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Create Board</DialogTitle>
            <DialogDescription>
              Create the board introducing the title and a brief description of
              it.
            </DialogDescription>
          </DialogHeader>
          <form
            className='grid gap-4 py-4'
            action={async (formData) => {
              createBoard(formData).finally(() => setIsOpen(false))
            }}
          >
            <div>
              <Label htmlFor='name' className='text-right'>
                Title
              </Label>
              <Input id='title' name='title' className='col-span-3' />
            </div>
            <div>
              <Label htmlFor='description' className='text-right'>
                Description
              </Label>
              <Input
                id='description'
                name='description'
                className='col-span-3'
              />
            </div>
            <div className='flex justify-end'>
              <Button type='submit'>Create</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default CreateBoard
