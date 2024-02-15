import { create } from "zustand"
import BoardData from "../[id]/types/board-data"

interface BoardState {
  boardState: BoardData
  setBoardState: (newState: BoardData) => void
}

const INITIAL_BOARD_STATE = {
  columns: [],
  createdAt: new Date(),
  description: "",
  id: "",
  title: "",
  userId: "",
}

const useBoardStore = create<BoardState>()((set) => ({
  boardState: INITIAL_BOARD_STATE,
  setBoardState: (newState) => set(() => ({ boardState: newState })),
}))

export default useBoardStore
