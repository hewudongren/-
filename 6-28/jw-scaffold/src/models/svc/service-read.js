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

let ServiceReadModel = inherit(AbstractModel, {
  initialization() {

    this.url = `${Jw.gateway}/platform/svc/service/read`
    this.type = 'get'
    this.query = {
      take: PAGE_SIZE,
      skip: 0,
      name: ''
    }
  },

  dataFormat(data) {

    return data.result
  },

  execute(pageIndex,name) {

    this.query.skip = (pageIndex-1) * PAGE_SIZE
    this.query.name = name
    return this.exec()
  }
})

export default new ServiceReadModel()
