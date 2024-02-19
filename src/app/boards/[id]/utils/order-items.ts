import { Column, Item } from "../types/board-data"

export default function orderItems(
  items: Column[],
  id: string,
  newPosition: number
): Column[]

export default function orderItems(
  items: Item[],
  id: string,
  newPosition: number
): Item[]

export default function orderItems(
  items: Column[] | Item[],
  id: string,
  newPosition: number
): Column[] | Item[] {
  const source = items.find((item) => (item as any).id === id)
  if (!source || newPosition < 0 || newPosition >= items.length) {
    return items as Column[] | Item[]
  }

  const excludedItems = items.filter((item) => (item as any).id !== id)
  const newItemsOrder = [
    ...excludedItems.slice(0, newPosition),
    source,
    ...excludedItems.slice(newPosition),
  ]

  return newItemsOrder as Column[] | Item[]
}
