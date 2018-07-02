<template>
  <div class="panel resource">
    <!-- 表头 -->
    <jw-table-control
      class="mgb"
      :title="getTitle()"
      :buttons="getHeaderControl()"
      @on-header-button="onHeaderButtonClick"
    />
    <div class="main">
     <el-row class="mgb">
        <el-col :span="8">
            <div class="grid-content bg-purple">
                  <span class="name" >科室</span>
                 <el-select v-model="value" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
        </el-col>
           <el-col :span="8">
            <div class="grid-content bg-purple">
                  <span class="name">状态</span>
                 <el-select v-model="value" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
        </el-col>
           <el-col :span="8">
            <div class="clearfix">
                  <span class="name">创建时间</span>
                    <el-date-picker
                    
                    v-model="value6"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
            </div>
        </el-col>
      </el-row>
      <el-row class="mgb">
        <el-col :span="8">
            <div class="grid-content bg-purple">
                  <span class="name">类型</span>
                 <el-select v-model="value" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
        </el-col>
           <el-col :span="8">
            <div class="grid-content bg-purple">
                  <span class="name">创建者</span>
                  <el-input style="width:217px" v-model="input" placeholder="请输入内容"></el-input>
            </div>
        </el-col>
           <el-col :span="8">
            <div class="grid-content bg-purple">
                  <span class="name">关键字 </span>
                  <el-input style="width:350px" v-model="input" placeholder="请输入内容"></el-input>
            </div>
        </el-col>
      </el-row>
       <jw-table-control
      class="mgb"
      float="left"
      :buttons="getTableState()"
      @on-header-button="onHeaderButtonClick"
    />

    <!-- 主体 -->
    <jw-table
      ref="jwTable"
      :data="rows"
      :isSelection=true
      :isRowCheckBox=true
      :isIndex=true
      :pageSize="pageSize"
      :opsList="getTableOperateList()"
      :showPagination="true"
      :totalCount="totalCount"
      :header="getTableHeader()"
      :currentPage="currentPage"
      @onEite="onEite"
      @onDelete='onDelete'

      @on-page-change="onPageChange"
      @on-operate-click="onOperateClick">
    </jw-table>
    </div>
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
    resourcename: '--',
    showname: '--',
    version: '--',
    creatorName: '--',
    creatorName: '--'
  }

  export default {
    data() {

      return {
        totalCount: 0,
        loading: true,
        rows: [ DEFAULT_ROW ],
        currentPage: defaultPageIndex,
        pageSize: staticData.tablePageSize,
        input:'',
        value:'',
        value6:"",
               options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
      }
    },

    created() {

      // this.fetch()
    },

    components: {
      'jw-table': JwTable,
      'jw-table-control': JwTableHeaderControl
    },

    methods: {
      onEite(item){
   
     this.showDialogForEdit(item)
          },
          //显示模态框
    showDialogForEdit(entity) {
      let dialog = this.$refs.dialog;
      let rowEntity = _.clone(entity);
      let { formItemList, formData, rules } = this.getTableAdditionEditConfig(rowEntity);

      delete rowEntity.createDate;
      delete rowEntity.updateDate;
      _.each(rowEntity.languages, x => {
        x.createDate && delete x.createDate;
        x.updateDate && delete x.updateDate;
      });

      dialog
        .show({
          title: "Language Key Editing",
          list: formItemList,
          form: formData,
          rules
        })
        .then(data => {
          rowEntity.resourceKey = data.resourceKey;
          _.each(rowEntity.languages, (language, index) => {
            language.resourceValue = data[`resourceValue_${index}`];
            delete rowEntity[`resourceValue_${index}`];
          });

          this.save(rowEntity, "updateI18nResourceSet");
        })
    },
       onDelete(e){
         console.log(e)
       } ,  
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
      getTableState(){
          return getAppConfig().tableState
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
      //表格数据操作处理函数
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
        //开启loading
        this.showLoading()
        //传入初始页码
        tableModel.setPageIndex(defaultPageIndex)
        //发送请求
        tableModel
          .execute()
          .then((data)=>{
    
            this.totalCount = data.count
            this.rows = data.rows
            this.hideLoading()
          })
          .catch((err)=>{
          
            let lang = i18nService.getOtherLanguageMap()

            this.totalCount = 0
            this.rows = []
            this.hideLoading(true)

            this.$alert(lang['loadingFailAgain'], 'Error').then(()=>{

              this.fetch()
            })
        })
      },

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
      //删除数据  
      delete(row) {
        let lang = i18nService.getOtherLanguageMap()
        let deleteRecodFromServer = (row)=>{
          //给实例对象添加方法
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
        .catch((err)=>{
          
        })
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
//   @import "../../../assets/css/variable.less";

  .resource {

    .name {
      width: 60px;
      display: inline-block;
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
