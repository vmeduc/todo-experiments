export const ADD_TODO = "todos/add";
export const REMOVE_TODO = "todos/remove";
export const TOGGLE_TODO = "todos/toggle";

export const INIT_STATE = "app/init";

export function initStateAction(initialState) {
  return {
    type: INIT_STATE,
    payload: initialState,
  };
}

export function fetchTodosThuncAction() {
  return async function (dispatch) {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos?_limit=5"
    );
    const data = await response.json();
    const todos = data.map((item) => ({
      id: item.id,
      text: item.title,
      checked: item.completed,
    }));

    dispatch(initStateAction({ todos: todos }));
  };
}

export function addTodoAction(todo) {
  return {
    type: ADD_TODO,
    payload: todo,
  };
}

export function removeTodoAction(todoId) {
  return {
    type: REMOVE_TODO,
    payload: todoId,
  };
}

export function toggleTodoAction(todoId) {
  return {
    type: TOGGLE_TODO,
    payload: todoId,
  };
}
