/**
 * 架手架左侧导航栏
 * 
 * @author gill
 * @date 2018-06-14
 */

let utils = require('../utils')

module.exports = function(routerSource) {
  let targetSystem = utils.getCommandParams('target')

  return routerSource.replace('__{targetSystem}__',targetSystem)
}