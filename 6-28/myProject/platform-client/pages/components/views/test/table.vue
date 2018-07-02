<template>
<!-- 订单列表页 -->
  <div id="orderList">
      <!-- 主体区 -->
      <div class="content">
          <!-- 操作区 -->
          <div class="operate">
                <Row>
                    <Col span="4"> 
                        <Button type="primary">高级查询</Button>
                        <Button type="primary">批量更新物流状态</Button>
                    </Col>
                    <Col span="20">
                        <Button type="primary">待确认<span>(55)</span></Button>
                        <Button type="success">已采购 <span>(999)</span> </Button>
                        <Button type="success">已签收<span>(55)</span></Button>
                        <Button type="primary">待签收 <span>(999)</span> </Button>
                        <Button type="warning">未上网 <span>(999)</span> </Button>
                        <Button type="warning">无单号 <span>(999)</span> </Button>
                        <Button type="warning">拒签 <span>(999)</span> </Button>
                    </Col>
                </Row>
                <!-- 隔离带 -->
                <div style="height:10px;" ></div>

                <Row>
                    <Button type="success">订单导出</Button>
                    <Button type="warning">发货模板导出</Button>
                    <Button type="error">客户信息清单导出</Button> 
                    <Button type="error">TMS模板导出</Button> 
                </Row>
                 
          </div>
          <!-- 隔离带 -->
          <div style="height:10px;" ></div>
          <!-- 搜索区 -->
          <div class="time" ref="time">
              <span>日期：</span>
               <DatePicker @on-ok="ktime" v-model="kaisitime" @on-change="kaisitime=$event" type="datetime" placeholder="Select date and time" style="width: 200px"></DatePicker>
               - -
               <DatePicker @on-ok="jtime" v-model="jiesutime" @on-change="jiesutime=$event" type="datetime" placeholder="Select date and time" style="width: 200px"></DatePicker>
                <Select v-model="model1" style="width:200px">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <Input 
                    v-model="searchConName1" 
                    icon="search" 
                    @on-change="handleSearch1" 
                    placeholder="请输入姓名搜索..." 
                    style="width: 200px" 
                />
                <Button type="warning" @click="xiala">搜索</Button>
                <Button type="error">重置</Button> 
          </div>
          <!-- 隔离带 -->
          <div style="height:50px;" ></div>
        
          <!-- 详情区 -->
          <div class="details" ref="ta">
                <!-- 过滤表 -->
              
                <!-- 数据表 -->
                <Table  :height="tableHeight" ref="selection" @on-sort-change="paixu"  @on-select="dxuan" border :columns="columns5" :data="pagedata"></Table>
                 <!-- 隔离带 -->
                 <div style="height:10px;" ></div>
                <Page :total="pageTotal" :current="pageNum" :page-size="pageSize" show-elevator show-sizer show-total   
                  placement="top" @on-change="changepage"></Page> 
                  <Button @click="SelectAll(true)">全部选中</Button>
                  <Button @click="SelectAll(false)">取消全选</Button> 
 
          </div>
      </div>
      <!-- 模态框 -->
      <div>
          <!-- 查看 -->
        <Modal v-model="showDataModalFlag" title="查看详情">
            <p class="content-table-modal-show-p">时间: {{showDataModalObject.time}}</p>
            <p class="content-table-modal-show-p">姓名: {{showDataModalObject.username}}</p>
            <p class="content-table-modal-show-p">年龄: {{showDataModalObject.shenpistatus}}</p>
            <p class="content-table-modal-show-p">输入框: {{showDataModalObject.chengben}}</p>
            <p class="content-table-modal-show-p">图片: <img v-for="(item,index) in showDataModalObject.img" :key="index" :src="item" alt=""></p>
            <p class="content-table-modal-show-p">下拉框: {{showDataModalObject.volumeType}}</p>
        </Modal>
        <!-- 编辑 -->
        <Modal v-model="editDataModalFlag" title="编辑详情" @on-ok="doEditData">
            <Form :model="editDataModalObject" :label-width="100" >
                <FormItem label="姓名">
                    <Input v-model="editDataModalObject.chengben" placeholder="请输入" class="input-select-class"></Input>
                </FormItem>
                <FormItem label="年龄">
                    <Input v-model="editDataModalObject.username" placeholder="请输入" class="input-select-class"></Input>
                </FormItem>
                <FormItem label="省份">
                    <Select v-model="editDataModalObject.province" placeholder="请选择" class="input-select-class">
                        <Option value="北京市">北京市</Option>
                        <Option value="上海市">上海市</Option>
                        <Option value="广东">广东</Option>
                    </Select>
                </FormItem>
                <FormItem label="市区">
                    <Input v-model="editDataModalObject.shenpistatus" placeholder="请输入" class="input-select-class"></Input>
                </FormItem>
                <FormItem label="地址">
                    <Input v-model="editDataModalObject.shenpistatus" placeholder="请输入" class="input-select-class"></Input>
                </FormItem>
                <FormItem label="邮编">
                    <Input v-model="editDataModalObject.shenpistatus" placeholder="请输入" class="input-select-class"></Input>
                </FormItem>
            </Form>
        </Modal>
    </div>
      
  </div>
