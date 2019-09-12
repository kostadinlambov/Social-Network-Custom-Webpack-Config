const path = require("path");
const common = require("./webpack.common");
const merge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const cssnano = require("cssnano");
const autoprefixer = require("autoprefixer");
const glob = require("glob");
const PurgecssPlugin = require("purgecss-webpack-plugin");
// const Critters = require("critters-webpack-plugin");

const paths = {
  appSrc: path.join(__dirname, "src"),
  indexHtml: path.join(__dirname, "public", "index.html")
};

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map",
  output: {
    filename: "scripts/[name].[contentHash].bundle.js",
    path: path.resolve(__dirname, "build")
  },
  optimization: {
    minimizer: [
      new OptimizeCssAssetsPlugin({
        // sourceMap: true
      }),
      new TerserPlugin({
        test: /\.(js|jsx)$/,
        sourceMap: true,
        cache: true,
        parallel: true,
        terserOptions: {
          output: {
            comments: false
          }
        }
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "public", "index.html"),
        minify: {
          removeAttributeQuotes: true,
          collapseWhitespace: true,
          removeComments: true
        }
      }),
      // new Critters({
      //   preload: 'swap',
      // })
    ]
    // splitChunks: {
    //   cacheGroups: {
    //     styles: {
    //       name: 'styles',
    //       test: /\.css$/,
    //       chunks: 'all',
    //       enforce: true,
    //     },
    //   },
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
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
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              sourceMap: true,
              minimize: true,
              plugins:  [
                autoprefixer(),
                cssnano({ preset: "default" }),
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new PurgecssPlugin({
      paths: [
        paths.indexHtml,
        ...glob.sync(`${paths.appSrc}/**/**/*`, { nodir: true })
      ]
    }),
    new MiniCssExtractPlugin({
      filename: "styles/[name].[contentHash].css"
    }),
  ]
});
