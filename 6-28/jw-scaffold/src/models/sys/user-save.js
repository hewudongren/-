
import inherit from 'jw_common/inherit'
import AbstractModel from 'jw_models/abstract'

let AdditionUserModel = inherit(AbstractModel,{
 initialization() {

   this.type = 'post'
 },
 
 execute(param,isAddition) {

  this.url = `${Jw.gateway}/platform/` + (isAddition? 'sys/user/create':'sys/user/update')
  this.setParam(param)
  return this.exec()
 }
})

export default new AdditionUserModel()