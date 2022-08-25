import { ADD_TODO, INIT_STATE, REMOVE_TODO, TOGGLE_TODO } from "./actions";

const reducer = function (state, action) {
  switch (action.type) {
    case INIT_STATE: {
      const initialState = action.payload;
      return initialState;
    }
    case ADD_TODO: {
      const newTodo = action.payload;
      return { todos: state.todos.concat(newTodo) };
    }
    case REMOVE_TODO: {
      const todoId = action.payload;
      return { todos: state.todos.filter((todo) => todo.id != todoId) };
    }
    case TOGGLE_TODO: {
      const todoId = action.payload;
      return {
        todos: state.todos.map((todo) => {
          if (todo.id == todoId) todo.checked = !todo.checked;
          return todo;
        }),
      };
    }
    default:
      return state;
  }
};

export default reducer;
