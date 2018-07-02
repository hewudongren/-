<template>
  <el-form ref="jwForm" class="app-base-wrapper" :model="entity" :rules="rules" label-position="left" label-width="100px">
    <el-form-item :label="appLang['platform.app_app.name']" prop="name">
      <el-input v-model="entity.name" :placeholder="appLang['platform.app_app.name']" :maxlength="maxLength"></el-input>
    </el-form-item>
    <el-form-item :label="appLang['platform.app_app.version']" prop="version">
      <el-input v-model="entity.version" :placeholder="appLang['platform.app_app.version']" :maxlength="maxLength"></el-input>
    </el-form-item>
    <el-form-item :label="appLang['platform.app_app.index']" prop="index">
      <el-input v-model="entity.index" :placeholder="appLang['platform.app_app.index']" :maxlength="maxLength"></el-input>
    </el-form-item>
    <el-form-item :label="appLang['platform.app_app.icon']">
      <el-upload
        class="avatar-uploader"
        :headers="getToken()"
        accept="image/gif,image/jpeg,image/png,image/jpg"
        :action="action"
        :show-file-list="false"
        :on-success="onIconUploadSuccess">
          <img v-if="entity.icon" :src="getUploadedImgUrl(entity.icon)" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>
    <el-form-item :label="appLang['platform.app_app.keywords']">
      <el-input v-model="entity.keywords" :placeholder="appLang['platform.app_app.keywords']" :maxlength="maxLength"></el-input>
    </el-form-item>
    <el-form-item :label="appLang['platform.app_app.docCenter']">
      <el-input v-model="entity.docCenter" :placeholder="appLang['platform.app_app.docCenter']"></el-input>
    </el-form-item>
    <el-form-item :label="appLang['platform.app_app.videoDemo']">
      <el-input v-model="entity.videoDemo" :placeholder="appLang['platform.app_app.videoDemo']"></el-input>
    </el-form-item>
    <el-form-item label="Category">
      <el-select v-model="entity.category" placeholder="select..." class="select" :disabled="isCategoryDisabled">
        <el-option v-for="item in getStaticCategory()" :key="item.code" :value="item.code" :label="item.name"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item :label="appLang['platform.app_app.preview']">
      <el-upload
        list-type="picture"
        accept="image/gif,image/jpeg,image/png,image/jpg"
        :limit="3"
        :action="action"
        :headers="getToken()"
        :file-list="previewList"
        :before-upload="onUploadValidate"
        :on-success="onPreviewUploadSuccess"
        :on-remove="onPreviewUploadedRemove"
        :class="getUploadClass()">
          <el-button type="primary" class="upload-btn">上传文件</el-button>
          <span slot="tip" class="el-upload__tip">最多只能上传3张图片，且每张不超过500kb</span>
      </el-upload>
    </el-form-item>
    <el-form-item label="Description">
      <el-input type="textarea" :maxlength="descMaxLength" v-model="entity.description" placeholder="Description"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
import i18nService from 'jw_services/i18n/index'
import cookie from 'jw_common/cookie'
import staticData from 'jw_common/data'
import validate from './validate'

const CATEGORIES = [
  { code: "platform", name: "Platform" },
  { code: "workbench", name: "Workbench" }
]

const MAX_UPLOAD_COUNT = 3

let disabledUploadState = false

export default {
  props: ['entity' , 'isCategoryDisabled'],

  data() {
    let { lang } = i18nService.getLanguageMap()

    disabledUploadState = false
    return {
      lock: false, //使previewList只初始化一次 

      previewList: [],
      appLang: lang,
      action: `${Jw.gateway}/storage/common/upload`,
      maxLength: staticData.inputMaxLength,
      descMaxLength: staticData.descMaxLength,

      rules: {
        name: [{ validator: validate.name, trigger: 'blur', required: true }],
        version: [{ validator: validate.version, trigger: 'blur', required: true }],
        index: [{ validator: validate.index, trigger: 'blur', required: true }]
      }
    }
  },

  updated() {

    this.initPreviewList()
  },

  methods: {

    initPreviewList() {
      let entity = this.entity
      let previews = []

      for(let i=1;i<4;i++) {
        
        if(!_.isEmpty(entity[`preview${i}`])) {
          previews.push({
            name: entity[`preview${i}`],
            servername: entity[`preview${i}`],
            url: this.getUploadedImgUrl(entity[`preview${i}`])
          })
        }
      }

      if(!this.lock && previews.length) {
        disabledUploadState = previews.length === MAX_UPLOAD_COUNT
        this.previewList = previews
        this.lock = true
      }
    },

    getUploadClass() {

      return {
        'upload-demo':true, 
        'upload-disabled': disabledUploadState
      }
    },

    getPreviewList() {

      return this.previewList
    },

    getToken() {
      
      return { token: cookie.getCookie('token') }
    },

    onIconUploadSuccess(res, file) {

      this.entity.icon = res.result["0"].servername
    },

    getUploadedImgUrl(name) {
      name = encodeURIComponent(name);
      return `${Jw.gateway}/storage/common/download?filename=${name}`;
    },

    getStaticCategory() {

      return CATEGORIES
    },

    onPreviewUploadSuccess(file) {

      this.previewList.push({
        name: file.result["0"].originName,
        servername: file.result["0"].servername,
        url: this.getUploadedImgUrl(file.result["0"].servername)
      })

      if (this.previewList.length === MAX_UPLOAD_COUNT) {
        disabledUploadState = true
      }
    },

    onPreviewUploadedRemove(file, fileList) {

      disabledUploadState = false
      this.previewList = _.extend ([],fileList)
    },

    validate() {

      return this.$refs.jwForm.validate()
    },

    onUploadValidate(file) {
      if(_.isString(file)) {
        return /.jpg|.jpeg|.png|.gif/.test(file)
      }

      let isImg = /^image/.test(file.type);
      let isLt500KB = file.size / 1024 < 500;

      if (!isImg) {

        this.$message.error("只能上传图片!");
        return false
      }

      if (!isLt500KB) {

        this.$message.error("上传头像图片大小不能超过 500KB!");
        return false
      }

      return true
    }
  }
};
</script>
<style lang="less">
@import "../../../assets/css/variable.less";

.app-base-wrapper {
  width: 60%;
}

.upload-disabled {

  .el-upload,
  .el-upload__tip {
    visibility: hidden; //visibility 
  }
}

.el-upload__tip {
  padding-left: @jw20px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: @jw5px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  vertical-align: top;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

 .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px!important;
  text-align: center;
}

.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>
 