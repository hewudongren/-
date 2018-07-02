/**
 * /app/role/index 角色
 * 
 * @author gill
 * @date 2018-05-02
 */

import inherit from 'jw_common/inherit'
import AbstractModel from 'jw_models/abstract'

let RoleReadModel = inherit(AbstractModel, {
  initialization() {

    this.url = `${Jw.gateway}/platform/app/role/read`
    this.type = 'get'
    this.query = {
      appId: ''
    }
  },

  dataFormat(data) {

    return data.result
  },

  execute(appId) {

    this.query.appId = appId
    return this.exec()
  }
})

export default new RoleReadModel()
