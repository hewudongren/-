<template>
    <div class="areaSet">
        <!-- 域名操作 -->
        <div class="mgb10">
            <el-button type="primary" @click="add">添加域名</el-button>
        </div>
       <!-- 域名列表 -->
        <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
            prop="date"
            label="域名"
            width="180">
            </el-table-column>
            <el-table-column
            prop="name"
            label="所属组"
            width="180">
            </el-table-column>
            <el-table-column
            prop="address"
            label="状态">
            </el-table-column>
          
            <el-table-column
            prop="address"
            label="动作" width="160">
            <template slot-scope="scope">
                    <el-button type="warning" @click="edit(scope)" >修改</el-button>
                    <el-button type="danger" @click="edit(scope)" >禁用</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
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
    methods:{
        add(){
            this.$router.push({
                path:"/siteManage/domain/domainAdd"
            })
        }
    }
  }
</script>