/**
 * 生成happypack插件配置，尝试减轻构建时间
 * by blue
 * #20170718 by blue 构建文件
 */
var HappyPack = require('happypack');

// 生成五个公共线程池
var happyThreadPool = HappyPack.ThreadPool({size: 5});

/**
 * 构建
 * @param {*} id
 * @param {*} loaders
 */
function createHappyPlugin(id, loaders) {
  return new HappyPack({
    id: id,
    loaders: loaders,
    threadPool: happyThreadPool,
    // make happy more verbose with HAPPY_VERBOSE=1
    verbose: true // process.env.HAPPY_VERBOSE === '1'
  });
}

module.exports = [
  createHappyPlugin('jsx', [{
    loader: 'babel-loader',
    options: {
      cacheDirectory: true
    }
  }]),
  createHappyPlugin('less', [
    "css-loader?minimize",
    // {
    //   loader: 'postcss-loader',
    //   options: {
    //     plugins: function() {
    //       return [
    //         require('autoprefixer')
    //       ];
    //     }
    //   }
    // },
    'less-loader']
  ),
  createHappyPlugin('less-dev', [
    'style-loader',
    'css-loader',
    // {
    //   loader: 'postcss-loader',
    //   options: {
    //     plugins: function() {
    //       return [
    //         require('autoprefixer')
    //       ];
    //     }
    //   }
    // },
    'less-loader']
  ),
  createHappyPlugin('css', ['css-loader']),
  createHappyPlugin('css-dev', ['style-loader', 'css-loader']),
  // createHappyPlugin('stylus', ['css-loader', 'stylus-loader']),
  // createHappyPlugin('stylus-dev', ['style-loader', 'css-loader', 'stylus-loader'])
  // createHappyPlugin('file', ['file-loader']),
  // createHappyPlugin('url', ['url-loader']),
  // createHappyPlugin('style', ['style-loader'])
];
