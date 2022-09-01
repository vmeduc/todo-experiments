import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./rootReducer";
import myLogger from "./myLogger";

const store = createStore(rootReducer, applyMiddleware(myLogger, thunk));

export default store;

export function fetchTodosThunkAction() {
  return async function (dispatch) {
    dispatch({ type: "app/setLoading", payload: true });
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos?_limit=5"
    );
    const responseJson = await response.json();

    while (responseJson.length) {
      const item = responseJson.shift();
      await new Promise((resolve) => setTimeout(resolve, 500));
      dispatch({
        type: "todos/add",
        payload: item.title,
      });
    }
    dispatch({ type: "app/setLoading", payload: false });
  };
}
