/**
 * 拉取支持的语言种类列表
 * 
 * @author gill
 * @date 2018-05-02
 */

import AbstractModel from 'jw_models/abstract'
import inherit from 'jw_common/inherit'


let LanguageSet = inherit(AbstractModel,{
  
  initialization() {
    this.type = 'get'
    this.url = `${Jw.i18n}/i18nLanguageSet/searchI18nLanguageSet`
    this.uniqueName = 'i18nLanguageSet'
    this.cacheType = 'session' 
  },

  dataFormat(data) {
    if(data.code === this.SUCCESS) {
      data = data.result
      
      return _.map(data,(lang)=>{

        return {
          code: lang.languageCode + '-' + lang.languageNation,
          display: lang.languageName
        }
      })      
    }

    return []
  },

  execute() {

    return this.exec()
  }
})

export default new LanguageSet()