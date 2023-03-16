import { createSlice } from "@reduxjs/toolkit";
import uniqid from 'uniqid';

const todoSlice = createSlice({
  name: 'todoList',
  initialState: {
    todoList: [],
  },
  reducers: {
    addTodo(state, action) {
      state.todoList.push({
        id: uniqid(),
        text: action.payload.text,
        completed: false,
      });
    },
    removeTodo(state, action) {
      state.todoList = state.todoList.filter(todo => todo.id !== action.payload.id);
    },
    toggleTodoComplete(state, action) {
      const toggledTodo = state.todoList.find(todo => todo.id === action.payload.id);
      toggledTodo.completed = !toggledTodo.completed;
    },
  }
});

export const { addTodo, removeTodo, toggleTodoComplete } = todoSlice.actions;
export default todoSlice.reducer;