/**
 * permission/edit/:id 页面导航树数据
 * 
 * @author gill
 * @date 2018-05-11
 * */

 
import inherit from 'jw_common/inherit'
import AbstractModel from 'jw_models/abstract'
import staticData from 'jw_common/data'

let PermissionTreeModel = inherit(AbstractModel, {
  initialization() {

    this.url = `${Jw.gateway}/platform/public/data/app-permissions`
    this.type = 'get'

    this.query = {
      appId: null
    }
  },

  dataFormat(data) {

    return data.result
  },

  execute(appId) {

    this.query.appId = appId

    return (
      this
        .exec()
        .then((data)=>{
          
          return [{ 
            id: 0, 
            name: 'ROOT',
            children: data 
          }]
        })
    )
  }
})

export default new PermissionTreeModel()