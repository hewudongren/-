/**
 * 系统中请求基类
 * 
 * @author gill
 * @date 2018-05-01
 */

import axios from 'axios'
import inherit from 'jw_common/inherit'
import cookie from 'jw_common/cookie'
import BaseStore from 'jw_stores/base-store'

const STORE_KEY = 'model_data'

let AbstractModel = inherit({
  __constructor() {

    this.SUCCESS = 0

    this.cacheType = BaseStore.memery
    this.uniqueName = ''
    this.type = 'POST'
    this.result = {}
    this.param = {}
    this.query = {}
    this.url = ''
    
    this.initialization()
    this.initResultStore()
  },

  initialization() { },

  initResultStore() {
    let key = `jws_model_${this.uniqueName}`

    if(!_.isEmpty(this.uniqueName)) {
      if(this.cacheType === BaseStore.memery) {
        this.result = new BaseStore({ type: BaseStore.memery,key })
      }else if(this.cacheType === BaseStore.session) {
        this.result = new BaseStore({ type: BaseStore.session,key })
      }else if(this.cacheType === BaseStore.local) {
        this.result = new BaseStore({ type: BaseStore.local,kry })
      }
    }
  },

  getResult() {

    if(this.result instanceof BaseStore) {

      return this.result.get(STORE_KEY)
    } else {

      return this.result
    }
  },

  setResult(value) {

    if(this.result instanceof BaseStore) {

      this.result.set(STORE_KEY,value)
    }else {

      this.result = value
    }
  },

  setParam(param) {

    this.param = param
  },

  getParam() {

    return this.param
  },

  getType() {

    return this.type.toUpperCase()
  },

  getUrl() {
    
    return this.url
  },

  getToken() {

    return cookie.getAuth()
  },

  setQuery(query) {

    this.query = query
  },

  getQuery() {
    let query = _.clone(this.query) || {}

    if(document.documentMode && document.documentMode<10) {

      query.accesstoken = this.getToken()
      query['content-type'] = 'application/json'

      if (this.getType() === 'GET') {
        query.__timer = new Date().getTime()
      }
    }

    return query
  },
  //请求数据接口
  exec() {
    let token = this.getToken()
    let url = this.getUrl()
    
    return (
      axios({
        url,
        method: this.getType(),
        headers: {
          accesstoken: token,
          'content-type': 'application/json'
        },
        params: this.getQuery(),
        data: this.getType() === 'GET' ? null : this.getParam()
      }).then((result) => {
        
          if (result && result.data && result.data.code === this.SUCCESS) {
            let formatedData = this.dataFormat(result.data)
            this.setResult(formatedData)
            return formatedData
          } else {
            //请求失败，抛出错误信息
            
             return Promise.reject(result.data)
          }
        }
      )
    )
  },

  dataFormat(result) {

    return result
  }
})

export default AbstractModel