/**
 * Table 表格header静态数据
 * 
 * @author gill
 * @date 2018-05-07
 */

import i18Service from 'jw_services/i18n/index'
import util from 'jw_common/util'

function imgLoaderFailHandler(event) {
  let target = event.target

  target.style.display = 'none';
}

export default function () {
  let { lang } = i18Service.getLanguageMap()
  let otherLang = i18Service.getOtherLanguageMap()

  return {
    
    tableHeader: [{
      prop: 'name',
      display: lang['platform.app_app.name']
    }, {
      prop: 'appkey',
      display: lang['platform.app_app.apikey'],
      isCopy: true,
      formatter: function formatter(row, col, value) {
        let h = this.$createElement

        return <div class="text-ellipsis">{value}</div>
      }
    }, {
      prop: 'version',
      width: 100,
      display: lang['platform.app_app.version']
    }, {
      prop: 'creatorName',
      display: lang['platform.common.creatorName'],
      width: i18Service.isChinese()? 100 : 130
    }, {
      prop: 'createdDate',
      width: 150,
      display: lang['platform.common.creatorDate'],
      formatter: function(value) {
    
        return util.dayjs(value.createdDate).format('YYYY-MM-DD HH:mm')
      }
    }, {
      prop: 'icon',
      width: 100,
      display: lang['platform.app_app.icon'],
      formatter: function(row,col,value) {
        let h = this.$createElement
        
       
        if(_.isEmpty(value)) {
          return null
        }

        value = encodeURIComponent(value)
        value = `${Jw.gateway}/storage/common/download?filename=${value}`
        return <div class="app-icon-wrapper"><img src={value} onError={imgLoaderFailHandler} /></div>
      }
    }
  ],

    tableHeaderControl: [{
      icon: 'el-icon-plus',
      type: 'add',
      txt: lang['platform.common.add']
    }, {
      type: 'import',
      uploadUrl: `${Jw.gateway}/platform/app/app/import`,
      isUpload: true,
      type: 'upload',
      txt: lang['platform.common.import']
    }, {
      type: 'export',
      txt: lang['platform.common.export']
    }]
  }
}
