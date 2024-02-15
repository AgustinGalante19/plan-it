export interface Column {
  id: string
  title: string
  createdAt: Date
  items: Item[]
}

export interface Item {
  id: string
  title: string
  columnId: string
  description?: string | null
}

export default interface BoardData {
  id: string
  userId: string
  title: string
  description: string | null
  createdAt: Date
  columns: any | Column[]
}
