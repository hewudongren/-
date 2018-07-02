<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index)  in levelList" :key="item.path" v-if="item.meta.title">
        <!-- 第一次循环时没有，后续循环有，保证在最后，英文路劲如何变中文 -->
        <span v-if="item.redirect==='noredirect'||index==levelList.length-1" class="no-redirect">{{item.meta.title}}</span>
       
        <router-link v-else :to="item.redirect||item.path||'/'">{{item.meta.title}}</router-link>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
export default {
  created() {
    this.getBreadcrumb()
  },
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.name)
    
      const first = matched[0]
      if (first && first.name !== '首页') {
      //  路劲不是首页，添加首页
        matched = [{ path: '/dashboard', meta: { title: '首页' }}].concat(matched)
      }
     
      this.levelList = matched
       
    }
  }
}
</script>

<style  lang="less" scoped>
        a{
          color:#8a8a7d;
         
      }
  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 16px;
    line-height: 70px;
    
     
    
    .no-redirect {
      color: yellow;
      cursor: text;
     
    }
  }
</style>
