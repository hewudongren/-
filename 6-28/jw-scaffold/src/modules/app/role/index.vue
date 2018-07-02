<template>
  <div class="panel role-assign-wrapper">
    <div class="role-header-wrapper">
      <PanelTitle :title="getPanelTitle()" :back="true" @back="exit"/>
      <el-button size="mini" @click="addRole" icon="el-icon-plus">{{$root.langs['platform.common.add']}}</el-button>
    </div>
    <div :class="{ 'roles-wrapper':roles.length }" v-loading="loading">
      <el-tree
        :data="roles"
        :render-content="renderTreeContent"
        :props="{ children: 'userChildren', label: 'name' }"
        node-key="id"
        highlight-current
        default-expand-all
      />
    </div>
    <el-dialog :title="getChooseUserDialogTitle()" class="selecter-user-dialog" :width="'50%'" :visible.sync="dialogVisible">
      <Transfer
        ref="transferRef"
        :selected="selectedUsers"
        :data="users"
        :titles="getChooseUserTransferTitle()"
        @inputSearch="onChooseTransferUser"
      />
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="cancel">{{cancelTxt}}</el-button>
        <el-button type="primary" size="mini" @click="confirm">{{confirmTxt}}</el-button>
      </div>
    </el-dialog>
  </div>  
</template>

<script>
import assignUsers from "jw_models/app/role/assign-users";
import roleReadModel from "jw_models/app/role/role-read";
import roleSwitch from "jw_models/app/role/role-switch";
import roleDelete from "jw_models/app/role/role-delete";
import sysUserModel from "jw_models/sys/user-list";

import PanelTitle from "jw_components/panel-title";
import Transfer from "jw_components/transfer";
import JwPopover from "jw_components/table/column-popover";

import i18nService from "jw_services/i18n/index";
import baseStore from "jw_stores/common";

let selectedRole = null;

