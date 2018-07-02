<template>
   <!-- 待审单列表页面 -->
    <div class="thaList">
        <!-- 隔离带 -->
        <div style="height:10px;"></div>
        <!-- 搜索区 -->
        <el-row>
            订单号： <el-input v-model="input" placeholder="请输入订单号"></el-input>
            电话确认： <el-input v-model="input" placeholder="请输入订单号"></el-input>

            <span>日期：</span>
             <el-date-picker
                v-model="startTime"
                type="datetime"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期">
            </el-date-picker>
            <span>--</span>
            <el-date-picker
                v-model="endTime"
                type="datetime"
                format='yyyy-MM-dd HH:mm:ss'
                 value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期">
            </el-date-picker>
                <el-input v-model="input" placeholder="请输入订单号"></el-input>
                  <el-input
                    placeholder="请输入内容"
                    prefix-icon="el-icon-search"
                    @input="handleSearch1"
                    v-model="input1">
                </el-input>   
                <el-button @click="cSearch" type="danger" size="medium">搜索</el-button>
                <el-button type="danger" size="medium">重置</el-button>
        </el-row>
        <!-- 隔离带 -->
        <div style="height:20px;"></div>
        <!-- 表格数据 -->
        <div  ref="ta">

        
            <el-table
                :height="tableHeight"
                v-loading="loading"
                :data="pagedata"
                @selection-change="handleSelectionChange"
                @sort-change="sort"
                border
                show-summary
                :summary-method="getSummaries"
                style="width: 100%">
                 <el-table-column
                type="selection"
                width="55">
                </el-table-column>
                <el-table-column
                sortable="custom"
                prop="ordernumber"
                label="订单号"
                >
                
                </el-table-column>
                <!-- <el-table-column
                prop="orderTime"
                label="下单时间"
                >
                </el-table-column> -->
                <!-- <el-table-column
                prop="site"
                label="站点">
                </el-table-column> -->

                <el-table-column
                label="图片">
                <template slot-scope="scope">
                    <div v-for="(item,index) in scope.row.img" :key="index">
                        <img :src="item.icon" alt="">
                        <p>尺寸：{{item.size}}</p>
                        <p>数量：{{item.num}}</p>
                    </div>
                </template>
                </el-table-column>
                <el-table-column prop="title" label="名称"></el-table-column>
                <el-table-column prop="SKU" label="SKU"></el-table-column>
                <el-table-column prop="GIFT" label="赠品"></el-table-column>
                <el-table-column sortable prop="price" label="售价(元)"></el-table-column>
                <el-table-column prop="halfprice" label="第二件价格"></el-table-column>
                <el-table-column prop="freebie" label="买一增几"></el-table-column>
                <!-- <el-table-column prop="num" label="购买量"></el-table-column>
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="phone" label="手机号"></el-table-column> -->
                <el-table-column prop="area" label="国家或地区"></el-table-column>
                <el-table-column  label="工作人员备注">
                    <template slot-scope="scope">
                        <el-button type="info" size="small">添加</el-button>
                    </template>
                </el-table-column>
                    
                <el-table-column
                fixed="right"
                label="操作"
                width="100">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                    <el-button @click="edit(scope)" type="text" size="small">编辑</el-button>
                    <el-button @click="remove(scope)" type="danger" size="small">删除</el-button>
                </template>
                </el-table-column>
            </el-table>
            <!-- 页面数据 -->
            <el-button type="danger" size="medium">全选</el-button>
            <el-button type="danger" size="medium">取消全选</el-button>
            <el-pagination
                background
                layout="total,sizes,prev, pager, next,jumper"
                :total="pageTotal"
                :current-page="pageNum"
                @current-change="currentPage"
                >
            </el-pagination>
        </div>
  </div>
</template>
<style lang="less">
    .thaList{
      div.el-input{
          width: auto
      }
  }

</style>


