import AbstractModel from 'jw_models/abstract'
import inhert from 'jw_common/inherit'
import staticData from 'jw_common/data'
import dictionaryDefModel from 'jw_models/data-dictionary/dictionary-def'

const URL = `${Jw.dict}/dictDefinition/searchByKey/`

let DictionaryDefSearchModel = inhert(AbstractModel,{

  initialization() {
    this.type = 'get'
    this.query = {
      skip: 0,
      take: staticData.tablePageSize
    }
  },

  dataFormat(data) {
    
    return data.data
  },

  execute(urlSuffix,pageIndex) {

    if(_.isEmpty(urlSuffix)) {

      return Promise.resolve(dictionaryDefModel.getResult())
    }

    this.url = URL + urlSuffix
    this.query.skip = (pageIndex - 1) * staticData.tablePageSize
    return this.exec()
  }
})

export default new DictionaryDefSearchModel()