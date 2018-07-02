<template>
<div class="panel data-dict-wrapper">
  <jw-panel-title :title="getPanelTitle()"/>
  <div class="permission-edit" v-loading="loading">
    <div class="panel-tree">
      <el-tree
        v-show="appTreeData.length"
        :render-content="renderTreeRow"
        :expand-on-click-node="false"
        :default-expand-all="true"
        :props="treeConfig"
        :data="appTreeData"
        @node-click="onTreeRowClick"
        node-key="id"
        highlight-current />
    </div>
    <div class="panel-main">
      <div class="dictionarydef-table">
        <div class="title">{{this.getDictionaryDefTitle()}}</div>
        <jw-table-control
          ref="dictDefTable"
          :buttons="getDictionaryTableControl()"
          @on-input-change="onDictDefSearch"
          @on-header-button="onDictDefAddition"/>
        <jw-table
          v-loading="defTableLoading"
          :header="getDictDefTableHeader()"
          :data="dictionaryDefTableData.rows"
          :totalCount="dictionaryDefTableData.count"
          :showPagination='true'
          highlightCurrentRow
          @on-page-change="onDictDefPageChange"
          @on-row-click="onDictionaryDefTableSelection"/>
      </div>
      <div class="dictionaryval-table">
        <div class="title">{{this.getDictionaryValTitle()}}</div>
        <jw-table-control
          :buttons="getDictionaryTableControl(true)"
          @on-input-change="onDictValSearch"
          @on-header-button="onDictValAddition"/>
        <jw-table
          v-loading='valTableLoading'
          :header="getDictionaryValTableHeader()"
          :data="dictionaryValTableData.rows"
          :totalCount="dictionaryValTableData.count"
          :showPagination='true'
          highlightCurrentRow />
      </div>
    </div>
  </div>
  <jw-dialog ref='dialog'/>
</div>
</template>

<script>
import JwTableControl from "jw_components/table/control-header";
import JwTable from "jw_components/table/table";
import JwPanelTitle from "jw_components/panel-title";
import JwDialog from "jw_components/dialog";

import treeGroupModel from "jw_models/data-dictionary/tree-group";
import dictionaryDef from "jw_models/data-dictionary/dictionary-def";
import dictionaryVal from "jw_models/data-dictionary/dictionary-val";
import dictionaryDefSearch from "jw_models/data-dictionary/dictionary-def-search";
import dictionaryValSearch from "jw_models/data-dictionary/dictionary-val-search";
import dictionartDefSave from "jw_models/data-dictionary/dictionary-def-save";
import dictionaryGroupSave from "jw_models/data-dictionary/dictionary-group-save";
import dictionaryGroupDelete from "jw_models/data-dictionary/dictionary-group-delete";
import dictionaryDefDel from "jw_models/data-dictionary/dictionary-def-del";
import dictionaryValSave from "jw_models/data-dictionary/dictionary-val-save";
import dictionaryValDel from "jw_models/data-dictionary/dictionary-val-del";

import i18nService from "jw_services/i18n/index";

const DEFAULT_TREE_CONFIG = {
  children: "children",
  label: "groupName"
};
let treeRootData = {
  id: 0,
  children: [],
  groupName: "数据字典-分组"
};

let loadingTimerId = 0;
let selectedTreeRow = {};
let selectedActivity = {};

