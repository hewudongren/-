<template>

<div>
    <div style="height:100px"  class="loadingtext">

    </div>



  <el-table
    
    :data="tableData"
    style="width: 100%">
    <el-table-column
      prop="date"
      label="日期"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址">
    </el-table-column>
  </el-table>



</div>
</template>

<style>
  body {
    margin: 0;
  }
</style>

<script>

import { Loading } from 'element-ui';
  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        loading: true,
        orderList:[]
      };
    },
       created(){
        //请求数据
        // this.$axios.get("http://123.com/a").then(res=>{
        //     this.orderList=res.data.orderList
           
        //      //数据回来，关闭loading效果，会有延迟现象
        //     //  this.loading=false
        // }).catch(err=>{

        // })
    },
    mounted(){
          let loadingInstance = Loading.service({
            text: '请稍等',
            
            target: document.querySelector('.loadingtext')
          
        });
    }
  };
</script>