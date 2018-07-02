 <template>
     <!-- 添加品牌 -->
     <div class="AddBrand">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="分类" prop="region">
                <el-select v-model="ruleForm.region" placeholder="请选择" >
                <el-option  value="衣服"></el-option>
                <el-option  value="裤子"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="名称" prop="name" style="width:315px;">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="图片" prop="imgPath">
                <image-upload>
                 
                </image-upload>
            </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">取消</el-button>
        </el-form-item>
        </el-form>
    </div>
 </template>
 <style lang="less">
      .AddBrand{
         .avatar-uploader .el-upload {
          border: 1px dashed #d9d9d9;
          border-radius: 6px;
          cursor: pointer;
          position: relative;
          width: 178px;
          overflow: hidden;
          .avatar {
            width: 100%;
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

import imageUpload from "@/components/common/imageUpload"
  export default {
    components:{
        imageUpload
    },
    data() {
      return {
        ruleForm: {
          region: '',
          name: '',
          logo: '',
        },
       
        rules: {
          region: [
            { required: true, message: '请选择分类', trigger: 'change' },
          ],
          name: [
            { required: true, message: '请输入名称', trigger: 'blur' }
          ],
          imgPath: [
            { required: true, message: '请选择图片', trigger: 'change' }
          ],
       
        }
      };
    },
    computed:{
      img(){
        return this.$store.state.app.imgPath
      }
    },
    methods: {
      //表单提交
      submitForm(formName) {
        this.ruleForm.imgPath=this.img
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.post("/product/brands",this.ruleForm).then(res=>{
              
              if(res.data.status==200){
                  this.$message.success('提交成功');
                  this.$router.push({path:"/brand/brandList"})
              }else{
                this.$message({
					            	type: 'error',
					            	message: res.data.msg
					          	});
              }
            })
          } else {
            //其他错误，全局拦截
            console.log('error submit!!');
            return false;
          }
        });
      },
      //重置表单
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.$router.push({path:"/brand/brandList"})
      }
    }
  }
</script>