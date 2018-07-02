<template>
<el-dialog title="Choose users" class="user-dialog" :width="'80%'" :visible.sync="visible">
  <div class="panel-left">
    <el-tree
      :data="treeOrgs"
      :props="defaultProps"
      :expand-on-click-node="false"
      :default-expanded-keys="expanedKey"
      ref="tree"
      node-key="id"
      highlight-current
      @node-click="onTreeOrgClick">
    </el-tree>
  </div>
  <div class="panel-right" v-loading="loading">
    <div class="right-header">
      <el-input v-model="username" :placeholder="lang['platform.common.name']+'...'" prefix-icon="el-icon-search" @input="onSearch" />
    </div>
    <jw-table
      ref="table"
      :data="users"
      :currentPage = "1"
      :isSelection="true"
      :pageSize="pageSize"
      :isRowCheckBox="true"
      :showPagination="true"
      :totalCount="totalCount"
      :header="getTableHeader()"
      @on-page-change="onTablePageChange"
    />
  </div>
  <div slot="footer" class="dialog-footer">
    <el-button @click="cancel" size="mini">{{this.lang['platform.common.cancel']}}</el-button>
    <el-button type="primary" size="mini" @click="confirm">{{this.lang['platform.common.ok']}}</el-button>
  </div>
</el-dialog>
</template>

<script>
import i18nService from "jw_services/i18n/index"
import JwTable from "jw_components/table/table"

import treeOrgModel from "./tree-org-model"
import userModel from "./users-model"

let currentUsers = []
let firstPageIndex = 1
let selectedOrgId = 0
let timerLoadingId = 0

export default {
  data() {
    let { lang } = i18nService.getLanguageMap()

    return {
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      visible: false,
      loading: false,
      expanedKey:[],
      totalCount: 0,
      pageSize: 10,
      username: '',
      treeOrgs: [],
      users: [],
      lang
    }
  },

  components: {
    'jw-table': JwTable
  },

  created() {

    this.search = _.debounce(this.search,500)
  },

  methods: {
    cancel: _.noop,
    confirm: _.noop,

    show(users) {
      this.visible = true
      this.loading = true
      this.username = ''

      currentUsers = users

      return new Promise((resolve,reject)=>{
        this
        .fetchTree()
        .catch(reject)

        this.cancel = ()=>{
          this.hide()
        }

        this.confirm = ()=>{
          this.hide()
          let selections = this.$refs.table.getSelection()
          resolve(selections)
        }
      })
    },

    hide() {

      this.visible = false
    },

    onTablePageChange(pageIndex) {

      this.fetchUser(selectedOrgId,pageIndex)
    },

    onSearch(value) {
      this.showLoading();
      this.search(value);
    },

    search(value) {

      this.fetchUser(selectedOrgId,1,value)
    },

    fetchUser(orgId,pageIndex,userName) {

      this.showLoading()
      return (
        userModel
        .execute(
          pageIndex||firstPageIndex,
          orgId,
          userName||this.username
        ).then((result)=>{

          this.totalCount = result.count;
          _.each(result.rows,(user)=>{
            user.checked = currentUsers.indexOf(user.id) > -1
          });
          this.users = result.rows;
          userName && (this.username = userName);
          this.hideLoading();
        }).catch(()=>{
          this.hideLoading();
        })
      )
    },

    showLoading() {

      this.loading = true
    },

    hideLoading() {
      clearTimeout(timerLoadingId)
      timerLoadingId = setTimeout(()=>{this.loading=false},500)
    },

    getFirstOrg(treeOrgs) {

      let topOrg = treeOrgs[0]
      let orgChild = topOrg.children[0]

      return orgChild.id
    },

    fetchTree() {

      return (
        treeOrgModel
        .execute()
        .then((result)=>{
          if(_.isArray(result) && result.length) {
            this.treeOrgs = result
          }else{
            Promise.reject()
          }
        })
        .then(()=>{
          selectedOrgId = this.getFirstOrg(this.treeOrgs)
          return this.fetchUser(selectedOrgId)
        })
        .then(()=>{
          this.$refs.tree.setCurrentKey(selectedOrgId)
          this.expanedKey = [ selectedOrgId ]
        })
      )
    },

    onTreeOrgClick(treeNode) {

      if(selectedOrgId !== treeNode.id) {
        selectedOrgId = treeNode.id
        this.fetchUser(selectedOrgId)
      }
    },

    getTableHeader() {

      return [{
        prop: 'name',
        display: this.lang['platform.common.name']
      },{
        prop: 'mobile',
        display: 'Mobile'
      },{
        prop: 'email',
        display: 'Email'
      }]
    }
  }
};
</script>

<style lang="less">
@import "../../assets/css/variable.less";

.user-dialog {
  .el-dialog__body {
    height: 28.571rem;
    padding: @jw15px;
  }

  .el-table::before {
    height: 0;
  }

  .right-header {
    text-align: right;
    padding-bottom: @jw10px;
    border-bottom: 1px solid @seperate-line;

    .el-input__icon {
      line-height: 2.2rem;
    }

    .el-input__inner {
      height: 2.2rem;
    }

    .el-input {
      width: 14.285rem;
    }
  }
  
  .panel-left {
    width: 30%;
    display: inline-block;
    vertical-align: top;
    height: 100%;
    border-right: 1px solid @seperate-line;
    overflow-y: auto;
  }

  .panel-right {
    height: 100%;
    width: calc(~'100% - 31%');
    display: inline-block;
    vertical-align: top;

    .jw-table {
      height: calc(~'100% - 42px');
    }
  }

  .el-button {
    padding-left: 30px;
    padding-right: 30px;
  }
}
</style>