import AbstractModel from 'jw_models/abstract'
import inhert from 'jw_common/inherit'

const URL_PREX = `${Jw.i18n}/i18nGroup/`

let TreeGroupSave = inhert(AbstractModel,{

  initialization() {
    this.type = 'post'
  },

  dataFormat(data) {
    
    return data.result
  },

  execute(urlSuffix,param) {

    this.url = URL_PREX + urlSuffix
    this.setParam(param)

    return this.exec()
  }
})

export default new TreeGroupSave()