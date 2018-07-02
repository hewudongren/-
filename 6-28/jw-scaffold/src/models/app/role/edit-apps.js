/**
 * /app/role/index 角色
 * 
 * @author gill
 * @date 2018-05-02
 */

import inherit from 'jw_common/inherit'
import AbstractModel from 'jw_models/abstract'

let EditAppsModel = inherit(AbstractModel, {
  initialization() {

    this.url = `${Jw.gateway}/platform/public/data/apps`
    this.type = 'get'
    this.query = {
      roleId: ''
    }
  },

  dataFormat(data) {
    let apps = data.result
    let checkedTabs = []
    let unCheckedTabs = []

    _.each(apps,(app)=>{
      if(this.isChecked(app)) {
        app.tabLabel = '* '+ app.name
        checkedTabs.push(app)
      }else{
        app.tabLabel = app.name
        unCheckedTabs.push(app)
      }
    })

    return checkedTabs.concat(unCheckedTabs)
  },

  isChecked(app) {
    let pms = app.pms
    let children = []

    for(let i=0,len=pms.length;i<len;i++) {
      if(pms[i].checked) {
        return true
      }

      children = pms[i].children
      for(let j=0,jlen=children.length;j<jlen;j++) {
        if(children[j].checked) {
          return true
        }
      }
    }

    return false
  },

  execute(roleId) {

    this.query.roleId = roleId
    return this.exec()
  }
})

export default new EditAppsModel()
