<template>
   <!-- 订单列表页面 -->
    <div class="orderList">
        <!-- 高级查询 -->
        <el-collapse-transition>
        <div class="gquery mgb20"  v-show="show">
            <el-form ref="form" :model="form" label-width="80px">
                <el-row>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                                <el-form-item label="订单号">
                                    <el-input v-model="form.ordernumber"></el-input>
                                </el-form-item> 
                                <el-form-item label="物流单号">
                                    <el-input v-model="form.trackingN"></el-input>
                                </el-form-item> 
                                <el-form-item label="SPU">
                                    <el-input v-model="form.SPU"></el-input>
                                </el-form-item> 
                                <el-form-item label="站点">
                                    <el-input v-model="form.site"></el-input>
                                </el-form-item> 
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                                <el-form-item label="姓名">
                                    <el-input v-model="form.name"></el-input>
                                </el-form-item> 
                                <el-form-item label="手机">
                                    <el-input v-model="form.name"></el-input>
                                </el-form-item> 
                                <el-form-item label="邮箱">
                                    <el-input v-model="form.name"></el-input>
                                </el-form-item> 
                                <el-form-item label="销售人员">
                                    <el-input v-model="form.name"></el-input>
                                </el-form-item> 
                                <el-form-item label="优化师">
                                    <el-input v-model="form.name"></el-input>
                                </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                                <el-form-item label="地区">
                                    <el-input v-model="form.name"></el-input>
                                </el-form-item> 
                                <el-form-item label="货代">
                                    <el-input v-model="form.name"></el-input>
                                </el-form-item> 
                                <el-form-item label="物流状态">
                                    <el-input v-model="form.name"></el-input>
                                </el-form-item> 
                                <el-form-item label="销售人员">
                                    <el-input v-model="form.name"></el-input>
                                </el-form-item> 
                            <el-form-item label="优化师">
                                    <el-select v-model="form.region" placeholder="请选择活动区域">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                    </el-select>
                                </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                                <el-form-item label="订单状态">
                                    <el-checkbox-group v-model="form.type">
                                        <el-checkbox label="待确认" name="type"></el-checkbox>
                                        <el-checkbox label="已确认" name="type"></el-checkbox>
                                        <el-checkbox label="待采购" name="type"></el-checkbox>
                                        <el-checkbox label="已采购" name="type"></el-checkbox>
                                        <el-checkbox label="代发货" name="type"></el-checkbox>
                                        <el-checkbox label="拣货中" name="type"></el-checkbox>
                                        <el-checkbox label="已打包" name="type"></el-checkbox>
                                        <el-checkbox label="已发货" name="type"></el-checkbox>
                                        <el-checkbox label="已签收" name="type"></el-checkbox>
                                        <el-checkbox label="已取消" name="type"></el-checkbox>
                                        <el-checkbox label="已回款" name="type"></el-checkbox>
                                        <el-checkbox label="已退款" name="type"></el-checkbox>
                                         <el-checkbox label="拒签" name="type"></el-checkbox>
                                        <el-checkbox label="丢件" name="type"></el-checkbox>
                                        <el-checkbox label="问题件" name="type"></el-checkbox>
                                        <el-checkbox label="待转运" name="type"></el-checkbox>
                                    </el-checkbox-group>
                                </el-form-item>
                                <!-- <el-form-item label="特殊资源">
                                    <el-radio-group v-model="form.resource">
                                    <el-radio label="线上品牌商赞助"></el-radio>
                                    <el-radio label="线下场地免费"></el-radio>
                                    </el-radio-group>
                                </el-form-item> -->
                            
                        </div>
                    </el-col>
                </el-row>
            </el-form>
            <!-- 时间查询 -->
            <el-row class="mgb10">
                <span>下单时间：</span>
                <el-date-picker
                    v-model="startTime"
                    type="datetime"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="timestamp"
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
                    v-model="startTime1"
                    type="datetime"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择日期">
                </el-date-picker>
                <span>--</span>
                <el-date-picker
                    v-model="endTime1"
                    type="datetime"
                    format='yyyy-MM-dd HH:mm:ss'
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择日期">
                </el-date-picker>
            </el-row>
            <el-button size="medium" @click="onSubmit">搜索</el-button>
            <el-button type="primary" size="medium">重置</el-button>
        </div>
        </el-collapse-transition>
        <!--订单操作  -->
        <el-row :gutter="20" class="action">
            <el-col :span="6" class="left">
                <el-button size="medium" @click="show=!show">
                    高级查询
                    <i class="el-icon-caret-bottom edit_icon" v-if="!show"></i>
					<i class="el-icon-caret-top edit_icon" v-else ></i>
                </el-button>
                <el-button type="primary" size="medium">批量更新物流状态</el-button>
            </el-col>
            <el-col :span="18" class="right">
                <el-button size="medium" style="margin-left:10px">待确认(20)</el-button>
                <el-button type="primary" size="medium">已采购(20)</el-button>
                <el-button type="success" size="medium">已签收(20)</el-button>
                <el-button type="info" size="medium">待签收(20)</el-button>
                <el-button type="warning" size="medium">未上网(20)</el-button>
                <el-button type="danger" size="medium">无单号(20)</el-button>
                <el-button type="danger" size="medium">拒签(20)</el-button>
                <el-button type="danger" size="medium">1签失败(20)</el-button>
                <el-button type="danger" size="medium">2签失败(20)</el-button>
                <el-button type="danger" size="medium">3+签失败(20)</el-button>
                <el-button type="danger" size="medium">ON-HOLD(20)</el-button>
            </el-col>
        </el-row>

       
        <!-- 隔离带 -->
        <div style="height:10px;"></div>
        <!-- 导出数据 -->
         <el-row>
            <el-button size="medium">订单导出</el-button>
            <el-button type="primary" size="medium">发货模板导出</el-button>
            <el-button type="success" size="medium">客户信息清单导出</el-button>
            <el-button type="info" size="medium">TMS模板导出</el-button>
        </el-row>
        <!-- 隔离带 -->
        <div style="height:10px;"></div>
        <!-- 隔离带 -->
        <div style="height:20px;"></div>
        <!-- 表格数据 -->
        <div  ref="ta">
            <el-table
                :max-height="height"
                :data="pagedata"
              
                @sort-change="sort"
                v-loading="load1"
                border
                show-summary
                :summary-method="getSummaries"
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
      };
      .el-checkbox+.el-checkbox{
          margin-left: 0px;
      };
      .action{
          .left{
              min-width:300px;
              .el-button{
                margin-bottom:10px;
                .edit_icon{
                    transition: all 0.5s;
                   
                }  
              }
          }
          .right{
            .el-button{
              margin-bottom:10px;
              width:130px;
          }
          }
         
      }
  }

