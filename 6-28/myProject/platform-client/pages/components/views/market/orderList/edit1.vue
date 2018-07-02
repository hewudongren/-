<template>
    <Form ref="formValidate" :model="editData"  :label-width="80" >
        <FormItem label="订单号" >
            <Input v-model="editData.ordernumber" placeholder="ordernumber"></Input>
        </FormItem>
        <FormItem label="站点" >
            <Input v-model="editData.site" placeholder="site"></Input>
        </FormItem>
         <FormItem label="产品名称" >
            <Input v-model="editData.product" placeholder="product"></Input>
        </FormItem>
        <FormItem label="购买量" >
            <Input v-model="editData.buy" placeholder="buy"></Input>
        </FormItem>
        <FormItem label="产品类型" >
            <Input v-model="editData.buy" placeholder="buy"></Input>
        </FormItem>
         <FormItem label="应收款" >
            <Input v-model="editData.receipt" placeholder="receipt"></Input>
        </FormItem>
         <FormItem label="采购成本" >
            <Input v-model="editData.cost" placeholder="cost"></Input>
        </FormItem>
         <FormItem label="姓名" >
            <Input v-model="editData.name" placeholder="name"></Input>
        </FormItem>
         <FormItem label="手机" >
            <Input v-model="editData.phone" placeholder="phone"></Input>
        </FormItem>
        <FormItem label="邮箱" >
            <Input v-model="editData.phone" placeholder="phone"></Input>
        </FormItem>
        <FormItem label="地区" >
            <Input v-model="editData.area" placeholder="area"></Input>
        </FormItem>
        <FormItem label="省、市" >
            <Input v-model="editData.area" placeholder="area"></Input>
        </FormItem>
        <FormItem label="县" >
            <Input v-model="editData.area" placeholder="area"></Input>
        </FormItem>
        <FormItem label="地址" >
            <Input v-model="editData.area" placeholder="area"></Input>
        </FormItem>
         <FormItem label="下单时间" >
            <Input v-model="editData.time" placeholder="time"></Input>
        </FormItem>
         <FormItem label="支付方式" >
            <Input v-model="editData.time" placeholder="time"></Input>
        </FormItem>
         <FormItem label="客户备注" >
            <Input v-model="editData.clientnote" placeholder="clientnote"></Input>
        </FormItem>
        <FormItem label="订单状态" >
            <Input v-model="editData.clientnote" placeholder="clientnote"></Input>
        </FormItem>
        <FormItem label="City" >
            <Select v-model="editData.volumeType" placeholder="Select your city">
                <Option value="你好">你好</Option>
                <Option value="我好">我好</Option>
                <Option value="大家好">大家好</Option>
            </Select>
        </FormItem>
  
       
     
       
        <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
            <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
        </FormItem>
    </Form>
</template>
<script>
    export default {
        data () {
            return {
                // editData:{},//编辑数据
                'orderList|28': [{
        'ordernumber|0-9': 1,
        "site|0-9":1 ,
        "img": [{
                  "icon":"@image('60x60',#b7ef7c)",
                  "size":"s",
                  "num|0-9":1  
                },
                {
                    "icon":"@image('60x60',#b7ef7c)",
                    "size":"s",
                    "num|0-9":1  
                  }
                ],
        "product":{
            "productID|100-1000":1,
            "size":"s",
            "color":"red",
            "count|1-5":1
        },
        "name|10-20":1,
        "phone":123456,
        "area":"@csentence(2,4)" ,
        "address":"@csentence(5,12)",
        "state":"已取消" ,
        "buy|0-10":1,
        "receipt|10-100":1 ,
        "cost":"0.00",
         "clientnote":"订单不在配送范围",
         "staffnote":"添加",
         "time":"@time",
        "IP|100-1000":1,
        "forwarder":"未设置",
        "trackingnumber":"处理中",
        "action":""

       }],
                formValidate: {
                    name: '',
                    mail: '',
                    city: 'beijing',
                    gender: '',
                    interest: [],
                    date: '',
                    time: '',
                    desc: ''
                },
                //表单验证规则
                ruleValidate: {
                    time: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ],
                    username: [
                        { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
                        { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
                    ],
                 
                    volumeType: [
                        { required: true, message: 'Please select gender', trigger: 'change' }
                    ],
                  
                  
                 
                }
            }
        },
        methods: {
            //提交编辑数据
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                      //表单验证成功，发送请求，保存数据
                        this.$Message.success('修改数据成功!');
                    } else {
                      //表单验证失败
                        this.$Message.error('Fail!');
                    }
                })
            },
            //表单重置
            handleReset (name) {
                this.$refs[name].resetFields();
                this.$router.go(-1)
            }
        },
         computed:{
          //获得销售列表编辑数据
            editData: function () {
                if(JSON.stringify(this.$store.state.app.orderListData)){
                  //刷新后vuex数据为空 ，则调用本地存储数据 
                  return this.$sg.getls("orderListData")
                }
                //返回vuex数据
                
                 return this.$store.state.app.orderListData 
            }
        },
        mounted(){
          console.log(this.$store.state.app.orderListData)
        
        },
       
    }
</script>

