<template>
    <div class="Bresources">
        <!-- 头部面包屑 -->
        <!-- <el-breadcrumb separator="/" class="nav">
        <el-breadcrumb-item :to="{ path: '/' }">基础资源库</el-breadcrumb-item> -->
        <!-- <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item> -->
        <!-- </el-breadcrumb> -->
        <PanelTitle :title="getTitle()" class="nav"/>
        <!-- 相关信息 -->
        <div class="info">
            <div class="draft">
                <div class="pic">
                    <i class="el-icon-date"></i>
                </div>
                <div class="details">
                    <p class="title">草稿中的</p>
                    <span class="num"> 20</span>
                </div>
            </div>
            <div class="draft">
                <div class="pic">
                    <i class="el-icon-date"></i>
                </div>
                <div class="details">
                    <p class="title">草稿中的</p>
                    <span class="num"> 20</span>
                </div>
            </div>
            <div class="draft">
                <div class="pic">
                    <i class="el-icon-date"></i>
                </div>
                <div class="details">
                    <p class="title">草稿中的</p>
                    <span class="num"> 20</span>
                </div>
            </div>
            <div class="draft">
                <div class="pic">
                    <i class="el-icon-date"></i>
                </div>
                <div class="details">
                    <p class="title">草稿中的</p>
                    <span class="num"> 20</span>
                </div>
            </div>
        </div>
        <!-- 搜索区 -->
        <div class="search">
            <div class="category">
                <div>
                <span class="name">类别</span>
                 <el-select v-model="value" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                </div>
                <div>
                <span class="name"> 状态</span>
                 <el-select v-model="value" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                </div>

            </div>
            <div class="category">
                <div>
                <span class="name">科室</span>
                 <el-select v-model="value" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                </div>
                <div class="crateor">
                <span class="name"> 创建者</span>
                  <el-input v-model="input" placeholder="请输入内容"></el-input>
                </div>

            </div>
            <div class="category">
                <div>
                <span class="name">创建时间</span>
                   <el-date-picker
                    v-model="value6"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                    </el-date-picker>
                </div>
               <div class="crateor">
                <span class="name"> 关键字</span>
                  <el-input v-model="input" placeholder="请输入内容" prefix-icon="el-icon-search"></el-input>
                  <el-button size="small">确定</el-button>
                </div>

            </div>
        </div>
        
        <!-- 工艺资源 -->
        <div class="resource">
            <div class="title">
                <h3>工艺资源</h3>
            </div>
                <div class="data">
                    <el-table
                        :data="tableData"
                        stripe
                        style="width: 100%">
                         <el-table-column
                         label="序号"
                        type="index"
                        width="50">
                        </el-table-column>
                        <el-table-column
                        prop="date"
                        sortable
                        label="资源名称"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="显示名称"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        sortable
                        label="科室">
                        </el-table-column>
                         <el-table-column
                        prop="address"
                        
                        label="创建人">
                        </el-table-column>
                         <el-table-column
                        prop="address"
                        sortable
                        label="创建时间">
                        </el-table-column>
                         <el-table-column
                        prop="address"
                        
                        label="操作">
                         <template slot-scope="scope">
                           <i class="el-icon-edit"></i>
                           <i class="el-icon-delete"></i>
                        </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="more">
                    <i class="el-icon-plus"></i>
                    <span>加载更多</span>
                </div>

          

        </div>
         <!-- 工艺资源 -->
        <div class="resource">
            <div class="title">
                <h3>工艺资源</h3>
            </div>
                <div class="data">
                    <el-table
                        :data="tableData"
                        stripe
                        style="width: 100%">
                         <el-table-column
                         label="序号"
                        type="index"
                        width="50">
                        </el-table-column>
                        <el-table-column
                        prop="date"
                        sortable
                        label="资源名称"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="显示名称"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        sortable
                        label="科室">
                        </el-table-column>
                         <el-table-column
                        prop="address"
                        
                        label="创建人">
                        </el-table-column>
                         <el-table-column
                        prop="address"
                        sortable
                        label="创建时间">
                        </el-table-column>
                         <el-table-column
                        prop="address"
                        
                        label="操作">
                         <template slot-scope="scope">
                           <i class="el-icon-edit"></i>
                           <i class="el-icon-delete"></i>
                        </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="more">
                    <i class="el-icon-plus"></i>
                    <span>加载更多</span>
                </div>

          

        </div>
         <!-- 工艺资源 -->
        <div class="resource">
            <div class="title">
                <h3>工艺资源</h3>
            </div>
                <div class="data">
                    <el-table
                        :data="tableData"
                        stripe
                        style="width: 100%">
                         <el-table-column
                         label="序号"
                        type="index"
                        width="50">
                        </el-table-column>
                        <el-table-column
                        prop="date"
                        sortable
                        label="资源名称"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="显示名称"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        sortable
                        label="科室">
                        </el-table-column>
                         <el-table-column
                        prop="address"
                        
                        label="创建人">
                        </el-table-column>
                         <el-table-column
                        prop="address"
                        sortable
                        label="创建时间">
                        </el-table-column>
                         <el-table-column
                        prop="address"
                        
                        label="操作">
                         <template slot-scope="scope">
                           <i class="el-icon-edit"></i>
                           <i class="el-icon-delete"></i>
                        </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="more">
                    <i class="el-icon-plus"></i>
                    <span>加载更多</span>
                </div>

          

        </div>

    </div>
