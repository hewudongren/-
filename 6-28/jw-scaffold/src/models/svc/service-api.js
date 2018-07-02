/**
 * /svc/service/edit/:id/detail 表格数据接口
 * 
 * @author gill
 * @date 2018-05-02
 */

import inherit from 'jw_common/inherit'
import AbstractModel from 'jw_models/abstract'
import staticData from 'jw_common/data'

const PAGE_SIZE = staticData.tablePageSize

let ServiceApisModel = inherit(AbstractModel, {
  initialization() {

    this.url = `${Jw.gateway}/platform/public/data/service-apis`
    this.type = 'get'
    this.query = {
      serviceId: ''
    }
  },

  dataFormat(data) {

    return data.result
  },

  execute(id) {

    this.query.serviceId = id
    return this.exec()
  }
})

export default new ServiceApisModel()