</template>
<style lang="less">
    #orderList{
        .content{
            //  position: relative;
        }
       
    }
</style>

<script>
    import "../../../libs/dist/css/layui.css"
    import "../../../libs/dist/layui.js"
    export default{
         data () {
            return {
                pageTotal: 29,//总数据  
                pageNum: 1,    //当前页
                pageSize: 10,  //当前页显示数据
                pagedata:"",   //每页显示的数据
                tableHeight:"",//表格高度
                selectData:["你好","我好","大家好"], //下拉框数据
                inputData:"", //输入框数据
                kaisitime:"",//开始的时间
                jiesutime:new Date(),//结束的时间，默认为当前时间
                searchConName1:"",   //搜索字段
                data1:[],            //表格数据
                initTable1:[],       //初始数据
                showDataModalFlag:false, //查看模态框切换标识符
                showDataModalObject: {}, //查看模态框数据
                editDataModalFlag: false, //编辑模态框标识符
                editDataModalObject: {},  //编辑模态框数据
                cityList: [               //下拉框
                    {
                        value: '全部',
                        label: '全部'
                    },
                    {
                        value: '你好',
                        label: '你好'
                    },
                    {
                        value: '我好',
                        label: '我好'
                    },
                    {
                        value: '大家好',
                        label: '大家好'
                    },
                ],
                model1:"全部",                 //下拉框默认值
              //表头
                columns5: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center',
                       
                    },
                    {
                        title: 'Date',
                        key: 'time',
                        sortable: "custom"
                    },
                    {
                        title: 'Name',
                        key: 'username'
                    },
                    {
                        title: 'Age',
                        key: 'shenpistatus',
                        sortable: true
                    },
                    {
                        title: 'Address',
                        key: 'shenpicomments'
                    },
                    //渲染图片
                    {
                    title: '图片', key: 'img',
                    render: (h, params) => {
                        // return h('img', {
                        // attrs: {
                        //      src: params.row.img
                        // },
                        // });
                        if(params.row.img){
                           return h('Div', 
                                params.row.img.map(function(type){ 
                                            return h('img', {  
                                            attrs: {
                                            src: type
                                            }, 
                                        });  
                                    })  
                        

                        );
                        }
                    },
                    },
                    //渲染下拉框
                    {  
                        title: '类型',  
                        key: 'volumeType',  
                        align: 'center',  
                        render: (h, params) => { 
                        return h('Select', {  
                            props:{  
                                value:params.row.volumeType,  
                            },
                            on: {  
                                    'on-change':(value ) => {  
                                        params.row.volumeType=value  
                                        
                                    }  
                                },    
                        
                        },  
                            this.selectData.map(function(type){  
                                return h('Option', {  
                                    props: {value: type}  
                                },type);  
                            })  
                        
                        );  
                      },  
                    }, 
                    //渲染输入框
                    {  
                        title: '采购成本',  
                        key: 'chengben',  
                        align: 'center', 
                         
                        render: (h, params) => {  
                        return h('Input', {  
                            props:{  
                                
                                placeholder:"请输入", 
                                
                            },
                            style:{
                                width:"100%",
                                height:"30px",
                                
                                
                            },
                           
                            
                            on: {  
                                  input:(value)=>{
                                     
                                      params.row.chengben=value
                                     
                                  }   
                                },    
                        
                        }  
                           
                        
                        );  
                      },  
                    }, 

                    //渲染按钮
                     {
                        title: '动作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params)
                                        }
                                    }
                                }, '查看'),
                                    h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.edit(params)
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    },
                    //添加图标
                    {
                    title: '图标',
                    key: 'tb',
                    render: (h,params)=>{
                        return h('div',[
                            h('p','第一列'),
                            h('Icon',{
                                props:{
                                    type: 'trash-a'
                                },
                                style: {
                                    fontSize:"20px",
                                    marginRight:"10px"
                                }
                            }),
                              h('Icon',{
                                props:{
                                    type: 'edit'
                                },
                                style: {
                                    fontSize:"20px"
                                }
                            })
                        ])
                    }
                },
                 
                ],
                data5: [
                    {
                "username": "智能审批",
                "shenpistatus": "审批已通过",
                "shenpicomments": "自动审批通过",
                "time": "2020-07-24 18:11",
                "img":[require("../../../images/logo-min.jpg"),require("../../../images/logo-min.jpg")],
                "volumeType":"大家好"
                
            },
            {
                "username": "智能审批",
                "shenpistatus": "审批已通过",
                "shenpicomments": "自动审批通过",
                "time": "2017-07-24 18:11",
                "img":[require("../../../images/logo-min.jpg"),require("../../../images/logo-min.jpg")],
                "volumeType":"你好"
            },
            {
                "username": "智能审批",
                "shenpistatus": "审批已通过",
                "shenpicomments": "自动审批通过",
                "time": "2017-07-24 10:04",
                "img":[require("../../../images/logo-min.jpg"),require("../../../images/logo-min.jpg")]
            },
            {
                "username": "智能审批",
                "shenpistatus": "审批被拒绝",
                "shenpicomments": "  收入 > 999 && 支出 < 201",
                "time": "2017-07-24 10:03",
                "img":[require("../../../images/logo-min.jpg"),require("../../../images/logo-min.jpg")]
            },
            {
                "username": "智能审批",
                "shenpistatus": "审批被拒绝",
                "shenpicomments": "  收入 > 999 && 支出 < 201",
                "time": "2017-07-24 10:02"
            },
            {
                "username": "智能审批",
                "shenpistatus": "审批已通过",
                "shenpicomments": "自动审批通过",
                "time": "2017-07-24 10:02"
            },
            {
                "username": "智能审批",
                "shenpistatus": "审批被拒绝",
                "shenpicomments": "自动审批通过",
                "time": "2017-07-24 10:01"
            },
            {
                "username": "智能审批",
                "shenpistatus": "审批被拒绝",
                "shenpicomments": "自动审批通过",
                "time": "2017-07-24 09:56"
            },
            {
                "username": "智能审批",
                "shenpistatus": "审批被拒绝",
                "shenpicomments": "自动审批通过",
                "time": "2017-07-21 14:23"
            },
            {
                "username": "智能审批",
                "shenpistatus": "审批被拒绝",
                "shenpicomments": "  收入 > 999 && 支出 < 201 && 所有项目的总净收入 > 5000",
                "time": "2017-07-21 14:23"
            },
            {
                "username": "智能审批",
                "shenpistatus": "审批被拒绝",
                "shenpicomments": "自动审批通过",
                "time": "2017-07-21 14:23"
            },
            {
                "username": "智能审批",
                "shenpistatus": "审批被拒绝",
                "shenpicomments": "  收入 > 999 && 支出 < 201 && 所有项目的总净收入 > 5000",
                "time": "2017-07-21 14:23"
            },
            {
                "username": "智能审批",
                "shenpistatus": "审批被拒绝",
                "shenpicomments": "  收入 > 999 && 支出 < 201 && 所有项目的总净收入 > 5000",
                "time": "2017-07-21 14:23"
            },
            {
                "username": "智能审批",
                "shenpistatus": "审批被拒绝",
                "shenpicomments": "  收入 > 999 && 支出 < 201 && 所有项目的总净收入 > 5000",
                "time": "2017-07-21 14:21"
            },
            {
                "username": "智能审批",
                "shenpistatus": "审批被拒绝",
                "shenpicomments": "自动审批通过",
                "time": "2017-07-21 14:21"
            },
            {
                "username": "智能审批",
                "shenpistatus": "审批被拒绝",
                "shenpicomments": "自动审批通过",
                "time": "2017-07-21 14:20"
            },
            {
                "username": "智能审批",
                "shenpistatus": "审批被拒绝",
                "shenpicomments": "  收入 > 999 && 支出 < 201 && 所有项目的总净收入 > 5000",
                "time": "2017-07-21 14:20"
            },
            {
                "username": "智能审批",
                "shenpistatus": "审批被拒绝",
                "shenpicomments": "自动审批通过",
                "time": "2017-07-21 14:14"
            },
            {
                "username": "智能审批",
                "shenpistatus": "审批被拒绝",
                "shenpicomments": "自动审批通过",
                "time": "2017-07-21 14:13"
            },
            {
                "username": "智能审批",
                "shenpistatus": "审批被拒绝",
                "shenpicomments": "自动审批通过",
                "time": "2017-07-21 14:11"
            },
            {
                "username": "智能审批",
                "shenpistatus": "审批被拒绝",
                "shenpicomments": "自动审批通过",
                "time": "2017-07-21 14:10"
            },
            {
                "username": "智能审批",
                "shenpistatus": "审批被拒绝",
                "shenpicomments": "  收入 > 999 && 支出 < 201 && 所有项目的总净收入 > 5000",
                "time": "2017-07-20 18:09"
            },
            {
                "username": "智能审批",
                "shenpistatus": "审批被拒绝",
                "shenpicomments": "  收入 > 999 && 支出 < 201 && 所有项目的总净收入 > 5000",
                "time": "2017-07-20 18:08"
            },
            {
                "username": "智能审批",
                "shenpistatus": "审批被拒绝",
                "shenpicomments": "  收入 > 999 && 支出 < 201 && 所有项目的总净收入 > 5000",
                "time": "2017-07-20 18:08"
            },
            {
                "username": "智能审批",
                "shenpistatus": "审批被拒绝",
                "shenpicomments": "自动审批通过",
                "time": "2017-07-20 18:07"
            },
            {
                "username": "智能审批",
                "shenpistatus": "审批被拒绝",
                "shenpicomments": "自动审批通过",
                "time": "2017-07-20 18:05"
            },
            {
                "username": "智能审批",
                "shenpistatus": "审批已通过",
                "shenpicomments": "wedfqw",
                "time": "2017-07-20 15:50"
            },
            {
                "username": "智能审批",
                "shenpistatus": "审批已通过",
                "shenpicomments": "wedfqw",
                "time": "2017-07-20 15:20"
            },
            {
                "username": "智能审批",
                "shenpistatus": "审批被拒绝",
                "shenpicomments": "自动审批通过",
                "time": "2010-07-19 18:27"
            }
                ]
            }
        },
        methods:{
            //保存初始数据
            init(){
               this.data1 = this.initTable1=this.data5
                
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
              changepage(index){
                //更新当前页码
                this.pageNum=index
                //获取当前页的数据  
                var _start = ( index - 1 ) * this.pageSize;
                var _end = index * this.pageSize;
                this.pagedata = this.data1.slice(_start,_end);
            },
            //删除数据
             remove (index) {
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
            //查看数据
            show(params){
               this.showDataModalFlag = true
               this.showDataModalObject = params.row
            },
            //编辑数据
            edit(params){
                // 编辑内容较多时进入子页面编辑
                this.$store.commit("updatedorderListData",params.row)
                 this.$router.push({
                        name: 'edit2'
                });
                //内容不多时模态框编辑
                // var self = this
                // self.editDataModalFlag = true
                // self.editDataModalObject = params.row
                
            },
            //保存编辑数据
            doEditData () { 
                alert('保存成功')
                // var self = this
                // self.$api.post('/api/v1/edit', self.editDataModalObject, function (result) {
                //     self.$Message.info(result.message)
                // })
            },
            //获取开始时间
            ktime(){
                console.log(this.kaisitime)

            },
            //获取结束时间
            jtime(){
                 console.log(this.jiesutime)
            },
            //全选，全不选
            SelectAll(status){
                this.$refs.selection.selectAll(status);
            },
            //多选功能
            dxuan(selection,row){
                //已选项，为数组
                console.log(selection)
                //当前选中项
                console.log(row)
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
                        console.log(1)
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
            this.data1=this.search(this.data1, {time:this.searchConName1});
            this.gettotaldata()
            },
            //下拉框查询
            xiala(){
                 //每次查询全部数据    
            this.data1 = this.initTable1;
            this.data1=this.search(this.data1, {volumeType:this.model1});
            this.gettotaldata()     
            }, 
            //远程排序
            paixu(e){
                console.log(e)
                //根据order字段重新获取数据
            }
           


           
        },
        created(){
           //保存初始数据
            this.init();
            //获取数据 
            this.gettotaldata()
        },
        mounted(){
             //有数据变化的写在此函数里   
             this.$nextTick(function(){
                 console.log(this.$refs.ta.offsetHeight)
                  if(this.$refs.ta.offsetHeight>=document.documentElement.clientHeight - this.$refs.ta.offsetTop-140){
                 //设置表格的默认高度
                this.tableHeight = document.documentElement.clientHeight - this.$refs.ta.offsetTop-140
                // 动态设置表格高度
                let that=this  
                window.onresize=function temp(){
                    that.tableHeight = document.documentElement.clientHeight - that.$refs.ta.offsetTop-140 
                }
            }
            })
            
          
           
        },
      
    }
</script>


<style lang="less">
    @import "./home.less";
</style>
<template>
    <div class="home-main">
        1111
    </div>
</template>

<script>
export default {
    name: 'home',
    data () {
        return {
            tableData:[ {calcCol: 1, b: 2}, {calcCol: 2, b: 3}, {calcCol:3, c: 4} ]
        };
    },
    mounted(){
        var total = this.tableData.map(row => row.calcCol)


            total=total.reduce((acc, cur) =>{
                return (cur + acc)
            }, 0)

          
            

        console.log(total)
    }
};
</script>

