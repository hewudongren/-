import AbstractModel from 'jw_models/abstract'
import inhert from 'jw_common/inherit'

const URL = `${Jw.dict}/dictValueDefinition/deleteById/`

let DictionaryValDelModel = inhert(AbstractModel,{

  initialization() {
    this.type = 'post'
  },

  dataFormat(result) {

    return result.data
  },

  execute(urlSuffix) {

    this.url = URL + urlSuffix
    return this.exec()
  }
})

export default new DictionaryValDelModel()