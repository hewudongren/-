
import inherit from 'jw_common/inherit'
import AbstractModel from 'jw_models/abstract'
import staticData from 'jw_common/data'

let OrgReadition = inherit(AbstractModel,{
 initialization() {

   this.url = `${Jw.gateway}/platform/sys/org/read`
   this.query = {
     skip: 0,
     take: staticData.tablePageSize,
     parentId: 0
   }
   this.type = 'get'
 },

 dataFormat(data) {

  return data.result
 },

 execute(pageIndex,parentId) {

  this.query.skip = (pageIndex - 1)*staticData.tablePageSize
  this.query.parentId = parentId
  return this.exec()
 }
})

export default new OrgReadition()