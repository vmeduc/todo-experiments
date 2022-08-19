import { createStore } from "./store";

const form = document.querySelector("form");
const text = document.querySelector("input[type=text]");
const list = document.querySelector("ul");

const initialState = { todos: [] };
const {
  getters: stateGetters,
  actions: stateActions,
  subscribe,
} = createStore(initialState);

window.store = { stateGetters, stateActions };

form.addEventListener("submit", (event) => {
  event.preventDefault();
  stateActions.addTodo(text.value);
  text.value = "";
});

function renderTodoList(todoList) {
  clean();
  todoList.forEach((todoItem) => list.append(createTodoItem(todoItem)));

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
    stateActions.removeTodo(todoItem.id);
  });
  todoElement.append(todoCheckbox, " ", todoItem.text, " ", todoDeleteButton);
  return todoElement;
}

subscribe(renderTodoList, stateGetters.todos);