</style>


<script>

  export default {
    data() {
      return {
         form: {
          ordernumber:"111",
          trackingN:"",
          SPU:"",
          site:"",

          name: '',
          region: '',
          date1: '',
          date2: '',
        //   type: [],
        },  
        show:false,     //高级搜索切换  
        multipleSelection: [],//多选数据  
        textarea:"",  //多行文本输入框
        input:0.00,  //输入框0数据  
        input1:"",  //输入框1数据  
        startTime:"", //开始时间
        endTime:new Date(),   //结束时间
        startTime1:"", //开始时间
        endTime1:new Date(),   //结束时间
        orderList:[],        //表格数据
        pageTotal: 29,//总数据  
        pageNum: 1,    //当前页
        pageSize: 10,  //当前页显示数据
        pagedata:[],   //每页显示的数据
        height:1000,//表格高度
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
        searchConName1:"",   //搜索字段
        data1:[],            //表格数据
        initTable1:[],       //初始数据
        dialogVisible: false, //对话框标识
        load1: ""        //加载效果
      }
    },
    created(){
  
        //请求数据
        // this.load1=this.$store.state.app.load
        this.load1=true
        this.$axios.gett("/a").then(res=>{
            this.orderList=res.data.orderList
             // 初始化数据
             this.init()
             //获取数据 
             this.gettotaldata()
             //数据回来，关闭loading效果，会有延迟现象
           this.load1=false
        }).catch(err=>{
            
        })

    },
   
    mounted(){
        // 动态设置表格高度
         this.$nextTick(function(){
                this.height = document.documentElement.clientHeight - this.$refs.ta.offsetTop-180
                
                let that=this  
                window.onresize=function temp(){
                    that.height = document.documentElement.clientHeight - that.$refs.ta.offsetTop-180
                }
         })
       
    },
    methods:{
        // 高级搜索提交
         onSubmit() {
            console.log(this.startTime)
              //遍历对象，若属性值为空，则删除该属性
                for(var key in this.form) {
                    if(!this.form[key]) {
                    delete this.form[key]
                    }
                }
            //每次查询全部数据   
            //过滤添加的空对象
            this.data1 =  this.initTable1
            //返回的数据
            this.data1=this.search(this.data1, this.form);
            this.gettotaldata()
        },
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
                                //先转换成字符串
                                return String(d[argu]).indexOf(argumentObj[argu]) > -1;
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
            // cSearch(){
            //     
            // },
            //编辑数据
            edit(item){
                // 编辑内容较多时进入子页面编辑
                console.log(item)
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
            // handleSelectionChange(val){
            //     this.multipleSelection = val;
            // },
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
                if(index === 1){

                }
                
      
          //获取每一列的值
          const values = data.map(item => Number(item[column.property]));
        //   console.log(values)
          if (!values.every(value => isNaN(value))&&index==1) {
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