const webpack = require('webpack');
const path = require('path');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const happyPackPlugins = require('./config/happypack.plugins');
const PATHS = require('./config/PATHS');
const getLoader = require('./utils/getLoader');

const TARGET = process.env.npm_lifecycle_event;
process.env.BABEL_ENV = TARGET;

/*
  Common config
 */
var config = {
  entry: {
    login:path.resolve(PATHS.static, 'js/login.jsx'),
    //report: path.resolve(PATHS.static, 'js/report.jsx'),
  },
  output: {
    path: PATHS.dist,
    filename: 'js/[name].[hash:8].js',
    chunkFilename: 'js/[name].[chunkhash:8].js',
    publicPath: '/'
  },
  module: {
    rules: [
      // // 最好使用git hook在commit的时候做检查
      // {
      //   test: /\.jsx?$/,
      //   loader: 'eslint-loader',
      //   enforce: "pre",
      //   options: {
      //     // fix: true,
      //     parser: 'babel-eslint'
      //   },
      //   // include: createWhiteList(whitelist)
      // },
      {
        test: /\.jsx?$/,
        use: getLoader('jsx'),
        include: [path.resolve(PATHS.static, 'js')]
      },
      // {
      //   test: /\.css$/,
      //   use: ['style-loader', 'css-loader'],
      // },
      // {
      //   test: /\.less$/,
      //   use: [
      //     'style-loader',
      //     'css-loader',
      //     {
      //       loader: 'postcss-loader',
      //       options: {
      //         plugins: function() {
      //           return [
      //             require('autoprefixer')
      //           ];
      //         }
      //       }
      //     },
      //     'less-loader'
      //   ]
      // },
      {
        test: /\.(gif|jpg|png|svg|woff|eot|ttf|webp)\??.*$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: path.normalize('./img/[name].[hash:8].[ext]')
          }
        }]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    // 使用绝对路径指明第三方模块存放的位置，以减少搜索步骤：只在该目录下寻找，不再去上级目录寻找
    modules: [path.resolve(__dirname, '../node_modules')],
    // 与babel的exclude冲突，暂时先去掉
    // // 针对npm中的第三方模块优先采用jsnext:main中指向的es6模块化语法的文件，以使tree shaking生效
    // mainFields: ['jsnext:main', 'browser', 'main'],
    alias: {
      css: path.resolve(PATHS.static, 'css'),
      js: path.resolve(PATHS.static, 'js'),
      components: path.resolve(PATHS.static, 'js/components'),
      utils: path.resolve(PATHS.static, 'js/utils'),
      pages: path.resolve(PATHS.static, 'js/pages'),
      img: path.resolve(PATHS.static, 'img')
    }
  },
  plugins: [
    new webpack.DllReferencePlugin({
      manifest: require('../dist/dll/vendors.manifest.json')
    }),
    new AddAssetHtmlPlugin({
      filepath: path.resolve(PATHS.dist,'dll/*.dll.js'),
      // publicPath: 'dll',
      includeSourcemap: false,
      hash: true
    }),
    new HtmlWebpackPlugin({
      favicon: path.resolve(PATHS.static, 'img/favicon.ico'),
      filename: 'login.html',
      chunks: ['login'],
      title: '真服登录',
      template: path.resolve(PATHS.static, 'templates/login.html')
    }),
    // new HtmlWebpackPlugin({
    //     favicon: path.resolve(__dirname, 'static/img/favicon.ico'),
    //     filename: 'report.html',
    //     chunks: ['report'],
    //     title: '真服 v1.6.8',
    //     template: path.resolve(__dirname, 'static/templates/report.html')
    // })
  ]
};

if (process.platform == 'darwin') {
  config.plugins = config.plugins.concat(happyPackPlugins);
}

module.exports = config;