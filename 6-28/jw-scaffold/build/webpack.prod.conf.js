let _ = require('lodash');
let path = require('path');
let utils = require('./utils');
let webpack = require('webpack');
let config = require('./common-config');
let merge = require('webpack-merge');
let baseWebpackConfig = require('./webpack.base.conf')
let CopyWebpackPlugin = require('copy-webpack-plugin')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let ExtractTextPlugin = require('extract-text-webpack-plugin')
let OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

let CreateRootFile = require('./plugins/create-root-file.js')
let UselessFileDel = require('./plugins/useless-file-delete.js')

let targetSystem = utils.getCommandParams('target')
let projectConfig = require(utils.getTargetProjectPath(`${targetSystem}/package-config.js`))

projectConfig.metaConf = _.extend(
  projectConfig.metaConf || {},
  config.metaConf
)

let webpackConfig = merge(baseWebpackConfig, {
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      uglifyOptions: {
        ie8: false,
        sourceMap: false,
        warnings: true,
        compress: {
          pure_funcs: [ 'console.log','conosole.info','console.error' ]
        }
      }
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('app.[contenthash].css'),
      allChunks: true
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.ejs',
      inject: false,
      meta: projectConfig.metaConf || {},
      title: projectConfig.title || '',
      randomId: Math.random()*10000000,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
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
      chunks:['highchart','app','lodash']
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    }),
    new CreateRootFile({
      entry: ['manifest.js'],
      src: ['src/jw.seed.js'],
      output: 'jw.root.js'
    }),
    new UselessFileDel({
      paths: ['dist/manifest.js','dist/lodash.js']
    })
  ]
})

if (config.productionGzip) {
  let CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '/gz/[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.bundleAnalyzerReport) {
  let BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
