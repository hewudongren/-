
import inherit from 'jw_common/inherit'
import AbstractModel from 'jw_models/abstract'
import staticData from 'jw_common/data'

let SysRoleModel = inherit(AbstractModel,{
 initialization() {

   this.url = `${Jw.gateway}/platform/public/data/app-with-roles`
   this.type = 'get'
 },

 dataFormat(data) {

  return data.result
 },

 execute(pageIndex,name) {

  return this.exec()
 }
})

export default new SysRoleModel()