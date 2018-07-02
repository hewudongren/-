/**
 * 文件拼接插件
 * 
 */

let fs = require('fs')
let _ = require('lodash')
let path = require('path')
let utils = require('../utils.js')
var UglifyJS = require("uglify-js")

 function CreateRootFile(options) {
  this.name = "contact-file"
  this.options = options;
 }

 CreateRootFile.prototype.apply = function(compiler) {
  let ops = this.options

  compiler.plugin('emit',function(compilation, callback) {
    let fileContent = []
    let {
      entry,
      output,
      src
    } = ops
    let assetsMap = compilation.assets

    _.each(entry,(fileName)=>{
     
      if(assetsMap[fileName]) {        
        fileContent.push(assetsMap[fileName].source())
      }
    })

    _.each(src,(file)=>{

      file = utils.resolve(file)
      file = fs.readFileSync(file,'utf8')

      if(typeof file === 'string' && file.length) {
        fileContent.push(UglifyJS.minify(file).code)
      }
    })

    fileContent = fileContent.join('')
    
    assetsMap[output] = {
      source() {

        return fileContent
      },

      size() {

        return Buffer.byteLength(fileContent, 'utf8');
      }
    }

    callback()
  })
 }

 module.exports = CreateRootFile