<template>
  <el-popover placement="right" width="80" trigger="hover" :visible-arrow="false" :open-delay="300">
    <slot name="top" :scope="extraData"></slot>
    
    <ul class="col-popover-list">
      <li v-for="(item,key) in list" v-if="isVisible(item)" :key="key" @click="operationClickHandler(item)">
        <i v-if="item.icon" :class="item.icon" />
        {{item.display}}
      </li>
    </ul>
    <i  slot="reference" class="icon-menu" ></i>
  </el-popover>  
</template>

<script>
export default {
  props: ['list','extraData','top'],
  
  methods: {
    
    operationClickHandler(item) {
     
      this.$emit('operate-clicked', item)
    },

    isVisible(item) {
    
      if(_.isFunction(item.isVisible)) {
      
        return item.isVisible(this.extraData)
      }

      return true
    }
  }
}
</script>

<style lang="less">
@import '../../assets/css/variable.less';

.col-popover-list {
  li {
    padding: @jw5px 0;
    line-height: 1;

    i {
      vertical-align: middle;
      margin:0 @jw5px 0 @jw10px;
    }
  }

  li:hover {
    background: #ecf5ff
  }
}
</style>