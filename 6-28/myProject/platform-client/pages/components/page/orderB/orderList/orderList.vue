<template>
    <div class="brandList">
        <!-- 订单操作 -->
      
        <!-- 订单列表 -->
        <div ref="ta" class="list">
         <el-table
            :data="tableData"
            
            :max-height="height"
            border
            style="width: 100%">
            <el-table-column prop="order_no" label="订单号（订单ID）" width="100">
               
            </el-table-column>
            <el-table-column prop="activity_id" label="优惠活动表ID" width="100">
               
            </el-table-column>
             <el-table-column prop="user_name" label="客户姓名" width="100">
               
            </el-table-column>
            <el-table-column prop="phone" label="手机号" width="100">
               
            </el-table-column>
               <el-table-column prop="email" label="邮箱" width="100">
               
            </el-table-column>
            <el-table-column prop="country" label="国家2字码" width="100">
               
            </el-table-column>
         
              <el-table-column prop="status" label="状态">
                <template slot-scope="scope">
                    <el-tag type="danger" v-if="scope.row.status==1">待确认</el-tag>
                    <el-tag type="danger" v-if="scope.row.status==2">已确认</el-tag>
                    <el-tag type="danger" v-if="scope.row.status==3">待采购</el-tag>
                    <el-tag type="danger" v-if="scope.row.status==4">已采购</el-tag>
                </template>
            </el-table-column>
        </el-table>
        </div>
           <!-- 页码数据 -->
            <el-pagination
                background
                layout="total,sizes,prev, pager, next,jumper"
                :page-sizes="[10, 20, 30, 40]"
                :total="pageTotal"
                :current-page="searchobj.offset"
                @current-change="currentPage"
                @size-change="lengthChange"
                >
            </el-pagination>
            <!-- 模态框 -->
             <el-dialog title="修改品牌中心" :visible.sync="dialogFormVisible">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                    <el-form-item label="类别" prop="cat_name" label-width="100px">
                        <el-input v-model="ruleForm.cat_name" ></el-input>
                    </el-form-item>
             
                  
                    <el-form-item label="品牌" prop="brand_name" label-width="100px">
                        <el-input v-model="ruleForm.brand_name"></el-input>
                    </el-form-item>
                 
                    <el-form-item label="品牌图片" prop="logo" label-width="100px">
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
                    </el-form-item>
                </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="updateEdit('ruleForm')">确 定</el-button>
                <el-button @click="dialogFormVisible = false">取 消</el-button>
              </div>
            </el-dialog>
    </div>
</template>
<style lang="less"> 
    .brandList{
        
    }
</style>


<script>
  import imageUpload from "@/components/common/imageUpload"
  import md5 from 'js-md5';
  export default {
    components:{
        imageUpload
    }, 
    data() {
      return {
       
        height:"500",    //最大高度
        tableData: [], //数据表数据
        pageTotal:0,   //总数据条数
        searchobj:{      //查询条件字段集合
            "offset": 1, //当前页
            "length": 10 //页容量
        },    
        dialogFormVisible: false,//模态框标识符
        ruleForm:{},           //模态框数据
        rules: {
          cat_name: [
            { required: true, message: '请选择分类', trigger: 'change' },
          ],
          brand_name: [
            { required: true, message: '请输入名称', trigger: 'blur' }
          ],
          logo: [
            { required: true, message: '请选择图片', trigger: 'change' }
          ],
       
        },
         img:"",             //图片预览路径    
         uploadParams:{      //上传参数
         file_field:"fdfs_file",
         token:"",
         time:+new Date(),
         format:"png",
         fdfs_file:""
         },
      
      }
    },
       
     created(){
        //请求数据
       this.getData()

    },
     methods:{
        //请求数据
        getData(){
             this.$axios.get("/bill",this.searchobj).then(res=>{
              console.log(res)
                 this.pageTotal=28
                 if(res.status==200){
                     
                     this.tableData=res.data.data.slice((this.searchobj.offset-1)*this.searchobj.length,this.searchobj.offset*this.searchobj.length)
                }
            
            // // 初始化数据
            //  this.init()
           
            }).catch(err=>{

            })
        },
      
        //保存初始数据
        init(){
            this.data1 = this.initTable1=this.tableData
        },
        // 切换页码
        currentPage(index){
            //更新当前页码
            this.searchobj.offset=index
            //获取当前页的数据
            this.getData()  
        },
        //切换页容量
        lengthChange(length){
            //更新页容量
            this.searchobj.length=length
            //获取当前页的数据
            this.getData()
        },
        //编辑品牌
        edit(item){
            //开启模态框
           this.dialogFormVisible=true
           //会双向绑定
           //this.ruleForm=item.row
           this.ruleForm = Object.assign({}, item.row)
           
        //    this.img=this.ruleForm.logo
          
        },
        //保存编辑数据
        updateEdit(formName){
            console.log(this.ruleForm)
            this.$refs[formName].validate((valid) => {
            if (valid) {
                this.$axios.put("/product/brands",this.ruleForm).then(res=>{
                console.log(this.ruleForm)
                if(res.data.status==200){
                    this.dialogFormVisible=false
                    this.ruleForm.logo=""
                    this.$message.success('修改成功');
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
        //删除数据
        remove(item) {
               //单条数据的id      
                let id=item.row.id
                this.$confirm('亲，你确定删除该条数据吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    //确认删除该条数据
                    this.$axios.delete("/product/brands",id).then(res=>{
                        console.log(res)
                        if(res.status==200){
                            this.$message.success('删除成功！');
                            this.getData()
                        }
                    })
                }).catch(()=>{
                    //取消删除数据
                })          
                     

            },
             //重置表单
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            //添加品牌
             append(){
                 this.$router.push({
                        path: '/brand/AddBrand'
                });
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
       
         // 动态设置表格高度
         this.$nextTick(function(){
                this.height = document.documentElement.clientHeight - this.$refs.ta.offsetTop-150
                
                let that=this  
                window.onresize=function temp(){
                    that.height = document.documentElement.clientHeight - that.$refs.ta.offsetTop-150
                }
         })
      
    }
  }
</script>