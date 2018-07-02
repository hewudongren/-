/**
 * /app/role/index 角色
 * 
 * @author gill
 * @date 2018-05-02
 */

import inherit from 'jw_common/inherit'
import AbstractModel from 'jw_models/abstract'

let SwitchValidModel = inherit(AbstractModel, {
  initialization() {

    this.url = `${Jw.gateway}/platform/app/role/toggleValidity`
    this.type = 'post'
  },

  dataFormat(data) {

    return data.result
  },

  execute(row) {

    this.setParam(row)
    return this.exec()
  }
})

export default new SwitchValidModel()
