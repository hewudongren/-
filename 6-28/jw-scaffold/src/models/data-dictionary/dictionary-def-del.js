import AbstractModel from 'jw_models/abstract'
import inhert from 'jw_common/inherit'

const URL = `${Jw.dict}/dictDefinition/deleteById/`

let DictionaryDefDelModel = inhert(AbstractModel,{

  initialization() {
    this.type = 'post'
  },

  dataFormat(data) {
    
    return data.data
  },

  execute(urlSuffix,param) {

    this.url = URL + urlSuffix
    return this.exec()
  }
})

export default new DictionaryDefDelModel()