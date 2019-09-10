const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.min.js",
    path: path.resolve(__dirname, "build")
  },
  devServer: {
    contentBase: path.resolve(__dirname, "build"),
    compress: true,
    port: 9000
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        
        }
      },
      {
        test: /\.css$/i,
        use: ['css-loader'],
      },
    ]
  }
};
