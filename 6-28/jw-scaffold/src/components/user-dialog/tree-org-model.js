
import inherit from 'jw_common/inherit'
import AbstractModel from 'jw_models/abstract'

let TreeOrgModel = inherit(AbstractModel, {
  initialization() {

    this.url = `${Jw.gateway}/platform/public/data/treeOrgs`
    this.type = 'get'
  },

  dataFormat(data) {

    return data.result
  },

  execute() {

    return this.exec()
  }
})

export default new TreeOrgModel()
