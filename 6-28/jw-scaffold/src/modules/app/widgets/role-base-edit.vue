
<template>
  <div class="base-editer">
    <el-form :model="entity" ref="ruleForm" label-position="left" :rules="rules" label-width="150px">
      <el-form-item :label="lang['platform.common.code']" prop="code">
        <el-input v-model="entity.code" :maxlength="maxLength" :placeholder="lang['platform.common.code']"></el-input>
      </el-form-item>
      <el-form-item :label="lang['platform.common.name']" prop="name">
        <el-input v-model="entity.name" :maxlength="maxLength" :placeholder="lang['platform.common.name']"></el-input>
      </el-form-item>
      <el-form-item label="App" prop="appId">
        <el-select v-model="entity.appId" placeholder="apps..." :disabled="isAddition">
          <el-option v-for="app in apps" :key="app.id" :label="app.name" :value="app.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="lang['platform.common.desc']">
        <el-input v-model="entity.desc" :maxlength="descMaxLength" :placeholder="lang['platform.common.desc']"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import i18nService from "jw_services/i18n/index"
import roleEditValidate from "./validate"
import staticData from "jw_common/data"

export default {
  props:['apps','data','isAddition'],

  data() {
    let { lang } = i18nService.getLanguageMap()

    return {
      maxLength: staticData.inputMaxLength,
      descMaxLength: staticData.descMaxLength,
      lang,

      rules: {
        code: [{ validator: roleEditValidate.code, trigger: 'blur', required: true }],
        name: [{ validator: roleEditValidate.name, trigger: 'blur', required: true }],
        appId: [{ validator: roleEditValidate.appId, trigger: 'change', required: true }]
      }
    }
  },

  computed: {
    entity() {

      return this.data
    }
  },
  
  methods: {
    getForm() {

      return this.$refs.ruleForm
    },

    getValue() {

      return this.entity
    },

    reset() {

      this.refs.ruleForm.resetFields()
    }
  }
};
</script>

<style lang="less">
@import "../../../assets/css/variable.less";

  .base-editer {
    
    margin-top: @jw15px;

    .el-form-item.is-success {
      .el-input__inner {
        border-color: #dcdfe6;
      }
    }
  }
</style>
