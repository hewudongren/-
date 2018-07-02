/**
 * /app/role/index 角色
 * 
 * @author gill
 * @date 2018-05-02
 */

import inherit from 'jw_common/inherit'
import AbstractModel from 'jw_models/abstract'

let RoleDeleteModel = inherit(AbstractModel, {
  initialization() {

    this.url = `${Jw.gateway}/platform/app/role/destroy`
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

export default new RoleDeleteModel()
