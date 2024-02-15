import { ArrowLeft } from "lucide-react"
import Board from "./_components/board"
import getBoard from "./actions/get-board"
import Link from "next/link"

async function Page({ params }: { params: { id: string } }) {
  const boardData = await getBoard(params.id)

  return (
    <div>
      <div className='bg-primary bg-opacity-10'>
        <div className=' flex flex-col p-4'>
          <div className='flex'>
            <Link
              className='flex items-center gap-1 hover:bg-secondary dark:hover:bg-opacity-10 py-1 px-2 rounded-md transition-colors'
              href='/boards'
            >
              <ArrowLeft size={18} />
              <h2 className='text-xl font-semibold'>{boardData.title}</h2>
            </Link>
          </div>
          <div className='px-4'>
            <p className='text-sm'>{boardData.description}</p>
          </div>
          <div className='px-4'>
            <span className='text-xs text-neutral-600 dark:text-neutral-400'>
              {boardData.createdAt.toDateString()}
            </span>
          </div>
        </div>
      </div>
      <div className='flex overflow-x-auto h-[650px] gap-4 p-8 mt-4'>
        <Board initialBoardData={boardData} />
      </div>
    </div>
  )
}

export default Page
