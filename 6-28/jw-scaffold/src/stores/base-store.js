/**
 * 数据存储器
 * 
 * @author gill
 * @date 2018-05-01
 */
 
 import inherit from 'jw_common/inherit'

 const TYPES = {
  memery: 'memery',
  local: 'local',
  session: 'session'
 }

 let memerySet = (key,value,carrier) => {
  let keys = key.split('.')
  let length = keys.length
  let currentContext = carrier

  for(let i=0;i<length;i++) {
    let attr = keys[i]

    if(i===length-1) {
      currentContext[attr] = value
      break
    }

    if(
      _.isNull(currentContext[attr]) || 
      _.isString(currentContext[attr]) ||
      _.isNumber((currentContext[attr]))
    ) {

      currentContext[attr] = {}
    }

    currentContext = currentContext[attr]
  }
 }

 let memeryGet = (key,carrier)=>{
  let keys = key.split('.')
  let currentContext = carrier

  for(let i=0,len=keys.length;i<len;i++) {
    currentContext = currentContext[keys[i]]

    if(_.isNull(currentContext)) {
      return null
    }
  }

  return currentContext
 }

 let BaseStore = inherit({
  __constructor({ type, key }) {
    
    this.key = key || null
    this.type = type || TYPES.memery
    this.storeProxy = null

    this.init()
  },

  init() {

    if(this.type === TYPES.memery) {
      this.storeProxy = null
    }else if(this.type === TYPES.session){
      this.storeProxy = window.sessionStorage
    }else if(this.type === TYPES.local) {
      this.storeProxy = window.localStorage
    }else{

      throw new Error('The store type is wrong, the type should be memery,session,local')
    }
  },

  set(key,value) {
    let data = this.getOringalData() || {}

    memerySet(key,value,data)
    if(this.type === TYPES.memery) {

      this.storeProxy = data
    }else{

      this.storeProxy.setItem(this.key,JSON.stringify(data))
    }
  },

  get(key) {
    let data = this.getOringalData()

    if(_.isEmpty(key)) {
      return data
    }

    return memeryGet(key,data || {})
  },

  getOringalData() {

    if(this.type === TYPES.local || this.type === TYPES.session) {
      let dataString = this.storeProxy.getItem(this.key)
      
      if(_.isNull(dataString)) {
        return null  
      }

      return JSON.parse(dataString)
    }else{

      return this.storeProxy
    }
  }
 },TYPES)

 export default BaseStore