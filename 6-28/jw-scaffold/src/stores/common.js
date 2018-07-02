/**
 * 系统公共Store
 * 
 * @author gill
 * @date 2018-05-10
 */

import BaseStore from 'jw_stores/base-store'

let commonStore = new BaseStore({ type: BaseStore.session, key:'--jwis-store-common--' })

export default {

  setAsidePath(path) {

    commonStore.set('asidePath',path)
  },
  getAsidePath() {

    return commonStore.get('asidePath')
  },

  setSysUser(val) {

    commonStore.set('sys-user',val)
  },
  getSysUser() {
    
    return commonStore.get('sys-user')
  },

  set(key,val) {
    commonStore.set(key,val)
  },
  get(key) {
    return commonStore.get(key)
  }
}