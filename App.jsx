import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo, toggleTodo } from "./store/todosSlice";
import { fetchTodosThunkAction } from "./store";

export default function App() {
  const [text, setText] = useState("");

  const todos = useSelector((state) => state.todos);
  const loading = useSelector((state) => state.app.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodosThunkAction());
  }, []);

  return (
    <>
      <header>
        <h2>TODO</h2>
      </header>
      <main>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(addTodo(text));
            setText("");
          }}
        >
          <label>Write your todo</label>
          <input
            type="text"
            autoFocus
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </form>

        {loading ? (
          <h3>Loading...</h3>
        ) : (
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>
                <input
                  type="checkbox"
                  checked={todo.checked}
                  onChange={() => {
                    dispatch(toggleTodo(todo.id));
                  }}
                />
                {todo.text}
                <button
                  onClick={() => {
                    dispatch(deleteTodo(todo.id));
                  }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </main>
      <footer>\ (•◡•) /</footer>
    </>
  );
}
