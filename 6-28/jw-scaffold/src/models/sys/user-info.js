
import inherit from 'jw_common/inherit'
import AbstractModel from 'jw_models/abstract'

let AdditionUserModel = inherit(AbstractModel,{
 initialization() {

   this.url = `${Jw.gateway}/platform/public/data/model/sys/user`
   this.type = 'get'
 },

 dataFormat(data) {

  data.result.svcRoleIds = []
  return data.result
 },

 execute(param) {

  return this.exec()
 }
})

export default new AdditionUserModel()