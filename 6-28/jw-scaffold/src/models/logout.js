/**
 * 登出逻辑
 * 
 * @author gill
 * @date 2018-05-04
 */

import inherit from 'jw_common/inherit'
import AbstractModel from 'jw_models/abstract'

let LogoutModel = inherit(AbstractModel,{

 initialization() {

   this.type = 'post'
   this.url = `${Jw.account}/user/logout`
 },

 execute() {

  return (
    this
      .exec()
      .then((data)=>{

        if(data.code === this.SUCCESS) {
          return data.result
        }

        return Promise.reject()
      })
   ) 
 }
})

export default new LogoutModel()