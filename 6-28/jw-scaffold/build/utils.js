let path = require('path')
let _ = require('lodash')
let fsExtra = require('fs-extra')
let config = require('./common-config')
let commandParams = {}

module.exports = {

  /**
   * 获取Node命令行参数
   */
  getCommandParams(attr) {
    let args = process.argv.splice(2)
    let parameters = []

    for(let i=0,len=args.length;i<len;i++) {
      if(args[i] && args[i].indexOf('=')>-1) {
        parameters = args[i].split('=')

        commandParams[parameters[0]] = parameters[1]
      }
    }

    return _.isEmpty(attr)? commandParams : commandParams[attr]
  },

  /**
   * 获取绝对路径 
   */
  assetsPath(_path) {

    return path.posix.join(config.assetsSubDirectory, _path)
  },

  resolve(dir) {
    return path.resolve(__dirname, `../${dir}`)
  },

  copyTargetProject(projectName, isRemove) {
    let targetProjectPath = this.getTargetProjectPath(projectName)

    if(!_.isEmpty(projectName)) {
      isRemove && fsExtra.removeSync(targetProjectPath)
      fsExtra.copySync(this.getSourceProjectPath(projectName), targetProjectPath)
    }
  },

  getTargetProjectPath(projectName) {

    return this.resolve(`apps/${projectName}`)
  },

  getSourceProjectPath(projectName) {

    return this.resolve(`../${projectName}`)
  }
}