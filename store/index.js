import { createStore } from "redux";
import { initStateAction } from "./actions";
import reducer from "./reducer";

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const initialState = { todos: [{ id: 1, text: "Learn Redux", checked: true }] };

store.dispatch(initStateAction(initialState));

export default store;
