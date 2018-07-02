/**
 * 从服务器拉去多语言配置
 * 
 * @author gill
 * @date 2018-04-28
 */

import languageModel from './language-model'
import otherLang from './other-lang'
import BaseStore from 'jw_stores/base-store'
import util from 'jw_common/util'

const defaultLanguageCode = 'en'

let languageStore = new BaseStore({ key:'jw-language-code', type: BaseStore.local })
let selectedLanguageSet = {}

let getBrowserLanguage = () => {
  let language = navigator.languages && navigator.languages[0] || // Chrome / Firefox
    navigator.language || // All browsers
    navigator.userLanguage // IE <= 10

  return language || defaultLanguageCode
}

let initLanguage = () => {
  let selectedLanguageCode = getSelectedLanguageCode()

  return languageModel.execute(selectedLanguageCode)
}

let updateLanguage = (languageCode)=>{
  
  languageStore.set('languageCode',languageCode)
  return languageModel.execute(languageCode)
}

let getSelectedLanguageCode = ()=>{
  
  return languageStore.get('languageCode') || getBrowserLanguage()
}

let getLanguageMap = ()=>{
  let modelResult = languageModel.getResult()
  
  return modelResult
}

let getOtherLanguageMap = ()=>{
  let languageCode = getSelectedLanguageCode()

  languageCode = languageCode.split('-')[0]
  return otherLang[languageCode]
}

let isChinese = ()=>{
  let languageCode = getSelectedLanguageCode()

  return languageCode.indexOf('zh-')>-1
}

let getI18nTitle = ()=>{
  let hash = util.getUrlHash()
  let hashArray = hash.split('/')
  let { menu } = getLanguageMap()

  if(hashArray.length) {
    hashArray = hashArray.slice(0,2)
  }

  hash =hashArray.join('/')
  return util.getPanelTitle(hash,menu)
}

export default {
  updateLanguage,
  initLanguage,
  getLanguageMap,
  getSelectedLanguageCode,
  getOtherLanguageMap,
  getI18nTitle,
  isChinese
}