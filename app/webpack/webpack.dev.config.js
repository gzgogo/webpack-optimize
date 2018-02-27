const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PATHS = require('./config/PATHS');
const getLoader = require('./utils/getLoader');
const common = require('./webpack.base.config');

const TARGET = process.env.npm_lifecycle_event;

if (TARGET === 'start' || !TARGET || TARGET == 'dev') {
  const dev = {
    devServer: {
      contentBase: PATHS.dist,
      historyApiFallback: true,
      hot: true,
      inline: true,
      //progress: true,
      stats: 'errors-only',
      host: process.env.HOST,
      port: process.env.PORT || 8080
    },

    devtool: 'source-map',

    watchOptions: {
      // 开发时不监听node_modules目录下的文件
      ignored: /node_modules/
    },

    module: {
      rules: [{
          test: /\.css$/,
          use: getLoader('css', true)
        }, {
          test: /\.styl$/,
          use: getLoader('stylus', true)
        }, {
          test: /\.less$/,
          use: getLoader('less', true)
        }
      ]
    },

    plugins: [
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"development"',
        'process.env.rap': true,
        'process.env.debug': true
      }),
    ]
  };

  if (process.env.npm_config_auth) {
    console.log('auth start');
    module.exports = merge(common, dev, {
      entry: {
        auth: path.resolve(PATHS.static, 'js/auth.jsx')
      },
      plugins: [
        new HtmlWebpackPlugin({
          favicon: path.resolve(PATHS.static, 'img/favicon.ico'),
          filename: 'index.html',
          chunks: ['auth'],
          title: '真服 v1.6.8',
          template: path.resolve(PATHS.static, 'templates/index.html')
        })
      ]
    });
  } else if (process.env.npm_config_inspector) {
    console.log('inspector start');
    module.exports = merge(common, dev, {
      entry: {
        inspector: path.resolve(PATHS.static, 'js/inspector.jsx')
      },
      plugins: [
        new HtmlWebpackPlugin({
          favicon: path.resolve(PATHS.static, 'img/favicon.ico'),
          filename: 'index.html',
          chunks: ['inspector'],
          title: '真服 v1.6.8',
          template: path.resolve(PATHS.static, 'templates/index.html')
        })
      ]
    });
  } else if (process.env.npm_config_typer) {
    console.log('typer start');
    module.exports = merge(common, dev, {
      entry: {
        typer: path.resolve(PATHS.static, 'js/typer.jsx'),
      },
      plugins: [
        new HtmlWebpackPlugin({
          favicon: path.resolve(PATHS.static, 'img/favicon.ico'),
          filename: 'index.html',
          chunks: ['typer'],
          title: '真服 v1.6.8',
          template: path.resolve(PATHS.static, 'templates/index.html')
        })
      ]
    });
  }else if (process.env.npm_config_accountant) {
    console.log('accountant start');
    module.exports = merge(common, dev, {
      entry: {
        accountant: path.resolve(PATHS.static, 'js/accountant.jsx'),
      },
      plugins: [
        new HtmlWebpackPlugin({
          favicon: path.resolve(PATHS.static, 'img/favicon.ico'),
          filename: 'index.html',
          chunks: ['accountant'],
          title: '真服 v1.6.8',
          template: path.resolve(PATHS.static, 'templates/index.html')
        })
      ]
    });
  }else if (process.env.npm_config_salesman) {
    console.log('salesman start');
    module.exports = merge(common, dev, {
      entry: {
        salesman: path.resolve(PATHS.static, 'js/salesman.jsx'),
      },
      plugins: [
        new HtmlWebpackPlugin({
          favicon: path.resolve(PATHS.static, 'img/favicon.ico'),
          filename: 'index.html',
          chunks: ['salesman'],
          title: '真服 v1.6.8',
          template: path.resolve(PATHS.static, 'templates/index.html')
        })
      ]
    });
  } else {
    module.exports = merge(common, dev, {
      entry: {
        cm: path.resolve(PATHS.static, 'js/cm.jsx'),
      },
      plugins: [
        new HtmlWebpackPlugin({
          favicon: path.resolve(PATHS.static, 'img/favicon.ico'),
          filename: 'index.html',
          chunks: ['cm'],
          title: '真服 v1.6.8',
          template: path.resolve(PATHS.static, 'templates/index.html')
        })
      ]
    });
  }
}