/**
 * 页面左侧用户导航选项
 * 
 * @author gill
 * @date 2018-05-02
 */

 import inherit from 'jw_common/inherit'
 import AbstractModel from 'jw_models/abstract'

 let UserMenuModel = inherit(AbstractModel,{
  initialization() {

    this.url = `${Jw.gateway}/account/user/menus`
    this.type = 'get'
  },

  dataFormat(data) {

    if(data.code === this.SUCCESS) {
      return data.result  
    }
    
    return []
  },

  execute() {

    return this.exec()
  }
 })

 export default new UserMenuModel()