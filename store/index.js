import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import appReducer, { setLoading } from "./appSlice";
import todosReducer, { addTodo } from "./todosSlice";
import myLogger from "./myLogger";

import todosApi from "./todosApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

const store = configureStore({
  reducer: {
    [todosApi.reducerPath]: todosApi.reducer,
    todos: todosReducer,
    app: appReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(todosApi.middleware)
      .concat(myLogger)
      .concat(thunk),
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
      await new Promise((resolve) => setTimeout(resolve, 120));
      dispatch(addTodo(item.title));
    }
    dispatch(setLoading(false));
  };
}
