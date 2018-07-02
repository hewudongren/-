/**
 * 获取当前用户信息
 * 
 * @author gill
 * @date 2018-05-02
 */
 import inherit from 'jw_common/inherit'
 import AbstractModel from 'jw_models/abstract'

 let User = inherit(AbstractModel,{

  initialization() {

    this.url = `${Jw.account}/user/profile`
    this.type = 'get'
  },

  dataFormat(data) {
    let currentUser = data.result

    currentUser.isAdmin = this.isAdmin(currentUser)
    return currentUser
  },

  execute() {

    return this.exec()
  },

  isAdmin(user) {

    return (_.findIndex(user.roleCodes||[], (roleCode)=>{
      return roleCode === 'platform-admin'
    }) != -1)
  }
 })

 export default new User()