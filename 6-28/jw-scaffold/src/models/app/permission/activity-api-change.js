/**
 * app/permission/edit/:id app/permission/change-activity-api apiCheck
 * 
 * @author gill
 * @date 2018-05-02
 */

import inherit from 'jw_common/inherit'
import AbstractModel from 'jw_models/abstract'

let ActivityApiChangeModel = inherit(AbstractModel, {
  initialization() {

    this.url = `${Jw.gateway}/platform/app/permission/change-activity-api`
    this.param = {
      activityId: '',
      action: '',
      apiId: ''
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

export default new ActivityApiChangeModel()
