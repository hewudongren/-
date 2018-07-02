/**
 * 默认选中英语
 * 
 * @author gill
 * @date 2018-04-28
 */

import jwConfig from 'jw_config'

export default _.extend({
  // common
  'platform.common.add': 'Add',
  'platform.common.edit': 'Edit',
  'platform.common.search': 'Search',
  'platform.common.destroy': 'Destroy',
  'platform.common.save': 'Save',
  'platform.common.previous': 'Pervious',
  'platform.common.next': 'Next',
  'platform.common.cancel': 'Cancel',
  'platform.common.ok': 'Ok',
  'platform.common.isAvailable': 'Available',
  'platform.common.exitWithoutSave': 'exit without save',
  'platform.common.hi': "HI",
  'platform.common.creatorName': 'Creator Name',
  'platform.common.ops': "Ops",
  'platform.common.desc': 'Description',
  'platform.common.code': 'Code',
  'platform.common.import': 'Import',
  'platform.common.export': 'Export',
  'platform.common.accountSetting': 'Account Setting',
  'platform.common.logout': 'Logout',
  'platform.common.name': 'Name',
  'platform.common.members': 'Members',
  'platform.common.finish': 'Finish',

  //home
  'platform.home.activeUser': 'Number of active users',
  'platform.home.activeApp': 'Active App quality',
  'platform.home.todalTotal': 'Today Api access total',
  'platform.home.statisticHeader': 'Real-time statistics on API traffic',

  //svc
  'platform.svc.basepath': 'Basepath',
  'platform.svc.name': 'Name',
  'platform.svc.endpoint': 'Endpoint',
  'platform.svc.method': 'Method',
  'platform.svc.moduleName': 'Module Name',

  // 编辑页表单
  'platform.svc.detail': 'Detail',
  'platform.svc.detailDesc': 'service basic information',
  'platform.svc.public': 'Public',
  'platform.svc.publicDesc': 'Public resource, like html, css, js',
  'platform.svc.common': 'Common',
  'platform.svc.commonDesc': 'common Api interfaces',
  'platform.svc.auth': 'Authentication',
  'platform.svc.authDesc': 'need to be authorized',

  //app_app
  'platform.app_app.name': 'Name',
  'platform.app_app.key': 'Key',
  'platform.app_app.secret': 'Secret',
  'platform.app_app.apikey': 'Api Key',

  // 编辑页
  'platform.app_app.detail': 'Detail',
  'platform.app_app.detailDesc': 'App basic information',
  'platform.app_app.auth': 'Authentication',
  'platform.app_app.authDesc': 'app resource',

  'platform.app_app.index': 'Index',
  'platform.app_app.icon': 'Icon',
  'platform.app_app.keywords': 'Key Words',
  'platform.app_app.version': 'Version',
  'platform.app_app.docCenter': 'Doc Center',
  'platform.app_app.videoDemo': 'Video Demo',
  'platform.app_app.category': 'Category', // app 类型，有的可以显示在 workbench 里头，有的可以显示在 platform management
  'platform.app_app.preview': 'Preview',

  // 编辑页面
  'platform.app_pm.detail': 'Detail',
  'platform.app_pm.detailDesc': 'role descriptions',
  'platform.app_pm.permission': 'Permission',
  'platform.app_pm.permissionDesc': 'role permissions',

  'platform.app_role.saveRole': 'Save Role',

  'platform.app_user.account': 'Account',
  'platform.app_user.name': 'Name',
  'platform.app_user.dept': 'Department Name',
  'platform.app_user.company': 'Company Name',
  //'platform.app_user.role': 'Role',
  'platform.app_user.gender': 'Gender',
  'platform.app_user.mobile': 'Mobile',
  'platform.app_user.email': 'Email',
  'platform.app_user.org': 'Organization',
  'platform.app_user.downloadTemplate': 'Download template',

  'platform.app_org.name': 'Name',
  'platform.app_org.abbreviation': 'Abbreviation',
  'platform.app_org.code': 'Code',
  'platform.app_org.root': 'ROOT',
  'platform.app_org.editOrg': 'Edit org',

  'platform.i18n.key': 'Key',

  'platform.config.dataDictionaryGroup': 'Data Dictionary-Group',
  'platform.config.dataDictionaryDefine': 'Data Dictionary-Define',
  'platform.config.dataDictionaryValue': 'Data Dictionary-Value',
  'platform.config.valueCode': 'Value Code',
  'platform.config.parent': 'Parent',

  'platform.app_app.permission': '',
  'platform.app_pm.treeTitle': '',
  'platform.app_pm.actionTitle': '',
  'platform.app_pm.apiTitle': '',
  'platform.common.creatorDate': '',
  'platform.app_role.role': '',
  'platform.app_role.addRole': '',
  'platform.app_profile.rights_profile':'',
  'platform.app_role.editRole': '',
  'platform.app_app.editApp': '',
  'platform.app_role.assignRole': '',
  'platform.common.allUsers': '',
  'platform.common.selectedUsers':'',
  'platform.common.back':'',

  'platform.menu.sys/role': ''
}, jwConfig.languageMap || {})