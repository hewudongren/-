<template>
  <div class="panel">
    <div class="search-bar">
      <jw-panel-title :title="getPanelTitle()" :back="true" @back="exit"/>
      <div class="app-selecter">
        <el-select :value="appId" placeholder="App..." @change="onAppChange">
          <el-option v-for="app in apps" :key="app.id" :label="app.name" :value="app.id"></el-option>
        </el-select>
        <el-button size="mini" @click="add" icon="el-icon-plus">{{$root.langs['platform.common.add']}}</el-button>
      </div>
    </div>
    <jw-table
      v-loading="loading"
      :header="getTableHeader()"
      :data="tableData"
      :opsList="getTableOperateList()"
      class="role-table"
      @on-switch-change="onSwitchChange"
      @on-operate-click="onOperateClickHandler"
    />
  </div>
</template>

<script>
import JwPanelTitle from "jw_components/panel-title";
import i18nService from "jw_services/i18n/index";
import JwTable from "jw_components/table/table";

//import JwUserDialog from "jw_components/user-dialog/index";

import appOnlyModel from "jw_models/app/role/app-only";
import roleReadModel from "jw_models/app/role/role-read";
import roleSwitch from "jw_models/app/role/role-switch";
import roleDelete from "jw_models/app/role/role-delete";
//import assignUsers from "jw_models/app/role/assign-users";

import baseStore from "jw_stores/common";

const DEFAULT_ROWS = []

let clearTimerId = 0;

