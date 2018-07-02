<template>
    <div class="orderInfo">
        <!-- 订单状态 -->
        <div class="state">
            <h3 class="mgb10"><span>订单号：</span> 123456</h3>
            <el-row class="mgb10">
                
                    <span>下单时间：2018-15-15</span>
                
                
                    <span>金额：200</span>
                
                
                   <span>支付方式：cod</span>
                
                 
                   <span>订单状态：待确认</span>
                
            
            </el-row>
            <div class="mgb10">
                <el-button type="primary" size="mini">取消</el-button>
                <el-button type="primary" size="mini">生成新订单</el-button>
                <el-button type="primary" size="mini">签收</el-button>
                <el-button type="primary" size="mini">拒签</el-button>
                <el-button type="primary" size="mini">问题单</el-button>
                <el-button type="primary" size="mini">确认</el-button>
            </div>
        </div>
       
        <!-- 联系人信息 -->
        <div class="attn mgb10">
            <h4 class="mgb10">联系人信息</h4>
             <table>
                 <tr>
                     <td>姓名</td>
                     <td>老王</td>
                     <td>电话</td>
                     <td>55555555 短信验证:成功</td>
                 </tr>
                  <tr>
                     <td>国家地区</td>
                     <td>台湾</td>
                     <td>省市</td>
                     <td>台北</td>
                 </tr>
                   <tr>
                     <td>县</td>
                     <td>西乡</td>
                     <td>区</td>
                     <td>前海湾</td>
                 </tr>
                      <tr>
                     <td>地址</td>
                     <td>小树林</td>
                     <td>邮政编码</td>
                     <td>222222222</td>
                 </tr>
                       <tr>
                     <td>备注</td>
                     <td>请在25号前送</td>
                     <td>ip</td>
                     <td>11111111111</td>
                 </tr>
             </table>
        </div>
        <!-- 订单信息 -->
        <div class="mgb10">
            <h4 class="mgb10">订单信息</h4>
              <el-table
                    :data="aa"
                    border
                    style="width: 100%">
                    <el-table-column
                    prop="date"
                    label="SKU"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="标题"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="数量">
                    </el-table-column>
                     <el-table-column
                    prop="address"
                    label="单价">
                    </el-table-column>
                      <el-table-column
                    prop="address"
                    label="动作">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                    </el-table-column>
                </el-table>
        </div>
         <!-- 发货信息 -->
        <div class="mgb10">
            <h4 class="mgb10">发货信息</h4>
              <el-table
                    :data="aa"
                    border
                    style="width: 100%">
                    <el-table-column
                    prop="date"
                    label="货代"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="落地配公司"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="物流单号">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="发货时间">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="转运订单">
                    </el-table-column>
                     <el-table-column
                    prop="address"
                    label="物流状态">
                    </el-table-column>
                </el-table>
        </div>
        <!-- 操作日志 -->
        <div>
            <h4>操作日志</h4>
            <div> <span>操作人：admin</span> <span>时间：2018-5-15</span></div>
            <div> <span>订单修改状态：admin</span> <span>待确认</span></div>
        </div>
    </div>
</template>
<style lang="less">
      .orderInfo{
          .attn{
              table{
                  width: 100%
              }
               table, th , td  {
                border: 1px solid grey;
                border-collapse: collapse;
                padding: 10px;
                }
                 table tr:nth-child(odd) {
                background-color: #f1f1f1;
                }
                table tr:nth-child(even) {
                background-color: #ffffff;
                } 
          }
        
           
      }  
</style>

<script>
import mailTable from "./Vtable.vue";
    export default{
        data(){
            return {
           
               
                   aa: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                    }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                    }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                    }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }]
            }
        },
        components:{
            mailTable
        }
    }
</script>