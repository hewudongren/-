<template>
  <div class="panel i18n-panel">
    <jw-panel-title :title="getTitle()" />
    <div class="i18n-wrapper" v-loading="loading">
      <div class="panel-left">
        <el-tree
          default-expand-all
          :render-content="renderTreeContent"
          :expand-on-click-node="false"
          :props="defaultProps"
          :data="treeGroups"
          highlight-current
          node-key="id"
          ref="tree"
          @node-click="onTreeClick">
        </el-tree>
      </div>
      <div class="panel-right">
        <jw-table-control :buttons="getTableConfig()" @on-header-button="onAddition" @on-input-change="onChangeHandler"/>
        <jw-table
          v-loading="tableLoading"
          :data="result.rows"
          :pageSize="pageSize"
          :showPagination="true"
          :header="getTableHeader()"
          :totalCount="result.count"
          :currentPage="pageIndex"
          @on-page-change="onPageChange"
        />  
      </div>
    </div>
    <jw-dialog ref="dialog" />
  </div>
</template>

<script>

const DEFAULT_PROPS = {
  children: "children",
  label: "groupName"
};
let parentId = 0;
let rootGroups = { id: 0, groupName: "ROOT", children: [] };

import i18nService from "jw_services/i18n/index";
import util from "jw_common/util";

import staticData from "jw_common/data";
import i18nModel from "jw_models/i18n/index";
import tableModel from "jw_models/i18n/table";
import i18nSaveModel from "jw_models/i18n/save";
import treeGroupModel from "jw_models/i18n/save-tree-group";
import treeDeleteModel from "jw_models/i18n/delete-tree";
import tableRowDeleteModel from "jw_models/i18n/delete-table-row";

import Table from "jw_components/table/table";
import PanelTitle from "jw_components/panel-title";
import TableControlHeader from "jw_components/table/control-header";
import Dialog from "jw_components/dialog";

