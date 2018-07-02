
import inherit from 'jw_common/inherit'
import AbstractModel from 'jw_models/abstract'
import staticData from 'jw_common/data'

let UserValidModel = inherit(AbstractModel,{
 initialization() {

   this.url = `${Jw.gateway}/platform/sys/user/toggleValidity`
   this.type = 'post'
 },

 dataFormat(data) {

  return data.result
 },

 execute(param) {

  this.setParam(param)
  return this.exec()
 }
})

export default new UserValidModel()