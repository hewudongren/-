<template>
    <div class="SKUAdd">
        
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            
            <el-form-item >
                <h2> SPU:123456789</h2>
            </el-form-item>
         
            
            <el-form-item label="" >
                  <el-checkbox v-model="checked" @change="showGroup">是否组合产品</el-checkbox> 
                  
            </el-form-item>
            
            <el-collapse-transition>
             <div v-show="checked">
                 <!-- 设置规格 -->
                <el-form-item label=""  >
                    <el-table
                        :data="tableData"
                        border
                        style="width: 100%">
                        <el-table-column
                        prop="SPEC"
                        label="规格名称"
                        width="250">
                        <template slot-scope="scope">
                        <el-input placeholder="请设置规格（例如颜色，尺寸）" v-model="scope.row.SPEC" @keyup.native.enter="addName(scope)"></el-input>
                        
                    </template>
                        </el-table-column>
                        <el-table-column
                        prop="list"
                        label="规格值"
                        >
                        <template slot-scope="scope">
                            <ul class="ul1">
                                <li  v-for="(item,i) in scope.row.list" :key="i"><span @click="remove(scope,i)" style="font-size:16px;" class="el-icon-error"></span>{{item}}</li>
                            </ul>
                            <el-input style="width:200px;" placeholder="请输入相应规格" v-model="scope.row.val"  @keyup.native.enter="add(scope)"></el-input>
                    </template>
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="操作">
                        <template slot-scope="scope">
                        <el-button @click="resetForm">删除</el-button>
                        
                    </template>
                        </el-table-column>
                    </el-table>
                </el-form-item>
                <!-- <el-button type="primary" v-show="checked" @click="addGroup">添加规格</el-button>   -->
                  <!-- 规格列表 -->
                <el-form-item label=""  >
                    <el-table
                        :data="CSlist"
                        border
                        style="width: 100%">
                        <el-table-column
                        type="index"
                        width="50">
                        </el-table-column>
                         <el-table-column
                        prop="date"
                        label="图片"
                        width="150">
                        <template slot-scope="scope">
                            <el-upload
                                class="avatar-uploader"
                                action="http://img.orkotech.com/fdfs_upload.php"
                                :data="uploadParams"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                                <img v-if="ruleForm.logo" :src="'http://img.orkotech.com/'+ruleForm.logo" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                       </template>
                        </el-table-column>
                         <el-table-column 
                            v-for="(col,index) in cols" :key="index"
                            :prop="col.prop" :label="col.label" >
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="SPU"
                        width="300">
                        <template slot-scope="scope">
                            <el-input placeholder="请输入SPU" v-model="scope.row.SPU" ></el-input>
                    </template>
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="状态">
                        <template slot-scope="scope">
                        <el-button @click="resetForm">上架</el-button>
                        <el-button @click="resetForm">下架</el-button>
                        
                    </template>
                        </el-table-column>
                    </el-table>
                </el-form-item>
            </div>
            </el-collapse-transition>
       
       
      
        
       
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
        </el-form>
    </div>
</template>
<style lang="less">
    .SKUAdd{
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
      .ul1{
         display: inline-block;
           li{
             position: relative;
              display: inline-block;
              margin-right: 10px;
              margin-top: 3px;
              padding: 5px 15px;
              background-color: #13c19f;
              border-radius: 10px;
              span{
                position: absolute;
                right: -3px;
                top: -3px;
                cursor: pointer;
                &:hover{
                  color: red;
                }
              }
          .el-input{
             
          }
        }
      

      }

        .avatar-uploader .el-upload {
          border: 1px dashed #d9d9d9;
          border-radius: 6px;
          cursor: pointer;
          position: relative;
          width: 100px;
          height: 100px;
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
          width: 100px;
          height: 100px;
          line-height: 100px;
          text-align: center;
        }
    }

</style>