export default {
  data() {
    return {
      pageIndex: 1,
      loading: true,
      tableLoading: false,
      defaultProps: DEFAULT_PROPS,
      result: { count: 0, rows: [] },
      pageSize: staticData.tablePageSize,
      treeGroups: [{ id: 0, groupName: "ROOT", children: [] }],

      selectedGroup: null,
      languageCategories: []
    };
  },

  created() {
    this.fetch();

    this.delaySearchHandler = _.debounce(this.fetchTable, 500);
  },

  components: {
    "jw-table": Table,
    "jw-dialog": Dialog,
    "jw-panel-title": PanelTitle,
    "jw-table-control": TableControlHeader
  },

  methods: {

    getTableConfig() {
      let { lang } = i18nService.getLanguageMap()
      let otherLang = i18nService.getOtherLanguageMap()

      return [{
        type: 'input',
        icon: 'el-icon-search',
        placeholder: otherLang.key
      },{
        icon: 'el-icon-plus',
        txt: lang["platform.common.add"]
      }]
    },

    onPageChange(pageIndex) {
      this.pageIndex = pageIndex;
      this.fetchTable().catch(() => {
        this.pageIndex = pageIndex - 1;
      });
    },

    onAddition() {
      this.showDialogForAddition();
    },

    onChangeHandler(value) {
      this.pageIndex = 1;
      this.tableLoading = true;
      tableModel.setKeyword(value);
      this.delaySearchHandler();
    },

    onTreeClick(group) {
      
      if(this.selectedGroup !== group) {
        this.selectedGroup = group;
        tableModel.setKeyword('');
        this.fetchTable();
      }
    },

    fetch() {
      let lang = i18nService.getOtherLanguageMap()
      
      this.loading = true
      i18nModel
        .fetchI18n()
        .then(([i18nGroup, i18nLanguageSet]) => {
          this.treeGroups = [i18nGroup];
          this.languageCategories = i18nLanguageSet;
          this.loading = false;
        })
        .then(() => {
          this.initDefaultSelected();
        })
        .catch(error => {
          this.loading = false;
          this.$alert(lang['loadingFailAgain'],'Error').then(()=>{
            this.fetch()
          })
        });
    },

    getTitle() {
      return i18nService.getI18nTitle().title;
    },

    initDefaultSelected() {
      let treeGroups = this.treeGroups;
      let selectedTreeRow;

      tableModel.setKeyword('');
      if (
        treeGroups.length &&
        _.isArray(treeGroups[0].children) &&
        treeGroups[0].children.length
      ) {
        selectedTreeRow = treeGroups[0].children[0];
        this.selectedGroup = selectedTreeRow;
        this.fetchTable();
        _.delay(()=>{
          this.$refs.tree.setCurrentKey(selectedTreeRow.id);
        })
      }
    },

    deleteTableRow(row) {
      let lang = i18nService.getOtherLanguageMap()
      let hideTableLoading = _.debounce(()=>{this.tableLoading=false},500)

      this.$alert(lang["deleteWarning"], "Warning").then(() => {
          this.tableLoading = true;
          return tableRowDeleteModel.execute(row.id);
        })
        .then(() => {
          let index = _.findIndex(this.result.rows, r => {
            return r.id === row.id;
          });
          this.result.rows.splice(index, 1);
          hideTableLoading()
        })
        .catch(error => {
          error !== "cancel" && this.$error(lang["operateError"]);
        });
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

    showDialogForAddition() {
      let dialog = this.$refs.dialog;
      let { formItemList, formData, rules } = this.getTableAdditionEditConfig();

      dialog
        .show({
          title: "Language Key Addition",
          list: formItemList,
          form: formData,
          rules
        })
        .then(data => {
          let languages = [];

          formItemList.shift();
          languages = _.map(formItemList, item => {
            return {
              name: item.name,
              languageCode: item.languageCode,
              resourceValue: data[item.prop]
            };
          });

          this.save(
            {
              resourceKey: data.resourceKey,
              languages,
              resourceGroup: this.selectedGroup.groupCode
            },
            "createI18nResourceSet"
          );
        })
        .catch(() => {});
    },

    getTableAdditionEditConfig(entity) {
      let otherLang = i18nService.getOtherLanguageMap();
      let { lang } = i18nService.getLanguageMap();
      let formData = { resourceKey: "" };
      let rules = {};
      let formItemList = this.languageCategories.map((x, index) => {
        let key = `resourceValue_${index}`;

        formData[key] = entity ? entity[key] : "";
        rules[key] = [{ required: true, message: otherLang.notEmpty }]
        return {
          languageCode: x.code,
          name: x.name,
          prop: key
        };
      });

      rules["resourceKey"] = [{ required: true, message: otherLang.notEmpty }];
      entity && (formData.resourceKey = entity.resourceKey);
      formItemList.unshift({
        name: lang["platform.i18n.key"],
        prop: "resourceKey"
      });

      return { formData, formItemList, rules };
    },

    save(entity, urlSuffix) {
      let lang = i18nService.getOtherLanguageMap();

      this.tableLoading = true;
      i18nSaveModel
        .execute(urlSuffix, entity)
        .then(() => {
          tableModel.setKeyword('');
          return this.fetchTable();
        })
        .catch((errorData) => {
          this.tableLoading = false;
          this.$error(errorData.message || lang["operateError"]);
        });
    },

    getTableHeader() {
      let { lang } = i18nService.getLanguageMap();
      let otherLang = i18nService.getOtherLanguageMap();
      let headers = [
        {
          prop: "resourceKey",
          display: lang["platform.i18n.key"]
        }
      ];

      if (_.isEmpty(this.languageCategories)) {
        return [];
      }

      _.each(this.languageCategories, (category, index) => {
        headers.push({
          display: category.name,
          prop: `resourceValue_${index}`
        });
      });

      headers.push({
        display: lang["platform.common.ops"],
        width: 60,
        formatter: (row) => {
          return (
            <div class="col-ops">
              <i class="el-icon-edit" title={otherLang.edit} onClick={e => {
                this.showDialogForEdit(row);
                e.stopPropagation();}}/>
              <i class="el-icon-delete" title={otherLang.delete} onClick={e => {
                this.deleteTableRow(row);
                e.stopPropagation();}}/>
            </div>
          )
        }
      })

      return headers
    },

    fetchTable() {
      let groupCode = this.selectedGroup.groupCode;

      this.tableLoading = true;
      return tableModel
        .execute(this.pageIndex, groupCode)
        .then(result => {
          _.each(result.rows, x => {
            let langs = [];

            _.each(this.languageCategories, (c, index) => {
              let language = _.find(x.languages, y => y.languageCode == c.code);

              if (language) {
                langs.push(language);
              } else {
                langs.push({ languageCode: c.code, resourceValue: "" });
              }

              x.name = language ? language.name : null; //for edit
              x[`resourceValue_${index}`] = language
                ? language.resourceValue
                : "";
            });

            x.languages = langs;
          });

          this.result = result;
        })
        .then(() => {
          
          setTimeout(() => { this.tableLoading = false; }, 500)
        })
        .catch(() => {
          this.result = { count: 0, rows: [] };
          this.tableLoading = false;
        });
    },

    deleteGroup(node) {
      let lang = i18nService.getOtherLanguageMap();

      this.$alert(lang["deleteWarning"], "Warning").then(() => {
          this.loading = true;
          return treeDeleteModel.execute(node.id);
        })
        .then(() => {
          return i18nModel.fetchTreeGroup();
        })
        .then(treeGroup => {
          this.treeGroups = [treeGroup];
          this.loading = false;
        })
        .then(() => {
          //重置树形选择行
          if (this.selectedGroup.id === node.id) {
            this.initDefaultSelected();
          } else {
            this.$refs.tree.setCurrentKey(this.selectedGroup.id);
          }
        })
        .catch(error => {
          this.loading = false;
          (error !== "cancel") && this.$error(error.message || lang["operateError"]);
        });
    },

    editGroup(row) {
      let dialog = this.$refs.dialog;
      let otherLang = i18nService.getOtherLanguageMap();

      row = _.clone(row)
      dialog
        .show({
          title: "Group Editing",
          list: [
            { name: "Code", prop: "groupCode" },
            { name: "Name", prop: "groupName" }
          ],
          form: { groupCode: row.groupCode, groupName: row.groupName },
          rules: {
            groupCode: [ { required: true, message: otherLang.notEmpty } ],
            groupName: [ { required: true, message: otherLang.notEmpty } ]
          }
        })
        .then(data => {
          row.groupName = data.groupName;
          row.groupCode = data.groupCode;

          this.saveTreeGroup(row, "updateI18nGroup");
        }).catch(()=>{})
    },

    addGroup(row) {
      let dialog = this.$refs.dialog
      let otherLang = i18nService.getOtherLanguageMap()

      dialog
        .show({
          title: "Group Addition",
          list: [
            { name: "Code", prop: "groupCode" },
            { name: "Name", prop: "groupName" }
          ],
          form: { groupCode: "", groupName: "", parentCode: row.groupCode },
          rules: {
            groupCode: [ { required: true, message: otherLang.notEmpty } ],
            groupName: [ { required: true, message: otherLang.notEmpty } ]
          }
        })
        .then(data => {
          this.saveTreeGroup(data, "createI18nGroup");
        })
    },

    saveTreeGroup(group, urlSuffix) {
      let lang = i18nService.getOtherLanguageMap();
      let delayHideLoading = _.debounce(()=>{ this.loading=false;},500)

      this.loading = true;
      return treeGroupModel
        .execute(urlSuffix, group)
        .then(() => {
          return i18nModel.fetchTreeGroup();
        })
        .then(treeGroup => {
          this.treeGroups = [treeGroup];
          delayHideLoading();
        })
        .then(() => {
          this.$refs.tree.setCurrentKey(this.selectedGroup.id);
        })
        .catch((error) => {
          this.loading = false;
          this.$error(error.message || lang["operateError"]);
        });
    },

    renderTreeContent(h, { node, data, store }) {
      return (
        <div class="pm-tree-item">
          <span>{data.groupName}</span>
          <div class="pm-ops">
            <i class="icon-addition" onClick={event => {event.stopPropagation();this.addGroup(data);}}/>
            {data.id !== 0 && (<i class="icon-edit" onClick={event => {event.stopPropagation(); this.editGroup(data);}}/>)}
            {data.id !== 0 && (<i class="icon-remove" onClick={event => {event.stopPropagation();this.deleteGroup(data);}}/>)}
          </div>
        </div>
      );
    }
  }
};
</script>

<style lang="less">
@import "../../assets/css/variable.less";

.i18n-panel {
  padding-right: 0 !important;

  .i18n-wrapper {
    height: calc(~"100% - 40px");
  }

  .panel-left {
    display: inline-block;
    box-sizing: border-box;
    width: 300px;
    height: 100%;
    vertical-align: top;
    padding-right: @jw10px;
    padding-top: @jw10px;
    border-right: 1px solid @seperate-line;
  }

  .panel-right {
    vertical-align: top;
    display: inline-block;
    width: calc(~"100% - 305px");
    box-sizing: border-box;
    height: 100%;

    .control-header {
      padding-top: @jw10px;
      padding-right: @jw15px;
    }

    .el-icon-delete {
      margin-left: @jw5px;
    }

    .jw-table {
      height: calc(~"100% - 50px");
    }

    .el-pagination {
      padding-right: @jw15px;
    }
  }

  .pm-tree-item {
    width: calc(~"100% - 25px");
    display: inline-block;
    line-height: 26px;

    .pm-ops {
      float: right;

      >i {
        padding-left: @jw5px;
        vertical-align: middle;
      }
    }
  }
}
</style>
