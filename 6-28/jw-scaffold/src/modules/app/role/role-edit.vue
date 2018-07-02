<template>
  <div class="panel edit-role-wrapper" v-loading="loading">
    <jw-panel-title :title="getPanelTitle()" :back="true" @back="exit"/>
    <role-base-editer
      ref="baseEditer"
      :isAddition="false"
      :data="entity"
      :apps="apps"
    />
    <operate-bar
      @prev="prev" 
      @next="next"
      :btns="getOpsBtns()"
    />
  </div>
</template>

<script>
import JwPanelTitle from "jw_components/panel-title";
import OperateBar from "jw_components/operate-bar";
import i18nService from "jw_services/i18n/index";

import RoleBaseEditer from "jw_modules/app/widgets/role-base-edit";
import baseStore from "jw_stores/common";

import roleSvcModel from "jw_models/app/role/edit-role-svc";
import editApps from "jw_models/app/role/edit-apps";
import editRoleUpdate from "jw_models/app/role/edit-role-update";

let loadingTimerId = 0

export default {
  data() {
    let { lang } = i18nService.getLanguageMap();

    return {
      lang,
      entity: {},
      apps: [],

      loading: true
    };
  },

  created() {

    this.fetch()
  },

  components: {
    "jw-panel-title": JwPanelTitle,
    "role-base-editer": RoleBaseEditer,
    "operate-bar": OperateBar
  },
  methods: {
    getOpsBtns() {
      
      return [{
          visible: true,
          txt: this.lang['platform.common.back'],
          emit: 'prev'
        },{
          visible: true,
          txt: this.lang["platform.app_role.saveRole"],
          emit: 'next'
        }]
    },

    showLoading() {
      this.loading = true;
    },

    hideLoading(is) {
      clearTimeout(loadingTimerId);

      if (is) {
        return this.loading = false;
      }

      loadingTimerId = setTimeout(() => { this.loading = false; }, 500)
    },

    // getEditerEntity() {

    //   if(this.isAddition()) {
    //     let currentApp = baseStore.get('row-data')
    //     this.entity.appId = currentApp.id

    //     return this.entity
    //   }

    //   return this.entity
    // },

    getParamId() {

      return this.$route.params.id;
    },

    isAddition() {
      let roleId = this.getParamId();

      return roleId === "0"
    },

    fetch() {
      let currentApp = baseStore.get('row-data')
      let roleId = this.getParamId()
      let promiseEnd

      this.showLoading()
      if (this.isAddition()) {
        promiseEnd = Promise.all([
          roleSvcModel.execute(),
          editApps.execute(roleId)
        ]).then((datas) => {
          this.entity = datas[0]
          this.entity.appId = currentApp.id
          this.apps = datas[1]
        })
      } else {
        promiseEnd = editApps.execute(roleId).then(result => {
          this.entity = baseStore.get("role-row-data")
          this.apps = result
        })
      }

      promiseEnd
        .then(() => {
          this.hideLoading()
        })
        .catch(error => {
          this.hideLoading(true)
        });
    },

    getPanelTitle() {
      let rowData
      let { lang } = i18nService.getLanguageMap()
      let titles = i18nService.getI18nTitle().title
      
      if(this.isAddition()) {
        titles.push(lang['platform.app_role.addRole'])
      }else{
        rowData = baseStore.get("role-row-data")
        titles.push(lang['platform.app_role.editRole'])
        titles.push(rowData.name)
      }

      return titles
    },

    getBaseEditerValue() {
      return this.$refs.baseEditer.getValue();
    },

    getBaseEditer() {
      return this.$refs.baseEditer.getForm();
    },

    saveBaseEditerValue() {
      let baseEditer = this.getBaseEditer()
      let isNewAddition = this.isAddition()
      let lang = i18nService.getOtherLanguageMap()

      baseEditer
        .validate()
        .then(data => {
          let entity = this.getBaseEditerValue()

          this.showLoading();
          editRoleUpdate
            .execute(entity,isNewAddition)
            .then((result) => {
              
              this.hideLoading()
              this.$success(lang['operateSuccess'])
              if(isNewAddition) {
                this.entity = { appId: entity.appId }
              }else{
                this.exit()
              }
            })
            .catch((error) => {

              this.hideLoading(true)
              this.$error(error.message || lang["operateError"])
            });
        })
    },

    next() {

      this.saveBaseEditerValue()
    },

    prev() {

      this.exit()
    },

    exit() {

      this.$router.push({ path: "/app/app/role/index" })
    }
  }
};
</script>

<style lang="less">
@import "../../../assets/css/variable.less";

.edit-role-wrapper {

  .base-editer {
    width: 60%;
    height: calc(~'100% - 130px');
  }

  .ops-bar {
    padding-right: @jw20px;
    width: 60%;
  }
}
</style>
