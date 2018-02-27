module.exports = function (type, dev) {
  return process.platform == 'darwin'
    ? ['happypack/loader?id=' + type + (dev ? '-dev' : '')]
    : (dev
        ? 'style!css' + (type !== 'css' ? '!' + type : '')
        : 'css-loader' + (type !== 'css' ? '!' + type + '-loader' : '')
    );
}