
let path = require('path');
let utils = require('./utils')

let gateway = 'http://gateway.jwis.cn'
let login = 'http://login.jwis.cn'
let appkey = 'a203980c6e'

module.exports = {
  port: 80,

  domain: 'test.jwis.cn',

  assetsRoot: path.resolve(__dirname, '../dist'),
  assetsSubDirectory: 'static',

  productionSourceMap: false,
  productionGzip: false,
  productionGzipExtensions: ['js', 'css'],
  bundleAnalyzerReport: false,

  metaConf: {
    login,
    appkey,
    gateway,
  
    i18n: `${gateway}/i18n`,
    dict: `${gateway}/dict`,
    account: `${gateway}/account`
  }
};
