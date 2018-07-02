<template>
<div class="edit-wrapper panel">
  <jw-panel-title :title="getPanelTitle()" :back="true" @back="back"/>
  <div class="permission-edit" v-loading="loading">
    <div class="panel-tree">
      <jw-table-control :title="lang['platform.app_pm.treeTitle']" />
      <el-tree
        v-show="appTreeData.length"
        :render-content="renderTreeRow"
        :expand-on-click-node="false"
        :default-expand-all="true"
        :props="treeConfig"
        :data="appTreeData"
        @node-click="onTreeRowClick"
        node-key="id"
        highlight-current>
      </el-tree>
    </div>
    <div class="panel-main" v-loading="mainLoading" v-show="mainVisible">
      <div class="middle-table">
        <jw-table-control :title="lang['platform.app_pm.actionTitle']" :buttons="getTableControl()" @on-header-button="onCreateActivity"/>
        <jw-table
          :data="tableActivities"
          :header="getTableHeader()"
          height="auto"
          highlightCurrentRow
          @on-edit="onActivityEdit"
          @on-delete="onActivityDelete"
          @on-row-click="onActivityTableSelection"/>
      </div>
      <div class="right-collapse">
        <jw-table-control :title="lang['platform.app_pm.apiTitle']" />
        <jw-tab-collapse-table
          v-loading="collapseLoading"
          :services="appServices"
          tabLabelAttr="basepath"
          collapseLabelAttr="collapse"
          collapsesTabAttr="apis"
          tableCollapseAttr="list"
          type="border-card"
          @on-collapse-selection-change="onApiChange"
        />
      </div>
    </div>
  </div>
  <jw-permission-dialog ref="permissionDialog"/>
</div>
</template>

<script>
import permissionTree from "jw_models/app/permission/permission-tree";
import permissionActvt from "jw_models/app/permission/permission-table";
import permissionActivity from "jw_models/app/permission/permission-activity";
import permissionCreate from "jw_models/app/permission/permission-create";
import permissionDelete from "jw_models/app/permission/permission-delete";
import permissionUpdate from "jw_models/app/permission/permission-update";
import acitivityCreation from "jw_models/app/permission/activity-creation";
import acitivityApiChange from "jw_models/app/permission/activity-api-change";
import activityDelete from "jw_models/app/permission/activity-delete";
import activityUpdate from "jw_models/app/permission/activity-update";

import TabCollapseTable from "jw_modules/app/widgets/tab-collapse-table";
import PermissionDialog from "jw_modules/app/widgets/permission-dialog-ops";

import JwTableControl from "jw_components/table/control-header";
import JwPanelTitle from "jw_components/panel-title";
import i18nService from "jw_services/i18n/index";
import JwTable from "jw_components/table/table";

import getPermissionConfig from "./permission-config";
import serviceApi from "jw_models/app/service-api";
import appStore from 'jw_stores/common';

const DEFAULT_TREE_CONFIG = {
  children: "children",
  label: "name"
};

let collapseServices = [];
let loadingTimerId = 0;
let selectedTreeRow = {};
let selectedActivity = {};

