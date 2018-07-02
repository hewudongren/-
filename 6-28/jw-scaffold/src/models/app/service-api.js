/**
 * App 新增/更新 数据拉取
 * 
 * @author gill
 * @date 2018-05-10
 */

import Abstract from 'jw_models/abstract'
import inherit from 'jw_common/inherit'

let ServiceModel = inherit(Abstract, {
  initialization() {
    this.url = `${Jw.gateway}/platform/public/data/services`
    this.type = 'get'
  },

  dataFormat(data) {

    return data.result
  }
})

let ApiModel = inherit(Abstract,{
  initialization() {
    this.url = `${Jw.gateway}/platform/public/data/app-apis`
    this.query = { id: ''}
    this.type = 'get'
  },

  setQuery(id) {

    this.query = { id }
  },

  dataFormat(data) {

    return data.result
  }
})

let api = new ApiModel()
let service = new ServiceModel()

export default {

  requestServiceApi(id) {
    if(_.isEmpty(id)) {

      return (
        service
          .exec()
          .then((services)=>{
            return [ [],services ]
          })
      )
    }
    
    api.setQuery(id)
    return Promise.all([api.exec(),service.exec()])
  }
}