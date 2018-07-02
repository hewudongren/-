<template>
  <el-form ref="form" :rules="rules" :model="entity" label-position="left" label-width="100px">
    <el-form-item prop="basepath" :label="lang['platform.svc.basepath']">
      <el-input v-model="entity.basepath" :maxlength="maxLength" :placeholder="lang['platform.svc.basepath']"></el-input>
    </el-form-item>
    <el-form-item prop="name" :label="lang['platform.svc.name']">
      <el-input v-model="entity.name" :maxlength="maxLength" :placeholder="lang['platform.svc.name']"></el-input>
    </el-form-item>
    <el-form-item prop="endpoint" :label="lang['platform.svc.endpoint']">
      <el-input v-model="entity.endpoint" :maxlength="maxLength" :placeholder="lang['platform.svc.endpoint']"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
import i18nService from 'jw_services/i18n/index'
import staticData from 'jw_common/data'

export default {
  props: { serviceEntity: Object },

  data() {
    let { lang } = i18nService.getLanguageMap()
    let otherLang = i18nService.getOtherLanguageMap()

    return {
      lang,
      maxLength: staticData.inputMaxLength,
      entity: this.serviceEntity,
      rules: {
        basepath: { required: true, message: otherLang.notEmpty },
        name: { required: true, message: otherLang.notEmpty },
        endpoint: { required: true, message: otherLang.notEmpty }
      }
    }
  },

  methods: {

    validate() {

      return this.$refs.form.validate()
    },
    
    getValue() {

      return this.entity
    }
  }
}
</script>