/**
 * 导航栏配置
 * 
 * @author gill
 * @date 2018-05-02
 */

import _ from 'lodash'
import jwConfig from 'jw_config'

let asideMenu = jwConfig.asideMenu
let asideMenuQueue = jwConfig.asideMenuQueue

let formattedMenuQueue = []

if(_.isEmpty(asideMenuQueue)) {
  formattedMenuQueue = asideMenu
}else{
  _.each(asideMenuQueue,(menuCode)=>{
  
    let selectedMenu = _.find(asideMenu,(menu)=>{
      return menu.code === menuCode
    })
  
    formattedMenuQueue.push(selectedMenu)
  })
}

export default formattedMenuQueue