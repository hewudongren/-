<style lang="less">
    @import "./main.less";
</style>
<template>
    <div class="main" :class="{'main-hide-text': shrink}">
        <!-- 侧边导航栏 -->
        <div class="sidebar-menu-con" :style="{width: shrink?'60px':'200px', overflow: shrink ? 'visible' : 'auto'}">
            <shrinkable-menu 
                :shrink="shrink"
                :menu-list="menuList">
                <!-- 图片插槽 -->
                <div slot="top" class="logo-con">
                    <img v-show="!shrink"  src="../images/logo.jpg" key="max-logo" />
                    <img v-show="shrink" src="../images/logo-min.jpg" key="min-logo" />
                </div>
            </shrinkable-menu>
        </div>
        <!-- 顶部通栏 -->
        <div class="main-header-con" :style="{paddingLeft: shrink?'60px':'200px'}">
            <div class="main-header">
                <div class="navicon-con">
                    <Button :style="{transform: 'rotateZ(' + (this.shrink ? '-90' : '0') + 'deg)'}" type="text" @click="toggleClick">
                        <Icon type="navicon" size="32"></Icon>
                    </Button>
                </div>
                <div class="header-avator-con">
                    <div class="user-dropdown-menu-con">
                        <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
                            <Dropdown transfer trigger="click" @on-click="handleClickUserDropdown">
                                <a href="javascript:void(0)">
                                    <span class="main-user-name">{{ userName }}</span>
                                    <Icon type="arrow-down-b"></Icon>
                                </a>
                                <DropdownMenu slot="list">
                                    <DropdownItem name="loginout" divided>退出登录</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                            <Avatar icon="person" style="background: #619fe7;margin-left:10px;"></Avatar>
                        </Row>
                    </div>
                </div>
            </div>
        </div>
        <!-- 子路由 -->
        <div class="single-page-con" :style="{left: shrink?'60px':'200px'}">
            <div class="single-page">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
import Cookies from 'js-cookie';
import shrinkableMenu from './main-components/shrinkable-menu/shrinkable-menu.vue';

export default {
    components: {
        shrinkableMenu
    },
    data () {
        return {
            shrink: false,
            userName: ''
        };
    },
    computed: {
        menuList () {
            // 调用app仓库数据，获取侧边导航栏
            return this.$store.state.app.menuList;
        }
    },
    methods: {
        // 获得用户名
        init () {
            this.userName = Cookies.get('user');
        },
        // 切换侧边栏
        toggleClick () {
            this.shrink = !this.shrink;
        },
        // 返回登录页
        handleClickUserDropdown (name) {
            this.$router.push({
                name: 'login'
            });
        }
    },
    mounted () {
        this.init();
    }
};
</script>
