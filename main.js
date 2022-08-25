import { createStore } from "./store";

const form = document.querySelector("form");
const text = document.querySelector("input[type=text]");
const list = document.querySelector("ul");

const initialState = { todos: [] };
const store = createStore(initialState);

window.store = store;

form.addEventListener("submit", (event) => {
  event.preventDefault();
  store.actions.addTodo(text.value);
  text.value = "";
});

function renderTodoList(storeGetters) {
  clean();
  storeGetters
    .todos()
    .forEach((todoItem) => list.append(createTodoItem(todoItem)));

  function clean() {
    let child = list.firstChild;
    while (child) {
      list.removeChild(child);
      child = list.firstChild;
    }
  }
}

function createTodoItem(todoItem) {
  const todoElement = document.createElement("li");
  todoElement.id = todoItem.id;
  const todoCheckbox = document.createElement("input");
  todoCheckbox.type = "checkbox";
  todoCheckbox.checked = false;
  const todoDeleteButton = document.createElement("button");
  todoDeleteButton.append("Delete");
  todoDeleteButton.addEventListener("click", (event) => {
    store.actions.removeTodo(todoItem.id);
  });
  todoElement.append(todoCheckbox, " ", todoItem.text, " ", todoDeleteButton);
  return todoElement;
}

store.subscribe(renderTodoList);
