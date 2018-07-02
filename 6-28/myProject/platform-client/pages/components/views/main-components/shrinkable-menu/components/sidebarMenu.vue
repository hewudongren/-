<style lang="less">
    @import '../styles/menu.less';
</style>

<template>
    <Menu ref="sideMenu" :active-name="$route.name" :open-names="openNames" :theme="menuTheme" width="auto" @on-select="changeMenu">
        <template v-for="item in menuList" >
            <!-- 无子路由 -->
            <Menu-item v-if="item.children.length<=1" :name="item.children[0].name" :key="'d'+item.path">
                <Icon :type="item.icon" :size="iconSize" :key="'e'+item.path"></Icon>
                <span class="layout-text" :key="'f'+item.path">{{ item.title }}</span>
            </Menu-item>
            <!-- 有子路由 -->
            <Submenu v-if="item.children.length > 1" :name="item.name" :key="item.path">
                <!-- 主路由 -->
                <template slot="title">
                    <Icon :type="item.icon" :size="iconSize"></Icon>
                    <span class="layout-text">{{ item.title }}</span>
                </template>
                <!-- 子路由 -->
                <template v-for="child in item.children" >
                    <Menu-item :name="child.name" :key="'a'+child.name">
                        <Icon :type="child.icon" :size="iconSize" :key="'b'+child.name"></Icon>
                        <span class="layout-text" :key="'c'+child.name">{{ child.title }}</span>
                    </Menu-item>
                </template>
            </Submenu>
        </template>
    </Menu>
</template>

<script>
export default {
    name: 'sidebarMenu',
    props: {
        menuList: Array,
        iconSize: Number,
        menuTheme: {
            type: String,
            default: 'dark'
        },
        openNames: {
            type: Array
        }
    },
    
    methods: {
        changeMenu (active) {
            this.$emit('on-change', active);
        },
        // itemTitle (item) {
          
        //     if (typeof item.title === 'object') {
        //         return this.$t(item.title.i18n);
        //     } else {
        //         return item.title;
        //     }
        // }
    },
    updated () {
        this.$nextTick(() => {
            if (this.$refs.sideMenu) {
                this.$refs.sideMenu.updateOpened();
            }
        });
    }

};
</script>
