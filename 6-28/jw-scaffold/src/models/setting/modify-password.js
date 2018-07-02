/**
 * 页面左侧用户导航选项
 * 
 * @author gill
 * @date 2018-05-02
 */

import inherit from 'jw_common/inherit'
import AbstractModel from 'jw_models/abstract'

let PasswordModifyModel = inherit(AbstractModel,{
 initialization() {

   this.url = `${Jw.gateway}/account/user/modify-password`
   this.type = 'post'
 },

 execute(param) {
   
  this.setParam(param);
  return this.exec();
 }
})

export default new PasswordModifyModel()