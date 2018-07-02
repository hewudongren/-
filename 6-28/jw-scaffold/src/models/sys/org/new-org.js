
import inherit from 'jw_common/inherit'
import AbstractModel from 'jw_models/abstract'

let NewOrgModel = inherit(AbstractModel,{
 initialization() {

   this.url = `${Jw.gateway}/platform/public/data/model/sys/org`
   this.type = 'get'
 },

 dataFormat(data) {

  return data.result
 },

 execute() {

  return this.exec()
 }
})

export default new NewOrgModel()