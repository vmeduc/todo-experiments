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

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: { presets: ["@babel/preset-react"] },
        },
      },
    ],
  },
};
