import AbstractModel from 'jw_models/abstract'
import inhert from 'jw_common/inherit'
import util from 'jw_common/util'
import staticData from 'jw_common/data'

const URL_PREX = `${Jw.i18n}/i18nResourceSet/searchI18nResourceSetByGroup/`

let I18nTable = inhert(AbstractModel,{

  initialization() {
    this.type = 'get'
    this.query = {
      take: staticData.tablePageSize,
      skip: '',
      key: ''
    }
  },

  setKeyword(key) {

    this.query.key = key
  },

  dataFormat(data) {
    
    return data.result
  },

  execute(pageIndex,urlSuffix) {

    //this.query.key = key || ''
    this.url = URL_PREX + urlSuffix
    this.query.skip = staticData.tablePageSize * (pageIndex-1)
    
    return this.exec()
  }
})

export default new I18nTable()