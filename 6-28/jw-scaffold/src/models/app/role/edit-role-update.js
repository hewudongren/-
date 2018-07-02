/**
 * /app/role/edit/:id role编辑
 * 
 * @author gill
 * @date 2018-05-02
 */

import inherit from 'jw_common/inherit'
import AbstractModel from 'jw_models/abstract'

const UPDATE_URL = `${Jw.gateway}/platform/app/role/update`
const CREATE_URL = `${Jw.gateway}/platform/app/role/create`

let RoleUpdateModel = inherit(AbstractModel, {
  initialization() {

    this.type = 'post'
  },

  dataFormat(data) {

    return data.result
  },

  execute(param,isAddition) {

    this.url = isAddition? CREATE_URL:UPDATE_URL
    this.setParam(param)
    return this.exec()
  }
})

export default new RoleUpdateModel()