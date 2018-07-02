
let utils = require('../utils')

module.exports = function(routerSource) {
  let targetSystem = utils.getCommandParams('target')

  return routerSource.replace('__{targetSystem}__',targetSystem)
}