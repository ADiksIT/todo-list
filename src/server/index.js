import express from 'express';
import React from 'react';
import {renderToString} from 'react-dom/server';
import {StaticRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {createStore} from "redux";
import {rootReducer} from "../redux/reducers/rootReducer";
import Loadable from 'react-loadable';
import {getBundles} from 'react-loadable-ssr-addon';
import App from '../App';
import {I18nextProvider} from "react-i18next";
import manifest from '../../dist/react-loadable-ssr-addon.json';
import i18next from "i18next";
import common_en from "../translations/en/common.json";
import common_ru from "../translations/ru/common.json";
import {templateHTML} from "./html.template";


const PORT = process.env.PORT || 5000;
const server = express();

server.use(express.static('dist'));

server.use('/', (req, res) => {

  const context = {};
  const modules = new Set();

  const store = createStore(rootReducer);

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

  const html = renderToString(
      <Loadable.Capture report={moduleName => modules.add(moduleName)}>
        <StaticRouter location={req.url} context={context}>
          <Provider store={store}>
            <I18nextProvider i18n={i18next}>
              <App/>
            </I18nextProvider>
          </Provider>
        </StaticRouter>
      </Loadable.Capture>
  );

  const preloadedState = store.getState();

  const bundles = getBundles(manifest, [
    ...manifest.entrypoints,
    ...Array.from(modules)
  ])

  const scripts = bundles.js || [];
  const styles = bundles.css || [];

  res.send(templateHTML(styles, scripts, html, preloadedState));
});

Loadable.preloadAll()
    .then(() => {
      server.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
      });
    })
    .catch(err => console.log('ERROR', err))
