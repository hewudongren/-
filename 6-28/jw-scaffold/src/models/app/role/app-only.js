/**
 * /app/role/index 角色
 * 
 * @author gill
 * @date 2018-05-02
 */

import inherit from 'jw_common/inherit'
import AbstractModel from 'jw_models/abstract'

let AppOnlyModel = inherit(AbstractModel, {
  initialization() {

    this.url = `${Jw.gateway}/platform/public/data/app-only`
    this.type = 'get'
  },

  dataFormat(data) {

    return data.result
  },

  execute() {

    return this.exec()
  }
})

export default new AppOnlyModel()
