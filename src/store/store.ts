import {configureStore} from '@reduxjs/toolkit'
import todoReducer from "./todoSlice";
export const store = configureStore({ reducer: { todos: todoReducer } });
store.subscribe(()=>{
   localStorage.setItem('todos', JSON.stringify(store.getState()))
  })
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof store.dispatch>;