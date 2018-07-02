/**
 * app/permission/index 表格数据接口
 * 
 * @author gill
 * @date 2018-05-02
 */

import inherit from 'jw_common/inherit'
import AbstractModel from 'jw_models/abstract'
import staticData from 'jw_common/data'

let PermissionAppModel = inherit(AbstractModel, {
  initialization() {

    this.url = `${Jw.gateway}/platform/app/permission/apps`
    this.type = 'get'

    this.query = {
      skip: 0,
      take: staticData.tablePageSize,
      name: ''
    }
  },

  dataFormat(data) {

    return data.result
  },

  execute(pageIndex) {

    if(pageIndex<1) {
      pageIndex = 1
    }
    this.query.skip = (pageIndex-1)*staticData.tablePageSize
    return this.exec()
  }
})

export default new PermissionAppModel()
