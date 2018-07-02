/**
 * app/permission/edit/:id 表格数据接口
 * 
 * @author gill
 * @date 2018-05-02
 */

import inherit from 'jw_common/inherit'
import AbstractModel from 'jw_models/abstract'
import staticData from 'jw_common/data'

let PermissionActivitModel = inherit(AbstractModel, {
  initialization() {

    this.url = `${Jw.gateway}/platform/public/data/permission-activities`
    this.type = 'get'

    this.query = {
      id: null
    }
  },

  dataFormat(data) {

    return data.result
  },

  setQueryId(id) {

    this.query.id = id
  },
  
  getQueryId() {

    return this.query.id
  },

  execute() {

    return this.exec()
  }
})

export default new PermissionActivitModel()