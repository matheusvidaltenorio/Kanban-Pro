import { useState } from "react"
import { useBoardStore } from "../store/useBoardStore"
import { useDroppable } from "@dnd-kit/core"
import Card from "./Card"
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"

export default function Column({ id, title }) {
  const { columns, addCard } = useBoardStore()
  const [text, setText] = useState("")
  const { setNodeRef } = useDroppable({ id })

  return (
    <div ref={setNodeRef}
      className={`column ${id}`}>
      <h2>
      {title} ({columns[id].length})
      </h2>

      <SortableContext
        items={columns[id].map((c) => c.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="cards">
          {columns[id].map((card) => (
            <Card key={card.id} card={card} columnId={id} />
          ))}
        </div>
      </SortableContext>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Nova tarefa"
      />

      <button
        onClick={() => {
          if (!text.trim()) return
          addCard(id, text)
          setText("")
        }}
      >
        Adicionar
      </button>
    </div>
  )
}