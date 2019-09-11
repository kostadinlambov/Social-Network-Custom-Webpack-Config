const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname) + "/src/index.js" ,
  devtool: 'source-map',
  output: {
    filename: "scripts/bundle.min.js",
    path: path.resolve(__dirname, "build"),
    // publicPath:''
  },
  devServer: {
    contentBase: path.resolve(__dirname, "build"),
    compress: true,
    port: 9000
  },
  optimization: {
    minimizer: [
      new OptimizeCssAssetsPlugin(),
      new TerserPlugin(),
      new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        removeComments: true
      }
      })
    ]
  },
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
        test: /\.css$/i,
        use: [
          // {
          //   loader: 'style-loader'
          // },
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              sourceMap: true
            }
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      },
      // {
      //   test: /\.(png|jpe?g|gif)$/i,
      //   use: [
      //     {
      //       loader: 'url-loader',
      //       options: {
      //         limit: 100000,
      //         name: '[name].[ext]'
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[contentHash].[ext]",
              context: path.resolve(__dirname, "src/assets"),
              outputPath: 'images',
              publicPath: '../images',
              useRelativePaths: true,
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "styles/[name].[contentHash].css"
    }),
    new CopyPlugin([
        {
          from: path.resolve(__dirname, 'public', 'favicon.ico'),
          to: path.resolve(__dirname, 'build', 'public')
        },
        {
          from: path.resolve(__dirname, 'public', 'manifest.json'),
          to: path.resolve(__dirname, 'build', 'public')
        }
    ])
  ]
};
