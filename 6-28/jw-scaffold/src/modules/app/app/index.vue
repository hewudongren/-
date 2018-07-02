<template>
  <div class="panel app" v-loading="loading">

    <!-- 表头 -->
    <jw-table-control
      :title="getTitle()"
      :buttons="getHeaderControl()"
      @on-header-button="onHeaderButtonClick"
    />
    <!-- 主体 -->
    <jw-table
      ref="jwTable"
      :data="rows"
      :isSelection=true
      :isRowCheckBox=true
      :pageSize="pageSize"
      :opsList="getTableOperateList()"
      :showPagination="true"
      :totalCount="totalCount"
      :header="getTableHeader()"
      :currentPage="currentPage"
      @on-page-change="onPageChange"
      @on-operate-click="onOperateClick">
    </jw-table>
  </div>
</template>

<script>
  import util from 'jw_common/util'
  import staticData from 'jw_common/data'
  import i18nService from 'jw_services/i18n/index'
  import JwTable from 'jw_components/table/table'
  import JwTableHeaderControl from 'jw_components/table/control-header'

  import appStore from 'jw_stores/common'
  import getAppConfig from './app-config.js'
  import tableModel from 'jw_models/app/app-read'
  import tableRowDeleteModel from 'jw_models/app/recod-delete'

  let defaultPageIndex = 1
  let loadingTimerId = 0

  const DEFAULT_ROW = {
    name: '--',
    key: '--',
    secret: '--',
    appkey: '--',
    creatorName: '--'
  }

  export default {
    data() {

      return {
        totalCount: 0,
        loading: true,
        rows: [ DEFAULT_ROW ],
        currentPage: defaultPageIndex,
        pageSize: staticData.tablePageSize
      }
    },

    created() {

      this.fetch()
    },

    components: {
      'jw-table': JwTable,
      'jw-table-control': JwTableHeaderControl
    },

    methods: {

      getTableOperateList() {
        let otherLang = i18nService.getOtherLanguageMap()
        let { lang } = i18nService.getLanguageMap()

        return {
          list: [{
            icon: 'el-icon-delete',
            display: otherLang.delete,
            type: 'delete' 
          },{
            icon: 'el-icon-edit',
            display: lang['platform.app_app.editApp'],
            type: 'edit'
          },{
            icon: 'icon-user-setting',
            display: lang['platform.app_app.permission'],
            type: 'operateConf'
          },{
            icon: 'icon-cloud',
            display: lang['platform.app_app.auth'],
            type: 'microServices'
          },{
            icon: 'icon-selected-user',
            display: lang['platform.app_role.role'],
            type: 'role'
          }]
        }
      },

      getTableHeader() {

        return getAppConfig().tableHeader
      },

      getHeaderControl() {
        
        return getAppConfig().tableHeaderControl
      },

      showLoading() {

        clearTimeout(loadingTimerId)
        this.loading = true
      },

      hideLoading(is) {
        if(is) {
          this.loading = false
        }else{
          loadingTimerId = setTimeout(()=>{
            this.loading = false
          },500)
        }
      },

      getTitle() {
        
        return i18nService.getI18nTitle().title
      },

      onPageChange(pageCount) {

        this.showLoading()
        tableModel.setPageIndex(pageCount)
        this.currentPage = pageCount
        tableModel
          .execute()
          .then((data)=>{
            this.rows = data.rows
            this.hideLoading()
          })
          .catch(()=>{
            let lang = i18nService.getOtherLanguageMap()
            this.hideLoading(true)
            this.$warning(lang['loadingFail'])
          })
      },

      onHeaderButtonClick(buttonClicked) {

        if(buttonClicked.type === 'add') {
          this.add()
        }else if(buttonClicked.type === 'export'){
          this.export()
        }
      },

      onOperateClick(menuItem, row) {
        
        if(menuItem.type === 'edit') {
          this.edit(row)
        }

        if(menuItem.type === 'delete') {
          this.delete(row)
        }

        if(menuItem.type === 'microServices') {
          this.goServiceAuthorize(row)
        }

        if(menuItem.type === 'operateConf') {
          this.goOperateConf(row)
        }

        if(menuItem.type === 'role') {
          this.goRole(row)
        }
      },

      fetch () {
        
        this.showLoading()
        tableModel.setPageIndex(defaultPageIndex)
        tableModel
          .execute()
          .then((data)=>{
           
            this.totalCount = data.count
            this.rows = data.rows
            this.hideLoading()
          })
          .catch(()=>{
           
            let lang = i18nService.getOtherLanguageMap()

            this.totalCount = 0
            this.rows = []
            this.hideLoading(true)

            this.$alert(lang['loadingFailAgain'], 'Error').then(()=>{

              this.fetch()
            })
        })
      },
      //点击跳转到新增页面  
      add() {

        this.$router.push({path: '/app/app/edit/0'})
      },

      edit(row) {

        appStore.set('row-data',row)
        this.$router.push({path: `/app/app/edit/${row.id}`})
      },

      goServiceAuthorize(row) {

        appStore.set('row-data',row)
        this.$router.push({ path: `/app/app/service/${row.id}` })
      },

      goOperateConf(row) {
        appStore.set('row-data',row)
        this.$router.push({ path: `/app/app/permission/edit/${row.id}` })
      },

      goRole(row) {
        appStore.set('row-data',row)
        this.$router.push({path: `/app/app/role/index`})
      },

      delete(row) {
        let lang = i18nService.getOtherLanguageMap()
        let deleteRecodFromServer = (row)=>{

          tableRowDeleteModel.setParam(row)
          tableRowDeleteModel
            .execute()
            .then(()=>{
              let index = _.findIndex(this.rows,(current)=>{ return current === row })
              
              this.rows.splice(index,1)
              this.$success(lang['deleteRecodSuccess'])
            })
            .catch(()=>{
              this.$error(lang['deleteRecodFail'])
            })
        }
        
        this.$alert(lang['deleteWarning'], 'Warning').then(()=>{

          deleteRecodFromServer(row)
        })
        .catch(()=>{})
      },

      getSelectionIds() {
        let jwTable = this.$refs.jwTable
        let selections = jwTable.getSelection()

        return _.map(selections,(select)=>{
          return select.id
        })
      },

      getAllIds() {

        return _.map(this.rows,(row)=>{
          return row.id
        })
      },

      export() {
        let selections = this.getSelectionIds()
        let lang = i18nService.getOtherLanguageMap()

        if(selections.length===0) {
          return this.$error(lang['recordSelected'])
        }

        util.download(`${Jw.gateway}/platform/app/app/export`,{ appIds: selections.join(',') })
      }
    }
  }
</script>

<style lang="less">
  @import "../../../assets/css/variable.less";

  .app {

    .el-icon-delete {
      margin-left: @jw5px;
    }

    .app-icon-wrapper {
      //width: 80px;
      height: 80px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
