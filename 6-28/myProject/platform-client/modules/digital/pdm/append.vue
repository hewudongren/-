<template>
    <div>
        <jw-panel-title :title="getTitle()" :back="true" @back="exit"/>


          <jw-table 
      :showPagination='true'   
      :isSelection='true'      
      :header='getTableHeader()'   
      :data='tableData'        
      :isRowCheckBox='true'    
      :pageSize='10'           
      :totalCount='100' 
      @onDelete="aa"       
      @on-selection-change='()=>{}'  
      @on-page-change='bb'       
      @on-row-click='()=>{}'         
/>



    </div>
</template>
<script>
import PanelTitle from "jw_components/panel-title";
import JwTable from 'jw_components/table/table'
import i18nService from "jw_services/i18n/index";
import getAppConfig from './app-config.js'

export default {
      components: {
  
    "jw-panel-title": PanelTitle,
    "jw-table":JwTable
    
  },
  data(){
      return {
          entity: {},
           tableData:[
      { name:'Platform', appKey:'a203980c6e' ,version:'11111',creatorName:'小哥'},
      { name:'API ', appKey:'0aabf7ffa4' ,version:'11111',creatorName:'大哥'}
    ]
 
      }
  },
   created() {

     
    },
  methods:{
    bb(pageCount){
        console.log(pageCount)
    },
          getTitle() {
      let { lang } = i18nService.getLanguageMap()
      let titles = i18nService.getI18nTitle().title

      if(this.isAddition()) {
        titles.push(lang['platform.common.add'])
      }else{
        if(this.entity) {
          titles.push(lang['platform.common.edit'])        
          titles.push(this.entity.name)
        }
      }
      
      return titles
    },
     getParamId() {
      return this.$route.params.id;
    },
       isAddition() {
      let additionCode = "0";

      return this.getParamId() === additionCode;
    },
    exit(){
        this.$router.go(-1)
    },
     getTableHeader() {

        return getAppConfig().tableHeader
      },
      aa(msg){
        console.log(msg.name)
      }


  }
}
</script>
<style leng="less">
  .a{
    margin-right: 10px
  }
</style>


