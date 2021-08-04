module.exports = {
  presets: [
    "@babel/preset-env",
    "@babel/preset-typescript",
  ],
  plugins: [
    [
      "@babel/plugin-transform-runtime",
      {
        corejs: 3,
        version: "^7.14.9",
      },
    ],
  ],
};
