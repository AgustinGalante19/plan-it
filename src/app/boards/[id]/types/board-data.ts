import { Board, Column, Item } from "@prisma/client"

export interface ColWithItems extends Column {
  items: Item[]
}

export default interface BoardData extends Board {
  columns: ColWithItems[]
}
