import { Column } from "./drag-list"

export default interface BoardData {
  boardName: string
  description: string
  columns: Column[]
}
