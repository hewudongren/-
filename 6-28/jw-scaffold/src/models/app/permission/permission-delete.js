/**
 * app/permission/edit/:id 表格数据接口 /app/permission/destroy
 * 
 * @author gill
 * @date 2018-05-02
 */

import inherit from 'jw_common/inherit'
import AbstractModel from 'jw_models/abstract'
import staticData from 'jw_common/data'

let PermissionDeleteModel = inherit(AbstractModel, {
  initialization() {

    this.url = `${Jw.gateway}/platform/app/permission/destroy`
    this.type = 'post'
  },

  dataFormat(data) {

    return data.result
  },

  execute(id) {

    this.setParam({ id })
    return this.exec()
  }
})

export default new PermissionDeleteModel()
