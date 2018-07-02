<template>
    <div class="brand">
        <!-- 添加 -->
        <el-button size="medium" >添加品牌</el-button>
        <!-- 品牌列表 -->
        <div ref="ta">
         <el-table
            :data="pagedata"
            :max-height="height"
            @sort-change="sort"
            border
            style="width: 100%">
            <el-table-column prop="kind" label="类别" :render-header="renderHeader" sortable='custom'>
                 <template slot-scope="scope">
                      <el-select @change="handleSearch(scope,value)" v-if="scope.$index==0" v-model="value" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <span v-else>{{scope.row.kind}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="brand" label="品牌" >
                  <template slot-scope="scope">
                     <el-input  prefix-icon="el-icon-search" @input="handleSearch(scope,input2)" v-model="input2" v-if="scope.$index==0" placeholder="请输入品牌名"></el-input>
                    <span v-else>{{scope.row.brand}}</span>
                </template>
            </el-table-column>
                <el-table-column prop="test" label="测试" >
                  <template slot-scope="scope">
                     <el-input  prefix-icon="el-icon-search" @input="handleSearch(scope,input3)" v-model="input3" v-if="scope.$index==0" placeholder="请输入品牌名"></el-input>
                    <span v-else>{{scope.row.test}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="logo" label="LOGO">
                <template slot-scope="scope">
                     <!-- <el-input v-model="input3" v-if="scope.$index==0" placeholder="请输入内容"></el-input> -->
                     <img  :src="scope.row.logo" alt="">
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
    </div>
</template>

<script>
    let flag={
        //  kind:"select",
        //  brand:"input",
        //  logo:"input"
     }
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
        options: [      //下拉框数据
          {      
          value: '全部',
          
        },
            {      
          value: '你好',
          
        }, {
          value: '我好',
         
        }, {
          value: '大家好',
          
        }],
        value: ''
      
      }
    },
     created(){
        //请求数据
        this.$axios.post("/c").then(res=>{
            // console.log(res)
            res.data.brandList.unshift(flag)
            this.tableData=res.data.brandList
            // 初始化数据
             this.init()
             //渲染页面
             this.gettotaldata()
             
        }).catch(err=>{

        })

    },
     methods:{
        //表头渲染函数
        renderHeader(createElement,params) {
            return createElement(
                'span',
                [
                createElement('Icon', {
                    attrs: { type: 'person' },
                
                }),
                createElement('span', params.column.label)
                ]
            )
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
            //删除数据
             remove (item) {
                
                
                    //当前页的索引
                    let index=item.$index
                   //确认模态框
                    this.$Modal.confirm({
                    title: '你确认删除该条数据？',
                    // content: '<p>Content of dialog</p><p>Content of dialog</p>',
                    onOk: () => {
                        this.$Message.info('拜拜');
                         //单条数据的实际索引
                        let i=index+(this.pageNum-1)*this.pageSize
                        //删除该条数据
                       
                       
                        this.data1.splice(i, 1);
                    },
                    onCancel: () => {
                        this.$Message.info('我再想想');
                    }
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
            //每次查询全部数据   
            //过滤添加的空对象
            this.data1 =  this.initTable1.filter(item=>{
                                return item.kind
                         })
                      
            //返回的数据
            this.data1=this.search(this.data1, this.searchobj);
            this.gettotaldata()
            },
            // //下拉框查询
            // select(){
            // //每次查询全部数据  
            // this.data1 = this.initTable1;
            // this.data1=this.search(this.data1, {kind:this.value});
            // this.gettotaldata()
            // },
            //远程排序
            sort(params){
               console.log(params) 
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
      

            
    },
    mounted(){
         // 动态设置表格高度
         this.$nextTick(function(){
                this.height = document.documentElement.clientHeight - this.$refs.ta.offsetTop-110
                
                let that=this  
                window.onresize=function temp(){
                    that.height = document.documentElement.clientHeight - that.$refs.ta.offsetTop-110
                }
         })
      
    }
  }
</script>