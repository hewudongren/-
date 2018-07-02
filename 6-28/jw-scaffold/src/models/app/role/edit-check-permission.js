/**
 * /app/role/edit/:id 角色
 * 
 * @author gill
 * @date 2018-05-02
 */

import inherit from 'jw_common/inherit'
import AbstractModel from 'jw_models/abstract'

let CheckPermissionModel = inherit(AbstractModel, {
  initialization() {

    this.url = `${Jw.gateway}/platform/app/role/check-permission`
    this.param = {
      roleId: '', 
      permissionId: '', 
      isChecked: false
    }
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

export default new CheckPermissionModel()
