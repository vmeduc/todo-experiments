module.exports = {
  entry: "./main.js",
  output: {
    filename: "bundle.js",
    path: __dirname,
  },

  devServer: {
    port: 3000,
    static: {
      directory: __dirname,
    },
  },
};
