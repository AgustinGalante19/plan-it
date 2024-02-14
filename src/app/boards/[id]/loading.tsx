import { Skeleton } from "@/components/ui/skeleton"

function Loading() {
  return (
    <div>
      <div className='bg-primary bg-opacity-10'>
        <div className=' flex flex-col p-4'>
          <div className='flex mb-2'>
            <Skeleton className='w-44 h-10' />
          </div>
          <Skeleton className='w-60 h-6' />
        </div>
      </div>
      <div className='flex overflow-auto  h-[650px] gap-4 p-8 mt-4'>
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton
            className='p-4  rounded-md w-96 space-y-2 flex-col
            overflow-y-auto'
            key={index}
          />
        ))}
      </div>
    </div>
  )
}

export default Loading
