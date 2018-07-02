/**
 * Table 表格header静态数据
 * 
 * @author gill
 * @date 2018-05-07
 */

import i18Service from 'jw_services/i18n/index'

export default function () {
  let {
    lang
  } = i18Service.getLanguageMap()
  let otherLang = i18Service.getOtherLanguageMap()
  
  return {
    
    editTableHeader: [{
      prop: 'code',
      display: lang['platform.common.code']
    }, {
      prop: 'name',
      display: lang['platform.common.name']
    }, {
      display: lang['platform.common.ops'],
      formatter: function formatter(row, col) {
        let h = this.$createElement

        let onOperateHandle = _.bind(function (event) {
          let target = event.target;

          event.stopPropagation();
          if(target.className==="el-icon-delete") {
            this.$emit('on-delete', row);
          }else if(target.className === "el-icon-edit"){
            this.$emit('on-edit',row);
          }
        }, this)

        return ( 
          <div class="app-edit" onClick={onOperateHandle}>
            <i class="el-icon-edit"></i>
            <i class="el-icon-delete"></i>
          </div>
        )
      },
      width: 70
    }],

    tableControl: [{
      icon: 'el-icon-plus',
      type: 'add',
      txt: lang['platform.common.add']
    }]
  }
}
