import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import XHR from "i18next-xhr-backend";
import i18nextrc from './config/.i18nextrc';
import I18NextHttpBackend from 'i18next-http-backend';

import App from "./App";
import { store } from "./store/store";

async function initI18next() {
  i18n.on('languageChanged', lng => {
    if (lng.length > 2) {
      i18n.changeLanguage(lng.substring(0, 2));
      return;
    }
    // moment.locale(lng);
    document.cookie = `uilang=${lng}`;
    document.getElementsByTagName("html")[0].lang = lng;
    //NEED_TO_FIX
    i18n.language != "ru" && i18n.changeLanguage("ru")
  })

  await i18n
    .use(I18NextHttpBackend)
    .use(XHR)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init(i18nextrc) // temporary solution, need to remove any in future
}

initI18next()

ReactDOM.createRoot(document.querySelector("#root"))
  .render(<Provider store={store}>
    <App />
  </Provider>);
