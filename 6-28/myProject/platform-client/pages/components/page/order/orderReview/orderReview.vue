<template>
    <div class="orderReview">
        <!-- 审单操作 -->
        <div class="mgb10">
            <div>
                <el-tag >马来待确认(100)</el-tag>
                <el-tag type="danger">台湾待确认(200)</el-tag>
            </div>
            <div>
                <el-tag >马来问题件(100)</el-tag>
                <el-tag type="danger">台湾问题件(150)</el-tag>
            </div>
            
            
        </div>
        
        <!-- 审单列表 -->
        <div ref="ta" class="list">
         <el-table
            :data="pagedata"
            :max-height="height"
            border
            style="width: 100%">
          
            <el-table-column prop="color" label="订单号" width="50">
            </el-table-column>
            <el-table-column prop="size" label="金额" width="50">
            </el-table-column>
            <el-table-column prop="SKU" label="站点" >
            </el-table-column>
             <el-table-column prop="color" label="地区" width="50">
            </el-table-column>
            <el-table-column prop="size" label="下单人" width="50">
            </el-table-column>
            <el-table-column prop="SKU" label="电话" >
            </el-table-column>
            <el-table-column prop="SKU" label="IP" >
            </el-table-column>
            <el-table-column prop="SKU" label="客户备注" >
            </el-table-column>
            <el-table-column prop="SKU" label="下单时间" >
            </el-table-column>
             <el-table-column  label="状态">
               <template slot-scope="scope">
                    <el-button  :type="scope.row.state=='已确认'?'success':'primary'" @click="affirm(scope)" >{{scope.row.state}}</el-button>
                    <!-- <el-button v-if="scope.row.state=='已确认'" type="primary" @click="affirm(scope,'已确认')" >已确认</el-button> -->
                </template>
            </el-table-column>
         
              <el-table-column  label="动作" width="160">
                <template slot-scope="scope">
                    <el-button type="primary" @click="edit(scope)" >修改</el-button>
                    <el-button type="primary" @click="edit(scope)" >删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        </div>
           <!-- 页码数据 -->
            <el-pagination
                background
                layout="total,sizes,prev, pager, next,jumper"
                :total="pageTotal"
                :current-page="pageNum"
                @current-change="currentPage"
                >
            </el-pagination>
            <!-- 模态框 -->
             <el-dialog title="修改品牌中心" :visible.sync="dialogFormVisible">
                <el-form :model="selectTable">
                    <el-form-item label="类别" label-width="100px">
                        <el-input v-model="selectTable.categories" ></el-input>
                    </el-form-item>
             
                  
                    <el-form-item label="品牌" label-width="100px">
                        <el-input v-model="selectTable.brand"></el-input>
                    </el-form-item>
                 
                    <el-form-item label="品牌图片" label-width="100px">
                        <el-upload
                          class="avatar-uploader"
                          :action="123"
                          :show-file-list="false"
                          :on-success="handleServiceAvatarScucess"
                          :before-upload="beforeAvatarUpload">
                          <img v-if="selectTable.img" :src="selectTable.img" class="avatar">
                          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateShop">确 定</el-button>
              </div>
            </el-dialog>
    </div>
</template>
<style lang="less"> 
    .SKUSet{
        
    }
</style>


