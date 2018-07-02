import AbstractModel from 'jw_models/abstract'
import inhert from 'jw_common/inherit'
import util from 'jw_common/util'

let I18nGroup = inhert(AbstractModel,{

  initialization() {
    this.type = 'get'
    this.url = `${Jw.i18n}/i18nGroup/searchI18nGroup`
  },

  dataFormat(data) {
    
    return { 
      id: 0, 
      groupName: "ROOT", 
      children: util.cascade(data.result, "groupCode", "parentCode", null)
    }
  }
})

let I18nLanguageSet = inhert(AbstractModel,{
  initialization() {
    this.type = 'get'
    this.url = `${Jw.i18n}/i18nLanguageSet/searchI18nLanguageSet`
  },

  dataFormat(data) {
    let categories = data.result

    return categories.map((x) => {
      return {
        code: x.languageCode + "-" + x.languageNation,
        name: x.languageName
      }
    })
  }
})

let i18nGroup = new I18nGroup()
let i18nLanguageSet = new I18nLanguageSet()

export default {

  fetchI18n() {

    return Promise.all([i18nGroup.exec(),i18nLanguageSet.exec()])
  },

  fetchTreeGroup() {

    return i18nGroup.exec()
  }
}