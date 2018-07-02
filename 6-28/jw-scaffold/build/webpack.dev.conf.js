let _ = require('lodash')
let path = require('path')
let utils = require('./utils')
let webpack = require('webpack')
let merge = require('webpack-merge')
let config = require('./common-config')
let baseWebpackConfig = require('./webpack.base.conf')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let ExtractTextPlugin = require('extract-text-webpack-plugin')

let CreateRootFile = require('./plugins/create-root-file.js')
let targetSystem = utils.getCommandParams('target')
let projectConfig = require(utils.getTargetProjectPath(`${targetSystem}/package-config.js`))

projectConfig.metaConf = _.extend(
  config.metaConf,
  projectConfig.metaConf || {}
)

module.exports = merge(baseWebpackConfig, {
  devtool: 'none', //'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new ExtractTextPlugin({
      filename: utils.assetsPath('main.[contenthash].css'),
      allChunks: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      children: true,
      minChunks: 3
    }),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {

        return (
          module.resource &&
          !/dayjs/.test(module.resource) &&
          !/highcharts/.test(module.resource) &&
          /node_modules/.test(module.resource)
        )
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'highchart',
      chunks: ['highchart', 'app', 'lodash']
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    }),
    new CreateRootFile({
      entry: ['manifest.js'],
      src: ['src/jw.seed.js'],
      output: 'jw.root.js'
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.ejs',
      inject: false,
      title: projectConfig.title || '',
      randomId: Math.random() * 10000000,
      meta: projectConfig.metaConf || {}
    })
  ]
})