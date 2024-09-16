module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "dotenv-import",
        {
          path: ".env",
          allowEmptyValues: true,
        },
      ],
    ],
  };
};
