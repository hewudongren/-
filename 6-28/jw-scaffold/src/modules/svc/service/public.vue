/**
 * 公共资源模块
 */

<template>
<div class="api-common">
  <jw-table-control :buttons="getTableControl()" @on-header-button="onCreateApi"/>
  <el-table :data="getEntity()" style="width: 100%">
    <el-table-column label="Name">
      <template slot-scope="scope">
        <el-input v-model="scope.row.name"></el-input>
      </template>
    </el-table-column>
    <el-table-column label="Url">
      <template slot-scope="scope">
      <el-input v-model="scope.row.urlRegex"></el-input>
      </template>
    </el-table-column>
    <el-table-column label="Method">
      <template slot-scope="scope">
        <el-select v-model="scope.row.method" placeholder="请选择">
          <el-option value="GET"></el-option>
          <el-option value="POST"></el-option>
          <el-option value="DELETE"></el-option>
          <el-option value="PUT"></el-option>
          <el-option value="*" label="ALL"></el-option>
        </el-select>
      </template>
    </el-table-column>
    <el-table-column label="Description">
      <template slot-scope="scope">
        <el-input v-model="scope.row.desc"></el-input>
      </template>
    </el-table-column>
    <el-table-column width="80" label="Delete">
      <template slot-scope="scope">
        <i @click="()=>{scope._self.destroy(scope.$index)}" class="el-icon-delete"></i>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
import JwTableControl from 'jw_components/table/control-header'
import i18nService from 'jw_services/i18n/index'

let DEFAULT_ROW = {
  desc: '',
  name: '',
  method: '',
  urlRegex: ''
}

export default {
  props: { serviceEntity: Object },

  components: {
    'jw-table-control': JwTableControl
  },

  methods: {
    onCreateApi() {
      let category = this.getCategory()
      let apis = this.serviceEntity.apis

      apis.push(_.extend({ category, _id: new Date().getTime() }, DEFAULT_ROW))
    },

    getTableControl() {
      let { lang } = i18nService.getLanguageMap()

      return [{
        icon: 'el-icon-plus',
        type: 'add',
        txt: lang['platform.common.add']
      }]
    },

    getEntity() {
      let category = this.getCategory()
      let apis = this.serviceEntity.apis

      return _.filter(apis,x => x.category == category)
    },

    getCategory() {

      return "public"
    },

    destroy(rowIndex) {
      let apis = this.serviceEntity.apis
      let category = this.getCategory()
      let categoryIndex = 0

      for(let i=0,len=apis.length; i<len; i++) {
        if(apis[i].category === category) {
          if(categoryIndex === rowIndex) {
            return apis.splice(i,1)  
          }
          
          categoryIndex++
        }
      }
    },

    getValue() {

      return this.data
    }
  }
};
</script>
<style lang="less">
@import "../../../assets/css/variable.less";

.api-common {
  .control-header {
    padding-top: @jw10px;
    border-top: 1px solid @seperate-line;
    border-bottom:1px solid #ebeef5;
  }
}
</style>
