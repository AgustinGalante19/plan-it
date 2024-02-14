export interface List {
  columns: Column[]
  columnOrder: number[]
}

export interface Column {
  id: number
  colName: string
  tasks: Item[]
}

export interface Item {
  id: number
  title: string
  content: string
}
