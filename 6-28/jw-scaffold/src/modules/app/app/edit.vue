<template>
  <div ref="editionWrapper" :class="{ 'panel':true, 'app-edition':true, 'no-scroll':loading }" v-loading="loading">
    <jw-panel-title :title="getTitle()" :back="true" @back="exit"/>
    <jw-app-base-edit ref="appBase" :entity="entity" :isCategoryDisabled="isDisabledCategoryForAppBase()" />
    <jw-operate-bar @prev="exit" @next="save" :btns="getOpsBtns()" />
  </div>
</template>

<script>
import util from "jw_common/util";
import i18nService from "jw_services/i18n/index";
import PanelTitle from "jw_components/panel-title";
import OperateBar from "jw_components/operate-bar";
import userModel from "jw_models/user";

import appStore from "jw_stores/common";
import appBaseModel from "jw_models/app/app-base";
import serviceApiModel from "jw_models/app/service-api";
import createUpdateAppModel from "jw_models/app/app-create-update";

import AppBaseEdit from "jw_modules/app/widgets/app-base-edit";
import AppRelationEdit from "jw_modules/app/widgets/tab-collapse-table";

let loadingTimerId = 0

export default {
  data() {

    return {
      entity: {},
      services: [],
      loading: true
    };
  },

  created() {
    
    this.fetch()
  },

  components: {
    "jw-app-base-edit": AppBaseEdit,
    "jw-app-relation-edit": AppRelationEdit,
    "jw-panel-title": PanelTitle,
    "jw-operate-bar": OperateBar
  },

  methods: {

    scrollTop() {

      this.$refs.editionWrapper.scroll(0,0)
    },

    getOpsBtns() {
      let { lang } = i18nService.getLanguageMap()

      return [{
        visible: true,
        txt: lang["platform.common.cancel"]
      },{
        visible: true,
        txt: lang["platform.common.save"]
      }]
    },

    fetch() {
      let id = this.getParamId()

      this.showLoading()
      if (this.isAddition()) {
        appBaseModel.execute().then(result => {
          this.hideLoading()
          this.entity = result
          this.updateCategoryForNoAdminAppBase()
        }).catch(()=>{
          this.hideLoading(true)  
          this.networkFailHandler()
        })
      } else {
        let entity = appStore.get("row-data")
        
        if(_.isEmpty(entity)) {
          return this.exit()
        }

        this.entity = entity
        //this.updateCategoryForNoAdminAppBase()
        this.hideLoading()
      }
    },

    showLoading() {

      this.loading = true
    },

    hideLoading(is) {
      clearTimeout(loadingTimerId)
      if(is) {
        this.loading = false
      }else{
        loadingTimerId = setTimeout(()=>{ this.loading = false }, 500)
      }     
    },

    getTitle() {
      let { lang } = i18nService.getLanguageMap()
      let titles = i18nService.getI18nTitle().title
  
      if(this.isAddition()) {
        titles.push(lang['platform.common.add'])
      }else{
        if(this.entity) {
          titles.push(lang['platform.common.edit'])        
          titles.push(this.entity.name)
        }
      }
      
      return titles
    },

    isAddition() {
      let additionCode = "0";

      return this.getParamId() === additionCode;
    },

    isDisabledCategoryForAppBase() {
      let user = userModel.getResult();

      return !user.isAdmin;
    },

    updateCategoryForNoAdminAppBase() {
      let user = userModel.getResult();

      //非admin用户只能添加 workbench 应用
      if (!user.isAdmin) {
        this.entity.category = "workbench";
      }
    },

    getParamId() {
      return this.$route.params.id;
    },

    networkFailHandler() {
      let lang = i18nService.getOtherLanguageMap();

      this.$alert(lang["loadingFailAgain"], "Error").then(() => {
        this.fetch()
      });
    },

    save() {
      let appBaseEditer = this.$refs.appBase

      appBaseEditer
      .validate()
      .then((data)=>{
        let paramData = this.getValue()
        let lang = i18nService.getOtherLanguageMap()
  
        createUpdateAppModel.setParam(paramData)
        createUpdateAppModel
          .execute(this.isAddition())
          .then(() => {
            this.$success(lang["saveSuccess"])
            this.$router.push({ path: "/app/app/index" })
          })
          .catch(() => {
            this.$error(lang["saveFail"]);
          })
      }).catch(()=>{
        this.scrollTop()
      })
    },

    getValue() {
      let checkedApiIds = [];
      let entity = _.clone(this.entity);
      let previewList = this.getPreviewList();

      _.each(entity,(val,attr)=>{

        if(/^preview[0-3]$/.test(attr)) {
          entity[attr] = ''
        }
      })

      previewList.forEach((item, i) => {
        entity["preview" + (i + 1)] = item.servername;
      });

      return entity;
    },

    getPreviewList() {

      return this.$refs.appBase.getPreviewList();
    },

    exit() {

      this.$router.push({ path: "/app/app/index" });
    }
  }
};
</script>

<style lang="less">
@import "../../../assets/css/variable.less";

.app-edition {
  overflow-y: auto;

  .panel-title {
    margin-bottom: @jw20px;
  }

  .step-content {
    margin-top: 20px;
    min-height: calc(~"100% - 77px - 40px - 100px");
  }
}
</style>