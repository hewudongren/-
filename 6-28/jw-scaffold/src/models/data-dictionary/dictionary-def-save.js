import AbstractModel from 'jw_models/abstract'
import inhert from 'jw_common/inherit'

const URL = `${Jw.dict}/dictDefinition/`

let DictionaryDefSaveModel = inhert(AbstractModel,{

  initialization() {
    this.type = 'post'
  },

  dataFormat(data) {
    
    return data.data
  },

  execute(urlSuffix,param) {

    this.setParam(param)
    this.url = URL + urlSuffix
    return this.exec()
  }
})

export default new DictionaryDefSaveModel()