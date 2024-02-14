import { Skeleton } from "@/components/ui/skeleton"

function Loading() {
  const BoardLoader = () => {
    return <Skeleton className='h-32 w-96 rounded-md' />
  }

  return (
    <div className='container mx-auto p-12'>
      <div className='flex items-center gap-2'>
        <h2 className='text-4xl font-bold'>My Boards</h2>
      </div>
      <div className='flex flex-wrap gap-4 py-8'>
        {Array.from({ length: 4 }).map((_, index) => (
          <BoardLoader key={index} />
        ))}
      </div>
    </div>
  )
}

export default Loading
