/**
 *页面头部Header组件
 *
 *author: gill
 *date: 2018-04-27
 */

<template>
  <el-header height="4.285rem">
    <div class="left logo-wrapper">
      <div class="logo"></div>
      <div class="logo-name">{{title}}</div>
    </div>
    <div class="right">
      <a class="help-doc icon-help" v-show="docUrl && docUrl.length" target="_blank" :href="docUrl">
        {{getDocName()}}
      </a>
      <jw-lauguage-dropdown @on-language-change="onLanguageChange" />
      <div class="user">
        <span>{{i18nTip()}}, {{user.name}}</span>
        <img ref="userImg" class="icon user-icon" :src="userImgUrl()" @error="loadFail" @click.stop="showUserSettingCard" />
        <jw-user-card
          :user="userData"
          :userImgUrl="userImgUrl()"
          :isVisible="userCardVisible"
          v-on:on-signout="onUserCardHidden"
          v-on:on-user-seting="onUserCardHidden"
        />
      </div>
    </div>
  </el-header>
</template>

<script>
  import UserCard from './user-card'
  import LauguageDropdown from './lauguage-dropdown'
  import i18nService from 'jw_services/i18n/index'
  import staticData from 'jw_common/data'

  export default {
    name: 'Header',

    props: ['userData','title','docUrl'],

    data() {

      return {
        userCardVisible: false
      };
    },

    computed: {

      user() {

        return this.userData || { name: '' }
      }
    },

    components: {

      'jw-user-card': UserCard,
      'jw-lauguage-dropdown': LauguageDropdown
    },

    created() {

      this.onDocumentClick()
    },

    methods: {
      loadFail() {

        this.$refs.userImg.src = require('jw_assets/img/avatar.png')
      },

      getDocName() {
        let lang = i18nService.getOtherLanguageMap()

        return lang.doc
      },

      onLanguageChange() {

        this.$emit('on-language-change')
      },

      onDocumentClick() {

        document.addEventListener('click',()=>{

          this.onUserCardHidden()
        })
      },

      onUserCardHidden() {

        this.userCardVisible = false
      },

      showUserSettingCard() {

        this.userCardVisible = !this.userCardVisible
      },

      i18nTip() {
        let { lang } = i18nService.getLanguageMap()

        return lang['platform.common.hi']
      },

      userImgUrl() {
        let { avatar,gender } = this.user

        if (avatar) {
          avatar = encodeURIComponent(avatar)
          return `${Jw.gateway}/storage/common/download?filename=${avatar}`
        } else if(_.isNumber(gender)) {

          let fileName = this.isMale(gender)? 'avatar_male.png' : 'avatar_female.png'
          return require(`jw_assets/img/${fileName}`)
        }else{
          return require('jw_assets/img/avatar.png')
        }
      },

      isMale(gender) {

        return gender === staticData.male
      }
    }
  }
</script>

<style lang="less">
  @import "../../../assets/css/variable.less";

  .el-header {
    position: fixed;
    top: 0;
    width: 100%;
    background: #fff;
    line-height: 4.285rem;
    height: 4.285rem;
    -webkit-box-shadow: 5px 0px 5px #333;
    box-shadow: 5px 0px 5px #333;
    z-index: 10;

    .logo-wrapper {
      height: 4.285rem;
      line-height: 1;
    }

    .help-doc {
      margin-right: 1.25rem;
      color: #606266;
    }

    .logo {
      width: 6.25rem;
      height: 2.5rem;
      margin: .892rem 0;
      display: inline-block;
      background-repeat: no-repeat;
      background-position-y: center;
      background-image: url(../../../assets/img/logo.svg);
      vertical-align: middle;
    }

    .logo-name {
      display: inline-block;
      font-size: 1.5rem;
      font-weight: bold;
      padding-left: .357rem;
      padding-top: 0.9rem;
      vertical-align: middle;
    }

    .user {
      display: inline-block;
      margin-left: 1.25rem;
      //vertical-align: middle;
      color: #606266;

      .icon {
        vertical-align: middle;
        width: 2.142rem;
        height: 2.142rem;
        cursor: pointer;
        border-radius: 1.071rem;
        margin-left: @jw5px;
      }
    }
  }
</style>