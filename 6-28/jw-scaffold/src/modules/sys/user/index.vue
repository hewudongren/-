<template>
  <div class="panel user-panel">
    <jw-control-header :title="getPanelTitle()"
      :buttons="getControlConfig()"
      @on-upload-success="onImportSuccess"
      @on-input-change="onSearch"
      @on-header-button="onControlClicked" />
    <jw-table :header="getTableHeader()"
      :data="result.rows"
      :totalCount="result.count"
      :showPagination="true"
      :pageSize="pageSize"
      :opsList="getTableOperateList()"
      @on-page-change="onPageChange"
      @on-operate-click="onOperateClick"
      v-loading="loading" />
  </div>
</template>

<script>
  import ControlHeader from 'jw_components/table/control-header'
  import JwTable from 'jw_components/table/table'
  import i18nService from 'jw_services/i18n/index'
  import util from 'jw_common/util'

  import passwordResetModel from 'jw_models/sys/password-reset'
  import userValidModel from 'jw_models/sys/user-valid'
  import sysUserModel from 'jw_models/sys/user-list'
  import staticData from 'jw_common/data'
  import commonStore from 'jw_stores/common'

  let keyword = ''

  export default {
      data() { 

        return {
          result: {
            count: 0, 
            rows: []
          },
          pageIndex: 1,
          pageSize: staticData.tablePageSize,
          loading: false
        }
      },

      components: {
        'jw-control-header': ControlHeader,
        'jw-table': JwTable
      },

      created() {

        keyword = ''
        this.fetch(this.pageIndex)
        this.search = _.debounce(this.fetch,400)
      },
      methods: {

        getTableOperateList() {
          let otherLang = i18nService.getOtherLanguageMap()

          return {
            list: [{
              icon: 'el-icon-edit',
              display: otherLang.edit,
              type: 'edit'
            },{
              icon: 'icon-password-reset',
              display: otherLang.passReset,
              type: 'pass-reset'
            }]
          }
        },

        onControlClicked(btnConf) {

          if(btnConf.name === 'download') {
            util.download(`${Jw.gateway}/platform/sys/user/download-template`)
          }else if(btnConf.name === 'export') {
            util.download(`${Jw.gateway}/platform/sys/user/export`)
          }else if(btnConf.name === 'addition') {

            this.$router.push({ path: '/sys/user/edit/0' })
          }
        },

        onOperateClick(menuItem, row) {
          
          if(menuItem.type === 'edit') {
            this.onUserEdit(row)
          }

          if(menuItem.type === 'pass-reset') {
            this.onUserLock(row)
          }
        },

        onPageChange(pageIndex) {

          this.fetch(pageIndex,keyword,true)
        },

        getPanelTitle() {

          return i18nService.getI18nTitle().title
        },

        getControlConfig() {
          let { lang } = i18nService.getLanguageMap()

          return [{
            type: 'input',
            name: 'search',
            icon: 'el-icon-search',
            placeholder: lang['platform.app_user.name'] + '...'
          },{
            icon: 'el-icon-plus',
            name: 'addition',
            txt: lang['platform.common.add'] 
          },{
            name: 'download',
            txt: lang['platform.app_user.downloadTemplate']
          },{
            name: 'import',
            type: 'upload',
            uploadUrl: `${Jw.gateway}/platform/sys/user/import`,
            txt: lang['platform.common.import']
          },{
            name: 'export',
            txt: lang['platform.common.export']
          }]
        },

        getTableHeader() {
          let { lang } = i18nService.getLanguageMap()
          let self = this

          return [{
            display: lang['platform.app_user.name'],
            prop: 'name'
          },{
            display: lang['platform.app_user.account'],
            prop: 'account'
          },{
            display: lang['platform.app_user.dept'],
            prop: 'orgNames'
          },{
            display: lang['platform.common.isAvailable'],
            width: 100,
            formatter(row) {
              return <el-switch value={row.isValid} active-color="#13ce66" onChange={(state)=>{self.onValidChange(state,row)}}/>
            }
          }]
        },

        onUserEdit(row) {

          commonStore.setSysUser(row)
          this.$router.push({path: `/sys/user/edit/${row.id}`})
        },

        onUserLock(row) {
          let lang = i18nService.getOtherLanguageMap()
          
          this.$alert(lang.passResetConfirm, lang.passReset).then(()=>{
            passwordResetModel.execute({id:row.id}).then(()=>{
              this.$success(lang['operateSuccess'])
            }).catch(()=>{
              this.$error(lang['operateError'])
            })
          })
        },

        onImportSuccess() {

          this.pageIndex = 1
          this.fetch(this.pageIndex)
        },

        onValidChange(state,rowData) {
          let param = _.clone(rowData)
          
          param.isValid = state
          userValidModel.execute(param).then(()=>{
            rowData.isValid = state
            this.result.rows = [].concat(this.result.rows)
          }).catch(()=>{
            let lang = i18nService.getOtherLanguageMap()

            this.$error(lang['operateError'])
          })
        },

        onSearch(value) {

          this.loading = true
          keyword = value
          this.pageIndex = 1
          this.search(this.pageIndex,value,true)
        },

        fetch(pageIndex, name = '', noCatch) {
          let hideLoading = _.debounce(()=>{this.loading=false},500)

          this.loading = true
          sysUserModel.execute(pageIndex,name).then((data)=>{

            if(_.isNumber(pageIndex)) {
              this.pageIndex = pageIndex
            }
            this.result = data
            hideLoading()
          }).catch(()=>{
            let lang = i18nService.getOtherLanguageMap()
            this.loading = false

            if(!noCatch) {
              this.$alert(lang['loadingFailAgain'], 'Error').then(()=>{
                this.fetch(this.pageIndex)
              })
            }
          })
        }
      }
  }
</script>
<style lang="less">
@import '../../../assets/css/variable.less';

.user-panel {
  padding-right: 0!important;

  .control-header {
    padding-right: @jw20px;
  }

  .jw-table {

    .el-switch {
      height: auto;
    }
  }

  .el-pagination {
    margin-right: @jw20px;
  }

  .col-ops {
    >i {
      font-size: @font-large;
      margin-left: @jw5px;
      vertical-align: middle;
    }
  }
}
</style>