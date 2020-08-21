import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { createStore } from "redux";
import { rootReducer } from "./redux/reducers/rootReducer";
import { Provider } from "react-redux";
import App from './App';
import {load, save} from "./utils/storage";
import i18next from "i18next";
import {I18nextProvider} from "react-i18next";
import common_en from './translations/en/common.json';
import common_ru from './translations/ru/common.json';

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

i18next.init({
  interpolation: { escapeValue: false },
  lng: 'en',
  resources: {
    en: {
      common: common_en
    },
    ru: {
      common: common_ru
    },
  },
});

ReactDOM.render(
  <Provider store={store}>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
