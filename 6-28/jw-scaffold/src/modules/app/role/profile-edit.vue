<template>
  <div class="panel profile-edit-wrapper" v-loading="loading">
    <jw-panel-title :title="getPanelTitle()" :back="true" @back="exit"/>
    <div class="auth-wrapper">
      <el-tabs type="border-card" v-show="apps.length" v-model="activeTabName">
        <el-tab-pane v-for="app in apps" v-if="app.pms.length" :key="app.key" :name="app.key" :label="app.tabLabel">
          <el-tree
            :ref="'tree_' + app.key"
            :expand-on-click-node="false"
            :default-expand-all="true"
            :default-checked-keys="getDefaultChecked(app.pms)"
            :show-checkbox="true"
            :check-strictly="true"
            :props="treeConfig"
            :data="app.pms"
            @node-click="onTreeClick"
            @check-change="onTreeChecked"
            node-key="id"
            highlight-current
          >
          </el-tree>
        </el-tab-pane>
      </el-tabs>
      <jw-table
        ref="jwTable"
        height="auto"
        v-show="apps.length"
        v-loading="tableLoading"
        @on-selection-change="onActivitySelectionChange"
        :data="activities"
        :isSelection="true"
        :isRowCheckBox="true"
        :header="getTableHeader()"
      />
    </div>
  </div>
</template>

<script>
import JwPanelTitle from "jw_components/panel-title";
import OperateBar from "jw_components/operate-bar";
import i18nService from "jw_services/i18n/index";
import JwTable from "jw_components/table/table";
import baseStore from "jw_stores/common";

import editApps from "jw_models/app/role/edit-apps";
import editRoleActivity from "jw_models/app/role/edit-role-activity";
import editCheckPermission from "jw_models/app/role/edit-check-permission";
import editActivityCheck from "jw_models/app/role/edit-activity-check";

let loadingTimerId = 0;
const DEFAULT_TREE_CONFIG = { children: "children", label: "name" };

export default {
  data() {
    let { lang } = i18nService.getLanguageMap();

    return {
      lang,
      apps: [],
      activities: [],
      activeTabName: "",
      treeConfig: DEFAULT_TREE_CONFIG,

      loading: true,
      tableLoading: false
    };
  },

  created() {

    this.fetch()
  },

  components: {
    "jw-panel-title": JwPanelTitle,
    "jw-table": JwTable,
    "operate-bar": OperateBar
  },
  methods: {
    getDefaultChecked(pms) {
      let treeCheckIds = []
      let children

      for(let i=0,len=pms.length;i<len;i++) {
        if(pms[i].checked) {
          treeCheckIds.push(pms[i].id)
        }

        children = pms[i].children
        for(let j=0,jlen=children.length;j<jlen;j++) {
          if(children[j].checked) {
            treeCheckIds.push(children[j].id)
          }
        }
      }

      return treeCheckIds
    },

    getTableHeader() {

      return [{
        prop: "name",
        display: this.lang["platform.common.name"]
      }]
    },

    showLoading() {

      this.loading = true
    },

    hideLoading(is) {
      clearTimeout(loadingTimerId);

      if (is) {
        return this.loading = false;
      }

      loadingTimerId = setTimeout(() => { this.loading = false; }, 500);
    },

    getParamId() {
      return this.$route.params.id;
    },

    fetch() {
      let roleId = this.getParamId();

      this.showLoading();
      editApps
        .execute(roleId)
        .then(result => {
          this.apps = result;
        })
        .then(() => {
          this.activeTabName = this.apps.length ? this.apps[0].key : "";
          this.hideLoading();
        })
        .catch(error => {
          this.hideLoading(true);
        });
    },

    getPanelTitle() {
      let { lang } = i18nService.getLanguageMap()
      let titles = i18nService.getI18nTitle().title
      let rowData = baseStore.get("role-row-data")

      titles.push(lang['platform.app_profile.rights_profile'])
      titles.push(rowData.name)
      return titles
    },

    onActivitySelectionChange(row) {
      let activityId = row.id;
      let isChecked = row.checked;
      let roleId = this.getParamId();
      let permissionId = this.selectedPm.id;

      this.tableLoading = true;
      editActivityCheck
        .execute({ isChecked, roleId, permissionId, activityId })
        .then(() => {
          setTimeout(() => {
            this.tableLoading = false;
          }, 500);
        })
        .catch(() => {
          this.toggleTableRow(row, !isChecked);
          this.tableLoading = false;
        });
    },

    toggleTableRow(row, isChecked) {
      this.$refs.jwTable.toggleRowSelection(row, isChecked);
    },

    onTreeChecked(data, isChecked) {
      let roleId = this.getParamId();
      let lang = i18nService.getOtherLanguageMap();
      let currentTreeRef = this.$refs[`tree_${this.activeTabName}`][0]

      this.tableLoading = true;
      currentTreeRef.setCurrentKey(data.id)
      editCheckPermission
        .execute({
          roleId,
          isChecked,
          permissionId: data.id
        })
        .then(() => {
          data.checked = isChecked;
          this.onTreeClick(data);
        })
        .catch((error) => {
          currentTreeRef.setChecked(data.id,!isChecked)
          this.tableLoading = false;
          this.hideLoading(true);
          this.$error(error.message || lang["operateError"]);
        });
    },

    onTreeClick(pm, node) {
      if (pm.checked) {
        this.fetchActvity(pm);
      } else {
        this.activities = [];
        _.delay(() => { this.tableLoading = false; }, 500);
      }
    },

    fetchActvity(pm) {
      let lang = i18nService.getOtherLanguageMap();

      this.tableLoading = true;
      editRoleActivity
        .execute({ id: pm.id, roleId: this.getParamId() })
        .then(result => {
          this.selectedPm = pm;
          this.activities = result;
          setTimeout(() => {
            this.tableLoading = false;
          }, 500);
        })
        .catch(() => {
          this.tableLoading = false;
          this.activities = [];
          this.$error(lang["operateError"]);
        });
    },

    exit() {
      this.$router.push({ path: "/app/app/role/index" });
    }
  }
};
</script>

<style lang="less">
@import "../../../assets/css/variable.less";

.profile-edit-wrapper {
  //padding-right: 0 !important;

  .ops-bar {
    padding-right: @jw20px;
  }

  .auth-wrapper {
    margin-top: @jw15px;
    height: calc(~'100% - 55px');
    overflow-y: auto;

    .pm-tree-item {
      line-height: 26px;
    }

    .pm-tree-content {
      vertical-align: middle;
    }

    > div {
      display: inline-block;
      vertical-align: top;
    }

    .el-tabs {
      width: 70%;
    }

    .jw-table {
      width: 29%;
      height: auto;
      padding-left: @jw10px;
      box-sizing: border-box;

      .el-table__body-wrapper {
        overflow-x: hidden;
      }

      .el-table {
        border: 1px solid #ebeef5;

        td,
        th {
          padding: 8px 0;
        }
      }
    }

    .el-table__header-wrapper {
      .el-checkbox__inner {
        display: none;
      }
    }
  }
}
</style>
