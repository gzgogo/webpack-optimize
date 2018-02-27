var path = require("path");
var webpack = require("webpack");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const PATHS = require('./config/PATHS');

module.exports = {
  entry: {
    "vendors": [
      "antd",
      "classnames",
      "deep-equal",
      // "deep-extend",
      "moment",
      "superagent",
      // "highcharts",
      "history",
      "prop-types",
      "react",
      "react-dom",
      "react-router",
      // "react-click-outside",
      // "react-copy-to-clipboard",
      "mobx"
    ]
  },
  output: {
    path: path.join(PATHS.dist, "dll"),
    filename: "[name].[hash:8].dll.js",
    library: "[name]_[hash]"
  },
  //devtool: "source-map",
  resolve: {
    extensions: [".js", ".jsx"],
    // alias: {
    //   'react': path.resolve(__dirname, '../node_modules/react/dist/react.min.js'),
    //   'react-dom': path.resolve(__dirname, '../node_modules/react-dom/dist/react-dom.js'),
    // }
  },
  // 构建dll时结合alias一点卵用都没有
  // module: {
  //   noParse: [/react\.min\.js$/, /react-dom\.js$/]
  // },
  plugins: [
    // https://doc.webpack-china.org/plugins/ignore-plugin/
    // moment 2.18 会将所有本地化内容和核心功能一起打包,
    // 你可使用 IgnorePlugin 在打包时忽略本地化内容
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
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
    new webpack.DefinePlugin({
      // 指定环境为生产环境，去掉基础库中针对开发者的代码
      'process.env.NODE_ENV': '"production"'
    }),
    new webpack.DllPlugin({
      path: path.join(PATHS.dist, "dll", "[name].manifest.json"),
      name: "[name]_[hash]"
    })
  ]
};
