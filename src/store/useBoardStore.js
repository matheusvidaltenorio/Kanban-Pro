import { create } from "zustand"

const savedColumns = JSON.parse(localStorage.getItem("kanban-columns"))

export const useBoardStore = create((set) => ({
  columns: savedColumns || {
    todo: [],
    doing: [],
    done: [],
  },

  addCard: (columnId, text) =>
    set((state) => {
      const updated = {
        ...state.columns,
        [columnId]: [
          ...state.columns[columnId],
          {
            id: crypto.randomUUID(),
            text,
          },
        ],
      }

      localStorage.setItem("kanban-columns", JSON.stringify(updated))

      return { columns: updated }
    }),

    deleteCard: (columnId, cardId) =>
  set((state) => {
    const updated = {
      ...state.columns,
      [columnId]: state.columns[columnId].filter(
        (card) => card.id !== cardId
      ),
    }

    localStorage.setItem("kanban-columns", JSON.stringify(updated))

    return { columns: updated }
  }),

  moveCard: (fromColumn, toColumn, cardId) =>
    set((state) => {
      const card = state.columns[fromColumn].find((c) => c.id === cardId)

      const updated = {
        ...state.columns,
        [fromColumn]: state.columns[fromColumn].filter(
          (c) => c.id !== cardId
        ),
        [toColumn]: [...state.columns[toColumn], card],
      }

      localStorage.setItem("kanban-columns", JSON.stringify(updated))

      return { columns: updated }
    }),

    reorderColumn: (columnId, newItems) =>
    set((state) => {
    const updated = {
      ...state.columns,
      [columnId]: newItems,
    }

    localStorage.setItem("kanban-columns", JSON.stringify(updated))

    return { columns: updated }
  }),
}))