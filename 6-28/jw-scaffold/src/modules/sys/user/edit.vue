<template>
  <div ref="editWrapper" class="panel user-edit-panel" v-loading="loading">
    <jw-panel-title :title="getPanelTitle()" :back="true" @back="cancel"/>
    <el-form ref="editForm" :rules="rules" :model="entity" label-position="right" label-width="100px">
      <el-form-item prop="name" :label="lang['platform.app_user.name']">
        <el-input v-model="entity.name" :placeholder="lang['platform.app_user.name']" :maxlength="maxlength"></el-input>
      </el-form-item>
      <el-form-item prop="account" :label="lang['platform.app_user.account']">
        <el-input v-model="entity.account" :disabled="!isAddition()" :placeholder="lang['platform.app_user.account']" :maxlength="maxlength"></el-input>
      </el-form-item>
      <el-form-item label="Role">
        <div class="role-box">
          <div v-if="svcRoleList.length" class="role-list">
            <span v-for="(item,i) in svcRoleList" :key="i"><i class="el-icon-circle-close-outline" @click="deleteSvcRoleId(item.id)"></i>{{item.name}}</span>
          </div>
          <div class="role-select">
            <el-select v-model="currentAppId" placeholder="select..." :class="getCurrentRoleCls()">
              <el-option v-for="item in roleSelectData" :key="item.id" :value="item.id" :label="item.name"></el-option>
            </el-select>
            <el-checkbox-group :value="entity.svcRoleIds" :class="getCheckBoxGroupCls()">
              <el-checkbox v-for="item in roleCheckedList" :key="item.id" :label="item.id" @change="deleteSvcRoleId(item.id, $event)">{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
      </el-form-item>
      <el-form-item :label="lang['platform.common.isAvailable']">
        <div class="is-valid" @click="isValidChange">
          <el-checkbox v-model="entity.isValid"></el-checkbox>
        </div>
      </el-form-item>
      <el-form-item :label="lang['platform.app_user.gender']" :class="{ 'ie-fix': this.isIE }">
        <el-radio v-model="entity.gender" :label="true">Male</el-radio>
        <el-radio v-model="entity.gender" :label="false">Female</el-radio>
      </el-form-item>
      <el-form-item prop="mobile" :label="lang['platform.app_user.mobile']">
        <el-input v-model="entity.mobile" :placeholder="lang['platform.app_user.mobile']" :maxlength="maxlength"></el-input>
      </el-form-item>
      <el-form-item prop="email" :label="lang['platform.app_user.email']">
        <el-input v-model="entity.email" :placeholder="lang['platform.app_user.email']" :maxlength="maxlength"></el-input>
      </el-form-item>
      <el-form-item :label="lang['platform.app_user.org']">
        <div class="org-container">
          <el-tree ref="tree"
            :default-checked-keys="entity.orgIds"
            :expand-on-click-node="false"
            :props="defaultProps" 
            :data="treeOrgs" 
            node-key="id"
            show-checkbox
            check-strictly
            default-expand-all
            @node-click="onTreeLeafClick"
          />
        </div>
      </el-form-item>
    </el-form>
    <jw-operate-bar @prev="cancel" @next="save" :btns="getBottonBtns()" />
  </div>
</template>

<script>
const DEFAULT_PROPS = { children: "children", label: "name" };
let rootOrgs = { id: 0, name: "root org", disabled: true };

import userInfoModel from "jw_models/sys/user-info";
import treeModel from "jw_models/sys/edit-tree";
import roleModel from "jw_models/sys/role";
import userSaveModel from "jw_models/sys/user-save";

import PanelTitle from "jw_components/panel-title";
import OperateBar from "jw_components/operate-bar";
import i18nService from "jw_services/i18n/index";
import util from "jw_common/util";

import commonStore from "jw_stores/common";
import staticData from "jw_common/data";
import validate from "./validate";

export default {
  data() {
    let otherLang = i18nService.getOtherLanguageMap()

    return {
      lang: i18nService.getLanguageMap().lang,
      defaultProps: DEFAULT_PROPS,
      isIE: util.isIE9(),
      roleSelectData: [],
      currentAppId: "",
      loading: true,
      treeOrgs: [],
      entity: {},
      maxlength: staticData.inputMaxLength,
      rules: {
        name: { required: true, message: otherLang.notEmpty },
        account: { required: true, message: otherLang.notEmpty },
        mobile: { validator: validate.phoneValidate, trigger: 'blur', required:false },
        email: { validator: validate.emailValidate, trigger: 'blur',required:false }
      }
    };
  },

  components: {
    "jw-panel-title": PanelTitle,
    "jw-operate-bar": OperateBar
  },

  created() {
    let delayHideLoading = _.debounce(()=>{this.loading=false},500)
    let promiseEnd;

    if (this.isAddition()) {
      promiseEnd = Promise.all([
        roleModel.execute(),
        userInfoModel.execute(),
        treeModel.execute()
      ]).then(roles => {
        return { treeData: roles[2], entity: roles[1], roles: roles[0] };
      });
    } else {
      promiseEnd = Promise.all([roleModel.execute(), treeModel.execute()]).then(        
        roles => {
          let entity = commonStore.getSysUser();

          if(_.isEmpty(entity)) {
            return Promise.reject('goToIndex')
          }

          return {
            treeData: roles[1],
            entity: entity,
            roles: roles[0]
          };
        }
      );
    }

    promiseEnd
      .then(data => {
        this.entity = data.entity;
        this.roleSelectData = data.roles;
        this.treeOrgs = [
          {
            id: 0,
            disabled: true,
            name: "root",
            children: data.treeData
          }
        ];

        _.delay(()=>{this.$refs.editForm.clearValidate()});
        delayHideLoading()
      })
      .catch((error) => {
        delayHideLoading();
        (error === "goToIndex") && this.cancel();
      });
  },

  methods: {
    getBottonBtns() {
      let { lang } = i18nService.getLanguageMap()

      return [{
        visible: true,
        txt: lang['platform.common.cancel']
      },{
        visible: true,
        txt: lang['platform.common.save']
      }]
    },

    onTreeLeafClick(data,node) {

      if(data.id !== 0) {
        this.$refs.tree.setChecked(data.id, !node.checked)
      }
    },

    isValidChange(event) {
      let target = event.target

      if(target.className === 'is-valid') {
        this.entity.isValid = !this.entity.isValid;
      }
      event.stopPropagation();
    },

    getPanelTitle() {
      return i18nService.getI18nTitle().title;
    },

    getCheckBoxGroupCls() {
      if (_.size(this.roleCheckedList)) {
        return "check-box-group";
      }

      return "hidden";
    },

    getCurrentRoleCls() {
      if (_.size(this.roleCheckedList)) {
        return "el-select-part";
      }

      return "el-select-full";
    },

    getParamId() {

      return this.$route.params.id;
    },

    isAddition() {

      return this.getParamId() === '0'
    },

    save() {
      let lang = i18nService.getOtherLanguageMap()
      let editForm = this.$refs.editForm

      editForm.validate().then(()=>{
        this.entity.orgIds = this.$refs.tree.getCheckedKeys()
        userSaveModel.execute(this.entity,this.isAddition()).then(()=>{
          this.cancel()    
        }).catch(()=>{
          this.$error(lang['operateError'])
        })
      }).catch(()=>{
        this.$refs.editWrapper.scroll(0,0)
      })
    },

    cancel() {

      this.$router.push({ path: "/sys/user/index" });
    },

    deleteSvcRoleId(val, isChecked) {

      if (isChecked) {

        this.entity.svcRoleIds.push(val)
      } else {

        let index = this.entity.svcRoleIds.indexOf(val)
        this.entity.svcRoleIds.splice(index, 1)
      }
    }
  },

  computed: {
    roleCheckedList() {
      let checkedList = _.find(this.roleSelectData,item => item.id === this.currentAppId)

      return checkedList && checkedList.roles
    },

    svcRoleList() {
      let roles = []

      if (_.isArray(this.entity.svcRoleIds)) {
        _.each(this.entity.svcRoleIds, val => {
          _.each(this.roleSelectData, item => {
            _.each(item.roles, obj => {
              val === obj.id && roles.push({ id: obj.id, name: obj.name });
            })
          })
        })
      }

      return roles
    }
  }
};
</script>

<style lang="less">
@import '../../../assets/css/variable.less';

.user-edit-panel {
  overflow-y: auto;

  .ops-bar {
    width: 60%;
  }

  .ie-fix {
    .el-radio__inner {
  
      &::after {
        left: 4px;
        top: 4px;
      }
  
      position: relative;
    }
  }

  .org-container {
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    height: 250px;
    overflow-y: auto;

    .el-tree-node__content {
      line-height: 26px;
    }
  }

  .el-form {
    padding-top: @jw15px;
    width: 60%;
  }

  .role-box {
    border: 1px solid #dcdfe6;
    border-radius: 4px;
  }

  .role-list {
    //margin: 0 10px;
    padding: 5px;
    line-height: 30px;
    border-bottom: 1px solid #dcdfe6;

    span {
      display: inline-block;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      padding: 0 18px 0 12px;
      line-height: 30px;
      position: relative;
      margin-right: 8px;

      i {
        position: absolute;
        top: 2px;
        right: 2px;
        color: #cccccc;
      }
    }
  }

  .role-select {
    padding: @jw5px;
    display: flex;

    .el-select-part {
      width: 140px;
      padding-right: 10px;
      vertical-align: middle;
    }

    .el-checkbox-group {
      vertical-align: middle;
    }

    .el-select-full {
      width: 100%;
    }

    .check-box-group {
      display: inline-block;
      padding-left: 10px;
      width: calc(~"100% - 165px");
      border-left: 1px solid #dcdfe6;

      .el-checkbox {
        margin-left: 0;
        margin-right: 10px;
        float: left;
      }
    }
  }
}
</style>
