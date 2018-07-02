import permissionDialog from 'jw_components/dialog'
import i18nService from 'jw_services/i18n/index'

export default {

  mixins: [permissionDialog],

  methods: {
    showAdditionTreeDialog() {
      let otherLang = i18nService.getOtherLanguageMap()
      let { lang } = i18nService.getLanguageMap()

      this.list = [{
        name: lang['platform.common.code'],
        prop: 'code'
      },{
        name: lang['platform.common.name'],
        prop: 'name'
      },{
        name: lang['platform.common.desc'],
        prop: 'desc'
      }]
      this.form = { code: '', name: '', desc: '' }
      this.rules = {
        code: [{ required: true, message: otherLang.notEmpty }],
        name: [{ required: true, message: otherLang.notEmpty }]
      }
      this.title = lang['platform.app_pm.treeTitle']

      return this.show()
    },

    showEditionTreeDialog(data) {
      let { lang } = i18nService.getLanguageMap()
      let otherLang = i18nService.getOtherLanguageMap()

      this.list = [{
        name: lang['platform.common.code'],
        prop: 'code'
      },{
        name: lang['platform.common.name'],
        prop: 'name'
      },{
        name: lang['platform.common.desc'],
        prop: 'desc'
      }]
      this.form = { code: data.code, name: data.name, desc: data.desc }
      this.rules = {
        code: [{ required: true, message: otherLang.notEmpty }],
        name: [{ required: true, message: otherLang.notEmpty }]
      }
      this.title = lang['platform.app_pm.treeTitle']

      return this.show()
    },

    showAdditionTableDialog() {
      let { lang } = i18nService.getLanguageMap()
      let otherLang = i18nService.getOtherLanguageMap()

      this.list = [{
        name: lang['platform.common.code'],
        prop: 'code'
      },{
        name: lang['platform.common.name'],
        prop: 'name'
      }]
      this.form = { code: '', name: '' }
      this.rules = {
        code: [{ required: true, message: otherLang.notEmpty }],
        name: [{ required: true, message: otherLang.notEmpty }]
      }
      this.title = lang['platform.app_pm.actionTitle']

      return this.show()
    },

    showEditTableDialog(entity) {
      let { lang } = i18nService.getLanguageMap()
      let otherLang = i18nService.getOtherLanguageMap()

      this.list = [{
        name: lang['platform.common.code'],
        prop: 'code'
      },{
        name: lang['platform.common.name'],
        prop: 'name'
      }]
      this.form = entity //{ code: '', name: '' }
      this.rules = {
        code: [{ required: true, message: otherLang.notEmpty }],
        name: [{ required: true, message: otherLang.notEmpty }]
      }
      this.title = lang['platform.app_pm.actionTitle']

      return this.show()
    }
  }
}