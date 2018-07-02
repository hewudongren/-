import AbstractModel from 'jw_models/abstract'
import inhert from 'jw_common/inherit'
import staticData from 'jw_common/data'

const URL = `${Jw.dict}/dictDefinition/searchByGroupCode/`

let DictionaryDefModel = inhert(AbstractModel,{

  initialization() {
    this.type = 'get'
    this.query = {
      skip: 0,
      take: staticData.tablePageSize
    }
    this.result = []
  },

  dataFormat(data) {
    
    return data.data
  },

  execute(urlSuffix,pageIndex) {

    this.url = URL + urlSuffix
    this.query.skip = (pageIndex - 1) * staticData.tablePageSize
    return this.exec()
  }
})

export default new DictionaryDefModel()