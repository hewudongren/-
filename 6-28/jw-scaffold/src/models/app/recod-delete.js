/**
 * app/app/index 表格数据行删除
 * 
 * @author gill
 * @date 2018-05-02
 */

import inherit from 'jw_common/inherit'
import AbstractModel from 'jw_models/abstract'

let TableRowDeleteModel = inherit(AbstractModel, {
  initialization() {

    this.url = `${Jw.gateway}/platform/app/app/destroy`
    this.type = 'post'
  },

  execute() {

    return (
      this
        .exec()
        .then((data)=>{

          return Promise.resolve()
        })
    )
  }
})

export default new TableRowDeleteModel()
