
import inherit from 'jw_common/inherit'
import AbstractModel from 'jw_models/abstract'

let DeleteOrgModel = inherit(AbstractModel,{
 initialization() {

   this.url = `${Jw.gateway}/platform/sys/org/destroy`
   this.type = 'post'
 },

 dataFormat(data) {

  return data.result
 },

 execute(id) {

  this.setParam({ id })
  return this.exec()
 }
})

export default new DeleteOrgModel()