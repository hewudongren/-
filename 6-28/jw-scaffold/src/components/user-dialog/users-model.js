
import inherit from 'jw_common/inherit'
import AbstractModel from 'jw_models/abstract'

const PAGE_SIZE = 10
let pageIndex = 1

let UsersModel = inherit(AbstractModel, {
  initialization() {

    this.url = `${Jw.gateway}/platform/public/data/users`
    this.type = 'get'
    this.query = {
      skip: 0,
      take: PAGE_SIZE,
      orgId: '',
      name: ''
    }
  },

  dataFormat(data) {

    return data.result
  },

  execute(pageIndex,id,username) {

    this.query.skip = (pageIndex-1) * PAGE_SIZE
    this.query.orgId = id 
    this.query.name = username || ''
    return this.exec()
  }
})

export default new UsersModel()
