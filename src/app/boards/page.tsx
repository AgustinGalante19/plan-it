"use client"

import Button from "@/components/ui/button"
import { ButtonTooltip } from "@/components/ui/tooltip"
import { Plus } from "lucide-react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import BoardItem from "./_components/board-item"
const userBordas = [
  {
    id: 1,
    title: "my first board",
    description: "this is a description of my first board",
  },
  {
    id: 2,
    title: "My second board",
    description: "",
  },
]

function Boards() {
  const { push } = useRouter()

  return (
    <motion.div
      className='container mx-auto p-12'
      initial={{ translateX: 200 }}
      animate={{ translateX: 0 }}
    >
      <div className='flex items-center gap-2'>
        <h2 className='text-4xl font-bold'>My Boards</h2>
        <ButtonTooltip label='Create Board'>
          <Button variant='rounded' title='Create board'>
            <Plus size={15} />
          </Button>
        </ButtonTooltip>
      </div>
      <div className='flex flex-wrap gap-4 py-8'>
        {userBordas.map(({ title, description, id }) => (
          <BoardItem title={title} description={description} id={id} key={id} />
        ))}
      </div>
    </motion.div>
  )
}

export default Boards

{
  /* <motion.button
  key={id}
  className='bg-primary text-white w-96 h-32 p-4 rounded-md flex flex-col transition-colors relative overflow-hidden'
  onClick={() => push(`boards/${id}`)}
>
  <h5 className='text-lg font-semibold'>{title}</h5>
  <p>{description}</p>
</motion.button> */
}
