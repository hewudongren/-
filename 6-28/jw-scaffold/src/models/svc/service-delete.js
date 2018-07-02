/**
 * /svc/service/index 表格数据删除
 * 
 * @author gill
 * @date 2018-05-02
 */

import inherit from 'jw_common/inherit'
import AbstractModel from 'jw_models/abstract'
import staticData from 'jw_common/data'

let ServiceDeleteModel = inherit(AbstractModel, {
  initialization() {

    this.url = `${Jw.gateway}/platform/svc/service/destroy`
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

export default new ServiceDeleteModel()
