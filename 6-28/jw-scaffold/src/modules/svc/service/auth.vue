/**
 * 公共资源模块
 */

<template>
<div class="auth-wrapper">
  <div :class="{ 'control':true, 'no-rows-fix': !collapseData.length }">
    <el-button size="mini" icon="el-icon-plus" @click="onModuleCreation">{{this.btnTxt}}</el-button>
  </div>
  <el-collapse v-show="collapseData.length">
    <el-collapse-item v-for="(item,j) in collapseData" :key="j" :title="item.collapseName" :name="item.collapseName">
    <table style="width: 100%" class="auth-table" cellspacing="0">
      <tr>
        <th>Name</th>
        <th>Url</th>
        <th>Method</th>
        <th>Description</th>
        <th style="width: 50px;"><i class="el-icon-circle-plus-outline" @click="add(item.collapseName)"></i></th>
      </tr>
      <tr v-for="(t ,i) in item.list" :key="i">
        <td><el-input v-model="t.name"></el-input></td>
        <td><el-input v-model="t.urlRegex"></el-input></td>
        <td>
          <el-select v-model="t.method" placeholder="请选择">
            <el-option value="GET"></el-option>
            <el-option value="POST"></el-option>
            <el-option value="DELETE"></el-option>
            <el-option value="PUT"></el-option>
            <el-option value="*" label="ALL"></el-option>
          </el-select>
        </td>
        <td><el-input v-model="t.desc"></el-input></td>
        <td><i @click="destroy(t)" class="el-icon-delete"></i></td>
      </tr>
    </table>
    </el-collapse-item>
  </el-collapse>
  <jw-dialog ref="dialog" />
</div>
</template>

<script>
import JwDialog from "jw_components/dialog"
import util from "jw_common/util"

import i18nService from "jw_services/i18n/index";

const CATEGORY = "auth"
const COLLAPSE_ITEM = {
  desc: '',
  name: '',
  method: '',
  category: CATEGORY
  //urlRegex: ''
}

export default {
  name: "auth",
  props: ["serviceEntity"],

  data() {
    let { lang } = i18nService.getLanguageMap()

    return {
      btnTxt: lang["platform.common.add"],
      apis: this.serviceEntity.apis
    }
  },

  computed: {
    collapseData() {
      let collapses = []

      _.each(this.apis, api => {
        if(api.category === CATEGORY) {
          let collapseName = api.urlRegex.replace(/[^/]+$/, "")
          let exist = collapses.find(x => x.collapseName == collapseName)
  
          exist ? exist.list.push(api):collapses.push({ collapseName, list: [api] })
        }
      });

      return collapses
    }
  },

  components: {
    "jw-dialog": JwDialog
  },

  methods: {
    
    showDialog() {
      let dialog = this.$refs.dialog
      let options = {
        title: 'Add Module',
        list: [{ name: 'Module Name', prop: 'urlRegex' }],
        form: { urlRegex: '' }
      }

      dialog
      .show(options)
      .then((data)=>{
        
        this.add(data.urlRegex + '/*')
      })
      .catch(()=>{})
    },

    destroy(row) {
      let apiIndex = _.findIndex(this.apis,(api)=>{ return api === row })

      this.apis.splice(apiIndex, 1)
    },

    add(collapseName) {

      this.apis.push(_.extend({urlRegex: collapseName },COLLAPSE_ITEM))
    },

    onModuleCreation() {
      
      this.showDialog()
    }
  }
};
</script>
<style lang="less">
@import "../../../assets/css/variable.less";

.ie-fix {
  .control {
    border-top: none!important;
  }
}

.auth-wrapper {
  .el-collapse {
    width: 100%;
  }

  .no-rows-fix {
    text-align: center!important;
    .el-button {
      width: 20%;
    }
  }
  
  .control {
    border-bottom: none;
    border-top: 1px solid @seperate-line;
    padding: @jw10px 0;
    text-align: right;
    width: 100%;
  }

  .auth-table {
    border-top: 1px solid #dcdfe6;
    border-bottom: 1px solid #dcdfe6;
    width: 100%;

    .el-input__inner {
      height: 2.5rem;
    }
  }

  .auth-table th {
    background: #eee;
    line-height: 42px;
  }

  .auth-table td {
    padding: @jw10px @jw5px;
    border-bottom: 1px solid #dcdfe6;
    text-align: center;
  }

  .auth-table tr:last-child td {
    border: none;
  }

  .auth-table .el-select {
    width: 100%;
  }
}
</style>
