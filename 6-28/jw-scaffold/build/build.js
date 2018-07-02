let systemConfig = {}
let webpackConfig = {}
let envment = 'prodution'

let _ = require('lodash')
let fs = require('fs')
let rm = require('rimraf')
let path = require('path')
let utils = require('./utils')
let webpack = require('webpack')
let fsExtra = require('fs-extra')
let merge = require('webpack-merge')

let commonConfig = require('./common-config')
let targetSystem = utils.getCommandParams('target')

if(_.isEmpty(targetSystem)) {
  return console.log("The parameter target is empty")
}

webpackConfig = require('./webpack.prod.conf')
if (utils.getCommandParams('env') == 'dev') {
  webpackConfig = require('./webpack.dev.conf')
  envment = 'development'
}

utils.copyTargetProject(targetSystem, true)

try {
  systemConfig = require(utils.getTargetProjectPath(`${targetSystem}/package-config.js`))
} catch (e) {
  systemConfig = {
    package: {}
  }
}

webpackConfig = merge(webpackConfig, systemConfig.package || {}, {
  resolve: {
    alias: {
      [targetSystem]: utils.getTargetProjectPath(targetSystem)
    }
  }
})

rm(path.join(commonConfig.assetsRoot), err => {
  if (err) throw err;

  webpack(webpackConfig, function (err, stats) {
    if (err) throw err;
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n');

    console.log('  Build complete.\n');
  });
});