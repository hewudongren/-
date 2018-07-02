<template>
  <div class="panel org-panel">
    <jw-panel-title :title="getTitle()" />
    <div class="org-content" v-loading="loading">
      <div class="panel-left">
        <el-tree
          :default-expanded-keys="getTreeExpandId()"
          :expand-on-click-node="false"
          :props="defaultProps"
          :data="treeOrgs" 
          ref="tree"
          node-key="id"
          highlight-current
          @node-click="onTreeClick" />
      </div>
      <div class="panel-right" v-loading="tableLoading">
        <div class="search-bar">
          <el-button size="mini" @click="add" icon="el-icon-plus">{{this.getAdditionBtn()}}</el-button>
        </div>
        <jw-table
          :pageSize="15"
          :data="result.rows"
          :showPagination="true"
          :header="getTableHeader()"
          :totalCount="result.count"
          @on-page-change="onPageChange"/>
      </div>
    </div>
    <jw-dialog ref="dialog" />
  </div>
</template>

<script>
import orgReaditionModel from "jw_models/sys/org/org-read";
import treeModel from "jw_models/sys/edit-tree";
import additionOrgModel from "jw_models/sys/org/new-org";
import saveOrgModel from "jw_models/sys/org/save-org";
import deleteOrgModel from "jw_models/sys/org/delete-org";

import PanelTitle from "jw_components/panel-title";
import i18nService from "jw_services/i18n/index";
import JwTable from "jw_components/table/table";
import JwDialog from "jw_components/dialog";

let parentId = '0';
const DEFAULT_PROPS = {
  children: "children",
  label: "name"
};

export default {
  data() {
    return {
      pageIndex: 1,
      result: {
        count: 0,
        rows: []
      },

      loading: true,
      tableLoading: false,

      treeOrgs: [],
      defaultProps: DEFAULT_PROPS
    };
  },

  created() {
    this.fetch();
  },

  components: {
    "jw-panel-title": PanelTitle,
    "jw-table": JwTable,
    "jw-dialog": JwDialog
  },

  methods: {
    getTreeExpandId() {
      
      return [ parentId ]
    },

    onPageChange(pageIndex) {
      this.fetchTableData(pageIndex, false);
    },

    getAdditionBtn() {
      let { lang } = i18nService.getLanguageMap();

      return lang["platform.common.add"];
    },

    fetch() {
      let lang = i18nService.getOtherLanguageMap();
      let delayHideLoading = _.debounce(() => {
        this.loading = false;
      }, 500);

      Promise.all([
        treeModel.execute(),
        orgReaditionModel.execute(this.pageIndex, parentId)
      ]).then(datas => {
          let treeData = datas[0];
          let orgData = datas[1];

          this.result = orgData;
          this.treeOrgs = [{
            id: parentId, 
            name: "ROOT", 
            children: treeData
          }]
        }).then(()=>{
          this.$refs.tree.setCurrentKey(parentId)
          delayHideLoading();
        }).catch(() => {
          this.loading = false;
          this.$alert(lang["loadingFailAgain"], "Error").then(() => {
            this.fetch()
          })
        });
    },

    getTableHeader() {
      let { lang } = i18nService.getLanguageMap()
      let otherLang = i18nService.getOtherLanguageMap()
      let self = this

      return [
        {
          prop: "name",
          display: lang["platform.common.name"]
        },
        {
          prop: "desc",
          display: lang["platform.common.desc"]
        },
        {
          prop: "code",
          display: lang["platform.common.code"]
        },
        {
          display: lang["platform.common.ops"],
          width: 60,
          formatter(row) {
            return (
              <div class="col-ops">
                <i class="el-icon-edit" title={otherLang.edit} onClick={() => {self.onEdit(row);}}/>
                <i class="el-icon-delete" title={otherLang.delete} onClick={() => {self.onDelete(row);}}/>
              </div>
            )
          }
        }
      ];
    },

    getTitle() {
      return i18nService.getI18nTitle().title;
    },

    add() {
      let lang = i18nService.getOtherLanguageMap()

      additionOrgModel.execute().then((data)=>{
        return this.showDialog(data)
      }).then((result)=>{
        this.loading = true
        result.parentId = parentId
        return saveOrgModel.execute(true,result)
      }).then(()=>{
        this.pageIndex = 1
        return this.fetch()
      }).catch((error)=>{
        this.loading = false
        (error !== 'cancel') && this.$error(lang['operateError'])
      })
    },

    onEdit(rowEditData) {
      let lang = i18nService.getOtherLanguageMap()

      this.showDialog(rowEditData).then((data)=>{
        data.parentId = parentId 
        return saveOrgModel.execute(false,data)
      }).then(()=>{
        this.pageIndex = 1
        return this.fetch()
      }).catch((error)=>{
        (error !== 'cancel') && this.$error(lang['operateError'])
      })
    },

    showDialog(form) {
      let otherLang = i18nService.getOtherLanguageMap()
      let { lang } = i18nService.getLanguageMap()
      let dialog = this.$refs.dialog
 
      return dialog.show({
        title: lang["platform.app_org.editOrg"],
        list: [
          {
            name: lang["platform.app_user.name"],
            prop: "name"
          },{
            name: lang["platform.common.code"],
            prop: "code"
          },{
            name: lang["platform.app_org.abbreviation"],
            prop: "abbreviation"
          },{
            name: lang["platform.common.desc"],
            prop: "desc"
          }
        ],
        rules: {
          name: { required: true, message: otherLang.notEmpty },
          code: { required: true, message: otherLang.notEmpty }
        },
        form
      });
    },

    onDelete(row) {
      let lang = i18nService.getOtherLanguageMap()

      this.$alert(lang['deleteWarning'],'Warning').then(()=>{
        return deleteOrgModel.execute(row.id)
      }).then(()=>{
        this.pageIndex = 1
        return this.fetch()
      }).catch((error)=>{
        (error!=='cancel') && this.$error(lang['operateError'])
      })
    },

    fetchTableData(pageIndex, isNeedWarning) {
      let delayHideLoading = _.debounce(() => {
        this.tableLoading = false;
      }, 500);
      let lang = i18nService.getOtherLanguageMap();

      this.tableLoading = true;
      orgReaditionModel
        .execute(pageIndex, parentId)
        .then(result => {
          this.result = result;
          this.pageIndex !== pageIndex && (this.pageIndex = pageIndex);
          delayHideLoading();
        })
        .catch(error => {
          if (isNeedWarning) {
            this.$error(lang["operateError"]);
          }
        });
    },

    onTreeClick(org) {

      if(parentId !== org.id) {
        parentId = org.id;
        this.fetchTableData(this.pageIndex, true);
      }
    }
  }
};
</script>

<style lang="less">
@import "../../../assets/css/variable.less";

.org-panel {
  padding-right: 0 !important;

  .org-content {
    padding-top: @jw10px;
    height: calc(~"100% - 39px");
    box-sizing: border-box;

    > div {
      display: inline-block;
      vertical-align: top;
    }

    .panel-left {
      width: 200px;
      height: 100%;
      border-right: 1px solid @seperate-line;
      overflow-y: auto;
    }

    .panel-right {
      width: calc(~"100% - 210px");
      height: 100%;
      box-sizing: border-box;
      padding-left: @jw10px;

      .search-bar {
        text-align: right;
        padding-bottom: @jw10px;
        padding-right: @jw10px;
        border-bottom: 1px solid @seperate-line;
      }

      .jw-table {
        padding-right: @jw10px;
        .el-icon-delete {
          margin-left: @jw5px;
        }
      }
    }
  }
}
</style>