export default {
  data() {
    let { lang } = i18nService.getLanguageMap()

    return {
      appTreeData: [],
      treeConfig: DEFAULT_TREE_CONFIG,

      tableActivities: [], //DEFAULT_TABLE_DATA,

      appServices: [], // app 对应的 services: [{name: 's-a', apis: [{code: 1, checked: true}]}]
      lang,
      loading: true,
      mainLoading: false,
      mainVisible: false,
      collapseLoading: false
    };
  },

  created() {

    this.fetch();
  },
  components: {
    "jw-table": JwTable,
    "jw-table-control": JwTableControl,
    "jw-tab-collapse-table": TabCollapseTable,
    "jw-panel-title": JwPanelTitle,
    "jw-permission-dialog": PermissionDialog
  },
  methods: {
    back() {
      this.$router.push({ path: "/app/app/index" });
    },

    fetch() {
      let appId = this.getParamId();

      this.showLoading();
      Promise.all([
        permissionTree.execute(appId),
        serviceApi.requestServiceApi(appId)
      ]).then(datas => {
          let servicesApis = datas[1];

          this.appTreeData = datas[0];
          collapseServices = this.servicesApiFormatter(
            servicesApis[0],
            servicesApis[1]
          );
          this.initCollapse();
          this.hideLoading();
        })
        .catch(() => {
          let lang = i18nService.getOtherLanguageMap();

          this.hideLoading(true);
          this.$alert(lang["loadingFailAgain"], "Error").then(() => {
            this.fetch();
          });
        });
    },

    initCollapse() {
      this.appServices = []
    },

    showLoading() {
      clearTimeout(loadingTimerId);
      this.loading = true;
    },

    hideLoading(isImmediately) {
      if (isImmediately) {
        this.loading = false;
      } else {
        loadingTimerId = setTimeout(() => {
          this.loading = false;
        }, 500);
      }
    },

    getPanelTitle() {
      let { lang } = i18nService.getLanguageMap()
      let titles = i18nService.getI18nTitle().title
      let currentApp = appStore.get("row-data")

      titles.push(lang['platform.app_app.permission'])
      titles.push(currentApp.name)
      return titles
    },

    getTableControl() {
      return getPermissionConfig().tableControl;
    },

    getTableHeader() {
      return getPermissionConfig().editTableHeader;
    },

    getParamId() {
      return this.$route.params.id;
    },

    servicesApiFormatter(appApis, services) {
      let appServices = []
      let collapseIndex = 0
      let collapseSatisfiedApis = []

      _.forEach(services, svc => {
        let satisfiedApis = [];

        _.forEach(svc.apis, api => {
          api.checked = false;
          if (appApis.indexOf(api.id) != -1) {
            satisfiedApis.push(api);
          }
        });

        if (satisfiedApis.length) {
          satisfiedApis.sort(function(a, b) {
            return a.urlRegex < b.urlRegex ? -1 : 1;
          });

          satisfiedApis.forEach(item => {
            let collapse = item.urlRegex.replace(/[^/]+$/, "");
            let existModule = _.find(collapseSatisfiedApis, x => {
              return x.collapse == collapse;
            });

            if (existModule) {
              existModule.list.push(item);
            } else {
              collapseSatisfiedApis.push({ collapse, list: [item], __id: collapseIndex++ });
            }
          });

          svc.apis = collapseSatisfiedApis;
          appServices.push(svc);
        }
      });

      return appServices;
    },

    isRoot(node) {
      let rootId = 0;

      return node.id === rootId;
    },

    onTreeRowClick(pm, node, nodeDom) {
      // 如果是顶级节点则不能添加  acitivity
      if (this.isRoot(pm)) {
        this.mainLoading = false;
        this.mainVisible = false;
        return;
      }
      let delayMainLoadingHide = _.debounce(()=>{
        this.mainLoading = false
      },500)

      this.mainVisible = true;
      this.mainLoading = true;
      //this.showLoading();
      this.initCollapse();
      permissionActvt.setQueryId(pm.id);
      permissionActvt
        .execute()
        .then(data => {
          this.tableActivities = data;
          this.mainVisible = true;
          selectedTreeRow = pm;
          //this.hideLoading();
          delayMainLoadingHide();
        })
        .catch(() => {
          let lang = i18nService.getOtherLanguageMap();

          this.tableActivities = [];
          this.appServices = [];
          this.mainLoading = false;
          //this.hideLoading(true);
          this.$error(lang["loadingFail"]);
        });
    },

    onActivityTableSelection(row) {
      let id = row.id;

      this.collapseLoading = true;
      permissionActivity
        .execute(id)
        .then(result => {
          let activityApiIds = result;

          collapseServices.forEach(x => {
            x.apis.forEach(a => {
              a.list.forEach(item => {
                item.checked = activityApiIds.indexOf(item.id) != -1;
              });
            });
          });

          selectedActivity = row;
          this.appServices = [].concat(collapseServices);
          setTimeout(() => {
            this.collapseLoading = false;
          }, 500);
        })
        .catch(error => {
          let lang = i18nService.getOtherLanguageMap();

          this.collapseLoading = false;
          this.$error(lang["loadingFail"]);
        });
    },

    onCreateActivity() {
      let acitivityDialog = this.$refs.permissionDialog;
      let lang = i18nService.getOtherLanguageMap();

      acitivityDialog
        .showAdditionTableDialog()
        .then(data => {
          let params = _.extend({ permissionId: selectedTreeRow.id }, data);
          this.showLoading();
          return acitivityCreation.execute(params);
        })
        .then(result => {
          this.tableActivities.unshift(result);
          this.hideLoading();
        })
        .catch(error => {
          this.hideLoading(true);
          error !== "cancel" && this.$error(lang["operateError"]);
        });
    },

    onActivityEdit(row) {
      let permissionDialog = this.$refs.permissionDialog;
      let lang = i18nService.getLanguageMap();

      row = _.clone(row);
      permissionDialog
        .showEditTableDialog(row)
        .then(data => {
          return activityUpdate.execute(data);
        })
        .then(() => {
          let index = _.findIndex(this.tableActivities, ac => row.id === ac.id);
          this.tableActivities.splice(index, 1, row);
        })
        .catch(error => {
          error !== "cancel" && this.$error(lang["operateError"]);
        });
    },

    onActivityDelete(row) {
      let lang = i18nService.getOtherLanguageMap();

      this.$alert(lang["deleteWarning"], "Warning")
        .then(() => {
          this.showLoading();
          return activityDelete.execute(row.id);
        })
        .then(() => {
          let acitivityIndex = _.find(this.tableActivities, ta => {
            return ta.id === row.id;
          });

          this.tableActivities.splice(acitivityIndex, 1);
          this.initCollapse();
          this.hideLoading();
        })
        .catch(error => {
          this.hideLoading(true);
          error !== "cancel" && this.$error(lang["operateError"]);
        });
    },

    add(parentNode) {
      let appId = this.getParamId();
      let dialog = this.$refs.permissionDialog;
      let lang = i18nService.getOtherLanguageMap();
      let newData = { appId, children: [], parentId: parentNode.id };

      dialog
        .showAdditionTreeDialog()
        .then(data => {
          let sameCode = parentNode.children.filter(x => {
            return x.code == data.code;
          });

          if (_.isEmpty(sameCode)) {
            this.showLoading();
            return permissionCreate.execute(_.extend(newData, data));
          } else {
            this.$warning(lang["codeRepeat"]);
            return Promise.reject(null);
          }
        })
        .then(result => {
          newData.id = result.id;
          parentNode.children.push(newData);
          this.hideLoading();
        })
        .catch(error => {
          this.hideLoading(true);
          error !== "cancel" && this.$error(error.message || lang["operateError"]);
        });
    },

    edit(data, node) {
      let parentNode = node.parent.data;
      let permissionDialog = this.$refs.permissionDialog;
      let lang = i18nService.getOtherLanguageMap();
      let editData = {};

      data = _.clone(data);
      permissionDialog
        .showEditionTreeDialog(data)
        .then(inputs => {
          editData = _.extend(data, inputs);

          let sameCode = _.filter(parentNode.children, pc => {
            if (pc.id === editData.id) {
              return false;
            } else {
              return pc.code === editData.code;
            }
          });

          if (_.isEmpty(sameCode)) {
            this.showLoading();
            return permissionUpdate.execute(editData);
          } else {
            return Promise.reject({ message: lang["codeRepeat"] });
          }
        })
        .then(() => {
          let index = _.findIndex(parentNode.children, pc => {
            return pc.id === editData.id;
          });
          parentNode.children.splice(index, 1, editData);
          this.hideLoading();
        })
        .catch(error => {
          this.hideLoading(true);
          error !== "cancel" &&
            this.$error(error.message || lang["operateError"]);
        });
    },

    destroy(data, node) {
      let parent = node.parent;
      let lang = i18nService.getOtherLanguageMap();

      this.$alert(lang["deleteWarning"], "Warning")
        .then(() => {
          this.showLoading();
          return permissionDelete.execute(data.id);
        })
        .then(() => {
          let currDataIndex = _.findIndex(parent.data.children, x => {
            return x.id == data.id;
          });

          parent.data.children.splice(currDataIndex, 1);
          this.tableActivities.length = 0;
          this.initCollapse();
          this.hideLoading();
        })
        .catch(error => {
          this.hideLoading(true);
          error !== "cancel" && this.$error(lang["operateError"]);
        });
    },

    onApiChange(apiRow, contxt) {
      let lang = i18nService.getOtherLanguageMap();
      let activityId = selectedActivity.id;
      let action = apiRow.checked ? "add" : "delete";
      let apiId = apiRow.id;

      acitivityApiChange
        .execute({
          action,
          apiId,
          activityId
        })
        .then(() => {
          this.$success(lang["operateSuccess"]);
        })
        .catch(() => {
          contxt.toggleRowSelection(apiRow, !apiRow.checked);
          this.$error(lang["operateError"]);
        });
    },

    renderTreeRow(createElement, { node, data, store }) {
      return (
        <div class="pm-tree-item">
          <span>{data.name}</span>
          <div class="pm-ops">
            <i
              class="icon-addition"
              onClick={e => {
                e.stopPropagation();
                this.add(data);
              }}
            />
            {data.id !== 0 && (
              <i
                class="icon-edit"
                onClick={e => {
                  this.edit(data, node);
                  e.stopPropagation();
                }}
              />
            )}
            {data.id !== 0 && (
              <i
                class="icon-remove"
                onClick={e => {
                  this.destroy(data, node);
                  e.stopPropagation();
                }}
              />
            )}
          </div>
        </div>
      );
    }
  }
};
</script>

