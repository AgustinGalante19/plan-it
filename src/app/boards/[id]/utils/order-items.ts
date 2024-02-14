import { Item } from "@prisma/client"

export default function orderItems(
  items: Item[],
  id: string,
  newPosition: number
) {
  const source = items.find((item) => item.id === id)
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
