<template>
    <!-- 产品中心 -->
    <div class="productInfo">
        <!-- 产品操作 -->
        <div class="handle">
            <el-button type="primary"  class="mgb10"  @click="addProduct">新增产品</el-button>
            <el-input v-model="inputSKU" placeholder="请输入SPU" style="width:200px;"></el-input>
              <el-select v-model="supplier" @change="selectSupplier" placeholder="请选择供应商">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            <el-input v-model="inputMan" placeholder="请输入所有者" style="width:200px;"></el-input>
            <el-button type="warning"  class="mgb10"  @click="search">搜索</el-button>
        </div>
        
        <!-- 产品列表 -->
        <div ref="ta" class="list mgb10">
         <el-table
            :data="tableData"
            :max-height="height"
            border
            style="width: 100%">
            <el-table-column prop="id" label="ID" width="50">
               
            </el-table-column>
             <el-table-column prop="img" label="图片">
                <template slot-scope="scope">
                     <img  :src="scope.row.img" alt="">
                </template>
            </el-table-column>
            <el-table-column prop="product_name" label="名称" width="50">
               
            </el-table-column>
            <el-table-column prop="product_type" label="类别" width="50">
               
            </el-table-column>
            <el-table-column prop="user" label="添加人员" >
               
            </el-table-column>
         
            <el-table-column prop="SPU" label="SPU" >
               
            </el-table-column>
          
         
              <el-table-column  label="动作" align="center">
                <template slot-scope="scope">
                    <el-button type="success" size="mini" @click="issue(scope)" >发布产品</el-button>
                    <el-button type="danger" size="mini" @click="setSKU(scope)" >设置SKU</el-button>
                    <el-button type="primary" size="mini" @click="addSupplier(scope)" >添加供应商</el-button>
                </template>
            </el-table-column>
              <el-table-column prop="open" label="公开程度" align="center">
                <template slot-scope="scope">
                    <el-button v-for="(item,index) in scope.row.visible" :key="index" :type="scope.row.status==item?'danger':'primary'" size="mini" @click="change(scope,item),scope.row.status=item" >{{item}}</el-button>
                  
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
         
    </div>
</template>
<style lang="less"> 
    .productInfo{
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
       
        options: [       //下拉框供应商值
        {
          value: '全部',
         
        },
        {     
          value: '黄金糕',
         
        }, {
          value: '双皮奶',
         
        }, {
          value: '蚵仔煎',
        
        }, {
          value: '龙须面',
         
        }, {
          value: '北京烤鸭',
          
        }],
        supplier: '',      //下拉框供应商默认值
        inputSKU:"",    //输入框SKU
        inputMan:"",    //输入框所有者
       
        aIndex:"",      //绝对索引

        queryObj: {       //多条件查询对象
        page: 1,         //当前页
        limit: 10,       //页容量
        supplier:"",  //查询多条件
        SPU: "",
      },
         searchobj:{      //查询条件字段集合
            "offset": 1, //当前页
            "length": 10 //页容量
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
             this.$axios.get("192.168.10.121/v1/center",this.searchobj).then(res=>{
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
                
                
              
            },
            //选择供应商
            selectSupplier(){
                
                console.log(this.supplier)
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