export default {
  data() {
 
    return {
      loading: true,
      tableData: DEFAULT_ROWS, //[],
      appId: '',
      apps: []
    };
  },

  components: {
    "jw-table": JwTable,
    "jw-panel-title": JwPanelTitle,
    //"jw-user-dialog": JwUserDialog
  },

  created() {

    this.fetch();
  },

  methods: {

    exit() {

      this.$router.push({path: '/app/app/index'})
    },

    getTableOperateList() {
      let otherLang = i18nService.getOtherLanguageMap()
      let { lang } = i18nService.getLanguageMap()

      return {
        list: [{
          icon: 'el-icon-delete',
          display: otherLang.delete,
          type: 'delete',
          isVisible(row) { return !row.isInner }
        },
        // {
        //   display: otherLang.chooseUser,
        //   icon: 'icon-users',
        //   type: 'choose'
        // },
        {
          display: lang['platform.app_role.editRole'],
          icon: 'el-icon-edit',
          type: 'edit'
        },{
          icon: 'icon-lock',
          display: lang['platform.app_profile.rights_profile'],
          type: 'rightsProfile'
        }]
      }
    },

    onOperateClickHandler(menuItem,rowData) {

      // if(menuItem.type ==='choose') {
      //   this.showUsers(rowData)

      if(menuItem.type === 'edit') {
        this.goEdit(rowData)
      }else if(menuItem.type === 'delete') {
        this.destroy(rowData)
      }else if(menuItem.type === 'rightsProfile') {
        this.goProfileEdit(rowData)
      }
    },

    onAppChange(data) {
      let lang = i18nService.getOtherLanguageMap()

      this.appId = data
      baseStore.set('row-data',{ id: this.appId })
      this.showLoading()
      roleReadModel
        .execute(this.appId)
        .then(result => {
          this.tableData = result;
          this.hideLoading();
        })
        .catch(() => {
          this.hideLoading(true);
          this.$error(lang["operateError"]);
        });
    },

    showLoading() {
      this.loading = true;
    },

    hideLoading(is) {
      clearTimeout(clearTimerId);
      if (is) {
        this.loading = false;
      } else {
        clearTimerId = setTimeout(() => { this.loading = false; }, 500);
      }
    },

    getTableHeader() {
      let { lang } = i18nService.getLanguageMap();
      let otherLang = i18nService.getOtherLanguageMap();
      let that = this;

      return [
        {
          prop: "code",
          display: lang["platform.common.code"]
        },{
          prop: "name",
          display: lang["platform.common.name"]
        },{
          prop: "userNames",
          display: lang["platform.common.members"]
        },{
          display: lang["platform.common.isAvailable"],
          width: i18nService.isChinese()? 60:100,
          formatter(row) {
            return (
              <el-switch
                value={row.isValid}
                active-color="#13ce66"
                disabled={!!row.isInner}
                onChange={state => {
                  that.onSwitchChange(state, row);
                }}/>
            )
          }
        }
      ];
    },

    onSwitchChange(state, row) {
      let lang = i18nService.getOtherLanguageMap();
      let newState = !row.isValid;
      let param = _.clone(row);

      param.isValid = newState;
      roleSwitch
        .execute(param)
        .then(() => {
          row.isValid = newState;
          this.tableData = [].concat(this.tableData);
        })
        .catch(() => {
          this.$error(lang["operateError"]);
        })
    },

    getPanelTitle() {
      let { lang } = i18nService.getLanguageMap()
      let titles = i18nService.getI18nTitle().title
      let appName = this.getCurrentAppName()

      titles.push(lang['platform.app_role.role'])
      if(appName) {
        titles.push(appName)
      }

      return titles
    },

    getCurrentAppName() {

      let currentApp = _.find(this.apps,(app)=>{

        return app.id === this.appId
      })

      if(currentApp) {
        return currentApp.name || null
      }

      return null
    },

    fetch() {
      let lang = i18nService.getOtherLanguageMap()
      let selectedRowData = baseStore.get('row-data')
      let appId = selectedRowData.id

      this.showLoading()
      Promise.all([appOnlyModel.execute(), roleReadModel.execute(appId)])
        .then(datas => {
          let apps = datas[0];
          let tableData = datas[1];

          this.appId = appId;
          this.apps = apps; 
          this.tableData = tableData;
          this.hideLoading();
        })
        .catch(() => {
          this.tableData = [];
          this.hideLoading(true);
          this.$alert(lang["loadingFailAgain"], "Error").then(() => {
            this.fetch();
          });
        });
    },

    goEdit(row) {
      baseStore.set("role-row-data", row);
      this.$router.push({ path: `/app/app/role/edit/${row.id}` });
    },

    goProfileEdit(row) {
      baseStore.set("role-row-data", row);
      this.$router.push({ path: `/app/app/profile/edit/${row.id}`})
    },

    // showUsers(row) {
    //   let roleId = row.id
    //   let userIds = row.userIds
    //   let userDialog = this.$refs.userDialog

    //   userDialog
    //   .show(userIds) 
    //   .then((users)=>{
    //     let ids = _.map(users,(u)=>{ return u.id })

    //     return assignUsers.execute({ userIds: ids, roleId })
    //   })
    //   .then(()=>{

    //     this.fetch()
    //   })
    //   .catch((error)=>{
    //     let lang = i18nService.getOtherLanguageMap()
    //     this.$error(lang['operateError'])
    //   })
    // },

    add() {

      this.$router.push({ path: "/app/app/role/edit/0" });
    },

    destroy(row) {
      let lang = i18nService.getOtherLanguageMap()

      this.$alert(lang["deleteWarning"], "Warning").then(() => {
        return roleDelete.execute(row)
      })
      .then(() => {
        let index = _.findIndex(this.tableData, one => {
          return one === row
        })

        this.tableData.splice(index, 1)
      })
      .catch((error) => {
        (error !== 'cancel') && this.$error(lang["operateError"])
      })
    }
  }
};
</script>
<style lang="less">
@import "../../../assets/css/variable.less";

.search-bar {
  position: relative;

  .app-selecter {
    position: absolute;
    right: 0;
    bottom: 0.714rem;

    .el-input__inner {
      height: 2rem;
      line-height: 2rem;
    }
  }
}

.role-table {
  .role-ops {
    .el-icon-edit {
      margin-left: @jw5px;
    }

    .el-icon-delete {
      margin-left: @jw5px;
    }
  }

  .el-switch {
    height: auto;
  }
}

</style>

