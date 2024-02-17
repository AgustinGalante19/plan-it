"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Pencil, Trash } from "lucide-react"

interface Props {
  handleClickEdit: () => void
  handleClickRemove: () => void
}

function ColOptions({ handleClickEdit, handleClickRemove }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='h-8 w-8 flex items-center justify-center rounded-md hover:bg-neutral-900 hover:bg-opacity-25 transition-colors'>
          <MoreHorizontal />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          className='flex items-center justify-between gap-1'
          onClick={handleClickEdit}
        >
          Edit <Pencil size={16} />
        </DropdownMenuItem>
        <DropdownMenuItem
          className='flex items-center justify-between gap-1'
          onClick={handleClickRemove}
        >
          Remove <Trash size={16} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ColOptions
