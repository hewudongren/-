/**
 * 多语言下拉列表
 *
 *@author gill
 *@date 2018-05-02
 */

<template>
  <el-dropdown class="icon-internal" v-on:command="onChangeLanguage" trigger="hover">
    <span class="el-dropdown-link">{{currentLauguageDisplay()}}<i class="el-icon-arrow-down el-icon--right"></i></span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item v-for="(lang,index) in languageList" :key="index" :command="lang.code">{{lang.display}}</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import languageSetModel from 'jw_models/header/language-set'
import i18Service from 'jw_services/i18n/index'

export default {
  data() {

    return {
      selectedLanguageCode: i18Service.getSelectedLanguageCode(),
      languageList: []
    }
  },

  created() {

    this.fetchLanguageSet()
  },

  methods: {
    fetchLanguageSet() {

      languageSetModel
        .execute()
        .then((languageList)=>{

          this.languageList = languageList
        })
        .catch((error)=>{

          //console.log(error)
        })
    },

    currentLauguageDisplay() {
      let languageDisplay = 'English'
      let { languageList,selectedLanguageCode } = this

      for(let i=0,len=languageList.length;i<len;i++) {
        if(languageList[i].code === selectedLanguageCode) {
          languageDisplay = languageList[i].display
          break
        }
      }

      return languageDisplay
    },
    onChangeLanguage(code) {
      
      this.selectedLanguageCode = code
      i18Service
        .updateLanguage(code)
        .then(()=>{
          
          this.$emit('on-language-change')
        })
        .catch((error)=>{

          ///console.log(error)
        })
    }
  }  
}
</script>

<style lang="less">
@import '../../../assets/css/variable.less';

.icon-internal {
  cursor: pointer;

  .el-dropdown-link {
    padding-left: @jw5px;
  }
}
</style>

