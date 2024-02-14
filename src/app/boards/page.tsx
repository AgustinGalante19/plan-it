import BoardItem from "./_components/board-item"
import CreateBoard from "./_components/create-board"
import getUserBoards from "./actions/get-user-boards"
async function Boards() {
  const boards = await getUserBoards()
  return (
    <div className='container mx-auto p-12'>
      <div className='flex items-center gap-2'>
        <h2 className='text-4xl font-bold'>My Boards</h2>
        <CreateBoard />
      </div>
      <div className='flex flex-wrap gap-4 py-8'>
        {boards.map(({ title, id, description }) => (
          <BoardItem title={title} description={description} id={id} key={id} />
        ))}
      </div>
    </div>
  )
}

export default Boards
