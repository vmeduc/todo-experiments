import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, { payload: todoText }) => {
      state.push({ id: Date.now(), text: todoText, checked: false });
    },
    deleteTodo: (state, { payload: todoId }) => {
      const todo = state.find((todo) => todo.id == todoId);
      const todoIndex = state.indexOf(todo);
      state.splice(todoIndex, 1);
    },
    toggleTodo: (state, { payload: todoId }) => {
      const todo = state.find((todo) => todo.id == todoId);
      todo.checked = !todo.checked;
    },
  },
});

export const { addTodo, deleteTodo, toggleTodo } = todosSlice.actions;

export default todosSlice.reducer;
