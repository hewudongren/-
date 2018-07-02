<template>
    <div class="header">
        <!-- 折叠按钮 -->
        <div class="collapse-btn" @click="collapseChage" >
            <div class="rotate" :style="{transform: 'rotateZ(' + (collapse ? '-180' : '0') + 'deg)'}"><i class="el-icon-menu"></i></div>

            
        </div>
        <!-- 标题 -->
        <div class="logo">管理系统</div>
        <!-- 面包屑 -->
        <!-- <div class="crumbs">
            <el-breadcrumb separator="/">
			    <el-breadcrumb-item :to="{ path: '/manage' }">首页</el-breadcrumb-item>
			    <el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
		    </el-breadcrumb>
        </div> -->
        <bc></bc>
        
        <!-- 用户中心 -->
        <div class="header-right">
            <div class="header-user-con">
                <!-- 全屏显示 -->
                <div class="btn-fullscreen" @click="handleFullScreen">
                    <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                        <i class="el-icon-rank"></i>
                    </el-tooltip>
                </div>
                <!-- 消息中心 -->
                <div class="btn-bell">
                    <el-tooltip effect="dark" :content="message?`有${message}条未读消息`:`消息中心`" placement="bottom">
                        <router-link to="/tabs">
                            <i class="el-icon-bell"></i>
                        </router-link>
                    </el-tooltip>
                    <span class="btn-bell-badge" v-if="message"></span>
                </div>
                <!-- 用户头像 -->
                <!-- <div class="user-avator"><img src="static/img/img.jpg"></div> -->
                <div class="user-avator"><img :src="userIcon"></div> 
                <!-- 用户名下拉菜单 -->
                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{username}} <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="info">个人中心</el-dropdown-item>
                        <el-dropdown-item divided  command="loginout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>
<script>
    import bus from '../common/bus';
    import bc from "../common/breadcrumb";
    export default {
         components:{
            bc
        },
        data() {
            return {
                collapse: false,
                fullscreen: false,
                name: 'linxin',
                message: 2
            }
        },
        computed:{
            username(){
                let username = localStorage.getItem('user');
                return username ? username : this.name;
            },
            userIcon(){
                return localStorage.getItem("userIcon")
            }
        },
         mounted(){
            
        },
        methods:{
            // 用户名下拉菜单选择事件
            handleCommand(command) {
                //点击登出，执行登出逻辑
                if(command == 'loginout'){
                    localStorage.removeItem('user')
                    this.$router.push('/login');
                }
                //点击个人中心，去个人中心页面
            },
            // 侧边栏折叠
            collapseChage(){
                this.collapse = !this.collapse;
                bus.$emit('collapse', this.collapse);
            },
            // 全屏事件
            handleFullScreen(){
                let element = document.documentElement;
                if (this.fullscreen) {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                } else {
                    if (element.requestFullscreen) {
                        element.requestFullscreen();
                    } else if (element.webkitRequestFullScreen) {
                        element.webkitRequestFullScreen();
                    } else if (element.mozRequestFullScreen) {
                        element.mozRequestFullScreen();
                    } else if (element.msRequestFullscreen) {
                        // IE11
                        element.msRequestFullscreen();
                    }
                }
                this.fullscreen = !this.fullscreen;
            }
        }
    }
</script>
<style  lang="less">
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 22px;
        color: #fff;
        .crumbs{
            float: left;
            line-height: 70px;
            height: 70px;
            font-size: 20px;
            color: white;
            .el-breadcrumb{
                line-height: 70px;
                .el-breadcrumb__inner{
                    color: #fff!important;
                }
            }
        }
    }

    .collapse-btn{
        float: left;
        padding: 0 21px;
        cursor: pointer;
        line-height: 70px;
        .rotate{
            transition: all 0.5s;
        }
    }
    .header .logo{
        float: left;
        width:160px;
        line-height: 70px;
        font-size: 18px;
    }
    .header-right{
        float: right;
        padding-right: 50px;
    }
    .header-user-con{
        display: flex;
        height: 70px;
        align-items: center;
    }
    .btn-fullscreen{
        transform: rotate(45deg);
        margin-right: 5px;
        font-size: 24px;
    }
    .btn-bell, .btn-fullscreen{
        position: relative;
        width: 30px;
        height: 30px;
        text-align: center;
        border-radius: 15px;
        cursor: pointer;
    }
    .btn-bell-badge{
        position: absolute;
        right: 0;
        top: -2px;
        width: 8px;
        height: 8px;
        border-radius: 4px;
        background: #f56c6c;
        color: #fff;
    }
    .btn-bell .el-icon-bell{
        color: #fff;
    }
    .user-name{
        margin-left: 10px;
    }
    .user-avator{
        margin-left: 20px;
    }
    .user-avator img{
        display: block;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    .el-dropdown-link{
        color: #fff;
        cursor: pointer;
    }
    .el-dropdown-menu__item{
        text-align: center;
    }
</style>
