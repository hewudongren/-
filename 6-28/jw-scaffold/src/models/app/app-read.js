/**
 * app/app/index 表格数据接口
 * 
 * @author gill
 * @date 2018-05-02
 */

import inherit from 'jw_common/inherit'
import AbstractModel from 'jw_models/abstract'
import staticData from 'jw_common/data'

const PAGE_SIZE = staticData.tablePageSize

let AppReaditionModel = inherit(AbstractModel, {
  initialization() {

    this.url = `${Jw.gateway}/platform/app/app/read`
    this.type = 'get'
    this.pageIndex = 1
    this.query = {
      take: PAGE_SIZE,
      skip: 0
    }
  },

  dataFormat(data) {

    return data.result
  },

  setPageIndex(pageIndex) {

    this.pageIndex = pageIndex
  },

  execute(pageIndex) {
    
    this.query.skip = (this.pageIndex-1) * PAGE_SIZE
    
    return this.exec()
  }
})


export default new AppReaditionModel()
