
const form = document.querySelector("form");
const text = document.querySelector("input[type=text]");
const list = document.querySelector("ul");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  addTodo(text.value);
  text.value = "";
});

function addTodo(todoText) {
  const todoElement = document.createElement("li");
  todoElement.id = Date.now();

  const todoCheckbox = document.createElement("input");
  todoCheckbox.type = "checkbox";
  todoCheckbox.checked = false;

  const todoDeleteButton = document.createElement("button");
  todoDeleteButton.append("Delete");
  todoDeleteButton.addEventListener("click", (event) => {
    event.target.parentElement.remove();
  });

  todoElement.append(todoCheckbox, " ", todoText, " ", todoDeleteButton);
  list.append(todoElement);
}