export default {
  data() {
    return {
      appTreeData: [],
      currentTreeNode: "",
      selectedDictDefCode: "",
      treeConfig: DEFAULT_TREE_CONFIG,

      dictionaryDefPageIndex: 1,
      dictionaryDefTableData: { count: 0, rows: [] },

      dictionaryValPageIndex: 1,
      dictionaryValTableData: { count: 0, rows: [] },

      loading: true,
      defTableLoading: false,
      valTableLoading: false
    };
  },

  created() {
    this.fetch();
    this.fetchDefTableForSearch = _.debounce(this.fetchDefTableForSearch, 500);
    this.fetchValTableForSearch = _.debounce(this.fetchValTableForSearch, 500);
  },

  components: {
    "jw-table": JwTable,
    "jw-table-control": JwTableControl,
    "jw-panel-title": JwPanelTitle,
    "jw-dialog": JwDialog
  },

  methods: {
    fetch() {
      this.showLoading();
      treeGroupModel
        .execute()
        .then(treeGroup => {
          treeRootData.children = treeGroup.rows;
          this.appTreeData = [treeRootData];
          this.hideLoading();
        })
        .catch(() => {
          this.hideLoading(true);
        });
    },

    fetchDictionaryDefinition(pageIndex) {
      let lang = i18nService.getOtherLanguageMap();
      let hideDefTableLoading = _.debounce(() => {
        this.defTableLoading = false;
      }, 500);

      this.defTableLoading = true;
      dictionaryDef
        .execute(this.currentTreeNode, pageIndex || this.dictionaryDefPageIndex)
        .then(result => {
          this.dictionaryDefTableData = { count: result.length, rows: result };
          pageIndex && (this.dictionaryDefPageIndex = pageIndex);
          hideDefTableLoading();
        })
        .catch(() => {
          this.defTableLoading = false;
          this.$error(lang["operateError"]);
        });
    },

    getDictionaryDefTitle() {
      let { lang } = i18nService.getLanguageMap();

      return lang["platform.config.dataDictionaryDefine"];
    },

    getDictionaryValTitle() {
      let { lang } = i18nService.getLanguageMap();

      return lang["platform.config.dataDictionaryValue"];
    },

    getDictionaryTableControl(isValueTable) {
      let { lang } = i18nService.getLanguageMap();
      let placeholder =
        [
          lang["platform.common.code"],
          lang["platform.svc.name"]
        ].join("、") + "...";

      if (isValueTable) {
        placeholder = this.getDictValSearchPlaceholder();
      }

      return [
        {
          type: "input",
          placeholder: placeholder,
          icon: "el-icon-search"
        },{
          icon: "el-icon-plus",
          txt: lang["platform.common.add"]
        }
      ];
    },

    getAdditionBtn() {
      let { lang } = i18nService.getLanguageMap();

      return lang["platform.common.add"];
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
      return i18nService.getI18nTitle().title;
    },

    getDictDefTableHeader() {
      let { lang } = i18nService.getLanguageMap();
      let otherLang = i18nService.getOtherLanguageMap();

      return [
        {
          prop: "dictCode",
          display: lang["platform.common.code"]
        },
        {
          prop: "dictName",
          display: lang["platform.svc.name"],
          width: 100
        },
        {
          display: lang["platform.common.ops"],
          width: 60,
          formatter: row => {
            return (
              <div class="col-ops">
                <i
                  class="el-icon-edit"
                  title={otherLang.edit}
                  onClick={e => {
                    this.onDictDefTableEdit(row);
                    e.stopPropagation();
                  }}
                />
                <i
                  class="el-icon-delete"
                  title={otherLang.delete}
                  onClick={e => {
                    this.onDictDefTableDelete(row);
                    e.stopPropagation();
                  }}
                />
              </div>
            );
          }
        }
      ];
    },

    getDictValSearchPlaceholder() {
      let { lang } = i18nService.getLanguageMap();
      let languageList = dictionaryVal.getLanguageSet();
      let headers = [lang["platform.config.valueCode"]];

      _.each(languageList, language => {
        headers.push(language.display);
      });

      return headers.join("、") + "...";
    },

    getDictionaryValTableHeader() {
      let { lang } = i18nService.getLanguageMap();
      let otherLang = i18nService.getOtherLanguageMap();
      let languageList = dictionaryVal.getLanguageSet();
      let headers = [
        {
          prop: "valueCode",
          display: lang["platform.config.valueCode"]
        }
      ];

      _.each(languageList, (language, index) => {
        headers.push({
          prop: `valueText_${index}`,
          display: language.display
        });
      });

      return headers.concat([
        {
          prop: "parentValueCode",
          display: lang["platform.config.parent"]
        },
        {
          display: lang["platform.common.ops"],
          width: 60,
          formatter: row => {
            return (
              <div class="col-ops">
                <i
                  class="el-icon-edit"
                  title={otherLang.edit}
                  onClick={e => {
                    this.onDictValEdit(row);
                    e.stopPropagation();
                  }}
                />
                <i
                  class="el-icon-delete"
                  title={otherLang.delete}
                  onClick={e => {
                    this.onDictValTableDel(row);
                    e.stopPropagation();
                  }}
                />
              </div>
            );
          }
        }
      ]);
    },

    isRoot(node) {
      let rootId = 0;

      return node.id === rootId;
    },

    onTreeRowClick(treeData) {
      if (
        !this.isRoot(treeData.id) &&
        this.currentTreeNode !== treeData.groupCode
      ) {
        
        this.$refs.dictDefTable.emptyInputs()
        this.valTableLoading = false;
        this.defTableLoading = false;
        this.selectedDictDefCode = null;
        this.dictionaryValTableData = { rows: [], count: 0 };
        this.currentTreeNode = treeData.groupCode;
        this.dictionaryDefPageIndex = 1;
        this.fetchDictionaryDefinition();
      }
    },

    treeGroupOperate(data) {
      let otherLang = i18nService.getOtherLanguageMap();
      let form = { groupName: "", groupCode: "" };
      let dialog = this.$refs.dialog;
      let operate = "create";

      if (!_.isEmpty(data)) {
        operate = "update";
        form = {
          id: data.id,
          groupName: data.groupName,
          groupCode: data.groupCode
        };
      }

      return dialog
        .show({
          list: [
            { name: "Name", prop: "groupName" },
            { name: "Code", prop: "groupCode" }
          ],
          rules: {
            groupName: { required: true, message: otherLang.notEmpty },
            groupCode: { required: true, message: otherLang.notEmpty }
          },
          title: _.isEmpty(data) ? "Add Group" : "Edit Group",
          form
        })
        .then(result => {
          this.showLoading();
          return dictionaryGroupSave.execute(operate, result).then(result => {
            this.hideLoading();
            return result;
          });
        });
    },

    addGroup() {
      let lang = i18nService.getOtherLanguageMap();

      this.treeGroupOperate()
        .then(result => {
          this.appTreeData[0].children.push(result);
        })
        .catch(error => {
          this.hideLoading(true);
          error !== "cancel" && this.$error(error.message || lang["operateError"]);
        });
    },

    editGroup(data) {
      let lang = i18nService.getOtherLanguageMap();
      let treeNodeArray = this.appTreeData[0].children;

      this.treeGroupOperate(data)
        .then(result => {
          _.each(treeNodeArray, (treeNode, i) => {
            if (treeNode.id === result.id) {
              treeNodeArray.splice(i, 1, result);
            }
          });
        })
        .catch(error => {
          this.hideLoading(true);
          error !== "cancel" &&
            this.$error(error.message || lang["operateError"]);
        });
    },

    deleteGroup(data) {
      let lang = i18nService.getOtherLanguageMap();

      this.$alert(lang["deleteWarning"], "Warning")
        .then(() => {
          return dictionaryGroupDelete.execute(data.id);
        })
        .then(result => {
          let treeNodes = this.appTreeData[0].children;
          let nodeIndex = _.findIndex(treeNodes, node => node.id === data.id);
          treeNodes.splice(nodeIndex, 1);
          this.dictionaryDefTableData = { rows: [], count: 0 };
          this.dictionaryValTableData = { rows: [], count: 0 };
          this.selectedDictDefCode = null;
          this.currentTreeNode = null;
        })
        .catch(error => {
          error !== "cancel" &&
            this.$error(error.message || lang["operateError"]);
        });
    },

    onDictionaryDefTableSelection(row) {
      let lang = i18nService.getOtherLanguageMap();

      if (this.selectedDictDefCode !== row.dictCode) {
        this.selectedDictDefCode = row.dictCode;
        this.fetchDictionaryVal().catch(() => {
          this.$error(lang["operateError"]);
        });
      }
    },

    onDictDefPageChange(pageIndex) {
      this.fetchDictionaryDefinition(pageIndex);
    },

    fetchDictionaryVal() {
      let hideLoading = _.debounce(() => {
        this.valTableLoading = false;
      }, 500);
      this.valTableLoading = true;

      return dictionaryVal
        .execute(this.selectedDictDefCode, this.dictionaryValPageIndex)
        .then(result => {
          this.dictionaryValTableData = result;
          hideLoading();
        })
        .catch(() => {
          this.valTableLoading = false;
        });
    },

    dictDefOperate(data) {
      let otherLang = i18nService.getOtherLanguageMap();
      let form = { dictCode: "", dictName: "" };
      let dialog = this.$refs.dialog;
      let operate = "create";

      if (!_.isEmpty(data)) {
        (operate = "update"),
          (form = {
            id: data.id,
            dictCode: data.dictCode,
            dictName: data.dictName
          });
      }

      return dialog
        .show({
          form,
          rules: {
            dictName: { required: true, message: otherLang.notEmpty },
            dictCode: { required: true, message: otherLang.notEmpty }
          },
          title: _.isEmpty(data) ? "Add DictDefinition" : "Edit DictDefinition",
          list: [
            { name: "Name", prop: "dictName" },
            { name: "Code", prop: "dictCode" }
          ]
        })
        .then(result => {
          this.showLoading();
          result.dictGroupCode = this.currentTreeNode;
          return dictionartDefSave.execute(operate, result);
        });
    },

    onDictDefAddition() {
      let lang = i18nService.getOtherLanguageMap();

      if (_.isEmpty(this.currentTreeNode)) {
        return this.$warning("请选择一项 数据字典-分组");
      }

      this.dictDefOperate(null)
        .then(result => {
          this.dictionaryDefPageIndex = 1;
          this.hideLoading(true);
          this.fetchDictionaryDefinition();
        })
        .catch(error => {
          this.hideLoading(true);
          error !== "cancel" && this.$error(error.message || lang["operateError"]);
        });
    },

    onDictDefTableEdit(data) {
      let lang = i18nService.getOtherLanguageMap();

      this.dictDefOperate(data)
        .then(result => {
          let rows = this.dictionaryDefTableData.rows;
          let index = _.findIndex(rows, row => row.id === result.id);

          index > -1 && rows.splice(index, 1, result);
          this.hideLoading();
        })
        .catch(error => {
          this.hideLoading(true);
          error !== "cancel" && this.$error(error.message || lang["operateError"]);
        });
    },

    onDictDefTableDelete(data) {
      let lang = i18nService.getOtherLanguageMap();

      this.$alert(lang["deleteWarning"], "Warning")
        .then(() => {
          return dictionaryDefDel.execute(data.id).then(() => {
            let rows = this.dictionaryDefTableData.rows;
            let index = _.findIndex(rows, row => row.id === data.id);

            rows.splice(index, 1);
          });
        })
        .catch(error => {
          error !== "cancel" && this.$error(error.message || lang["operateError"]);
        });
    },

    onDictValTableDel(data) {
      let lang = i18nService.getOtherLanguageMap();

      this.$alert(lang["deleteWarning"], "Warning")
        .then(() => {
          return dictionaryValDel.execute(data.id).then(() => {
            let rows = this.dictionaryValTableData.rows;
            let index = _.findIndex(rows, row => row.id === data.id);

            rows.splice(index, 1);
          });
        })
        .catch(error => {
          error !== "cancel" && this.$error(lang["operateError"]);
        });
    },

    onDictValSearch(value) {
      value = this.selectedDictDefCode + "/" + value;

      if (this.selectedDictDefCode) {
        this.valTableLoading = true;
        this.fetchValTableForSearch(value);
      }
    },

    parseDictValDialogConfig(isAddition, form) {
      let parseParentList = () => {
        return _.map(this.dictionaryValTableData.rows, row => {
          return { name: row.valueCode, value: row.valueCode };
        });
      };
      let otherLang = i18nService.getOtherLanguageMap();
      let list = this.getDictionaryValTableHeader();
      let rules = {};

      list.pop();
      list = _.map(list, one => {
        let extern = { type: "input" };

        if (isAddition) {
          form[one.prop] = "";
        }
        if (one.prop === "parentValueCode") {
          extern.type = "select";
          extern.selectionList = parseParentList();
        }

        if (one.prop !== "parentValueCode") {
          rules[one.prop] = { required: true, message: otherLang.notEmpty };
        }

        return _.extend({ name: one.display, prop: one.prop }, extern);
      });

      return { list, form, rules };
    },

    onDictValEdit(rowData) {
      rowData = _.clone(rowData);
      let dialog = this.$refs.dialog;
      let { list, form, rules } = this.parseDictValDialogConfig(false, rowData);
      let hideValTableLoading = _.debounce(() => {
        this.valTableLoading = false;
      }, 500);

      dialog
        .show({ title: "Edit DictValueDefinition", list, form, rules })
        .then(result => {
          this.valTableLoading = true;
          _.each(result.multiLanguageValue, language => {
            language.valueText = result[`valueText_${language.languageIndex}`];
          });

          return dictionaryValSave.execute("update", result);
        })
        .then(data => {
          return this.fetchDictionaryVal();
        })
        .catch(error => {
          let lang = i18nService.getOtherLanguageMap();
          this.valTableLoading = false;
          error != "cancel" &&
            this.$error(error.message || lang["operateError"]);
        });
    },

    onDictValAddition() {
      let dialog = this.$refs.dialog;
      let { form, list, rules } = this.parseDictValDialogConfig(true, {
        multiLanguageValue: [],
        dictDefinitionCode: this.selectedDictDefCode
      });

      if (_.isEmpty(this.selectedDictDefCode)) {
        this.$warning("请先选择 数据字典-定义");
        return;
      }

      dialog
        .show({ title: "Add DictValueDefinition", form, list, rules })
        .then(result => {
          let langSet = dictionaryVal.getLanguageSet();

          this.valTableLoading = true;
          _.each(langSet, (lang, index) => {
            if (_.isString(result[`valueText_${index}`])) {
              result.multiLanguageValue.push({
                dictDefinitionCode: this.selectedDictDefCode,
                languageCode: lang.code,
                valueText: result[`valueText_${index}`]
              });

              delete result[`valueText_${index}`];
            }
          });

          return dictionaryValSave.execute("create", result).then(() => {
            return this.fetchDictionaryVal();
          });
        })
        .catch(error => {
          let lang = i18nService.getOtherLanguageMap();
          this.valTableLoading = false;
          error !== "cancel" &&
            this.$error(error.message || lang["operateError"]);
        });
    },

    onDictDefSearch(value) {
      if(!_.isEmpty(this.currentTreeNode)) {
        if(value) {
          value = value + '/' + this.currentTreeNode
        } 
      }
      this.defTableLoading = true;
      this.fetchDefTableForSearch(value);
    },

    fetchValTableForSearch(value) {
      let delayHideLoading = _.debounce(() => {
        this.valTableLoading = false;
      }, 500);

      dictionaryValSearch
        .execute(value, 1)
        .then(result => {
          this.dictionaryValTableData = result;
          delayHideLoading();
        })
        .catch(() => {
          this.valTableLoading = false;
        });
    },

    fetchDefTableForSearch(value) {
      let delayHideLoading = _.debounce(() => {
        this.defTableLoading = false;
      }, 500);

      dictionaryDefSearch
        .execute(value, 1)
        .then(result => {
          this.dictionaryDefTableData = {
            rows: result,
            count: result.length
          };
          delayHideLoading();
        })
        .catch(() => {
          this.defTableLoading = false;
        });
    },

    renderTreeRow(createElement, { node, data, store }) {
      let rootCls = data.id === 0 ? " root-row" : "";

      return (
        <div class={"pm-tree-item" + rootCls}>
          <span>{data.groupName}</span>
          <div class="pm-ops">
            {data.id === 0 && (
              <i
                class="icon-addition"
                onClick={e => {
                  e.stopPropagation();
                  this.addGroup(data);
                }}
              />
            )}
            {data.id !== 0 && (
              <i
                class="icon-edit"
                onClick={e => {
                  this.editGroup(data);
                  e.stopPropagation();
                }}
              />
            )}
            {data.id !== 0 && (
              <i
                class="icon-remove"
                onClick={e => {
                  this.deleteGroup(data);
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
@import "../../assets/css/variable.less";

.data-dict-wrapper {
  padding-right: 0;

  .permission-edit {
    padding-right: 0;
    height: calc(~"100% - 50px");
    position: relative;
    margin-top: @jw10px;
  }

  .pm-tree-item {
    width: calc(~"100% - 25px");
    display: inline-block;
    line-height: 26px;

    .pm-ops {
      float: right;

      i {
        margin-left: 5px;
      }
    }
  }

  .panel-tree {
    position: absolute;
    box-sizing: border-box;
    width: 250px;
    border-right: 1px solid #c4c6cc;
    overflow-y: auto;
    height: 100%;
    padding-right: 10px;
    padding-bottom: 10px;

    .root-row {
      font-size: @font-large;
      line-height: @font-large;
    }
  }

  .panel-main {
    padding-left: 250px;
    overflow-y: auto;
    height: 100%;
    padding-right: 20px;

    .jw-table {
      height: calc(~"100% - 70px");

      .el-icon-edit {
        margin-right: @jw5px;
      }
    }

    .title {
      padding: 0 0 @jw10px 0;
      font-size: @font-large;
    }

    .dictionaryval-table {
      width: calc(~"60% - 10px");
      height: 100%;
      box-sizing: border-box;
      vertical-align: top;
      display: inline-block;
      padding-left: @jw10px;

      .search-box {
        width: 250px;
      }
    }

    .dictionarydef-table {
      display: inline-block;
      width: 40%;
      height: 100%;
      border-right: 1px solid @seperate-line;
      vertical-align: top;
      box-sizing: border-box;
      padding: 0 10px;
    }
  }
}
</style>
