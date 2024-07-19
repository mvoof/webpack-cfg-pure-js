// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = process.env.NODE_ENV == 'production';

const stylesHandler = isProduction
  ? MiniCssExtractPlugin.loader
  : 'style-loader';

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  devServer: {
    open: true,
    host: 'localhost',
    hot: true,
    open: true,
    port: 9000
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    })

    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: 'babel-loader'
      },
      {
        test: /\.s[ac]ss$/i,
        use: [stylesHandler, 'css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset'
      }

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
};

module.exports = () => {
  if (isProduction) {
    config.mode = 'production';
    config.optimization.minimize = true;
    config.output.filename = '[name].[contenthash].js';
    config.output.chunkFilename = '[id].[contenthash].js';
    config.plugins.push(
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
        chunkFilename: '[id].[contenthash].css'
      })
    );
  } else {
    config.mode = 'development';
    config.output.filename = '[name].js';
    config.output.chunkFilename = '[id].js';
    config.devtool = 'source-map';
    config.plugins.push(
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css'
      })
    );
  }

  return config;
};
