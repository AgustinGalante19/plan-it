import { Item } from "../types/drag-list"

export default function orderItems(
  items: Item[],
  id: number,
  newPosition: number
) {
  const source = items.find((tarea) => tarea.id === id)
  if (!source || newPosition < 0 || newPosition >= items.length) {
    return items
  }

  const excludedItems = items.filter((item) => item.id !== id)
  const newItemsOrder = [
    ...excludedItems.slice(0, newPosition),
    source,
    ...excludedItems.slice(newPosition),
  ]

  return newItemsOrder
}
