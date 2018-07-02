
let path = require('path')
let utils = require('./utils')
let ExtractTextPlugin = require('extract-text-webpack-plugin')

function resolve(dir) {
  return utils.resolve(dir)
}

module.exports = {
  entry: {
    app: [ './src/main.js' ],
    highchart: [ 'jw_components/high-chart.js' ],
    lodash: [ 'lodash' , 'dayjs']
  },
  output: {
    publicPath: '/',
    path: resolve('dist'),
    chunkFilename: 'controllers/[name].[hash].js',
    filename: '[name].js'  //'[name].[hash].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'jw_assets': resolve('src/assets'),
      'jw_components': resolve('src/components'),
      'jw_common': resolve('src/common'),
      'jw_models': resolve('src/models'),
      'jw_services': resolve('src/services'),
      'jw_stores': resolve('src/stores'),
      'jw_modules': resolve('src/modules'),
      'jw_config': resolve('src/jw.config.js'),
      'lodash': resolve('src/vendors/lodash.custom.js')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          extractCSS: true
        }
      }, {
        test: /route\.js$/,
        loader: path.resolve('build/loaders/router-loader.js')
      }, {
        test: /jw\.config\.js$/,
        loader: path.resolve('build/loaders/scaffold-loader.js')
      }, {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: [resolve('src'),resolve('apps')]
      }, {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 2500,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      }, {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 5000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      }, {
        test: /\.(woff2?|eot|ttf|svg|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 5000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }, {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "vue-style-loader",
          use: ['css-loader']
        })
      }, {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: "vue-style-loader",
          use: [ 'less-loader' ]
        })
      }
    ]
  }
}
