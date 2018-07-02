/**
 * app/app/edit/:id app新增/编辑 数据保存
 * 
 * @author gill
 * @date 2018-05-02
 */

import inherit from 'jw_common/inherit'
import AbstractModel from 'jw_models/abstract'
import staticData from 'jw_common/data'

let CreateUpdateAppModel = inherit(AbstractModel, {
  initialization() {

    this.createUrl = '/platform/app/app/create'
    this.updateUrl = '/platform/app/app/update'
    this.type = 'post'
  },

  execute(isCreate) {

    this.url = Jw.gateway + (isCreate? this.createUrl : this.updateUrl)
    return this.exec()
  }
})

export default new CreateUpdateAppModel()
