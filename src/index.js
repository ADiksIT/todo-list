import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { createStore } from "redux";
import { rootReducer } from "./redux/reducers/rootReducer";
import { Provider } from "react-redux";
import App from './App';
import {load, save} from "./utils/storage";

const persistedState = load();

let store;
if (process.env.NODE_ENV === 'development') {
  store = createStore(rootReducer, persistedState,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
} else {
  store = createStore(rootReducer, persistedState);
}

store.subscribe(() => save(store.getState()))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
