import languageSetModel from 'jw_models/header/language-set'
import AbstractModel from 'jw_models/abstract'
import inhert from 'jw_common/inherit'
import staticData from 'jw_common/data'

const URL = `${Jw.dict}/dictValueDefinition/`

let DictionaryValSaveModel = inhert(AbstractModel,{

  initialization() {
    this.type = 'post'
  },

  dataFormat(result) {

    return result.data
  },

  execute(urlSuffix,param) {

    this.setParam(param)
    this.url = URL + urlSuffix
    return this.exec()
  }
})

export default new DictionaryValSaveModel()