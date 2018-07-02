<template>
    <div class="Bresources" ref="layout">
       <!-- 头部导航 -->
        <!-- <div class="control-header">
             <PanelTitle :title="getTitle()" class="nav"/>
        <el-button size="small" type="primary" class="right" @click="add()">新增</el-button>
        </div> -->

            <!-- 表头 -->
    <jw-table-control
      :title="getTitle()"
      :buttons="getHeaderControl()"
      @on-header-button="onHeaderButtonClick"
    />
   
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
             <!-- 状态管理 -->
      <!-- <div class="state">
           <el-button icon="el-icon-search" size="small" type="primary" >下载</el-button>
            <el-button icon="el-icon-search" size="small" type="primary" >上传</el-button>
             <el-button icon="el-icon-delete"   size="small" type="danger" >删除</el-button>
      </div> -->
       <jw-table-control
      float="left"
      :buttons="getTableState()"
      @on-header-button="onHeaderButtonClick"
    />
        <!-- 工艺资源 -->
     
                       <!-- 主体 -->
                       <div ref="aa"></div>

                       
                    <jw-table
                    
                    :data="rows"
                    :isSelection=true
                    :isRowCheckBox=true
                    :pageSize="pageSize"
                    :opsList="getTableOperateList()"
                    :showPagination="true"
                    :totalCount="totalCount"
                    :header="getTableHeader()"
                    :currentPage="currentPage"
                    @on-page-change="onPageChange"
                    @on-operate-click="onOperateClick">
                    </jw-table>
      
        

    </div>
</template>
<script>
  import util from 'jw_common/util'
  import staticData from 'jw_common/data'
  import i18nService from 'jw_services/i18n/index'
  import JwTable from 'jw_components/table/table'
  import JwTableHeaderControl from 'jw_components/table/control-header'

  import appStore from 'jw_stores/common'
  import getAppConfig from './app-config.js'
  
  import tableRowDeleteModel from 'jw_models/app/recod-delete'

import tablecolumn from './app-config.js'
import tableModel from '../../../models/app/app-read'


let loadingTimerId = 0
  let defaultPageIndex = 1
export default {
    data(){
        return {
            // title:"基础组件库",
            loading:true,
        rows:[],
        value: '',
        input: '',
        value6: '',
        options: [1,2],
        pageSize:10,
        totalCount:0,
        currentPage:1,
        height:0
    
        }
    },
     components: {
      'jw-table': JwTable,
      'jw-table-control': JwTableHeaderControl
    },
    methods:{
          //获得面包屑
           getTitle() {
               console.log(i18nService.getI18nTitle().title)
                return i18nService.getI18nTitle().title
            }, 
            //新增
            add(){
                this.$router.push({path:'/digital/pdm/append/0'})
            },
            //上传数据
            getSelectionIds() {
                let jwTable = this.$refs.jwTable
                let selections = jwTable.getSelection()

                return _.map(selections,(select)=>{
                return select.id
                })
            },
            // 上传
            export(){
                  let selections = this.getSelectionIds()
                    let lang = i18nService.getOtherLanguageMap()

                    if(selections.length===0) {
                    return this.$error(lang['recordSelected'])
                    }

                    util.download(`${Jw.gateway}/platform/app/app/export`,{ appIds: selections.join(',') })
            },
            //表格数据初始化
            fetch () {
     
                this.showLoading()
                tableModel.setPageIndex(defaultPageIndex)
                tableModel
                .execute()
                .then((data)=>{
                    console.log(data)
                    this.totalCount = data.count
                    this.rows = data.rows
                    this.hideLoading()
                })
                .catch(()=>{
                    let lang = i18nService.getOtherLanguageMap()

                    this.totalCount = 0
                    this.rows = []
                    this.hideLoading(true)

                    this.$alert(lang['loadingFailAgain'], 'Error').then(()=>{

                    this.fetch()
                    })
                })
      },
        showLoading() {

        clearTimeout(loadingTimerId)
        this.loading = true
      },

      hideLoading(is) {
        if(is) {
          this.loading = false
        }else{
          loadingTimerId = setTimeout(()=>{
            this.loading = false
          },500)
        }
      },
      getTableHeader(){
          return getAppConfig().tableHeader
      },
      getTableOperateList(){

      },
   
      onPageChange(){

      },
      onOperateClick(){

      },
      getHeaderControl(){
         
            return getAppConfig().tableHeaderControl
      },
      getTableState(){
           return getAppConfig().tableState
      },
      onHeaderButtonClick(button){
          if(button.type=='add'){
             
             this.add()
          }
          if(button.type=='delete'){
              console.log(1)
          }
          if(button.type=='export'){
             this.export()
          }
      },
  
      
    } ,
    created() {

    //   this.fetch()
      
    },
    mounted(){
    //    let b=this.$refs.layout.offsetHeight
    //   let d= window.innerHeight;
    //     let a=this.$refs.aa.offsetTop
       
    //     this.$nextTick(function () {
    //     this.height=d-a-140
        
    //     })
      
    
      
    }      
          
}
</script>   
<style lang="less">
    .Bresources{
        padding: 10px;
         background-color: gray;
        width: 100%;
        height: 100%;
        min-width: 1400px;
       box-sizing: border-box;
        position: absolute;
        .jw-table{
           height: calc(~'100% - 252px'); 
        }
        .nav{
            color:blue;
            font-weight: 700;
            margin-bottom: 10px;
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
        .state{
            margin-bottom: 10px;
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


