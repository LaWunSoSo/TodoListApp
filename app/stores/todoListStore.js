import { create } from "zustand";

// Zustand store for todos
const useTodoListStore = create((set) => ({
  todos: [
    { id: "1", text: "First Item" },
    { id: "2", text: "Second Item" },
    { id: "3", text: "Third Item" },
  ],
  selectedId: null, // To update item name

  // Add or update a todo
  addOrUpdateTodo: (input) =>
    set((state) => {
      if (state.selectedId) {
        // update case
        return {
          todos: state.todos.map((item) =>
            item.id === state.selectedId ? { ...item, text: input } : item
          ),
          selectedId: null,
        };
      } else {
        // new item add case
        const nextId =
          state.todos.length > 0
            ? (Math.max(...state.todos.map((item) => parseInt(item.id))) + 1).toString()
            : "1";

        return { todos: [...state.todos, { id: nextId, text: input }] };
      }
    }),

  // Remove a todo
  removeTodo: (id) =>
    set((state) => {
      const isSelected = state.selectedId === id;
      const newTodos = state.todos.filter((item) => item.id !== id);
      return {
        todos: newTodos,
        selectedId: isSelected ? null : state.selectedId,
      };
    }),

  // Select a todo for editing
  selectTodo: (item) =>
    set((state) => ({
      selectedId: state.selectedId === item.id ? null : item.id,
    })),
}));

export default useTodoListStore;
