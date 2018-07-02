/**
 * 获取指定多语言配置
 * 
 * @author gill
 * @date 2018-05-01
 */
 
 import AbstractModel from 'jw_models/abstract'
 import inherit from 'jw_common/inherit'
 import defaultLang from './default-lang'
 import defaultMenu from './default-menu'
 
 let LanguageModel = inherit(AbstractModel,{
   
  initialization() {
    
    this.type = 'post'
    this.url = `${Jw.i18n}/i18nResource/queryI18nResourceList`
  },

  parseLangAttrsList() {
    let langKeies = []
    let langs = defaultLang
  
    _.each(langs,(val,moduleKey)=>{
      langKeies.push(moduleKey)
    })

    return langKeies
  },

  parseMenuAttrsList() {
    let menuKeies = []

    _.each(defaultMenu,(menuItem)=>{

      menuKeies.push(menuItem.nameKey)
      if(menuItem.children) {
        _.each(menuItem.children,(child)=>{
          menuKeies.push(child.nameKey)
        })
      }
    })

    return menuKeies
  },

  updateParam(selectedLanguage) {
    let langKeySet = this.parseLangAttrsList()
    let menuKeySet = this.parseMenuAttrsList()

    this.param = {
      locale: selectedLanguage,
      keySet: langKeySet.concat(menuKeySet)
    }
  },

  dataFormat(result) {  

    if(result.code === this.SUCCESS) {

      return {
        menu: this.mapMenu(result.result),
        lang: this.mapLang(result.result)
      }
    }

    return {
      menu: defaultMenu,
      lang: defaultLang
    }
  },

  mapLang(languageConfig) {
    
    // for (let moduleKey in defaultLang) {
    //   (languageConfig[moduleKey]) && (defaultLang[moduleKey] = languageConfig[moduleKey])
    // }
    
    return _.extend(defaultLang,languageConfig)
  },

  mapMenu(languageConfig) {

    _.each(defaultMenu,(menu)=>{

      if(languageConfig[menu.nameKey]) {
        
        menu.name = languageConfig[menu.nameKey]
      }
  
      if (menu.children) {
        _.each(menu.children,(child) => {

          if(languageConfig[child.nameKey]) {
        
            child.name = languageConfig[child.nameKey]
          }
        })
      }
    })

    return defaultMenu
  },

  execute(selectedLanguage) {

    this.updateParam(selectedLanguage)
    return this.exec()
  }
 })

 export default new LanguageModel()