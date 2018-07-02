<template>
    <div class="putInW">

    
        <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
            prop="date"
            label="推广渠道"
            width="180">
            </el-table-column>
            <el-table-column
            prop="name"
            label="部门"
            width="180">
            </el-table-column>
            <el-table-column
            prop="address"
            label="优化师">
            </el-table-column>
            <el-table-column
            prop="address"
            label="设计师">
            </el-table-column>
            <el-table-column
            prop="address"
            label="动作">
                <template slot-scope="scope">
                        
                            <el-button type="primary" @click="edit(scope)" >生成投放链接</el-button>
                    </template>
            </el-table-column>
        </el-table>
        <P>投放链接：<el-input v-model="input" placeholder="请输入内容"></el-input></P>
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
        }
        ]
      }
    }
  }
</script>