/*
services: 
[
  {
    modules: [
      {
        name: '',
        apis: [{
          checked: true
        }]
      }
    ]
  }
]

tabLabelAttr: 'basepath',
collapseLabelAttr: 'modulename',
collapsesTabAttr: 'modules',
tableCollapseAttr: 'apis'
*/

<template>
  <div class="app-module-empty" v-if="_.isEmpty(services)">
    No Data
  </div>
  <el-tabs
    v-else
    :class="{ 'app-relation':true, 'tabs-left-fix': tabPosition==='left' }"
    :tab-position="tabPosition"
    :type="type"
    v-model="activeTab">
    <el-tab-pane v-for="(svc,index) in tabs" v-if="getCollapse(svc).length" :key="index" :name="svc[tabLabelAttr]" :label="getTabLabel(svc)">
      <el-collapse accordion @change="onCollapseChange" :value="collapseIndex">
        <el-collapse-item v-for="(item,i) in getCollapse(svc)" :key="i" :name="item.__id">
          <template slot="title">
            <i class="mstar">
              {{item.__checked__? '*':''}}
            </i>
            {{item[collapseLabelAttr]}}
          </template>        
          <jw-table
            :ref="svc[tabLabelAttr]+'-'+item.__id"
            class="api-table"
            height="auto"
            :stripe="true"
            :isSelection="true"
            :isRowCheckBox="true"
            :showPagination="false"
            :header="getTableHeader()"
            :data="getTableData(item)"
            @on-selection-change="onSelectionChange"
          />  
        </el-collapse-item>
      </el-collapse>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import Table from "jw_components/table/table"
import util from "jw_common/util"

export default {
  props: ['services','tab-position', 'type',
    'tabLabelAttr',
    'collapseLabelAttr',
    'collapsesTabAttr',
    'tableCollapseAttr'
  ],

  data() {

    return {
      activeTab: '0',
      collapseIndex: ''
    }
  },

  computed: {

    tabs() {
      let services = this.services
      let checkedServices = []
      let unCheckedServices = []

      _.each(services,(svcTab)=>{
        let checkedCollapse = []
        let unCheckedCollapse = []
        let collapses = this.getCollapse(svcTab)
        
        svcTab.__checked__ = false
        _.each(collapses,(collapse)=>{
          collapse.__checked__ = false          
          if(this.isCollapseSelect(collapse)) {
            svcTab.__checked__ = true
            collapse.__checked__ = true
            checkedCollapse.push(collapse)
          }else{
            unCheckedCollapse.push(collapse)
          }
        })

        svcTab[this.collapsesTabAttr] = checkedCollapse.concat(unCheckedCollapse)
        if(checkedCollapse.length) {
          checkedServices.push(svcTab)
        }else{
          unCheckedServices.push(svcTab)
        }
      })

      return checkedServices.concat(unCheckedServices)
    }
  },

  updated() {

    if(this.activeTab === '0' && _.size(this.tabs)>0) {
      for(let i=0,len=this.tabs.length;i<len;i++) {
        if(_.size(this.tabs[i][this.collapsesTabAttr])>0) {
          return (this.activeTab = this.tabs[i][this.tabLabelAttr])
        }
      }
    }
  },

  components: {
    'jw-table': Table
  },

  methods: {
     
    isCollapseSelect(item) {

      let tableRows = this.getTableData(item)
      return !!_.find(tableRows, row => row.checked)
    },

    getTabLabel(svc) {
      let name = svc[ this.tabLabelAttr ]

      if(svc.__checked__) {
        return '* ' + name
      }

      return name
    },

    onSelectionChange(row,contxt) {

      this.$emit('on-collapse-selection-change',row,contxt)
    },

    onCollapseChange(collapse) {
      let tableNodeRef = this.activeTab+'-'+collapse

      this.collapseIndex = collapse
      if(this.$refs[tableNodeRef] && util.isIE9()) {
        
        _.delay((tableRef)=>{

          this.$refs[tableRef][0].doLayout() 
        }, 0 , tableNodeRef)
      }
    },

    getCollapse(svc) {
      if(this.collapsesTabAttr) {
        return svc[this.collapsesTabAttr] || []
      }

      return []
    },

    getTableData(collapseModule) {

      return collapseModule[this.tableCollapseAttr]
    },

    getTableHeader() {

      return [{
        prop: 'name',
        display: 'Name'
      },{
        prop: 'method',
        display: 'Method'
      },{
        prop: 'urlRegex',
        display: 'Url'
      }]
    }
  }
}
</script>

<style lang="less">
@import "../../../assets/css/variable.less";

.tabs-left-fix {
  .el-tabs__content {
    height: 100%;
    overflow-y: auto;
  }
}

.api-table {
  border: 1px solid #dcdfe6;
  border-radius: 3px;
  border-bottom: none;

  th {
    background: #eee;
  }
}

.app-module-empty {
  font-size: 2rem;
  color: #eee;
  text-align: center;
  padding: 30px 0;
  border: 1px solid #dcdfe6;
}

.app-relation {
  //height: 500px;

  .el-collapse-item__content {
    padding-bottom: @jw15px;
  }

  .el-collapse {
    border: none;
  }

  .el-tabs__content {
    padding-top: 0;
    padding-bottom: 0;
  }

  .mstar {
    margin-right: 10px;
    display: inline-block;
    width: 5px;
    vertical-align: sub;
    line-height: 48px;
  }
}
</style>