import React, { useState } from "react";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  return (
    <>
      <header>
        <h2>TODO</h2>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <label>Write your todo</label>
          <input
            type="text"
            autoFocus
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
        </form>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <input
                type="checkbox"
                checked={todo.checked}
                onClick={handleToggle.bind(this, todo.id)}
              />
              {todo.text}
              <button onClick={handleDelete.bind(this, todo.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </main>
      <footer>\ (•◡•) /</footer>
    </>
  );

  function handleSubmit(event) {
    event.preventDefault();
    const newTodo = { id: Date.now(), text: text, checked: false };
    setTodos([...todos, newTodo]);
    setText("");
  }

  function handleDelete(todoId) {
    setTodos(todos.filter((todo) => todo.id != todoId));
  }

  function handleToggle(todoId) {
    setTodos(
      todos.map((todo) => {
        if (todo.id == todoId) todo.checked = !todo.checked;
        return todo;
      })
    );
  }
}
