import { DndContext } from "@dnd-kit/core"
import { arrayMove } from "@dnd-kit/sortable"
import Column from "./Column"
import { useBoardStore } from "../store/useBoardStore"

export default function Board() {
  const columns = useBoardStore((state) => state.columns)
  const moveCard = useBoardStore((state) => state.moveCard)
  const reorderColumn = useBoardStore((state) => state.reorderColumn)
  const deleteCard = useBoardStore((state) => state.deleteCard)

  function handleDragEnd(event) {
    const { active, over } = event
    if (!over) return

    const fromColumn = active.data.current.columnId
    const toColumn =
      over.data?.current?.columnId || over.id

    if (!fromColumn || !toColumn) return

    const items = columns[fromColumn]

    if (fromColumn === toColumn) {
      const oldIndex = items.findIndex(
        (item) => item.id === active.id
      )

      const newIndex = items.findIndex(
        (item) => item.id === over.id
      )

      if (oldIndex === -1 || newIndex === -1) return

      const newOrder = arrayMove(items, oldIndex, newIndex)
      reorderColumn(fromColumn, newOrder)
    } else {
      moveCard(fromColumn, toColumn, active.id)
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="board">
        <Column id="todo" title="To Do" />
        <Column id="doing" title="Doing" />
        <Column id="done" title="Done" />
      </div>
    </DndContext>
  )
}