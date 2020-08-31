import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from "redux";
import {rootReducer} from "./redux/reducers/rootReducer";
import {Provider} from "react-redux";
import App from './App';
import Loadable from 'react-loadable'
import {BrowserRouter} from "react-router-dom";
import {I18nextProvider} from "react-i18next";
import i18next from "i18next";
import common_en from './translations/en/common.json';
import common_ru from './translations/ru/common.json';
import {load, save} from "./utils/storage";

let preloadedState = window.__PRELOADED_STATE__

delete window.__PRELOADED_STATE__

preloadedState = load();

let store;
if (process.env.NODE_ENV === 'development') {
  store = createStore(rootReducer, preloadedState,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
} else {
  store = createStore(rootReducer, preloadedState);
}

store.subscribe(() => save(store.getState()))

i18next.init({
  interpolation: {escapeValue: false},
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

window.onload = () => {
  Loadable.preloadReady().then(() => {
    ReactDOM.hydrate(
        <BrowserRouter>
          <Provider store={store}>
            <I18nextProvider i18n={i18next}>
              <App/>
            </I18nextProvider>
          </Provider>
        </BrowserRouter>,
        document.getElementById('root')
    );
  })
}
