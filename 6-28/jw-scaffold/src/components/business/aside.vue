/**
 *页面左侧导航栏
 *
 *@author gill
 *@date 2018-05-02
 */

<template>
  <div class="jw-aside" :style="toAsideWidth()">
    <el-menu
      unique-opened
      background-color="#32323a"
      active-text-color="#ffd04b"
      text-color="#fff"
      :collapse="isCollapse"
      :default-active="toActiveItem()"
      @select="onAsideSelection">
      <el-submenu
        v-for="menu in menus"
        v-if="menu.children"
        :index="menu.path"
        :key="menu.path"
        v-show="menu.isDisplay">
        <template slot="title">
          <i :class="menu.icon + ' icon first-icon-fix'"></i>
          <span slot="title">{{menu.name}}</span>
        </template>
        <el-menu-item
          v-for="submenu in menu.children"
          :index="submenu.path"
          :key="submenu.path"
          v-show="submenu.isDisplay">
          <i :class="submenu.icon + ' icon sub-icon-fix'"></i>
          <span>{{submenu.name}}</span>
        </el-menu-item>
      </el-submenu>
      <el-menu-item v-else :index="menu.path" v-show="menu.isDisplay">
        <i :class="menu.icon + ' icon first-icon-fix'"></i>
        <span slot="title">{{menu.name}}</span>
      </el-menu-item>
    </el-menu>
    <div v-show="menus.length" class="aside-collapse" v-on:click="onAsideCollapse">
      <i :class="{ 'el-icon-arrow-right': isCollapse, 'el-icon-arrow-left': !isCollapse }"/>
    </div>
  </div>
</template>

<script>
import i18nService from "jw_services/i18n/index"
import userMenuModel from "jw_models/aside"

let currentActive = "";

export default {
  name: "jw-aside",

  props: ["asideWidth", "uniqueOpened"],

  data() {
    return {
      isCollapse: false,
      menus: []
    };
  },

  created() {

    this.merageMenus()
  },

  updated() {

    let menuList = userMenuModel.getResult()
    this.menus = this.fromatMenuData(menuList)
  },

  methods: {
    toActiveItem() {

      if(_.isEmpty(currentActive)) {

        currentActive = i18nService.getI18nTitle().path
      }

      return currentActive;
    },

    clearActiveItem() {
      currentActive = ''
    },

    toAsideWidth() {
      if (this.isCollapse) {
        //收缩
        return {
          width: "auto",
          "overflow-x": "inherit"
        };
      }

      return { width: this.asideWidth };
    },

    onAsideCollapse() {
      this.isCollapse = !this.isCollapse
      this.$emit("on-collapse", { collapse: this.isCollapse })
    },

    onAsideSelection(key, keypath) {
      currentActive = key
      this.$emit("on-aside-select", key, keypath)
    },

    merageMenus() {
      let { menu: menus } = i18nService.getLanguageMap();

      userMenuModel
        .execute()
        .then(menuList => {

          this.menus = this.fromatMenuData(menuList)
        })
        .catch(() => {

          this.menusNetworkErrorHandler()
        });
    },

    fromatMenuData(menuList) {
      let { menu: menus } = i18nService.getLanguageMap()

      _.each(menus, m => {
        m.isDisplay = !!_.find(menuList, menu => {
          return menu.code === m.code;
        });
        m.code == "home" && (m.isDisplay = true);

        if (m.children) {
          _.each(m.children, c => {
            c.isDisplay = !!_.find(menuList, menu => {
              return menu.code === c.code
            })
          })
        }
      })

      return menus
    },

    menusNetworkErrorHandler() {
      let lang = i18nService.getOtherLanguageMap();

      this.$alert(lang["newworkFail"], lang["prompt"]).then(() => {
        this.merageMenus();
      });
    }
  }
};
</script>

<style lang="less">
@import "../../assets/css/variable.less";

.jw-aside {
  position: absolute;
  background-color: #32323a;
  top: @header-height;
  bottom: 1.714rem;
  left: 0;
  overflow-x: hidden;

  .el-menu-item, .el-submenu__title {
    height: 3.5rem;
    line-height: 3.5rem;
  }

  .icon {
    font-size: 1.3rem;
  }

  .horizontal-collapse-transition {
    .el-menu-item,
    .el-submenu__title {
      span {
        visibility: hidden;
      }

      .el-submenu__icon-arrow {
        display: none;
      }
    }

    .sub-icon-fix {
      display: none;
    }
  }

  .first-icon-fix {
    margin: 0;
    vertical-align: middle;
    width: 1.5rem;
    display: inline-block;
    text-align: center;
  }

  .aside-collapse {
    position: relative;
    border-top: 1px solid #909399;
    margin-top: 1rem;
    margin-bottom: 1rem;

    i {
      position: absolute;
      color: #909399;
      top: -10px;
      left: 50%;
      margin-left: -12px;
      width: 1.5rem;
      height: 1.5rem;
      text-align: center;
      line-height: 1.5rem;
      border-radius: 1rem;
      background-color: #32323a;
    }
  }

  .el-menu {
    border-right: none;
  }

  .el-submenu__icon-arrow {
    font-size: initial;
  }
}
</style>
