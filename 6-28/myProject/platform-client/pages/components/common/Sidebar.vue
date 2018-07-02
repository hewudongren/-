<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu " :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#ffd04b" unique-opened router @select="aa">
            <template v-for="(item,index) in menuList" v-if="item.menuShow">
               
                    
                    <!-- 有子菜单 -->
                    <template v-if="item.children.length>1">
                        <el-submenu :index="item.path" :key="index+''">
                            <template slot="title">
                                <i :class="item.icon"></i><span slot="title">{{ item.name}}</span>
                            </template>
                            <el-menu-item  v-for="(subItem,i) in item.children" :key="i" :index='item.path+"/"+subItem.path' :class="$route.path==(item.path+'/'+subItem.path)?'is-active':''">
                                {{ subItem.name }}
                            </el-menu-item>
                        </el-submenu>
                    </template>
                    <!-- 无子菜单 -->
                    <template v-else>
                        <el-menu-item :index="item.path" :key="item.children[0].path" :class="$route.path==item.children[0].path?'is-active':''">
                            <i :class="item.icon"></i><span slot="title">{{ item.name }}</span>
                        </el-menu-item>
                    </template>
                
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from '../common/bus';
    export default {
        data() {
            return {
                collapse: false,
                items: [
                    {
                        icon: 'el-icon-setting',
                        index: '/dashboard',
                        title: '系统首页'
                    },
                    // OMS
                    //产品中心
                    {
                        icon: 'el-icon-tickets',
                        index: '/product',
                        title: '产品管理',
                         subs: [
                             {
                                 index: 'productCenter',
                                 title: '产品中心',
                             },
                            {
                                index: 'SKUSet',
                                title: 'SKU设置',
                                chiid:[
                                    {
                                      index: 'SKUAdd',
                                      title: '添加变体SKU',  
                                    }
                                ]
                            },
                            {
                                index: 'AddProduct',
                                title: '添加产品'
                            },
                             {
                                index: 'Procurement',
                                title: '产品采购信息'
                            },
                          
                        ]
                    },
                    //供应商
                    {
                        icon: 'el-icon-message',
                        index: '/supplier',
                        title: '供应商管理',
                         subs: [
                            {
                                index: 'supplierList',
                                title: '供应商列表'
                            },
                            {
                                index: 'AddSupplier',
                                title: '添加供应商'
                            },
                         
                        ]

                    },
                    //品牌中心
                    {
                        icon: 'el-icon-date',
                        index: '/brand',
                        title: '品牌管理',
                        subs: [
                            {
                                index: 'brandList',
                                title: '品牌列表'
                            },
                            {
                                index: 'AddBrand',
                                title: '添加品牌'
                            },
                        ]
                    },
                    //站点管理
                    {
                        icon: 'el-icon-star-on',
                        index: '/siteManage',
                        title: '站点管理',
                         subs: [
                            {
                                index: 'siteList',
                                title: '站点列表',
                                child:[
                                    {
                                      index: 'putInW',
                                      title: '投放窗口',  
                                    },
                                     {
                                      index: 'siteList',
                                      title: 'SPU销量走势',  
                                    }
                                ]
                            },
                            {
                                index: 'area',
                                title: '地区设置',
                                 child:[
                                    {
                                      index: 'areaAdd',
                                      title: '新增地区',  
                                    },
                                   
                                ]
                            },
                            {
                                index: 'domain',
                                title: '域名设置',
                                child:[
                                    {
                                      index: 'domainSet',
                                      title: '添加与修改域名',  
                                    },
                                   
                                ]
                            },
                            {
                                index: 'comment',
                                title: '评论管理'
                            },
                        ]
                    },
                    //订单管理
                     {
                        icon: 'el-icon-star-on',
                        index: '/order',
                        title: '订单管理',
                         subs: [
                            {
                                index: 'orderList',
                                title: '订单列表',
                            },
                            {
                                index: 'orderReview',
                                title: '审单',
                                child:[
                                    {
                                      index: 'orderUnusual',
                                      title: '问题单',  
                                    },
                                    
                                ]
                            },
                            {
                                index: 'orderInfo',
                                title: '订单详情',
                            }
                        ]
                    },
                    //WMS
                        //产品

                        //采购

                        //发货

                        //订单管理

                 
                 
                ]
            }
        },
        props:["menuList"],
        computed:{
            onRoutes(){
                
                 return this.$route.path.replace('/','');//与哪个index值相同即展开哪个子菜单
                //  return this.$route.path;
            }
        },
        created(){
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
        },
        mounted(){
            let ul= document.getElementsByClassName('el-submenu')
            
           let li0= document.getElementsByClassName('el-submenu')[0]
           var newNode = document.createElement("p");
           newNode.innerHTML = "&nbsp;&nbsp;OMS";
           newNode.style.fontSize=12
           li0.insertBefore(newNode ,li0.childNodes[0])

           let li4= document.getElementsByClassName('el-submenu')[4]
           var new4 = document.createElement("p");
           new4.innerHTML = "&nbsp;&nbsp;WMS";
           new4.style.fontSize=12
           li4.insertBefore(new4 ,li0.childNodes[4])
           
           
        },
        methods:{
            aa(path){
                 this.$router.push({
                        path,
                        query: {
                        t: +new Date() //保证每次点击路由的query项都是不一样的，确保会重新刷新view
                        }
                    })
            }
        }
    }
</script>
<style lang="less">
    .sidebar{
            .el-submenu .el-menu-item.is-active, .el-menu-item.is-active,
            .el-submenu .el-menu-item.is-active:hover, .el-menu-item.is-active:hover {
            background-color: #212323 !important;
            color: yellow!important;
            }
            .el-menu-item, .el-submenu__title{
                height: 44px;
                line-height: 44px;
                font-size: 13px;
                 [class^=el-icon-]{
                   font-size: 14px; 
                }
            }
    }


</style>


<style scoped>
    /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/  
    ::-webkit-scrollbar  
    {  
        width: 0px;  
        height: 0px;  
        background-color: #F5F5F5;  
    } 
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom:0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 220px;
    }
    .sidebar > ul {
        height:100%;
        overflow-y: auto
    }
</style>
