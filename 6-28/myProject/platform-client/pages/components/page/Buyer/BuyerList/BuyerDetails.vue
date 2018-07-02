<template>
    <!-- 采购单详情 -->
    <div class="BuyerDetails">
        <!-- 采购单操作 -->
        <div class="handle mgb10">

            <div class="mgb10"><span>采购单号：12345678</span><span>生成时间：123456</span> <span>状态：待采购</span> </div>
            <div class="mgb10">
                采购平台<el-input v-model="inputSKU" placeholder="请输入SKU" style="width:200px;"></el-input>
                平台单号<el-input v-model="inputSKU" placeholder="请输入SKU" style="width:200px;"></el-input>
            </div>
             <div class="mgb10">
                运费<el-input v-model="inputSKU" placeholder="请输入SKU" style="width:200px;"></el-input>
                运单号<el-input v-model="inputSKU" placeholder="请输入SKU" style="width:200px;"></el-input>
            </div>
             <div class="mgb10">
                币种 <el-select v-model="value" placeholder="请选择供应商">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                预计到货时间<el-input v-model="inputSKU" placeholder="请输入SKU" style="width:200px;"></el-input>
            </div>
          
        </div>
        <!-- 采购单表格 -->
           
        <div ref="ta" class="list">
            <el-table
                :data="tableData"
                :max-height="height"
                border
                style="width: 100%">
                <el-table-column prop="supplier_name" label="采购单" width="100">
                
                </el-table-column>
                <el-table-column prop="platform" label="平台" width="100">
                
                </el-table-column>
                <el-table-column prop="link_name" label="平台单号" >
                
                </el-table-column>
                <el-table-column prop="link_phone" label="供应商" >
                
                </el-table-column>
                <el-table-column prop="email" label="生成时间" >
                
                </el-table-column>
                <el-table-column prop="email" label="采购时间" >
                
                </el-table-column>
                <el-table-column prop="email" label="采购人" >
                
                </el-table-column>
                <el-table-column  label="状态" width="160">
                    <template slot-scope="scope">
                        <el-button type="warning" @click="edit(scope)" >待采购</el-button>
                        <el-button type="danger" @click="edit(scope)" >待付款</el-button>
                    </template>
                </el-table-column>
            
                <el-table-column  label="动作" width="160">
                    <template slot-scope="scope">
                        <el-button type="warning" @click="goDetails(scope)" >详情</el-button>
                        
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
     

             <div style="margin-top:10px"> 
                <span>合计：900</span> 
                <el-button type="primary" size="mini" @click="addSupplier(scope)" >提交退款申请</el-button>
                <el-button type="primary" size="mini" @click="addSupplier(scope)" >提交付款申请</el-button>
                <el-button type="primary" size="mini" @click="addSupplier(scope)" >提交采购单</el-button>
            </div>
         
    </div>
</template>
<style lang="less"> 
    .BuyerDetails{
        tbody{
           .el-button{
               width: 74px;
               margin-bottom: 3px;
               margin-left: 0px;
               padding: 6px 6px;
           } 
        }
    }
</style>

<script>
 
 
  export default {
   
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
     
      
      }
    },
       
     created(){
        //请求数据
       this.getData()

    },
     methods:{
        //请求数据
        getData(){
             this.$axios.get("/product/suppliers",this.searchobj).then(res=>{
              
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
        //去详情页
        goDetails(item){
         this.$router.push({path:"/BuyerDetails"})
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
            //添加供应商
             append(){
                 this.$router.push({
                        path: '/supplier/AddSupplier'
                });
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