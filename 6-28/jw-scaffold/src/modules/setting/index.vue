<template>
  <div class="panel">
    <jw-panel-title @back="back" :back="true" :title="getTitle()" />
    <div class="setting-panel">
      <div class="iconBox">
          <el-upload :headers="customHeader" :action="uploadUrl" accept=".jpg,.png" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" v-loading="loadingAvatar">
              <img class="avatar" :src="avatar" v-loading="true" />
              <a href="javascript:void(0);">修改头像</a>
          </el-upload>
      </div> 
      <div class="userInfoList">
          <div class="infoBox" v-for="(item,i) in userInfoData" :key="i">
              <span>{{item.label}}:</span>
              <span v-html="item.value"></span>
              <span class="right"><a href="javascript:void(0)" v-if="item.showBut" @click="edit(item.key)">修改</a></span>
          </div>
      </div>
      <el-dialog :title="formTitle" :visible.sync="dialogTableVisible" size="tiny" class="dialogBox">
          <el-form :model="form" :rules="rules" ref="form">
              <el-form-item v-for="(item,j) in formList" :key="j" :label="item.label" :prop="item.key">
                  <el-input :type="item.type" v-model="form[item.key]" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item class="buttons">
                  <el-button type="primary" @click="save">确认</el-button>
                  <el-button @click="dialogTableVisible=false">取消</el-button>
              </el-form-item>
          </el-form>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import cookieParser from "jw_common/cookie.js";
import validateConfig from "jw_modules/setting/validate";
import profileModify from "jw_models/setting/modify-profile";
import passwordModify from "jw_models/setting/modify-password";
import i18nService from "jw_services/i18n/index";
import PanelTitle from "jw_components/panel-title";

