/**
 * app/permission/edit/:id 删除表格行
 * 
 * @author gill
 * @date 2018-05-02
 */

import inherit from 'jw_common/inherit'
import AbstractModel from 'jw_models/abstract'

let ActivityDeleteModel = inherit(AbstractModel, {
  initialization() {

    this.url = `${Jw.gateway}/platform/app/permission/destroy-activity`
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

export default new ActivityDeleteModel()