export default {
  components: {
    PanelTitle,
    Transfer,
    JwPopover
  },

  data() {
    let { lang } = i18nService.getLanguageMap();

    return {
      loading: false,
      users: [],
      selectedUsers: [],

      roles: [],
      dialogVisible: false,
      confirmTxt: lang["platform.common.ok"],
      cancelTxt: lang["platform.common.cancel"]
    };
  },

  created() {
    this.fetch();
  },

  methods: {

    onOperateClickHandler(menuItem,rowData) {

      if(menuItem.type ==='choose') {
        this.showUserSelection(rowData.userChildren, rowData.id)
      }else if(menuItem.type === 'edit') {
        this.goEdit(rowData)
      }else if(menuItem.type === 'delete') {
        this.roleDestroy(rowData)
      }else if(menuItem.type === 'rightsProfile') {
        this.goProfileEdit(rowData)
      }
    },

    getChooseUserDialogTitle() {
      let { lang } = i18nService.getLanguageMap();

      return lang["platform.app_role.assignRole"];
    },

    getChooseUserTransferTitle() {
      let { lang } = i18nService.getLanguageMap();

      return [
        lang["platform.common.allUsers"],
        lang["platform.common.selectedUsers"]
      ];
    },

    getPanelTitle() {
      let { lang } = i18nService.getLanguageMap()
      let titles = i18nService.getI18nTitle().title
      let selectedRowData = baseStore.get("row-data")

      titles.push(lang['platform.app_role.role'])
      titles.push(selectedRowData.name)
      return titles
    },

    fetch() {
      let selectedRowData = baseStore.get("row-data");
      let appId = selectedRowData.id;
      let delayHideLoading = _.debounce(() => {
        this.loading = false;
      }, 500);

      this.loading = true;
      roleReadModel
        .execute(appId)
        .then(data => {
          this.roles = this.formatTreeRole(data);
          delayHideLoading();
        })
        .catch(error => {
          this.loading = false
          this.$alert(lang["loadingFailAgain"], "Error").then(() => {
            this.fetch()
          });
        });
    },

    showUserSelection(selectedUsers, roleId) {
      let lang = i18nService.getOtherLanguageMap()

      selectedUsers = _.filter(selectedUsers,(child)=>{
        return !_.isEmpty(child.id)
      })

      this.loading = true;
      selectedRole = roleId;
      this.fetchUsers()
        .then(userList => {
          this.loading = false;
          this.users = userList;
          this.dialogVisible = true;
          this.selectedUsers = [].concat(selectedUsers);
        })
        .catch(() => {
          this.loading = false;
          this.$error(lang["operateError"]);
        });
    },

    onChooseTransferUser(inputValue) {
      this.fetchUsers(inputValue).then(userList => {
        this.users = userList;
      });
    },

    fetchUsers(name) {
      return sysUserModel.all(name || "").then(data => {
        let rows = data.rows;

        return _.map(rows, user => {
          return {
            label: user.name, // + '   ' + user.orgNames,
            key: user.id
          }
        })
      })
    },

    renderTreeContent(h, { node, data, store }) {
      let isRoleRow = node.level === 1;
      let rowCls = "custom-tree-node" + (isRoleRow ? " role" : "");
      let { lang } = i18nService.getLanguageMap();

      return (
        <div class={rowCls}>
          <span class="tree-row-content">{data.name}</span>
          {isRoleRow && (<span class="tag">{lang["platform.menu.sys/role"]}</span>)}
          {isRoleRow && <span class="role-desc-label">{data.desc}</span>}
          {isRoleRow && (
            <span class="operate-icon">
            <JwPopover list={this.getOperateList()} extraData={data} onOperate-clicked={menuItem=>{this.onOperateClickHandler(menuItem,data)}}>
              <template slot="top">
                <div class="popover-top-row">
                  <el-checkbox
                    checked={data.isValid}
                    disabled={!!data.isInner}
                    key={_.uniqueId('pop-check')}
                    label={lang["platform.common.isAvailable"]}
                    onChange={state=>{this.onCheckedChange(state,data)}} />       
                </div>
              </template>
            </JwPopover>
            </span>
          )}
          {!isRoleRow && data.id && (<span class="tag">{lang["platform.common.members"]}</span>)}
          {
            !isRoleRow && 
            data.id && 
            (<span class="icon-remove" onClick={e => { this.remove(data, e); }} />)
          }
        </div>
      );
    },

    roleDestroy(row) {
      let { lang } = i18nService.getLanguageMap()
      let otherLang = i18nService.getOtherLanguageMap()

      this.$alert(
        otherLang["deleteExtraWarning"].replace('{{}}',lang['platform.menu.sys/role']), 
        "Warning"
      ).then(() => {
        return roleDelete.execute(row)
      })
      .then(() => {
        let index = _.findIndex(this.roles, one => {
          return one === row
        })

        this.roles.splice(index, 1)
      })
      .catch((error) => {
        (error !== 'cancel') && this.$error(lang["operateError"])
      })
    },

    getOperateList() {
      let otherLang = i18nService.getOtherLanguageMap();
      let { lang } = i18nService.getLanguageMap();

      return [
        {
          icon: "el-icon-delete",
          display: otherLang.delete,
          type: "delete",
          isVisible(row) {
            return !row.isInner;
          }
        },{
          display: lang['platform.app_role.assignRole'],
          icon: 'icon-users',
          type: 'choose'
        },{
          display: lang["platform.app_role.editRole"],
          icon: "el-icon-edit",
          type: "edit"
        },{
          icon: "icon-lock",
          display: lang["platform.app_profile.rights_profile"],
          type: "rightsProfile"
        }
      ];
    },

    onCheckedChange(newState, row) {
      let lang = i18nService.getOtherLanguageMap()
      let param = _.clone(row)

      param.isValid = newState
      roleSwitch
        .execute(param)
        .then(() => {
          row.isValid = newState
        })
        .catch(() => {
          this.roles = [].concat(this.roles)
          this.$error(lang["operateError"])
        })
    },

    remove(data, e) {
      let ids = []
      let { lang } = i18nService.getLanguageMap()
      let otherLang = i18nService.getOtherLanguageMap()
      let clickedRole = _.find(this.roles, role => {
        return role.id === data.roleId
      })

      _.each(clickedRole.userChildren, user => {
        if (user.id !== data.id) {
          ids.push(user.id);
        }
      })

      e.stopPropagation()
      this.$alert(
        otherLang["deleteExtraWarning"].replace('{{}}',lang['platform.menu.sys/user']),
        "Warning"
      ).then(() => {
        this.assignUsersRole(ids, data.roleId);
      });
    },

    cancel() {

      this.dialogVisible = false;
    },

    confirm() {
      let selectedUsers = this.$refs.transferRef.getSelected();
      let ids = _.map(selectedUsers, su => {
        return su.key;
      });

      this.dialogVisible = false;
      this.assignUsersRole(ids, selectedRole);
    },

    goEdit(row) {
      baseStore.set("role-row-data", row);
      this.$router.push({ path: `/app/app/role/edit/${row.id}` });
    },

    goProfileEdit(row) {
      baseStore.set("role-row-data", row);
      this.$router.push({ path: `/app/app/profile/edit/${row.id}`})
    },

    assignUsersRole(ids, roleId) {
      let lang = i18nService.getOtherLanguageMap();

      this.loading = true;
      assignUsers
        .execute({ userIds: ids, roleId })
        .then(() => {
          this.fetch();
        })
        .catch(error => {
          this.loading = false;
          this.$error(error.message || lang["operateError"]);
        });
    },

    formatTreeRole(data) {
      let lang = i18nService.getOtherLanguageMap();
      let hasUsersList = [];
      let emptyUsersList = [];

      _.each(data, row => {
        let userChildren = [];
        let users = row.users;

        if (_.isEmpty(users)) {
          userChildren.push({
            roleId: row.id,
            name: lang.empty,
            id: null,
            key: null,
            label: lang.empty
          });
        } else {
          _.each(users, user => {
            userChildren.push({
              roleId: row.id,
              name: user.name,
              id: user.id,
              key: user.id,
              label: user.name
            });
          });
        }

        row.userChildren = userChildren;
        if (_.isEmpty(users)) {
          emptyUsersList.push(row);
        } else {
          hasUsersList.push(row);
        }
      });

      return hasUsersList.concat(emptyUsersList);
    },

    exit() {
      this.$router.push({ path: "/app/app/index" });
    },

    addRole() {
      this.$router.push({ path: "/app/app/role/edit/0" });
    }
  }
};
</script>