<style lang="less">
.edit-wrapper {
  padding-right: 0 !important;

  .permission-edit {
    padding-right: 0;
    height: calc(~"100% - 50px");
    position: relative;
    margin-top: 1.071rem;
  }

  .pm-tree-item {
    width: calc(~"100% - 25px");
    display: inline-block;

    .pm-ops {
      float: right;

      i {
        margin-left: 5px;
        vertical-align: middle;
      }
    }
  }

  .panel-tree {
    position: absolute;
    box-sizing: border-box;
    width: 300px;
    border-right: 1px solid #cbe6d1;
    overflow-y: auto;
    height: 100%;
    padding-right: 10px;
    padding-bottom: 10px;

    .control-header {
      border-bottom: none;
    }
  }

  .panel-main {
    margin-left: 300px;
    overflow-y: auto;
    height: 100%;
    padding-right: 20px;

    .middle-table {
      display: inline-block;
      width: 400px;
      vertical-align: top;
      box-sizing: border-box;
      padding: 0 10px;
    }

    .right-collapse {
      display: inline-block;
      width: calc(~"100% - 405px");
      vertical-align: top;
      box-sizing: border-box;

      .control-header {
        border-bottom: none;
      }

      .el-table__header-wrapper {
        .el-table-column--selection {
          .cell {
            display: none;
          }
        }
      }
    }
  }
}

.permission-edit {
  .panel-title {
    font-size: 14px;
  }
}
</style>