export default {
  data() {
    return {
      token: cookieParser.getAuth(),
      dialogTableVisible: false,
      loadingAvatar: false,
      userInfoData: [],
      formTitle: "",
      formType: "",
      formList: [],
      rules: {},
      form: {}
    };
  },

  props: ["user"],

  components: {
    'jw-panel-title': PanelTitle
  },

  created() {

    this.setUserInfo();
  },

  methods: {
    getTitle() {
      let lang = i18nService.getOtherLanguageMap()

      return lang.setting
    },

    back() {

      this.$router.back();
    },

    handleAvatarSuccess(res, file) {
      let imageUrl = res.result[0].servername;
      let lang = i18nService.getOtherLanguageMap();

      this.loadingAvatar = true;
      profileModify
        .execute({ avatar: imageUrl })
        .then(() => {
          this.$warning(lang["operateSuccess"]);
          this.$emit("on-update",'refresh-user');
          this.loadingAvatar = false;
        })
        .catch(() => {
          this.$warning(lang["operateError"]);
          this.loadingAvatar = false;
        });
    },

    beforeAvatarUpload(file) {
      if (_.isString(file)) {
        if (/.jpeg|.png|.jpg/.test(file)) {
          return true;
        } else {
          this.$warning("上传头像图片只能是 JPG或PNG 格式!");
          return false;
        }
      }

      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!(isJPG || isPNG)) {
        this.$warning("上传头像图片只能是 JPG或PNG 格式!");
      }

      if (!isLt2M) {
        this.$warning("上传头像图片大小不能超过 2MB!");
      }

      return (isJPG || isPNG) && isLt2M;
    },

    setUserInfo() {
      _.extend(this.form, this.user);

      if (this.user.account) {
        this.userInfoData = [
          {
            label: "用户名",
            key: "account",
            value: this.user["account"],
            showBut: false
          },
          {
            label: "密码",
            key: "password",
            value: "<i class='tips'>已设置</i>",
            showBut: true
          },
          {
            label: "姓名",
            key: "name",
            value: this.user["name"],
            showBut: true
          },
          {
            label: "手机号码",
            key: "mobile",
            value: this.user["mobile"],
            showBut: true
          },
          {
            label: "邮箱",
            key: "email",
            value: this.user["email"],
            showBut: true
          }     
        ];        
      }    
    },

    edit(k) {
      this.formType = k;
      let item = _.find(this.userInfoData, userItem => {
        return userItem.key === k;
      });

      this.formTitle = `修改${item.label}`;
      this.formList = validateConfig[k].formList;
      this.rules = validateConfig[k].rules;

      if (k === "password") {
        this.rules = _.extend(
          {
            password: [
              {
                required: true,
                validator: (rule, value, callback) => {
                  if (value === "") {
                    callback(new Error("请输入密码"));
                  } else {
                    if (this.form.checkPass !== "") {
                      this.$refs.form.validateField("checkPass");
                    }
                    callback();
                  }
                },
                trigger: "blur"
              }
            ],
            checkPass: [
              {
                required: true,
                validator: (rule, value, callback) => {
                  if (value === "") {
                    callback(new Error("请再次输入密码"));
                  } else if (value !== this.form.password) {
                    callback(new Error("两次输入密码不一致!"));
                  } else {
                    callback();
                  }
                },
                trigger: "blur"
              }
            ]
          },
          validateConfig[k].rules
        );
      }

      this.dialogTableVisible = true;
    },

    save() {
      let lang = i18nService.getOtherLanguageMap();

      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.formType === "password") {
            let passw = {
              oldPassword: this.form.passwordOld,
              newPassword: this.form.password
            };

            passwordModify
              .execute(passw)
              .then(() => {
                this.$emit("on-update",'refresh-user');
                this.dialogTableVisible = false;
                this.$success(lang["operateSuccess"]);
              })
              .catch(data => {
                this.$error(data.message);
              });
          } else {
            let profile = {    
              [this.formType]: this.form[this.formType]
            };

            profileModify
              .execute(profile)
              .then(() => {
                this.$emit("on-update",'refresh-user');
                this.dialogTableVisible = false;
                this.$success(lang["operateSuccess"]);
              })
              .catch((error) => {
                this.$error(lang["operateError"]);
              });
          }
        }
      });
    }
  },
  computed: {
    customHeader() {
      return { token: this.token };
    },

    uploadUrl() {
      return `${Jw.gateway}/storage/common/upload?token=${this.token}`;
    },

    avatar() {
      let file;

      if (this.user.avatar) {
        file = `${Jw.gateway}/storage/common/download?filename=${encodeURIComponent(this.user.avatar)}`;
      } else {
        let fileName = parseInt(this.user.gender)
          ? "avatar_male.png"
          : "avatar_female.png";

        file = require("../../assets/img/" + fileName);
      }

      return file;
    }
  },
  watch: {
    user() {
      this.setUserInfo();
    },

    dialogTableVisible() {
      if (!this.dialogTableVisible) {
        this.$refs.form.clearValidate();
      }
    }
  }
};
</script>
<style lang="less" scoped>
// .setting-panel {
//   min-height: calc(100vh - 240px);
// }

.iconBox {
  padding: 50px 0;
  width: 180px;
  text-align: left;
  display: inline-block;

  img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    overflow: hidden;
  }

  a {
    display: inline-block;
    width: 120px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: #f5f5f5;
    border-radius: 4px;
    text-decoration: none;
    font-size: 14px;
    color: #9b9b9b;
    margin-top: 20px;
  }
}

.userInfoList {
  display: inline-block;
  vertical-align: top;
  width: calc(~'100% - 185px');
}

.infoBox {
  display: flex;
  border-bottom: 1px solid #ebeef5;
  padding: 35px 0 12px;
}
.infoBox:last-child {
  border-bottom: none;
}
.infoBox span {
  font-size: 14px;
  color: #909399;
  line-height: 48px;
}
.infoBox span:first-child {
  width: 100px;
}
.infoBox span:nth-child(2) {
  color: #606266;
  flex: 1;
}

.infoBox span:last-child {
  width: 120px;
}
.infoBox span:last-child a {
  display: inline-block;
  width: 120px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background: #f5f5f5;
  border-radius: 4px;
  border: none;
  text-decoration: none;
  color: #9b9b9b;
  font-size: 14px;
}
.buttons {
  text-align: right;
}
</style>
<style>
.infoBox .tips {
  font-style: normal;
  color: #7ed321;
}
.dialogBox input {
  height: 42px;
}
.dialogBox .el-dialog {
  padding: 20px 35px 0 20px;
}
.dialogBox .el-dialog__body {
  padding-top: 10px;
}
.buttons .el-button {
  padding: 12px 35px;
}
</style>
