/**
 * /svc/service/index 表格数据接口
 * 
 * @author gill
 * @date 2018-05-02
 */

import inherit from 'jw_common/inherit'
import AbstractModel from 'jw_models/abstract'
import staticData from 'jw_common/data'

const PAGE_SIZE = staticData.tablePageSize

let ServiceModel = inherit(AbstractModel, {
  initialization() {

    this.url = `${Jw.gateway}/platform/public/data/model/svc/service`
    this.type = 'get'
  },

  dataFormat(data) {

    return data.result
  },

  execute() {

    return this.exec()
  }
})

export default new ServiceModel()
