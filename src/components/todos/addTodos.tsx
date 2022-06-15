import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { addTodo, deleteTodo, deleteAllTodo } from "../../store/todoSlice";

export default function AddTodos(): JSX.Element {
  const dispatch = useDispatch();
  const [text, setText] = React.useState("");
  const todosList = useSelector((state: RootState) => state.todos.allTodos);

  function handleChange(e: { target: HTMLInputElement }) {
    setText(e.target.value);
  }

  function handleSubmit(e: any) {
    e.preventDefault();

    if (!text.trim()) {
      return;
    }
    console.log("todosList----", todosList);
    const newTodo = { id: todosList.length + 1, activity: text };
    dispatch(addTodo(newTodo));
    setText("");
  }

  const handleDelete = (id: number) => {
    dispatch(deleteTodo(id));
  };
  const handleDeleteAll = () => {
    dispatch(deleteAllTodo());
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div style={{ textAlign: "center" }}>
          <div>
            <h4>Todo List</h4>
          </div>
          <hr />
          <div style={{ marginTop: 20 }}>
            <span>
              <input value={text} onChange={handleChange} />
            </span>
            <span style={{ marginLeft: 10 }}>
              <button type="submit">Add Todo</button>
            </span>
          </div>
        </div>
      </form>
      <div style={{ marginLeft: 20 }}>
        <div>
          <h5>Todo List</h5>
        </div>
        {todosList && todosList.length > 0 && (
          <div style={{ color: "#1769aa", marginLeft: 10, cursor: "pointer" }} onClick={handleDeleteAll}>
            Delete All
          </div>
        )}
        {todosList.map((todo,index) => {
          return (
            <div key={`todo_${index}`}>
              <span style={{ width: "600px" }}> {todo.activity}</span>
              <span
                style={{ color: "#1769aa", marginLeft: 10, cursor: "pointer" }}
                onClick={() => handleDelete(todo.id)}
              >
                Delete
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
