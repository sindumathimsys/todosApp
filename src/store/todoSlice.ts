import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "./types";
// const initialState = { allTodos: [] };
const getTodosFromLocalStorage = () => {
  try {
    const todoState = localStorage.getItem("todos");
    if (todoState) return JSON.parse(todoState);
  } catch (e) {
    console.log(e);
  }
};
const todosStorage = getTodosFromLocalStorage();
const todos =
  todosStorage && todosStorage.todos && todosStorage.todos.allTodos
    ? todosStorage.todos.allTodos
    : [];
type initialStateType = {
  allTodos: Todo[];
};

const todoList: Todo[] = todos;
const initialState: initialStateType = { allTodos: todoList };

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      console.log("state", action.payload);
      state.allTodos.push(action.payload);
      console.log("state", state);
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const newList = state.allTodos
        .filter((todo) => todo.id !== id)
        .map((todo, index) => ({ ...todo, id: index + 1 }));
      state.allTodos = newList;
    },
    deleteAllTodo: (state, action: PayloadAction) => {
      state.allTodos = [];
    },
  },
});

export const { addTodo, deleteTodo, deleteAllTodo } = todoSlice.actions;
export default todoSlice.reducer;
