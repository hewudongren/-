
import inherit from 'jw_common/inherit'
import AbstractModel from 'jw_models/abstract'

let TreeModel = inherit(AbstractModel,{
 initialization() {

   this.url = `${Jw.gateway}/platform/public/data/treeOrgs`
   this.type = 'get'
 },

 dataFormat(data) {

  return data.result
 },

 execute(param) {

  return this.exec()
 }
})

export default new TreeModel()