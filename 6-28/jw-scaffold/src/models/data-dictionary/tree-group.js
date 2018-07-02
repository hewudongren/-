import AbstractModel from 'jw_models/abstract'
import inhert from 'jw_common/inherit'

let TreeGroupModel = inhert(AbstractModel,{

  initialization() {
    this.type = 'get'
    this.url = `${Jw.dict}/group/search`
  },

  dataFormat(data) {
    
    return data.result
  },

  execute() {

    return this.exec()
  }
})

export default new TreeGroupModel()