<script>
  
  export default {
      
    data() {
      return {
        data1:"",  //动态数据
        initTable1:"",//原始数据  
        table1:[1], //过滤表数据
        tableData: [], //数据表数据
        pagedata:[],   //每页显示的数据
        pageSize: 10,  //当前页显示数据
        pageTotal:0,
        pageNum:1,
        height:"500",    //最大高度
        searchobj:{},    //查询条件字段集合
        input2:"",
        input3:"",
     
      
        dialogFormVisible: false,//模态框标识符
        selectTable:{}           //模态框数据
      
      }
    },
       
     created(){
        //请求数据
       this.getData()

    },
     methods:{
        //请求数据
        getData(){
            
             this.$axios.gett("http://123.com/c").then(res=>{
            this.tableData=res.data.brandList
            // 初始化数据
             this.init()
            //渲染页面
             this.gettotaldata()
             
            }).catch(err=>{

            })
        },
      
        //保存初始数据
        init(){
            this.data1 = this.initTable1=this.tableData
        },
        //当前页显示数据
        gettotaldata(){
                //显示当前页数据
                if(this.data1.length<this.pageSize){
                   this.pagedata=this.data1
                }else{
                    this.pagedata = this.data1.slice(0,this.pageSize);
                }
                //显示总数据数量(减去手动添加的一条)
                this.pageTotal=this.data1.length-1
        },
        // 切换页码
            currentPage(index){
                //更新当前页码
                this.pageNum=index
                //获取当前页的数据  
                var _start = ( index - 1 ) * this.pageSize;
                var _end = index * this.pageSize;
                this.pagedata = this.data1.slice(_start,_end);
            },
                   remove(item) {
                       //当前页的索引
                     let index=item.$index
                     //单条数据的实际索引
                     let i=index+(this.pageNum-1)*this.pageSize
                        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                        }).then(() => {
                            //删除该条数据
                            this.data1.splice(i, 1);
                            //渲染页面
                            this.gettotaldata()
                            this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });          
                        });
                     

            },
            // 输入框搜索功能执行方法
            search (data, argumentObj) {
                let res = data;
                //每一次都过滤全部数据
                let dataClone = data;
                // 对搜索对象进行过滤
                for (let argu in argumentObj) {
                    if(argumentObj[argu]=="全部"){
                          res = data;
                    }
                    //遍历属性名，多条件查询 值为“全部”不进入该循环
                    if (argumentObj[argu].length > 0&&argumentObj[argu]!="全部") {
                        //如果输入框有输入内容 ,进行过滤
                        res = dataClone.filter(d => {
                            //对空属性过滤
                            if(d[argu]){
                              
                                return d[argu].indexOf(argumentObj[argu]) > -1;
                            }
                        });
                        //多条件查询，对结果再次过滤
                         dataClone = res;
                    }
                }
                res.unshift(flag)
                return res;
            },
            //查询
            handleSearch (item,val) {
              
                //获取查询字段
                let type=item.column.property
                //声明动态对象
                this.searchobj[type]=val
                //遍历对象，若属性值为空，则删除该属性
                for(var key in this.searchobj) {
                    if(this.searchobj[key] === '') {
                    delete this.searchobj[key]
                    }
                }
            //每次查询本地全部数据   
            //过滤添加的空对象
            // this.data1 =  this.initTable1.filter(item=>{
            //                     return item.categories
            //              })

            //请求数据库数据
            this.getData1()
             //过滤添加的空对象
            this.data1.shift()
            console.log(this.data1)
            //返回的数据
            this.data1=this.search(this.data1, this.searchobj);
             this.gettotaldata()
            },
            //添加数据
             append(){
                 this.$router.push({
                        path: '/productCenter/SKUSet/SKUAdd'
                });
            },
            //添加按钮弹框
            add(){
                this.dialogVisible = true
            },
             handleClose(done) {
                this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
            },
            edit(params){
                
                this.dialogFormVisible=true
                console.log(this.dialogFormVisible)
                this.selectTable=params.row
            },
                   //图片上传成功 返回URL地址
            handleServiceAvatarScucess(res, file) {
                if (res.status == 1) {
                    this.selectTable.img = res.img;
                }else{
                    this.$message.error('上传图片失败！');
                }
            },
            beforeAvatarUpload(file) {
                const isRightType = (file.type === 'image/jpeg') || (file.type === 'image/png');
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isRightType) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return false;
            },
            //保存修改数据
            updateShop(){
            
            },
            //确认切换
            affirm(scope){
                scope.row.state= scope.row.state=="待确认"?"已确认":"待确认" 

            }
            
      

            
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
