
import validateCommon from "jw_common/validate-common";
import i18nService from "jw_services/i18n/index";

export default {

  emailValidate(rule,value,callback) {
    let lang = i18nService.getOtherLanguageMap()

    if(_.isEmpty(value)) {
      return callback()
    }

    if(validateCommon.isEmail(value)) {
      
      return callback()
    }
    
    callback(new Error(lang['user-edit-email']))
  },

  phoneValidate(rule,value,callback) {
    let lang = i18nService.getOtherLanguageMap()

    if(_.isEmpty(value)) {
      return callback()
    }

    if(validateCommon.isPhone(value)) {
      return callback()
    }
    
    return callback(new Error(lang['user-edit-phone']))
  }
}