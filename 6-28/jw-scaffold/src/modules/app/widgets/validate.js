
import i18nService from 'jw_services/i18n/index'


export default {

  name(rule, value, callback) {
    let lang = i18nService.getOtherLanguageMap()

    if(_.isEmpty(value)) {

      return callback(new Error(lang['role-message-name']))
    }

    callback()
  },

  version(rule,value,callback) {
    let lang = i18nService.getOtherLanguageMap()

    if(_.isEmpty(value)) {

      return callback(new Error(lang['notEmpty']))
    }

    callback()
  },

  index(rule,value,callback) {
    let lang = i18nService.getOtherLanguageMap()

    if(_.isEmpty(value)) {

      return callback(new Error(lang['notEmpty']))
    }

    callback()
  },

  code(rule, value, callback) {
    let lang = i18nService.getOtherLanguageMap()

    if(_.isEmpty(value)) {

      return callback(new Error(lang['role-message-code']))
    }

    callback()
  },

  desc(rule, value, callback) {
    let lang = i18nService.getOtherLanguageMap()

    if(_.isEmpty(value)) {

      return callback(new Error(lang['role-message-desc']))
    }

    callback()
  },

  appId(rule,value,callback) {
    let lang = i18nService.getOtherLanguageMap()

    if(_.isEmpty(value)) {

      return callback(new Error(lang['role-message-appId']))
    }

    callback()
  }
}