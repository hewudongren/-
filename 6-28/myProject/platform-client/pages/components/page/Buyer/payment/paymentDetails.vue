<template>
    <!-- 采购付款单详情 -->
    <div class="BuyerDetails">
        <!-- 采购付款单操作 -->
        <div class="handle mgb10">

            <div class="mgb10"><span>付款单号：12345678</span><span>生成时间：123456</span> <span>状态：待付款</span> </div>
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
            </div>
          
        </div>
        
        <!-- 采购付款单列表 -->
        <div ref="ta" class="list mgb10">
         <h4>采购列表</h4>
         <el-table
            :data="pagedata"
            :max-height="height"
            border
            style="width: 100%">
             <el-table-column prop="img" label="图片">
                <template slot-scope="scope">
                     <img  :src="scope.row.img" alt="">
                </template>
            </el-table-column>
            <el-table-column prop="classify" label="SKU" width="50">
               
            </el-table-column>
            <el-table-column prop="sort" label="数量" width="50">
               
            </el-table-column>
            <el-table-column prop="gender" label="单价" >
               
            </el-table-column>
           
            
            
           
            
            <el-table-column prop="SPU" label="合计" >
                  
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="addSupplier(scope)" >100</el-button>
                </template>
            </el-table-column>
           
         
        </el-table>
        <div style="margin-top:10px"> 
            <span>总计：900</span> 
            <el-button type="primary" size="mini" @click="addSupplier(scope)" >问题单</el-button>
            <el-button type="primary" size="mini" @click="addSupplier(scope)" >付款</el-button>
        </div>
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
        data1:"",  //动态数据
        initTable1:"",//原始数据  
        table1:[1], //过滤表数据
        tableData: [], //数据表数据
        pagedata:[],   //每页显示的数据
        pageSize: 10,  //当前页显示数据
        pageTotal:0,
        pageNum:1,     //页码
        height:"500",    //最大高度
        searchobj:{},    //查询条件字段集合
       
        options: [{      //下拉框供应商值
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',      //下拉框供应商默认值
        inputSKU:"",    //输入框SKU
        inputMan:"",    //输入框所有者
       
        aIndex:"",      //绝对索引
      
     
      
      }
    },
       
     created(){
        //请求数据
       this.getData()

    },
     methods:{
        //请求数据
        getData(){
            
             this.$axios.gett("http://123.com/a").then(res=>{
                //  console.log(res)
            this.tableData=res.data.orderList
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
             addProduct(){
                 this.$router.push({
                        path: '/product/AddProduct'
                });
            },
            //发布产品
            issue(){

            },
            //设置SKU
            setSKU(scope){
                 this.$router.push({
                        name:"设置SKU",
                        query:{
                            SPU:scope.row.SPU
                        }
                        
                });
            },
            //添加供应商,去到产品采购信息
            addSupplier(scope){
                   this.$router.push({
                        name:"产品采购信息",
                        query:{
                            SPU:scope.row.SPU
                        }
                        
                }); 
            },
            //切换状态颜色
            change(params,index){
                
                
              
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