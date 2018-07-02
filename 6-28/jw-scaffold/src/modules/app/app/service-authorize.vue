<template>
  <div class="panel service-authorize" v-loading="loading">
    <jw-panel-title :title="getTitle()" :back="true" @back="exit"/>
    <jw-app-relation-edit
      :services="services"
      tab-position="left"
      tabLabelAttr="basepath"
      collapseLabelAttr="modulename"
      collapsesTabAttr="modules"
      tableCollapseAttr="apis"
    />
    <jw-operate-bar v-show="services.length" @prev="exit" @next="save" :btns="getOpsBtns()" />
  </div>
</template>

<script>
import util from "jw_common/util";
import i18nService from "jw_services/i18n/index";
import PanelTitle from "jw_components/panel-title";
import OperateBar from "jw_components/operate-bar";

import appStore from "jw_stores/common";
import serviceApiModel from "jw_models/app/service-api";
import createUpdateAppModel from "jw_models/app/app-create-update";

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
    "jw-app-relation-edit": AppRelationEdit,
    "jw-panel-title": PanelTitle,
    "jw-operate-bar": OperateBar
  },

  methods: {

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
      serviceApiModel.requestServiceApi(id).then(datas => {
        let entity = appStore.get("row-data")

        if(_.isEmpty(entity)) {
          return Promise.reject('goToIndex')
        }

        this.entity = entity
        this.services = this.serviceApiDataFormatter(datas[0], datas[1])
        this.hideLoading()
      }).catch((error) => {
        this.hideLoading()

        if(error === 'goToIndex') {
          this.exit()
        }else{
          this.networkFailHandler()
        }
      })
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

    serviceApiDataFormatter(apiIds, services) {
      let moduleIndex = 0

      if (!_.isArray(services) || !_.isArray(apiIds)) {
        return []
      }

      _.each(services, s => {
        let modules = [];

        s.apis = _.filter(s.apis,a => a.category == "auth");
        _.forEach(s.apis,(api, i) => {
          let currModuleName = api.urlRegex.substring(
            -1,
            api.urlRegex.lastIndexOf("/")
          );
          let existModule = _.find(modules, x => {
            return x.modulename == currModuleName;
          });

          api.checked = apiIds.indexOf(api.id) != -1;
          existModule
            ? existModule.apis.push(api)
            : modules.push({ modulename: currModuleName, apis: [api], __id:moduleIndex++ });
        });

        s.modules = modules;
        delete s.apis;
      });

      return services;
    },

    getTitle() {
      let { lang } = i18nService.getLanguageMap()
      let titles = i18nService.getI18nTitle().title
      
      if(this.entity) {
        titles.push(lang['platform.app_app.auth'])
        titles.push(this.entity.name)
      }
      
      return titles
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
      let paramData = this.getValue()
      let lang = i18nService.getOtherLanguageMap()
  
      createUpdateAppModel.setParam(paramData)
      createUpdateAppModel.execute(false).then(() => {
        this.$success(lang["saveSuccess"])
        this.$router.push({ path: "/app/app/index" })
      }).catch(() => {
        this.$error(lang["saveFail"])
      })
    },

    getValue() {
      let checkedApiIds = []
      let entity = _.clone(this.entity)

      this.services.forEach(svc => {
        svc.modules.forEach(m => {
          m.apis.forEach(api => {
            api.checked && checkedApiIds.push(api.id);
          })
        })
      })

      entity.apiIds = checkedApiIds
      return entity
    },

    exit() {

      this.$router.push({ path: "/app/app/index" });
    }
  }
};
</script>

<style lang="less">
@import "../../../assets/css/variable.less";

.service-authorize {
  overflow-y: auto;

  .panel-title {
    margin-bottom: @jw20px;
  }

  .app-relation {
    height: calc(~'100% - 135px');
    border-bottom: 1px solid @seperate-line;
  }
}
</style>