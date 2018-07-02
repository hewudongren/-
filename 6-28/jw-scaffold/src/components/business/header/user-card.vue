/*
 * 用户卡片组件
 *
 *@author gill
 *@date 2018-04-28
 */

<template>
  <div class="user-setting-box" v-show="isVisible" :class="{'user-card-animation': isVisible}">
    <div class="user-info-box">
      <img class="left" ref="userImg" :src="userImgUrl" @error="loadFail">
      <div class="user-info left">
        <div v-text="user.name"></div>
        <div v-text="user.email"></div>
        <div v-text="user.mobile"></div>
      </div>
    </div>
    <div class="nav-item" @click="jumpToSettingPage">
      <img src="../../../assets/img/setting.png"><span>{{i18nAccountSetting()}}</span>
    </div>
    <div class="nav-item" @click="signOut">
      <img src="../../../assets/img/logout.png"><span>{{i18nLogout()}}</span>
    </div>
  </div>
</template>

<script>
  import i18nService from 'jw_services/i18n/index'
  import logoutModel from 'jw_models/logout'
  import util from 'jw_common/util'

  export default {

    props:[ 'isVisible','user','userImgUrl' ],

    methods: {
      loadFail() {

        this.$refs.userImg.src = require('jw_assets/img/avatar.png')
      },

      i18nAccountSetting() {
        let { lang } = i18nService.getLanguageMap()

        return lang['platform.common.accountSetting']
      },

      i18nLogout() {
        let { lang } = i18nService.getLanguageMap()

        return lang['platform.common.logout']
      },

      jumpToSettingPage() {

        this.$emit('on-user-seting')
        this.$router.push({path:"/setting"})
      },

      signOut() {

        logoutModel
          .execute()
          .then(
            (data)=>{

              this.$emit('on-signout')
              util.jumpToLogin()
            }
          )    
      }
    }
  };
</script>

<style lang="less">
  @import "../../../assets/css/variable.less";

  .user-setting-box {
    border-radius: 1px;
    box-shadow: 0 0 8px #383732;
    width: 20rem;
    top: 4.562rem;
    right: @jw5px;
    z-index: 10;
    position: absolute;
    background: #fff;
  }

  .user-info-box {
    overflow: hidden;
    padding: @jw15px;
  }
  .user-info-box img {
    width: 7.142rem;
    height: 7.142rem;
    border-radius: @jw5px;
  }

  .user-info {
    color: #999;
    text-align: left;
    padding-left: @jw10px;
  }

  .user-info div:first-child{
    font-size: 1.125rem;
    color: #162134;
    margin-bottom: .625rem;
  }

  .user-info div{
    //font-size: .875rem;
    line-height: 1.5rem;
  }

  .nav-item{
    height: 3.75rem;
    line-height: 3.75rem;
    padding: 0 @jw15px;
    transition: all .5s;
    text-align: left;
    border: 0;
    border-top: 1px solid #e2e2e2;
  }

  .nav-item:hover{
    cursor: pointer;
    background: #e2e2e2;
  }

  .nav-item img{
    width: 18px;
    height: 18px;
    vertical-align: middle;
    margin: -@jw5px @jw10px 0 0;
  }

  @keyframes user-card-animation-frame{
    0%{
      transform:perspective(400px) rotateY(90deg);
      animation-timing-function:ease-in;
      opacity:0
    }
    40%{
      transform:perspective(400px) rotateY(-20deg);
      animation-timing-function:ease-in
    }
    60%{
      transform:perspective(400px) rotateY(10deg);
      opacity:1
    }
    80%{
      transform:perspective(400px) rotateY(-5deg)
    }
    to{
      transform:perspective(400px)
    }
  }

  .user-card-animation {
    backface-visibility: visible !important;
    animation-name: user-card-animation-frame;
    animation-duration: 1s;
    animation-fill-mode: both;
    transform: scale(1) rotate(0deg);
  }
</style>
