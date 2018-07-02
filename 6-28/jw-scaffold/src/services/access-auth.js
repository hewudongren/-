/**
 * 获取登录身份
 * 
 * @author gill
 * @date 2018-05-03
 */
 
 
 import util from 'jw_common/util'
 import cookie from 'jw_common/cookie'
 import axios from 'axios'
 import inherit from 'jw_common/inherit'
 import AbstractModel from 'jw_models/abstract'

 let AuthModel = inherit(AbstractModel,{
  
  initialization() {

    this.url = `${Jw.gateway}/account/common/access-token`
    this.query = {
      appkey: Jw.appkey
    }
    this.type = 'GET'
  },

  getToken() {
    console.log(cookie.getLoginToken())
    return cookie.getLoginToken()
  }
 })

 export default {

  isLogin() {
    
    return !_.isEmpty(cookie.getLoginToken())
  },

  checkAuth() {
    let authInstance = new AuthModel()

    return (
      authInstance.exec().then((authResult)=>{

        cookie.setCookie('auth', authResult.result)
      })
    )
  },

  initAuth() {

    if(this.isLogin()) {

      return this.checkAuth()
    }else{

      util.jumpToLogin()
      return null
    }
  }
 }