</template>
<script>
import i18nService from 'jw_services/i18n/index'

import PanelTitle from 'jw_components/panel-title'
export default {
    data(){
        return {
            // title:"基础组件库",
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
        value: '',
        input: '',
        value6: '',
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
    components: {
                PanelTitle
            },
    methods:{
           getTitle() {
               console.log(i18nService.getI18nTitle().title)
                return i18nService.getI18nTitle().title
            }, 
    }        
          
}
</script>   
<style lang="less">
    .Bresources{
        padding: 10px;
         background-color: gray;
        width: 100%;
        min-width: 1400px;
       box-sizing: border-box;
        position: absolute;
        .nav{
            color:blue;
            font-weight: 700;
            margin-bottom: 10px;
        }
        .info{
            display: flex;
            justify-content: space-between;
            .draft{
                width: 25%;
                padding: 20px;
                background-color: #fff;
                margin-right: 20px;
                display: flex;
                margin-bottom: 30px;
                &:last-child{
                    margin-right: 0px;
                }
                .pic{
                    width: 50px;
                    height: 50px;
                    background-color: coral;
                    margin-right: 20px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    i{
                        text-align: center;
                    }
                }
                .details{
                    p{
                        margin-bottom: 10px;
                    }
                    .num{
                       
                        font-size: 20px;
                        font-weight: 700;
                    }
                }
            }

        }
        .search{
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
            .category{
                line-height: 50px;
                width: 30%;
                .crateor{
                    // display: flex;
                    .name{
                        flex-basis: 80px;
                    }
                    .el-input{
                        // float: right;
                        display: inline-block;
                        width: auto;
                        input{
                            width: 217px;
                             height: 30px;
                            // line-height: 30px;
                    }
                    }
                  

                }
                .name{
                    margin-right: 20px;
                    width: 60px;
                    display: inline-block;
                }
                .el-select{
                    .el-input{
                        input{
                             height: 30px;
                        }
                       
                    }
                }
            } 
        }
        .resource{
            background-color: #fff;
            padding-top: 10px;
            margin-bottom: 10px;
            h3{
                
            }
            .data{
                padding: 0px 10px 10px 10px;
                .has-gutter{
                    background-color: gray;
                    color: black
                }
            }
            .more{
                line-height: 20px;
                text-align: center;
            }
        }
    }
</style>


