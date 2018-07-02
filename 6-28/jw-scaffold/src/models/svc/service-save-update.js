/**
 * /svc/service/:id/edit 表格数据保存 更新
 * 
 * @author gill
 * @date 2018-05-02
 */

import inherit from 'jw_common/inherit'
import AbstractModel from 'jw_models/abstract'
import staticData from 'jw_common/data'

const CREATION_URL = `${Jw.gateway}/platform/svc/service/create`
const UPDATE_URL = `${Jw.gateway}/platform/svc/service/update`

let ServiceSaveUpdateModel = inherit(AbstractModel, {
  initialization() {

    this.url = ''
    this.type = 'post'
  },

  dataFormat(data) {

    return data.result
  },

  execute(isCreation,data) {

    this.setParam(data)
    this.url = isCreation? CREATION_URL:UPDATE_URL
    return this.exec()
  }
})

export default new ServiceSaveUpdateModel()
