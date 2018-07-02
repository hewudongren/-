<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="添加产品" name="first">
           <div class="AddProduct">
       <!-- 添加产品表单 -->
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="分类" prop="classify">
                <el-select v-model="ruleForm.classify" placeholder="请选择">
                <el-option  value="shanghai"></el-option>
                <el-option  value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="名称" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="类别" prop="kind">
                <el-select v-model="ruleForm.kind" placeholder="请选择">
                <el-option value="shanghai"></el-option>
                <el-option value="beijing"></el-option>
                </el-select>
            </el-form-item>
             <el-form-item label="性别" prop="sex">
                <el-select v-model="ruleForm.sex" placeholder="请选择">
                <el-option  value="shanghai"></el-option>
                <el-option  value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="中文申报名" prop="Cdeclare">
                <el-input v-model="ruleForm.Cdeclare"></el-input>
            </el-form-item>
            <el-form-item label="英文申报名" prop="Edeclare">
                <el-input v-model="ruleForm.Edeclare"></el-input>
            </el-form-item>
            <el-form-item label="申报价格" prop="price">
                <el-input v-model="ruleForm.price"></el-input>
            </el-form-item>
             <el-form-item label="申报类别海关编码" prop="code">
                <el-input v-model="ruleForm.code"></el-input>
            </el-form-item>
            <el-form-item label="上传图片" prop="imgPath">
                <el-upload
                  class="avatar-uploader"
                  action="http://rap2api.taobao.org/app/mock/14103//fdfs_upload.php"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="ruleForm.imgPath" :src="ruleForm.imgPath" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
      
   
       
     
       
        <el-form-item label="描叙" prop="desc">
            <el-input type="textarea" v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">添加产品</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
        </el-form>
    </div>







    </el-tab-pane>
    <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
    <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
    <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
  </el-tabs>
</template>
 <style lang="less">
      .AddProduct{
        .avatar-uploader .el-upload {
          border: 1px dashed #d9d9d9;
          border-radius: 6px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
           .avatar {
            width: 178px;
            height: 178px;
            display: block;
          }
        }
        .avatar-uploader .el-upload:hover {
          border-color: #409EFF;
        }
        .avatar-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          width: 178px;
          height: 178px;
          line-height: 178px;
          text-align: center;
        }
       
      }
 </style>

<script>
  export default {
    data() {
      return {
        activeName: 'first',
        ruleForm: {
          classify: '',
          name: '',
          kind: '',
          sex: '',
          Cdeclare: "",
          Edeclare: "",
          price: '',
          code: "",
          imgPath: "",
          desc: ''
        },
        rules: {
          classify: [
            { required: true, message: '请选择产品分类', trigger: 'change' },
          ],
          name: [
            { required: true, message: '请输入名称', trigger: 'blur' }
          ],
          kind: [
            {  required: true, message: '请选择类别', trigger: 'change' }
          ],
          sex: [
            {  required: true, message: '请选择性别', trigger: 'change' }
          ],
          Cdeclare: [
            {  required: true, message: '请输入中文申报名', trigger: 'blur' }
          ],
          Edeclare: [
            { required: true, message: '请输入英文申报名', trigger: 'blur' }
          ],
          
           price: [
            { required: true, message: '请输入申报价格', trigger: 'blur' }
          ],
           code: [
            { required: true, message: '请输入海关编码', trigger: 'blur' }
          ],
            imgPath: [
            { required: true, message: '请上传图片', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写产品描叙', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      handleClick(tab, event) {
        // console.log(tab, event);
      },
      submitForm(formName) {
        // 表单验证
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.ruleForm)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //预览图片
       handleAvatarSuccess(res, file) {
        this.ruleForm.imgPath = file.url;
      },
      //上传图片
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg'||'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      // 重置表单
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>