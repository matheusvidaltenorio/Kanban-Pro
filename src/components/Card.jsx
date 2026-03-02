import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { motion } from "framer-motion"
import { useBoardStore } from "../store/useBoardStore"

export default function Card({ card, columnId }) {
  const deleteCard = useBoardStore((state) => state.deleteCard)

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: card.id,
    data: { columnId },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
  <motion.div
    ref={setNodeRef}
    style={style}
    layout
    className="card"
  >
    <div
      className="card-text"
      {...attributes}
      {...listeners}
    >
      {card.text}
    </div>

    <button
      className="delete-btn"
      onClick={(e) => {
        e.stopPropagation()
        deleteCard(columnId, card.id)
      }}
    >
      ✕
    </button>
  </motion.div>
)
}