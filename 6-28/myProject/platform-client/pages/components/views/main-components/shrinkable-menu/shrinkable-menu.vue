<style lang="less">
    @import './styles/menu.less';
</style>

<template>
    <div :style="{background: bgColor}" class="ivu-shrinkable-menu">
        <!-- logo -->
        <slot name="top"></slot>
        <!-- 展开 -->
        <sidebar-menu 
            v-show="!shrink"
            :menu-theme="theme" 
            :menu-list="menuList" 
            :open-names="openNames"
            @on-change="handleChange"
        ></sidebar-menu>
        <!-- 收缩 -->
        <sidebar-menu-shrink 
            v-show="shrink"
            :menu-theme="theme" 
            :menu-list="menuList" 
            :icon-color="shrinkIconColor"
            @on-change="handleChange"
        ></sidebar-menu-shrink>
    </div>
</template>

<script>
import sidebarMenu from './components/sidebarMenu.vue';
import sidebarMenuShrink from './components/sidebarMenuShrink.vue';
import util from '@/libs/util';
export default {
    name: 'shrinkableMenu',
    components: {
        sidebarMenu,
        sidebarMenuShrink
    },
    props: {
        shrink: {         //侧边栏切换标识符 
            type: Boolean,
            default: false
        },
        menuList: {       //路由数据
            type: Array,
            required: true
        },
        theme: {       //主题
            type: String,
            default: 'dark',
            validator (val) {
                return util.oneOf(val, ['dark', 'light']);
            }
        },
        beforePush: {
            type: Function
        },
        openNames: {
            type: Array
        }
    },
    computed: {
        // 侧边栏背景色
        bgColor () {
            return this.theme === 'dark' ? '#495060' : '#fff';
        },
        // 收缩后图标颜色
        shrinkIconColor () {
            return this.theme === 'dark' ? '#fff' : '#495060';
        }
    },
    methods: {
        //监听事件 切换路由
        handleChange (name) {
            let willpush = true;
            
            if (this.beforePush !== undefined) {
                if (!this.beforePush(name)) {
                    willpush = false;
                }
            }
            if (willpush) {
                this.$router.push({
                    name: name
                });
            }
            this.$emit('on-change', name);
        }
    }
};
</script>
