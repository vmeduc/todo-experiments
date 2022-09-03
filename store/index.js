import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import appReducer, { setLoading } from "./appSlice";
import todosReducer, { addTodo } from "./todosSlice";
import myLogger from "./myLogger";

const store = configureStore({
  reducer: {
    todos: todosReducer,
    app: appReducer,
  },
  middleware: [myLogger, thunk],
});

export default store;

export function fetchTodosThunkAction() {
  return async function (dispatch) {
    dispatch(setLoading(true));
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos?_limit=5"
    );
    const responseJson = await response.json();

    while (responseJson.length) {
      const item = responseJson.shift();
      await new Promise((resolve) => setTimeout(resolve, 500));
      dispatch(addTodo(item.title));
    }
    dispatch(setLoading(false));
  };
}
