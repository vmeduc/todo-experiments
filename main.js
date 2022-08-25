import store from "./store";
import {
  addTodoAction,
  removeTodoAction,
  toggleTodoAction,
} from "./store/actions";

const form = document.querySelector("form");
const text = document.querySelector("input[type=text]");
const list = document.querySelector("ul");

window.store = store;

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const newTodo = { id: Date.now(), text: text.value, checked: false };
  store.dispatch(addTodoAction(newTodo));
  text.value = "";
});

function renderTodoList() {
  while (list.lastChild) {
    list.lastChild.remove();
  }
  store.getState().todos.forEach((todo) => {
    list.append(createTodoElement(todo));
  });
}

function createTodoElement(newTodo) {
  const todoElement = document.createElement("li");
  todoElement.id = newTodo.id;

  const todoCheckbox = document.createElement("input");
  todoCheckbox.type = "checkbox";
  todoCheckbox.checked = newTodo.checked;
  todoCheckbox.addEventListener("click", () => {
    store.dispatch(toggleTodoAction(newTodo.id));
  });

  const todoDeleteButton = document.createElement("button");
  todoDeleteButton.append("Delete");
  todoDeleteButton.addEventListener("click", () => {
    store.dispatch(removeTodoAction(newTodo.id));
  });

  todoElement.append(todoCheckbox, " ", newTodo.text, " ", todoDeleteButton);

  return todoElement;
}

store.subscribe(() => {
  renderTodoList();
});

renderTodoList();
