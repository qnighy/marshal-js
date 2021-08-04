const origConfig = require("./babel.config.js");

module.exports = {
  ...origConfig,
  presets: [
    [
      "@babel/preset-env",
      {
        modules: false,
      },
    ],
    ...origConfig.presets.slice(1),
  ]
};