<style lang="less">
@import "../../../assets/css/variable.less";

.selecter-user-dialog {
  .el-dialog__body {
    height: 28.571rem;
    padding: @jw15px;
  }
}

.role-header-wrapper {
  .el-button {
    position: absolute;
    right: 20px;
    top: 18px;
  }
}

.popover-top-row {
  padding-bottom: 5px;
  margin-bottom: 5px;
  padding-left: 10px;
  border-bottom: 1px solid #c4c6cc;
}

.role-assign-wrapper {
  .roles-wrapper {
    height: calc(~"100% - 55px");
    overflow-y: auto;
    padding-top: 15px;

    .el-tree {
      width: 60%;
    }
  }

  .el-tree {

    .operate-icon {
      float: right;
    }

    .role-desc-label {
      vertical-align: middle;
      width: 300px;
      display: inline-block;
    }

    .el-tree-node__children {
      .el-tree-node__content {
        background-repeat: no-repeat;
        background-position: 5px -15px;
        background-image: url("../../../assets/img/line.gif");
      }

      .el-tree-node__expand-icon {
        background-repeat: no-repeat;
        background-position: 4px 3px;
        background-image: url("../../../assets/img/line.gif");
      }
    }

    .custom-tree-node {
      width: calc(~"100% - 35px");
      line-height: 26px;

      .icon-menu {
        line-height: inherit;
        vertical-align: middle;
      }
    }

    .tree-row-content {
      display: inline-block;
      width: 232px;
    }

    .role {
      font-size: @font-large;

      .tree-row-content {
        width: 250px;
        vertical-align: middle;
      }

      .tag {
        background: #2fc7f7;
      }
    }

    .tag {
      margin: 0 10px;
      font-size: @font-small;
      background: #ccc;
      color: #fff;
      padding: 3px;
      border-radius: 3px;
      vertical-align: middle;
    }

    .icon-addition {
      float: right;
      line-height: 26px;
      vertical-align: middle;
    }
    .icon-remove {
      float: right;
      line-height: 26px;
      vertical-align: middle;
    }
  }
}
</style>
