const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const PATHS = require('./config/PATHS');
const getLoader = require('./utils/getLoader');
const common = require('./webpack.base.config');

const TARGET = process.env.npm_lifecycle_event;

if (TARGET === 'build') {
  module.exports = merge(common, {
    entry: {
      cm: path.resolve(PATHS.static, 'js/cm.jsx'),
      auth: path.resolve(PATHS.static, 'js/auth.jsx'),
      inspector: path.resolve(PATHS.static, 'js/inspector.jsx'),
      typer: path.resolve(PATHS.static, 'js/typer.jsx'),
      accountant:path.resolve(PATHS.static, 'js/accountant.jsx'),
      salesman:path.resolve(PATHS.static, 'js/salesman.jsx')
    },

    stats: {
      children: false
    },

    module: {
      // 从chunk中剥离css样式生成独立css文件
      rules: [
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: getLoader('css')
          })
        },
        {
          test: /\.styl$/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: getLoader('stylus')
          })
        }, {
          test: /\.less$/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: getLoader('less')
          })
        }
      ]
    },

    plugins: [
      // 会报内存溢出错误，暂时关闭
      // new webpack.optimize.ModuleConcatenationPlugin(),

      // 清除dist目录，但保留dll及其manifest文件
      new CleanWebpackPlugin(['dist'], {
        root: path.resolve(__dirname, '../'),
        exclude:  ['dll'], // 该选项目前不支持通配符
        verbose: true
      }),

      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"',
        'process.env.rap': true,
        'process.env.debug': false
      }),

      new ExtractTextPlugin('css/[name].[contenthash:8].css'),

      new UglifyJsPlugin({
        test: /\.js($|\?)/i,
        parallel: true,
        cache: true,
        uglifyOptions: {
          output: {
            // 最紧凑的输出
            beautify: false,
            // 删除所有注释
            comments: false,
            // maxLineLen: 120000
          },
          compress: {
            // 删除没有用到的代码时不输出警告
            warnings: false,
            // 删除所有console语句，可以兼容ie浏览器
            drop_console: true,
            // 内嵌已定义但是只用到一次的变量
            collapse_vars: true,
            // 提取出出现多次但是没有定义成变量去引用的静态值
            reduce_vars: true
          }
        }
      }),

      new HtmlWebpackPlugin({
        favicon: path.resolve(PATHS.static, 'img/favicon.ico'),
        filename: 'index.html',
        //chunks: ['cm'],
        excludeChunks: ['cm','auth','inspector','typer','accountant','salesman','login'],
        title: '真服 v1.6.8',
        template: path.resolve(PATHS.static, 'templates/index.html')
      }),
      new HtmlWebpackPlugin({
        favicon: path.resolve(PATHS.static, 'img/favicon.ico'),
        filename: 'cm.html',
        chunks: ['cm'],
        title: '真服 v1.6.8',
        template: path.resolve(PATHS.static, 'templates/index.html')
      }),
      new HtmlWebpackPlugin({
        favicon: path.resolve(PATHS.static, 'img/favicon.ico'),
        filename: 'auth.html',
        chunks: ['auth'],
        title: '真服 v1.6.8',
        template: path.resolve(PATHS.static, 'templates/index.html')
      }),
      new HtmlWebpackPlugin({
        favicon: path.resolve(PATHS.static, 'img/favicon.ico'),
        filename: 'inspector.html',
        chunks: ['inspector'],
        title: '真服 v1.6.8',
        template: path.resolve(PATHS.static, 'templates/index.html')
      }),
      new HtmlWebpackPlugin({
        favicon: path.resolve(PATHS.static, 'img/favicon.ico'),
        filename: 'typer.html',
        chunks: ['typer'],
        title: '真服 v1.6.8',
        template: path.resolve(PATHS.static, 'templates/index.html')
      }),
      new HtmlWebpackPlugin({
        favicon: path.resolve(PATHS.static, 'img/favicon.ico'),
        filename: 'accountant.html',
        chunks: ['accountant'],
        title: '真服 v1.6.8',
        template: path.resolve(PATHS.static, 'templates/index.html')
      }),
      new HtmlWebpackPlugin({
        favicon: path.resolve(PATHS.static, 'img/favicon.ico'),
        filename: 'salesman.html',
        chunks: ['salesman'],
        title: '真服 v1.6.8',
        template: path.resolve(PATHS.static, 'templates/index.html')
      }),
    ]
  })
}