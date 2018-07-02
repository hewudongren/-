<template>
   <!-- 订单列表页面 -->
    <div class="orderList">
        <!-- 高级查询 -->
        <el-collapse-transition>
            <div class="gquery bottom-10"  v-show="show">

                <el-row>
                    <el-col :span="8">
                        <div class="demo-input-suffix">
                            订单号：<el-input v-model="input" placeholder="请输入内容"></el-input>
                        </div>
                        <div class="demo-input-suffix">
                            订单号：<el-input v-model="input" placeholder="请输入内容"></el-input>
                        </div>
                        <div class="demo-input-suffix">
                            订单号：<el-input v-model="input" placeholder="请输入内容"></el-input>
                        </div>
                        <div class="demo-input-suffix">
                            订单号：<el-input v-model="input" placeholder="请输入内容"></el-input>
                        </div>
                    </el-col>
                    <el-col :span="8">
                            <div class="demo-input-suffix">
                            订单号：<el-input v-model="input" placeholder="请输入内容"></el-input>
                        </div>
                        <div class="demo-input-suffix">
                            订单号：<el-input v-model="input" placeholder="请输入内容"></el-input>
                        </div>
                        <div class="demo-input-suffix">
                            订单号：<el-input v-model="input" placeholder="请输入内容"></el-input>
                        </div>
                        <div class="demo-input-suffix">
                            订单号：<el-input v-model="input" placeholder="请输入内容"></el-input>
                        </div>
                    </el-col>
                        <el-col :span="8">
                            <div class="demo-input-suffix">
                            订单号：<el-input v-model="input" placeholder="请输入内容"></el-input>
                        </div>
                        <div class="demo-input-suffix">
                            订单号：<el-input v-model="input" placeholder="请输入内容"></el-input>
                        </div>
                        <div class="demo-input-suffix">
                            订单号：<el-input v-model="input" placeholder="请输入内容"></el-input>
                        </div>
                        <div class="demo-input-suffix">
                            订单号：<el-input v-model="input" placeholder="请输入内容"></el-input>
                        </div>
                    </el-col>
                </el-row>
                <!-- 时间查询 -->
                <el-row>
                <span>下单时间：</span>
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
                    <span>发货时间：</span>
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
                </el-row>
                <el-button size="medium">搜索</el-button>
                <el-button type="primary" size="medium">重置</el-button>
            </div>
        </el-collapse-transition>
        <!--订单操作  -->
        <el-row :gutter="20">
            <el-col :span="6">
                <el-button size="medium" @click="show=!show">高级查询</el-button>
                
            </el-col>
        </el-row>

       
        <!-- 隔离带 -->
        <div style="height:10px;"></div>
        <!-- 导出数据 -->
         <el-row>
            <el-button size="medium">FB导出</el-button>
          
        </el-row>
        <!-- 隔离带 -->
        <div style="height:100px;" class="loadingtext"></div>
      
        <!-- 表格数据 -->
        <div  ref="ta" >
            <el-table
                :height="tableHeight"
               
                :data="pagedata"
                @selection-change="handleSelectionChange"
                @sort-change="sort"
                border
                show-summary
                
                style="width: 100%">
                <!-- 多选按钮 -->
                 <!-- <el-table-column type="selection" width="55"></el-table-column> -->
                <el-table-column sortable="custom" prop="ordernumber" label="订单号"></el-table-column>
                <el-table-column prop="site" label="站点"></el-table-column>
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
                <el-table-column prop="product" label="产品">
                     <template slot-scope="scope">
                        <div>
                            <p>产品ID：{{scope.row.product.productID}}</p>
                            <p>尺寸：{{scope.row.product.color}}</p>
                            <p>尺寸：{{scope.row.product.size}}</p>
                            <p>数量：{{scope.row.product.count}}</p>
                        </div>
                </template>
                </el-table-column>
                <el-table-column prop="name" label="名称"></el-table-column>
                <el-table-column prop="phone" label="电话"></el-table-column>
                <el-table-column sortable prop="area" label="地区"></el-table-column>
                <el-table-column prop="address" label="详细地址"></el-table-column>
                <el-table-column prop="state" label="订单状态">
                    <template slot-scope="scope">
                         <el-select v-model="scope.row.value" placeholder="请选择">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                        <el-tag >普</el-tag>
                        <el-tag color="red">敏</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="buy" label="购买量"></el-table-column>
                <el-table-column prop="receipt" label="总价"></el-table-column>
                <el-table-column  label="采购价">
                     <template slot-scope="scope">
                       <el-input v-model="scope.row.cost" placeholder="请输入内容"></el-input>
                    </template>
                </el-table-column> 
                <el-table-column prop="clientnote" label="客户备注"></el-table-column>
             
                <el-table-column  label="工作人员备注">
                    <template slot-scope="scope">
                        <el-button @click="add" type="info" size="small">添加</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="time" label="下单时间"></el-table-column>
                <el-table-column prop="IP" label="IP"></el-table-column>
                <el-table-column prop="forwarder" label="货代"></el-table-column>
                <el-table-column prop="trackingnumber" label="物流单号"></el-table-column>
                    
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
        <!-- 点击弹出对话框 -->
        <el-dialog
        title="提示"
        :modal=false
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
             <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="textarea">
            </el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
  </div>
