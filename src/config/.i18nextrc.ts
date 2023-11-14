let debug = false
switch (process.env.NODE_ENV) {
  case "production":
    break;
  case "development":
    debug = true;
    break;
}

export default {
  debug,

  // backend: {
  //   loadPath: "./locales/{{lng}}.json"
  // },

  react: {
    useSuspense: false,
  },
  load: 'languageOnly',
  lngs: ['ru', 'en'],
  fallbackLng: "ru",

  ns: ["common"],
  defaultNS: "common",

  interpolation: {
    escapeValue: false
  }
}