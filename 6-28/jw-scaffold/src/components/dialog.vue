<template>
<el-dialog :title="title" :visible.sync="visiable" :close="onClose">
  <el-form ref="form" :model="form" :rules="rules">
    <el-form-item v-for="(item,i) in list" v-if="item.type==undefined||item.type=='input'"
      :label="item.name" label-width="100px" :key="i" :prop="item.prop">
      <el-input v-model="form[item.prop]" auto-complete="off" :placeholder="item.placeholder || item.name" :maxlength="maxlength" />
    </el-form-item>
    <el-form-item v-else-if="item.type=='select'" :key="i" :label="item.name" :prop="item.prop" label-width="100px">
      <el-select v-model="form[item.prop]" :placeholder="item.placeholder || item.name">
        <el-option v-for="(s,j) in item.selectionList" :key="j" :label="s.name" :value="s.value" />
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="onCancel" size="mini">{{ lang['cancel'] }}</el-button>
    <el-button type="primary" size="mini" @click="onConfirm">{{ lang['confirm'] }}</el-button>
  </div>
</el-dialog>
</template>

<script>
import i18nService from 'jw_services/i18n/index'
import staticData from 'jw_common/data'

let promise = new Promise((resolve,reject)=>{})

export default {

  data() {
    let lang = i18nService.getOtherLanguageMap()

    return {
      maxlength: staticData.inputMaxLength,
      visiable: false,
      rules: [],
      lang,

      title: '',
      list: [],
      form: {}
    }
  },

  methods: {

    show(options) {
      
      if(options) {
        this.title = options.title
        this.list = options.list
        this.form = options.form
        this.rules = options.rules
      }
      this.visiable = true

      _.delay(()=>{
        let formElement = this.$refs.form
        formElement.clearValidate()
      })

      return new Promise((resolve,reject)=>{

        this.onCancel = ()=>{

          this.hide()
          reject('cancel')
        }

        this.onClose = ()=>{

          this.hide()
          reject('cancel')
        }

        this.onConfirm = ()=>{
          let formElement = this.$refs.form

          if(_.size(this.rules)===0) {
            this.hide()
            resolve(this.form)
            return
          }

          formElement.validate().then(()=>{
            this.hide()
            resolve(this.form)
          }).catch(()=>{})
        }
      })
    },

    hide() {

      this.visiable = false
    },

    onCancel: _.noop,
    onConfirm: _.noop,
    onClose: _.noop
  }
}
</script>