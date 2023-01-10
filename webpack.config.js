const path = require("path");
const webpack = require('webpack');
const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env = {}) => ({
  mode: env.prod ? "production" : "development",
  entry: [
    path.resolve(__dirname, "./src/main.ts")
  ].filter(Boolean),
  output: {
    path: path.resolve(__dirname, "./dist"),
    publicPath: "./",
    clean: true
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.vue', '.json'],
    alias: {
      vue: "vue/dist/vue.esm-bundler.js",
      '@': path.resolve('src/components')
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      },
      {
        test: /\.vue$/,
        use: "vue-loader"
      },
      {
        test: /\.png$/,
        use: {
          loader: "url-loader",
          options: { limit: 8192 }
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
          "postcss-loader"
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: false,
      __VUE_PROD_DEVTOOLS__: false,
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      title: 'Play your music'
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css"
    })
  ],
  stats: {
    errorDetails: true,
  },
  devtool: "source-map"
});
