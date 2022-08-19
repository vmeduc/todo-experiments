export function createStore(initialState) {
  const state = initialState;
  const subscribers = [];

  return {
    getters: {
      todos: () => state.todos,
      todo: (id) => state.todos.id === id,
    },
    actions: {
      addTodo(todoText) {
        const todo = {
          id: Date.now(),
          text: todoText,
          completed: false,
        };
        state.todos = state.todos.concat(todo);
        subscribers.forEach(({callback, payload}) => callback(payload()));
        return todo;
      },
      removeTodo(todoId) {
        state.todos = state.todos.filter((todo) => todo.id != todoId);
        subscribers.forEach(({callback, payload}) => callback(payload()));
      },
    },
    subscribe(callback, payload=undefined) {
      subscribers.push({callback, payload});
    },
  };
}
