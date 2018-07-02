/**
 * app/permission/edit/:id 表格数据接口以选择的api
 * 
 * @author gill
 * @date 2018-05-02
 */

import inherit from 'jw_common/inherit'
import AbstractModel from 'jw_models/abstract'

let PermissionActivityModel = inherit(AbstractModel, {
  initialization() {

    this.url = `${Jw.gateway}/platform/public/data/activity-api-ids`
    this.type = 'get'

    this.query = {
      id: null
    }
  },

  dataFormat(data) {

    return data.result
  },

  execute(id) {

    this.query.id = id
    return this.exec()
  }
})

export default new PermissionActivityModel()
