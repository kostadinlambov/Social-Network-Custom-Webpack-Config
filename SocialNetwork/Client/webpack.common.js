const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "src/index.js") ,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      },
      {
        test: /\.html$/,
        use: ["html-loader"]
      },
      {
        test: /\.(svg|png|jpeg|jpg|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[hash].[ext]",
              context: path.resolve(__dirname, "src/assets"),
              outputPath: 'images',
              publicPath: '../images',
              useRelativePaths: true,
            }
          },
        ]
      },
      {
        test: /\.(woff|woff2)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[hash].[ext]",
              context: path.resolve(__dirname, "src/assets"),
              outputPath: 'fonts',
              publicPath: '../fonts',
              useRelativePaths: true,
            }
          },
        ]
      },
    ]
  },
};
