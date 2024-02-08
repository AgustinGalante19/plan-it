export interface List {
  columns: Column[]
  columnOrder: number[]
}

export interface Column {
  id: number
  colName: string
  taskIds: number[]
  tasks: Task[]
}

export interface Task {
  id: number
  title: string
  content: string
}
