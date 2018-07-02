<template>
  <div class="panel svc-panel" v-loading="loading">
    <jw-panel-title :title="getTitle()" :back="true" @back="exit"/>
    <jw-steps :steps="getSteps()" :active="active" />
    <div :class="{ 'svc-content':true, 'ie-fix':this.isIEFix(), 'width-fix': this.active===0 }" v-loading="loading">
      <transition name="fade" mode="out-in" appear>
        <router-view :serviceEntity="entity" ref="routerWidget"></router-view>
      </transition>
    </div>
    <jw-operate-bar @prev="prev" @next="next" @middle="exit" :btns="getOpsBtns()" :class="{ 'width-fix': this.active===0 }" />
  </div>
</template>

<script>
import PanelTitle from "jw_components/panel-title"
import OperateBtn from "jw_components/operate-bar"
import i18nService from "jw_services/i18n/index"
import Steps from "jw_components/steps/index"
import util from "jw_common/util"

import baseStore from "jw_stores/common"

import serviceModel from "jw_models/svc/service"
import serviceApiModel from "jw_models/svc/service-api"
import serviceSaveUpdateModel from "jw_models/svc/service-save-update"

let loadingTimerId = 0
const MAX_STEP = 4
const PATHS =[ 'detail','public','common','auth' ]

export default {
  data() {
    return {
      active: 0,
      entity: {},
      loading: true
    };
  },

  components: {
    "jw-steps": Steps,
    "jw-panel-title": PanelTitle,
    "jw-operate-bar": OperateBtn
  },

  created() {

    this.fetch()
  },
  
  methods: {
    isIEFix() {

      return util.isIE9() && (this.active!==0)
    },

    getOpsBtns() {
      let { lang } = i18nService.getLanguageMap()

      return [{
        visible: true,
        txt: lang['platform.common.previous']
      },{
        visible: true,
        txt: lang['platform.common.exitWithoutSave']
      },{
        visible: true,
        txt: this.getNextBtn()
      }]
    },

    showLoading() {

      this.loading = true
    },

    hideLoading() {
      
      clearTimeout(loadingTimerId)
      loadingTimerId = setTimeout(()=>{this.loading = false},500)
    },

    fetch() {
      let id = this.getParamId()
      let entity,promiseEnd

      this.showLoading()
      if (this.isAddition()) {
          promiseEnd = serviceModel.execute().then((result)=>{
              entity = result
              entity.apis = []
          })
      } else {
          entity = baseStore.get("svc-row-data")
          promiseEnd = serviceApiModel.execute(entity.id).then((result)=>{
            entity.apis = result  
          })
      }

      promiseEnd.then(()=>{
        this.entity = entity
        this.goDetail()
        this.hideLoading()
      })
      .catch(()=>{
        let lang = i18nService.getOtherLanguageMap()

        this.hideLoading(true)
        this.$alert(lang['loadingFailAgain'], 'Error', {
          showCancelButton: true,
          confirmButtonText: lang['confirm'],
          cancelButtonText: lang['cancel']
        })
        .then(()=>{

          this.fetch()
        })
      })
    },
    
    getParamId() {
      
      return this.$route.params.id
    },

    isAddition() {
      
      return this.getParamId() === '0'
    },

    getTitle() {
      let titles = i18nService.getI18nTitle().title
      let { lang } = i18nService.getLanguageMap()
      let svcData = baseStore.get("svc-row-data")

      if(this.isAddition()) {
        titles.push(lang['platform.common.add'])
      }else{
        titles.push(lang['platform.common.edit'])
        titles.push(svcData.name)
      }

      return titles
    },

    getNextBtn() {
      let lang = i18nService.getOtherLanguageMap()

      if(this.active === MAX_STEP-1) {
        return lang.complete
      }
      
      return lang.next
    },

    getSteps() {
      let { lang } = i18nService.getLanguageMap()

      return [
        {
          title: lang["platform.svc.detail"],
          desc: lang["platform.svc.detailDesc"]
        },
        {
          title: lang["platform.svc.public"],
          desc: lang["platform.svc.publicDesc"]
        },
        {
          title: lang["platform.svc.common"],
          desc: lang["platform.svc.commonDesc"]
        },
        {
          title: lang["platform.svc.auth"],
          desc: lang["platform.svc.authDesc"]
        }
      ];
    },

    prev() {

      this.active--
      if(this.active<0) {
        this.active = 0
        this.exit()
      }else{
        this.goStepPage()
      }
    },

    getStepValue() {

      return {
        value: this.$refs.routerWidget.getValue(),
        active: this.active
      }
    },

    next() {
      let id = this.getParamId()

      if(this.active === 0) {
        this.$refs.routerWidget.validate().then(()=>{
          this.active = this.active + 1
          this.goStepPage()    
        })
      }else{
        this.active = this.active + 1
        if(this.active<MAX_STEP) {
          this.goStepPage()
        }else{
          return this.save()
        }
      }
    },

    exit() {

      this.$router.push({ path: "/svc/service/index" })
    },

    goStepPage() {
      let id = this.getParamId()
      
      this.$router.push({ path: `/svc/service/edit/${id}/${PATHS[this.active]}` })
    },

    goDetail() {

      this.active = 0
      this.goStepPage()
    },

    save() {
      let lang = i18nService.getOtherLanguageMap()
      
      this.showLoading()
      serviceSaveUpdateModel
      .execute(this.isAddition(),this.entity)
      .then(()=>{

        this.hideLoading(true)
        this.exit()
      })
      .catch((error)=>{

        this.hideLoading(true)
        this.$error(error.message || lang['operateError'])
      })
    }
  }
};
</script>

<style lang="less">
@import "../../assets/css/variable.less";

.svc-panel {
  padding-right: 0!important;

  .panel-title {
    margin-right: @jw20px;
  }

  .jw-steps {
    padding-right: @jw20px;
  }

  .el-steps {
    margin-top: @jw10px;
  }

  .ops-bar {
    padding-right: @jw20px;
  }

  .ie-fix {
    padding-top: 0!important;
  }

  .width-fix {
    width: 60%;
  }

  .svc-content {
    height: calc(~'100% - 14.628rem');
    box-sizing: border-box;
    padding-top: @jw20px;
    padding-right: @jw20px;
    overflow-y: auto;
    overflow-x: hidden;
  }
}
</style>
