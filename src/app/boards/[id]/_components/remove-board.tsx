"use client"

import Button from "@/components/ui/button"
import { ButtonTooltip } from "@/components/ui/tooltip"
import { Trash } from "lucide-react"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import removeBoard from "../actions/remove-board"
import { useRouter } from "next/navigation"

function RemoveBoard({ boardId }: { boardId: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { push } = useRouter()

  const handleRemoveBoard = async () => {
    setIsLoading(true)
    await removeBoard(boardId)
    setIsLoading(false)
    push("/boards")
  }

  return (
    <>
      <ButtonTooltip label='Delete Board'>
        <Button onClick={() => setIsOpen(true)} variant='danger'>
          <Trash size={18} />
        </Button>
      </ButtonTooltip>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant='danger'
              onClick={handleRemoveBoard}
              isLoading={isLoading}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default RemoveBoard