</template>
<style lang="less">
  .orderList{
      div.el-input{
          width: auto
      }
  }

</style>


<script>
import { Loading } from 'element-ui';
  export default {
    data() {
      return {
        show:false,     //高级搜索切换  
        multipleSelection: [],//多选数据  
        textarea:"",  //多行文本输入框
        input:0.00,  //输入框0数据  
        input1:"",  //输入框1数据  
        startTime:"", //开始时间
        endTime:new Date(),   //结束时间
        orderList:[],        //表格数据
        pageTotal: 29,//总数据  
        pageNum: 1,    //当前页
        pageSize: 10,  //当前页显示数据
        pagedata:[],   //每页显示的数据
        tableHeight:500,//表格高度
        options: [{
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
        value: '', //下拉框数据
        inputData:"", //输入框数据
        kaisitime:"",//开始的时间
        jiesutime:new Date(),//结束的时间，默认为当前时间
        searchConName1:"",   //搜索字段
        data1:[],            //表格数据
        initTable1:[],       //初始数据
        dialogVisible: false, //对话框标识
        loading: true        //加载效果
      }
    },
    created(){
        //请求数据
        this.$axios.gett("/a").then(res=>{
            this.orderList=res.data.orderList
             // 初始化数据
             this.init()
             //获取数据 
             this.gettotaldata()
             //数据回来，关闭loading效果，会有延迟现象
            //  this.loading=false
        }).catch(err=>{

        })
    },
   
    mounted(){
           let loadingInstance = Loading.service({
            text: '请稍等',
            target: document.querySelector('.loadingtext')
        });
          //有数据变化的写在此函数里  
            //  this.$nextTick(function(){
            //       if(this.$refs.ta.offsetHeight>=document.documentElement.clientHeight - this.$refs.ta.offsetTop-110){
            //      //设置表格的默认高度
            //     this.tableHeight = document.documentElement.clientHeight - this.$refs.ta.offsetTop-110
            //     // 动态设置表格高度
            //     let that=this  
            //     window.onresize=function temp(){
            //         that.tableHeight = document.documentElement.clientHeight - that.$refs.ta.offsetTop-110 
            //     }
            // }
            // })
       
    },
    methods:{
        //保存初始数据
        init(){
            this.data1 = this.initTable1=this.orderList
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
               
               
            },
            //编辑数据
            edit(item){
                // 编辑内容较多时进入子页面编辑
               
                this.$store.commit("updatedorderListData",item.row)
                 this.$router.push({
                        name: 'edit1'
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
            }
           
            

            
    }
   
  }
</script>