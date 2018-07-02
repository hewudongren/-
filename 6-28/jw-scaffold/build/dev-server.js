/**
 * 启动本地开发环境
 * 
 * @author Gill
 * @date 2018/4/28
 */

let opn = require('opn')
let _ = require('lodash')
let path = require('path')
let utils = require('./utils')
let express = require('express')
let webpack = require('webpack')
let merge = require('webpack-merge')
let commonConfig = require('./common-config')
let targetSystem = utils.getCommandParams('target')

let CopyWebpackPlugin = require('copy-webpack-plugin')
let ExtraWatchWebpackPlugin = require('extra-watch-webpack-plugin')
let FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

let webpackConfig = {}
let systemConfig = {}  

if(_.isEmpty(targetSystem)) {
  return console.log("The parameter target is empty")
}

utils.copyTargetProject(targetSystem, true)
webpackConfig = require('./webpack.dev.conf')
systemConfig = require(utils.getTargetProjectPath(`${targetSystem}/package-config.js`))

webpackConfig
  .entry
  .app = ['webpack-hot-middleware/client?reload=true&quiet=true'].concat(webpackConfig.entry.app)

_.extend(commonConfig,{
  port: systemConfig.port || 80,
  domain: systemConfig.domain || 'test.jwis.cn'
})

webpackConfig = merge(webpackConfig, systemConfig.package || {}, {
  resolve: {
    alias: {
      [targetSystem]: utils.getTargetProjectPath(targetSystem)
    }
  },
  plugins: [
    new ExtraWatchWebpackPlugin({
      dirs: [ utils.getSourceProjectPath(targetSystem) ]
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsPlugin()
  ]
})

let app = express()
let compiler = webpack(webpackConfig)

//运行Server
let devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true,
  watchOptions: {
    ignored: /node_modules/,
    poll: 1000
  }
})

//实现代码热部署
let hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false,
  heartbeat: 2000
})

compiler.plugin('compile',(params,callback)=>{

  console.log('copy target system .... ')
  utils.copyTargetProject(targetSystem)
  callback && callback()
})

compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({
      action: 'reload'
    })
    cb()
  })
})

app.use(devMiddleware)
app.use(hotMiddleware)

console.log('> Starting dev server...')
app.listen(commonConfig.port, () => {
  var uri = `http://${commonConfig.domain}:` + commonConfig.port
  console.log('> Listening at ' + uri + '\n')
  opn(uri)
})