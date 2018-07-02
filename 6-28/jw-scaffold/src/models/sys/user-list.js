
import inherit from 'jw_common/inherit'
import AbstractModel from 'jw_models/abstract'
import staticData from 'jw_common/data'

let SysUserModel = inherit(AbstractModel,{
 initialization() {

   this.url = `${Jw.gateway}/platform/sys/user/read`
   this.query = {
     skip: 0,
     take: staticData.tablePageSize,
     name: ''
   }
   this.type = 'get'
 },

 dataFormat(data) {

  return data.result
 },

 execute(pageIndex,name) {

  this.query.skip = (pageIndex - 1)*staticData.tablePageSize,
  this.query.name = name || ''
  return this.exec()
 },

 all(name) {

  this.query = {
    skip: 0,
    take: 10000,
    name
  }

  return this.exec()
 }
})

export default new SysUserModel()