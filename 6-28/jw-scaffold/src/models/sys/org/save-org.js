
import inherit from 'jw_common/inherit'
import AbstractModel from 'jw_models/abstract'

const URL = Jw.gateway + '/platform/';

let SaveOrgModel = inherit(AbstractModel,{
 initialization() {

   this.type = 'post'
 },

 dataFormat(data) {

  return data.result
 },

 execute(isCreated,entity) {

  this.url = URL + (isCreated? 'sys/org/create' : 'sys/org/update')
  this.setParam(entity)
  return this.exec()
 }
})

export default new SaveOrgModel()