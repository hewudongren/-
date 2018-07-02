<template>
<div class="ops-bar">
  <template v-if="innerBtns.length === 1">
    <div class="middle-one-wrapper">
      <el-button type="primary" :class="{ 'btn-hidden': !innerBtns[0].visible }" @click="middle(0)">{{innerBtns[0].txt}}</el-button>
    </div>
  </template>
  <template v-else-if="innerBtns.length === 3">
    <div class="left text-prev">
      <el-button @click="prev" :class="{ 'btn-hidden': !innerBtns[0].visible }">{{ innerBtns[0].txt }}</el-button>
    </div>
    <div class="middle-btn">
      <el-button type="text" :class="{ 'btn-hidden': !innerBtns[1].visible }" @click="middle(1)">{{ innerBtns[1].txt }}</el-button>
    </div>
    <div class="right text-next">
      <el-button type="primary" :class="{ 'btn-hidden': !innerBtns[2].visible }"  @click="next">{{ innerBtns[2].txt }}</el-button>
    </div>
  </template>
</div>  
</template>

<script>

export default {
  props:[ 'btns' ],

  computed: {
    innerBtns() {
      let innerBtns = _.clone(this.btns)

      if(innerBtns.length ==2) {
        innerBtns.splice(1,0,{ visible: false, txt: ''})
      }
      return innerBtns
    }
  },

  methods: {
    prev() {

      this.$emit( this.innerBtns[0].emit || 'prev' )
    },

    middle(num) {

      this.$emit( this.innerBtns[num].emit || 'middle' )
    },

    next() {
      
      this.$emit( this.innerBtns[2].emit || 'next')
    }
  }
};
</script>

<style lang="less">
@import "../assets/css/variable.less";

.ops-bar {
  padding-bottom: @jw20px;
  box-sizing: border-box;
  margin-top: @jw20px;
  position: relative;
  display: table;
  width: 100%;

  .middle-one-wrapper {

    text-align: center;
    width: auto;

    .el-button {
      padding: 10px 50px;
    }
  }

  .el-button {
    padding: 10px 30px;
  }

  > div {
    width: 33.33333%;
  }

  .btn-hidden {
    visibility: hidden;
  }

  .middle-btn {
    display: inline-block;
    text-align: center;
  }

  .el-button--medium {
    padding: 10px 30px;
  }

  .text-next {
    text-align: left;
  }

  .text-prev {
    text-align: right;
  }
}
</style>
