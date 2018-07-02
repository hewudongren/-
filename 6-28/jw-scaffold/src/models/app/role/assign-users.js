
import inherit from 'jw_common/inherit'
import AbstractModel from 'jw_models/abstract'

let AssignUserModel = inherit(AbstractModel, {
  initialization() {

    this.url = `${Jw.gateway}/platform/app/role/assign-users`
    this.type = 'post'
    this.param = {
      userIds: [], 
      roleId: ''
    }
  },

  dataFormat(data) {

    return data.result
  },

  execute(param) {

    this.setParam(param)
    return this.exec()
  }
})

export default new AssignUserModel()