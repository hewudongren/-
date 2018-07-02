<template>
  <div class="jw-transfer">
    <div class="col-left">
      <div class="col-header">
        <div class="header-title">
          <el-checkbox :key="checkBoxKey" :checked="isAllChecked(source)" :label="titles[0]" @change="onAllOringalChecked"/>
        </div>
        <el-input v-model="inputValue" @input="onInput"/>
      </div>
      <ul class="ul-selecter" v-loading="searchLoading">
        <li class="li-selecter" v-for="(row,i) in source" :key="i">
          <el-checkbox :key="checkBoxKey + row.key" :checked="row.__checked__" :label="row.label" @change="onLeftSelection($event,row)" />
        </li>
      </ul>
    </div>
    <div class="col-middle">
      <div class="middle-btn to-right icon-right" @click="onRight"></div>
      <div class="middle-btn to-left icon-back" @click="onLeft"></div>  
    </div>
    <div class="col-right">
      <div class="col-header">
        <div class="header-title">
          <el-checkbox :key="checkBoxKey" :checked="isAllChecked(targets)" :label="titles[1]" @change="onAllTargetChecked"/>
        </div>
      </div>
      <ul class="ul-selecter">
        <li class="li-selecter" v-for="(row,i) in targets" :key="i">
          <el-checkbox :key="checkBoxKey + row.key" :checked="row.__checked__" :label="row.label" @change="onRightSelection($event,row)" />
        </li>
      </ul>
    </div>  
  </div>
</template>

<script>
import i18nService from 'jw_services/i18n/index';

export default {
  props: [ 'data', 'selected', 'titles' ],

  data() {

    return {
      checkBoxKey: '',
      searchLoading: false,
      inputValue: '',

      targets: []
    }
  },

  watch: {

    selected(newSelected) {

      this.inputValue = ''
      this.watchPropsSelected(newSelected)
    }
  },

  computed: {

    source() {
      this.update()
      this.searchLoading = false
      return [].concat(this.data)
    }
  },

  created() {

    this.watchPropsSelected(this.selected)
    this.delayEmitSearch = _.debounce(this.emitSearch,500)
  },

  methods: {

    getTitle() {
      let { lang } = i18nService.getLanguageMap()

      return lang['platform.app_role.assignRole']
    },

    getSelected() {

      return this.targets
    },

    watchPropsSelected(newSelected) {
      _.each(newSelected,(s)=>{
        s.__checked__ = false
      })

      this.targets = [].concat(newSelected)
    },

    // watchPropsData(newData) {
    //   let source = []

    //   _.each(newData,(item)=>{

    //     if(
    //       _.findIndex(this.targets,(s)=>{
    //         return s.key === item.key
    //       })===-1
    //     ) {

    //       item.__checked__ = false
    //       source.push(item)
    //     }
    //   })

    //   this.source = source
    // },

    onAllOringalChecked(checkedState) {
      
      _.each(this.source,(item)=>{
        item.__checked__ = checkedState
      })
      
      this.update()
    },

    onAllTargetChecked(checkedState) {

      _.each(this.targets,(item)=>{
        item.__checked__ = checkedState
      })
      
      this.update()
    },

    isAllChecked(list) {
      let count = 0

      if(_.isEmpty(list)) {
        return false
      }

      _.each(list,(l)=>{
        l.__checked__ && (count++)
      })

      return count === list.length
    },

    update() {
      
      this.checkBoxKey = _.uniqueId('__transfer_chekbox')
    },

    emitSearch(inputValue) {

      this.$emit('inputSearch',inputValue)
    },

    onInput(inputValue) {

      this.searchLoading = true
      this.delayEmitSearch(inputValue)
    },

    onLeft() {
      let nowSelected = []

      _.each(this.targets,(rc)=>{

        if(!rc.__checked__) {
          nowSelected.push(rc)
        }

        rc.__checked__ = false
      })

      this.targets = nowSelected
      //this.watchPropsData(this.data)
      this.update()
    },

    onRight() {
      let selectedSource = []

      _.each(this.source,(s)=>{
        if(s.__checked__) {

          s.__checked__ = false
          if(
            _.findIndex(this.targets,(target)=>{
              return s.key === target.key
            }) === -1
          ) {

            this.targets.push(_.clone(s))
          }
        }
      })

      this.update()
    },

    onRightSelection(state,row) {

      row.__checked__ = state
      this.update()
    },

    onLeftSelection(state,row) {

      row.__checked__ = state
      this.update()
    }
  }
}
</script>

<style lang="less">
@import '../assets/css/variable.less';

.jw-transfer {
  width: 100%;
  height: 100%;

  .middle-btn {
    
    &:active {
      background: #ccc;
      color: #fff;
    }
  }

  .col-header {
    padding: 0 10px 0 10px;
    background-color: #eee;
    border-bottom: 1px solid #eee;

    .el-input {
      margin-bottom: 10px;
    }

    .header-title {
      padding: 5px 0;
      line-height: 2rem;
    }

    .el-input__inner {
      height: 2rem;
      line-height: 2rem;
    }
  }

  .el-checkbox {
    margin-right: 10px;
  }

  .ul-selecter {

    overflow-y: auto;
    padding: 5px 0 0 10px;
  }

  .li-selecter {
    padding: 5px 0;
  }

  .col-left {
    width: 40%;
    display: inline-block;
    height: 100%;
    box-sizing: border-box;
    vertical-align: middle;
    border-radius: 5px;
    overflow: hidden;
    border:1px solid #eee;

    .ul-selecter {
      height: calc(~'100% - 82px');
    }
  }

  .col-middle {
    width: 18%;
    display: inline-block;
    height: 100%;
    vertical-align: middle;
  }

  .to-left {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    border: 1px solid @seperate-line;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -20px;
    margin-top: -50px;
    font-size: 2rem;
    line-height: 40px;
    text-align: center;
    color: @seperate-line;
  }

  .to-right {
    width: 40px;
    height: 40px;
    border-radius: 20px;  
    border: 1px solid @seperate-line;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -20px;
    margin-top: 20px;
    font-size: 2rem;
    line-height: 40px;
    text-align: center;
    color: @seperate-line;
  }

  .col-right {
    width: 40%;
    display: inline-block;
    height: 100%;
    box-sizing: border-box;
    vertical-align: middle;
    //padding: 0 15px;
    border-radius: 5px;
    overflow: hidden;
    border:1px solid #eee;

    .ul-selecter {
      height: calc(~'100% - 44px');
    }
  }
}
</style>
