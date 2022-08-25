export function createStore(initialState) {
  const state = initialState;
  const subscribers = [];

  const getters = {
    todos: () => state.todos,
    todo: (id) => state.todos.id === id,
  };

  const actions = {
    addTodo: (todoText) => {
      const todo = {
        id: Date.now(),
        text: todoText,
        completed: false,
      };
      state.todos = state.todos.concat(todo);
      return todo;
    },
    removeTodo: (todoId) => {
      state.todos = state.todos.filter((todo) => todo.id != todoId);
    },
  };

  const subscribeDecorator = (callback) => {
    return function () {
      callback.apply(undefined, arguments);
      subscribers.forEach((callback) => callback(getters));
    };
  };

  Object.keys(actions).forEach((key) => {
    actions[key] = subscribeDecorator(actions[key]);
  });

  const store = {
    getters: getters,
    actions: actions,
    subscribe: (callback) => {
      subscribers.push(callback);
    },
  };

  return store;
}