<script>

  export default {
    data() {
      return {
        multipleSelection: [],//多选数据  
        input:"",  //输入框0数据  
        input1:"",  //输入框1数据  
        startTime:"", //开始时间
        endTime:new Date(),   //结束时间
        reviewList:[],        //表格数据
        pageTotal: 29,//总数据  
        pageNum: 1,    //当前页
        pageSize: 10,  //当前页显示数据
        pagedata:[],   //每页显示的数据
        tableHeight:1000,//表格高度
        selectData:["你好","我好","大家好"], //下拉框数据
        inputData:"", //输入框数据
        kaisitime:"",//开始的时间
        jiesutime:new Date(),//结束的时间，默认为当前时间
        searchConName1:"",   //搜索字段
        data1:[],            //表格数据
        initTable1:[],       //初始数据
        loading: true        //加载效果
      }
    },
    created(){
        //请求数据
        this.$axios.post("http://api.cn").then(res=>{
            // console.log(res)
            this.reviewList=res.data.reviewList
             // 初始化数据
             this.init()
             //获取数据 
             this.gettotaldata()
             //数据回来，关闭loading效果，会有延迟现象
             this.loading=false
        }).catch(err=>{

        })

    },
   
    mounted(){
          //有数据变化的写在此函数里  
             this.$nextTick(function(){
                  if(this.$refs.ta.offsetHeight>=document.documentElement.clientHeight - this.$refs.ta.offsetTop-110){
                 //设置表格的默认高度
                this.tableHeight = document.documentElement.clientHeight - this.$refs.ta.offsetTop-110
                // 动态设置表格高度
                let that=this  
                window.onresize=function temp(){
                    that.tableHeight = document.documentElement.clientHeight - that.$refs.ta.offsetTop-110 
                }
            }
            })
       
    },
    methods:{
        //保存初始数据
        init(){
            this.data1 = this.initTable1=this.reviewList
        },
        //当前页显示数据
        gettotaldata(){
                //显示当前页数据
                if(this.data1.length<this.pageSize){
                   this.pagedata=this.data1
                }else{
                    this.pagedata = this.data1.slice(0,this.pageSize);
                }
                //显示总数据数量
                this.pageTotal=this.data1.length
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
                 console.log(item)
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
                        console.log(i)
                        this.data1.splice(i, 1);
                    },
                    onCancel: () => {
                        this.$Message.info('我再想想');
                    }
                });
            },
             // 输入框搜索功能
            search (data, argumentObj) {
                let res = data;
                //每一次都过滤全部数据
                let dataClone = data;
                // 对搜索对象进行过滤
                for (let argu in argumentObj) {
                    if(argumentObj[argu]=="全部"){
                         return res;
                    }
                    //遍历属性名，多条件查询
                    if (argumentObj[argu].length > 0) {
                        //如果有输入内容 ,进行过滤
                        res = dataClone.filter(d => {
                            if(d[argu]){
                                return d[argu].indexOf(argumentObj[argu]) > -1;
                            }
                        });
                        //多条件查询，对结果再次过滤
                         dataClone = res;
                    }
                }
                return res;
            },
            //输入框查询
            handleSearch1 () {
            //每次查询全部数据    
            this.data1 = this.initTable1;
            this.data1=this.search(this.data1, {title:this.input1});
            this.gettotaldata()
            },
            //点击搜索
            cSearch(){
                console.log(this.startTime)
            },
            //编辑数据
            edit(item){
                // 编辑内容较多时进入子页面编辑
                this.$store.commit("updatereviewListitem",item.row)
                 this.$router.push({
                        name: 'edit3'
                });
                //内容不多时模态框编辑
                // var self = this
                // self.editDataModalFlag = true
                // self.editDataModalObject = params.row
                
            },
            //多选按钮数据
            handleSelectionChange(val){
                this.multipleSelection = val;
            },
            //远程排序
            sort(){

            },
            //列求和
            getSummaries(param) {
              //每一页的数据 
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '总价';
            return;
          }
          console.log(column.property)
          //获取每一列的值
          const values = data.map(item => Number(item[column.property]));
        //   console.log(values)
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += ' 元';
          } else {
            sums[index] = '';
          }
        });

        return sums;
      }
            

            
    }
   
  }
</script>