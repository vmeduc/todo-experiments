import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import { fetchTodosThuncAction } from "./actions";
import reducer from "./reducer";

const initialState = { todos: [] };

const store = createStore(
  reducer,
  initialState,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

store.dispatch(fetchTodosThuncAction());

export default store;