<script>
import md5 from 'js-md5';

  export default {
      
    data() {
      return {
        ruleForm: {     //表单数据
          color: '',
          size: '',
          imgPath: '',
        },
        rules: {
          color: [
            { required: true, message: '请输入颜色', trigger: 'blur' },
          ],
          size: [
            { required: true, message: '请选择尺寸', trigger: 'blur' }
          ],
          imgPath: [
            {  required: true, message: '请选择图片', trigger: 'change' }
          ],
        },
        tableData:[      //设置规格数据
            {
           SPEC:"颜色",
           val:"",
          list:[] 
        },
              {
           SPEC:"尺寸",
           val:"",
          list:[] 
        }
        ],
        checked:true,    //组合表格切换按钮
        show:true,       //组合表格显隐切换
         cols: [          //动态列数据
              {prop: 'color', label: '颜色'},
            {prop: 'size', label: '尺寸'},
          ],
          def:{          //默认规格数据
              img:"",
              color:"",
              size:"",
              SPU:"",
              state:""
          },
          SPEClist:[],   //规格列表
          colorlist:[],          //颜色列表
          sizelist:[],          //尺寸列表
         img:"",             //图片预览路径    
         uploadParams:{      //上传参数
         file_field:"fdfs_file",
         token:"",
         time:+new Date(),
         format:"png",
         fdfs_file:""
         },
         
          
      };
    },
    computed:{
        CSlist(){
              //以颜色为基准
              this.SPEClist=[]
              if(this.colorlist.length>0){
                  this.colorlist.forEach((item,i)=>{
                                this.def.color=item
                                let def=JSON.parse(JSON.stringify(this.def)) 
                                this.SPEClist.push(def)
                              })
              }else{
                  console.log(1)
                  this.sizelist&&this.sizelist.forEach((item,i)=>{
                                this.def.size=item
                                let def=JSON.parse(JSON.stringify(this.def)) 
                                this.SPEClist.push(def)
                              })
              }
                  
            
                let init =this.SPEClist
                let mm=[]
                if(this.colorlist.length>0){
                      //以尺寸为基准，循环生成列表  
              this.sizelist&&this.sizelist.forEach((item,i) => {
                 init.forEach(e => {
                         e.size=item
                 });
                 mm.push(...JSON.parse(JSON.stringify(init)) )
              });
                }
           
            if(mm.length>0){
                this.SPEClist=mm
            }
            return  this.SPEClist
        }
    },
    methods: {
        handleAvatarSuccess(res, file) {
        this.ruleForm.imgPath = file.url;
      },
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
      //数量切换
      handleChange(){
         
      },
      //显示组合产品
      showGroup(){
       
        this.SPEClist.push(this.def)
      },
      //添加规格
      addGroup(){
         
        //   let groupObj=JSON.parse(JSON.stringify(this.groupObj)) 
        //   this.tableData.push(groupObj)
      },
      //添加规格
      add(scope){
        //清空数据
        // this.cc=[]
        if(scope.$index==0){
         //获得输入框的值 
         this.tableData[scope.$index].list.push(scope.row.val)
          //获得颜色规格列表
          this.colorlist= this.tableData[scope.$index].list
        }else{
          //获得输入框的值 
         this.tableData[scope.$index].list.push(scope.row.val)
         //获得颜色规格列表
          this.sizelist= this.tableData[scope.$index].list
        }
        //清空输入框
        scope.row.val=''
      },
      //删除规格
      remove(scope,i){
       if(scope.$index==0){
         this.colorlist.splice(i,1)
       }else{
         this.sizelist.splice(i,1)
       }
      },
      submitForm(formName) {

        this.$refs[formName].validate((valid) => {
          if (valid) {
            Object.assign(this.ruleForm,{tableData:this.tableData})
            console.log(this.ruleForm)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
               //图片上传
            beforeAvatarUpload(file) {
                
                this.uploadParams.fdfs_file=file
                //MD5加密
                this.uploadParams.token = md5.hex('salt001'+this.uploadParams.time);
                this.uploadParams.format=file.type.replace(/image\//g,"")

                const isJPG = file.type === 'image/jpeg'||'image/png';
                const isLt2M = file.size / 1024 / 1024 < 2;
                
                if (!isJPG) {
                this.$message.error('上传图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            //上传成功
            handleAvatarSuccess(res, file) {
           
                
                if(res.status==0){
                   this.ruleForm.logo=res.path
                   
                }else{
                this.$message.error(res.msg);
                }
            },
    },
    mounted(){

    }
  }
</script>
