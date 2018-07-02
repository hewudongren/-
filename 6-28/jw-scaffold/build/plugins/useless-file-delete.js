/**
 * 文件拼接插件
 * 
 */

let fs = require('fs')
let _ = require('lodash')
let path = require('path')
let rm = require('rimraf')
let utils = require('../utils.js')

 function UselessFileDelete(options) {
  this.name = "useless-file-del"
  this.options = options
 }

 UselessFileDelete.prototype.apply = function(compiler) {
  let ops = this.options

  compiler.plugin('done',function(compilation, callback) {

    _.each(ops.paths,(filePath)=>{

      rm.sync(utils.resolve(filePath))
    })
  })
 }

 module.exports = UselessFileDelete