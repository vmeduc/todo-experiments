import { combineReducers } from "redux";

const todosReducer = function (state = [], action) {
  switch (action.type) {
    case "todos/add": {
      const todoText = action.payload;
      return [...state, { id: Date.now(), text: todoText, checked: false }];
    }
    case "todos/delete": {
      const todoId = action.payload;
      return state.filter((todo) => todo.id != todoId);
    }
    case "todos/toggle": {
      const todoId = action.payload;
      return state.map((todo) => {
        if (todo.id == todoId) todo.checked = !todo.checked;
        return todo;
      });
    }
    default: {
      return state;
    }
  }
};

const appReducer = function (state = { loading: false }, action) {
  switch (action.type) {
    case "app/setLoading": {
      const loadingState = action.payload;
      return {
        loading: loadingState,
      };
    }
    default:
      return state;
  }
};

const rootReducer = combineReducers({ todos: todosReducer, app: appReducer });

export default rootReducer;
