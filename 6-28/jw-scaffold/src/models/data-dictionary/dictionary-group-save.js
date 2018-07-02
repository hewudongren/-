import AbstractModel from 'jw_models/abstract'
import inhert from 'jw_common/inherit'
import staticData from 'jw_common/data'

const URL = `${Jw.dict}/group/`

let DictionaryGroupModel = inhert(AbstractModel,{

  initialization() {
    this.type = 'post'
  },

  dataFormat(data) {
    
    return data.data
  },

  execute(urlSuffix,param) {

    this.url = URL + urlSuffix
    this.setParam(param)
    return this.exec()
  }
})

export default new DictionaryGroupModel()