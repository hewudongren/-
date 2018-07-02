<template>
    <div class="wrapper">
        <!-- 顶部通栏 -->
        <v-head></v-head>
        <!-- 侧标栏 -->
        <v-sidebar :menu-list="menuList"></v-sidebar>
        <!-- 内容区 -->
        <div class="content-box" :class="{'content-collapse':collapse}">
            <!-- 标签栏 -->
            <v-tags></v-tags>
            <!-- 主内容区  -->
            <div class="content">
                <transition name="move" mode="out-in">
                    <!-- <keep-alive> -->
                        <router-view></router-view>
                    <!-- </keep-alive> -->
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
    import vHead from './Header.vue';
    import vSidebar from './Sidebar.vue';
    import vTags from './Tags.vue';
    import bus from '../common/bus';
    export default {
        data(){
            return {
                collapse: false
            }
        },
        components:{
            vHead, vSidebar, vTags
        },
        created(){
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
        },
        computed:{
            menuList () {
                
             return this.$store.state.app.menuList;
            }
        }
    }
</script>
