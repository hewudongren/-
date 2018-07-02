import Main from "components/common/Home.vue"

    // 作为Main组件的子页面展示但不在侧菜单显示的路由写在里
    export const otherRouter =     
        {
            path: '/',
            component: Main,
            redirect: '/dashboard',
            name:"首页",
            meta: { title: '首页' },
            children:[
                //OMS
                {
                    // 设置SKU
                    path: '/SKUSet',
                    name:"设置SKU",
                    component: resolve => require(['components/page/market/productCenter/SKUSet.vue'], resolve),
                    meta: { title: '设置SKU' }
                },
                {
                    // 添加变体SKU页面
                    path: '/productCenter/SKUSet/SKUAdd',
                    name:"添加变体SKU",
                    component: resolve => require(['components/page/market/SKUSet/SKUAdd.vue'], resolve),
                    meta: { title: '添加变体SKU' }
                },
                {
                    // 修改供应商
                    path: '/editSupplier',
                    name:"修改供应商",
                    component: resolve => require(['components/page/supplier/AddSupplier/editSupplier.vue'], resolve),
                    meta: { title: '修改供应商' }
                },
                {
                    path: '/siteManage/area/areaAdd',
                    name:"地区新增",
                    component: resolve => require(['components/page/siteManage/area/areaAdd.vue'], resolve),
                    meta: { title: '地区新增' },
                },
                {
                    path: '/siteManage/domain/domainAdd',
                    name:"域名新增",
                    component: resolve => require(['components/page/siteManage/domain/domainAdd.vue'], resolve),
                    meta: { title: '域名新增' },
                },
                // WMS
                {
                    path: '/BuyerDetails',
                    name:"采购单详情",
                    component: resolve => require(['components/page/Buyer/BuyerList/BuyerDetails.vue'], resolve),
                    meta: { title: '采购单详情' },
                },
                {
                    path: '/paymentDetails',
                    name:"采购付款单详情",
                    component: resolve => require(['components/page/Buyer/payment/paymentDetails.vue'], resolve),
                    meta: { title: '采购付款单详情' },
                }
            ]
        }
    //动态需要根据权限加载的路由表
    // 作为Main组件的子页面展示并且在左侧菜单显示的路由写在里
    export const appRouter = [
        {
            path: '/',
            component: Main,
            menuShow: true,
            icon: 'el-icon-setting',
            name:"首页",
            meta: { title: '首页',role: ['admin','super_editor'] },
            children:[
                {
                    path: '/dashboard',
                    component: resolve => require(['components/page/Dashboard.vue'], resolve),
                    meta: { title: '个人中心' }  //改数组
                },                                                                                            
            ]

        },
        //产品中心
        {  
            path: '/product',
            component: Main,
            icon: 'el-icon-tickets',
            menuShow: true,
            name:"产品管理",
            redirect: '/product/productCenter',
            meta: { title: '产品' },
            children:[
                {
                    path: 'productCenter',
                    name:"产品中心",
                    component: resolve => require(['components/page/market/productCenter/productList.vue'], resolve),
                    meta: { title: '产品中心' }
                },
                {
                    path: 'SKUSet',
                    name:"SKU设置",
                    component: resolve => require(['components/page/market/SKUSet/SKUSet.vue'], resolve),
                    meta: { title: 'SKU设置' }
                },
                {
                    path: 'AddProduct',
                    name:"添加产品",
                    component: resolve => require(['components/page/market/AddProduct/AddProduct.vue'], resolve),
                    meta: { title: '添加产品' }
                },
                {
                    path: 'Procurement',
                    name:"产品采购信息",
                    component: resolve => require(['components/page/market/Procurement/Procurement.vue'], resolve),
                    meta: { title: '产品采购信息' }
                }
             
            ]
        },
        //供应商
        {  
            path: '/supplier',
            component: Main,
            icon: 'el-icon-message',
            menuShow: true,
            name:"供应商管理",
            meta: { title: '供应商' },
            children:[  
                {
                    
                    path: 'supplierList',
                    name:"供应商列表",
                    component: resolve => require(['../components/page/supplier/supplierList/supplierList.vue'], resolve),
                    meta: { title: '供应商列表' }
                },      
                {
                    
                    path: 'AddSupplier',
                    name:"添加供应商",
                    component: resolve => require(['../components/page/supplier/AddSupplier/AddSupplier.vue'], resolve),
                    meta: { title: '添加供应商' }
                },
            ]
        },
        //品牌中心
          {  
            path: '/brand',
            component: Main,
            icon: 'el-icon-date',
            menuShow: true,
            name:"品牌管理",
            meta: { title: '品牌中心' },
            children:[  
                {
                    path: 'brandList',
                    name:"品牌列表",
                    component: resolve => require(['../components/page/brand/brandList/brandList.vue'], resolve),
                    meta: { title: '品牌列表' }
                },      
                {
                    path: 'AddBrand',
                    name:"添加品牌",
                    component: resolve => require(['../components/page/brand/AddBrand/AddBrand.vue'], resolve),
                    meta: { title: '添加品牌' }
                }
              
            ]
        },
        //站点管理
        {
            path: '/siteManage',
            component: Main,
            icon: 'el-icon-star-on',
            menuShow: true,
            name:"站点管理",
            meta: { title: '站点管理' },
            children:[
                {
                    path: 'siteList',
                    name:"站点列表",
                    component: resolve => require(['../components/page/siteManage/siteList/siteList.vue'], resolve),
                    meta: { title: '站点列表' }
                },
                {
                    path: 'area',
                    name:"地区设置",
                    component: resolve => require(['../components/page/siteManage/area/areaSet.vue'], resolve),
                    meta: { title: '地区设置' },
                   
                },
                {
                    path: 'domain',
                    name:"域名管理",
                    component: resolve => require(['../components/page/siteManage/domain/domainSet.vue'], resolve),
                    meta: { title: '域名管理' }
                },
                {
                    path: 'comment',
                    name:"评论管理",
                    component: resolve => require(['../components/page/siteManage/comment/commentSet.vue'], resolve),
                    meta: { title: '评论管理' }
                },

            ]

        },
         //订单管理
         {
            path: '/order',
            component: Main,
            icon: 'el-icon-star-on',
            menuShow: true,
            name:"订单管理",
            meta: { title: '订单管理' },
            children:[
                {
                    path: 'orderList',
                    name:"订单列表",
                    component: resolve => require(['../components/page/order/orderList/orderList.vue'], resolve),
                    meta: { title: '订单列表' }
                },
                {
                    path: 'orderReview',
                    name:"审单",
                    component: resolve => require(['../components/page/order/orderReview/orderReview.vue'], resolve),
                    meta: { title: '审单' },
                   
                },
                {
                    path: 'orderInfo',
                    name:"订单详情",
                    component: resolve => require(['../components/page/order/orderInfo/orderInfo.vue'], resolve),
                    meta: { title: '订单详情' }
                }
            ]

        },
       
        //WMS
        //订单管理
        {
            path: '/order_B',
            component: Main,
            icon: 'el-icon-star-on',
             redirect: '/orderB',
            menuShow: true,
            name:"订单管理",
            meta: { title: '订单管理' },
            children:[
                {
                    path: '/orderB',
                    name:"订单列表",
                    component: resolve => require(['../components/page/orderB/orderList/orderList.vue'], resolve),
                    meta: { title: '订单列表' }
                },
              
             
            ]

        },
        //产品管理
        // {
        //     path: '/Buyer',
        //     component: Main,
        //     icon: 'el-icon-date',
        //     menuShow: true,
        //     name:"产品",
        //     meta: { title: '产品' },
        //     children:[
        //         {
        //             path: 'BuyerList',
        //             name:"产品列表",
        //             component: resolve => require(['../components/page/Buyer/BuyerList/BuyerList.vue'], resolve),
        //             meta: { title: '产品列表' }
        //         },
        //         {
        //             path: 'payment',
        //             name:"供应商",
        //             component: resolve => require(['../components/page/Buyer/payment/payment.vue'], resolve),
        //             meta: { title: '供应商' },
                   
        //         },
           
        //     ]

        // },
        //采购管理
        {
            path: '/Buyer',
            component: Main,
            icon: 'el-icon-date',
            menuShow: true,
            name:"采购",
            meta: { title: '采购' },
            children:[
                {
                    path: 'BuyerList',
                    name:"采购单",
                    component: resolve => require(['../components/page/Buyer/BuyerList/BuyerList.vue'], resolve),
                    meta: { title: '采购列表' }
                },
                {
                    path: 'payment',
                    name:"采购付款单",
                    component: resolve => require(['../components/page/Buyer/payment/payment.vue'], resolve),
                    meta: { title: '采购付款单' },
                   
                },
                {
                    path: 'refund',
                    name:"采购退款单",
                    component: resolve => require(['../components/page/Buyer/refund/refund.vue'], resolve),
                    meta: { title: '采购退款单' }
                },
                {
                    path: 'shouHuo',
                    name:"收货单",
                    component: resolve => require(['../components/page/Buyer/shouHuo/shouHuo.vue'], resolve),
                    meta: { title: '收货单' }
                }
            ]

        },
        //发货管理
        {
            path: '/sendout',
            component: Main,
            icon: 'el-icon-date',
            menuShow: true,
            name:"发货",
            meta: { title: '发货' },
            children:[
                {
                    path: 'pickingList',
                    name:"拣货单",
                    component: resolve => require(['../components/page/Buyer/BuyerList/BuyerList.vue'], resolve),
                    meta: { title: '拣货单' }
                },
                {
                    path: 'payment',
                    name:"打包复核",
                    component: resolve => require(['../components/page/Buyer/payment/payment.vue'], resolve),
                    meta: { title: '打包复核' },
                   
                },
                {
                    path: 'refund',
                    name:"秤重",
                    component: resolve => require(['../components/page/Buyer/refund/refund.vue'], resolve),
                    meta: { title: '秤重' }
                },
                {
                    path: 'shouHuo',
                    name:"出库",
                    component: resolve => require(['../components/page/Buyer/shouHuo/shouHuo.vue'], resolve),
                    meta: { title: '出库' }
                }
            ]

        },
        //库存管理
        {
            path: '/Buyer',
            component: Main,
            icon: 'el-icon-date',
            menuShow: true,
            name:"库存",
            meta: { title: '库存' },
            children:[
                {
                    path: 'BuyerList',
                    name:"采购单",
                    component: resolve => require(['../components/page/Buyer/BuyerList/BuyerList.vue'], resolve),
                    meta: { title: '采购列表' }
                },
                {
                    path: 'payment',
                    name:"采购付款单",
                    component: resolve => require(['../components/page/Buyer/payment/payment.vue'], resolve),
                    meta: { title: '采购付款单' },
                   
                },
                {
                    path: 'refund',
                    name:"采购退款单",
                    component: resolve => require(['../components/page/Buyer/refund/refund.vue'], resolve),
                    meta: { title: '采购退款单' }
                },
                {
                    path: 'shouHuo',
                    name:"收货单",
                    component: resolve => require(['../components/page/Buyer/shouHuo/shouHuo.vue'], resolve),
                    meta: { title: '收货单' }
                }
            ]

        },
        //财务管理
        {
            path: '/Buyer',
            component: Main,
            icon: 'el-icon-date',
            menuShow: true,
            name:"财务",
            meta: { title: '财务' },
            children:[
                {
                    path: 'BuyerList',
                    name:"采购单",
                    component: resolve => require(['../components/page/Buyer/BuyerList/BuyerList.vue'], resolve),
                    meta: { title: '采购列表' }
                },
                {
                    path: 'payment',
                    name:"采购付款单",
                    component: resolve => require(['../components/page/Buyer/payment/payment.vue'], resolve),
                    meta: { title: '采购付款单' },
                   
                },
                {
                    path: 'refund',
                    name:"采购退款单",
                    component: resolve => require(['../components/page/Buyer/refund/refund.vue'], resolve),
                    meta: { title: '采购退款单' }
                },
                {
                    path: 'shouHuo',
                    name:"收货单",
                    component: resolve => require(['../components/page/Buyer/shouHuo/shouHuo.vue'], resolve),
                    meta: { title: '收货单' }
                }
            ]

        },
        //报表管理
           {
            path: '/reports',
            component: Main,
            icon: 'el-icon-date',
            menuShow: true,
            name:"报表",
            meta: { title: '报表' },
            children:[
                {
                    path: 'profit',
                    name:"利润报表",
                    component: resolve => require(['../components/page/reports/profit/profit.vue'], resolve),
                    meta: { title: '利润报表' }
                },
                {
                    path: 'orderReview',
                    name:"审单",
                    component: resolve => require(['../components/page/order/orderReview/orderReview.vue'], resolve),
                    meta: { title: '审单' },
                   
                },
                {
                    path: 'orderInfo',
                    name:"订单详情",
                    component: resolve => require(['../components/page/order/orderInfo/orderInfo.vue'], resolve),
                    meta: { title: '订单详情' }
                }
            ]

        },

           //问题件
           {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '系统主页' },
            children:[
                {
                    path: 'question',
                    component: resolve => require(['../components/page/transfer/transfer.vue'], resolve),
                    meta: { title: '问题件' }
                },                                                                                            
            ]

        },
     
    ];

    //静态路由表
    // 在整个浏览器展示， 不作为Main组件的子页面展示的页面单独写，如下
    export const loginRouter = {
        path: '/login',
        name: 'login',
        meta: {
            title: 'Login - 登录'
        },
        component: resolve => require(['components/page/Login.vue'], resolve)
    };

    export const page404 = {
        path: '/404',
        name: 'error-404',
        meta: {
            title: '404-页面不存在'
        },
        component: resolve => require(['components/page/404.vue'], resolve)
    };

    export const page403 = {
        path: '/403',
        meta: {
            title: '403-权限不足'
        },
        name: 'error-403',
        component: resolve => require(['components/page/403.vue'], resolve)
    };
    // export const page400 = {
    //     path: '*',
    //     redirect: '/404',
    //     meta: {
    //         title: '错误页面'
    //     },
    //     name: 'error-400',
    // };

    // 所有上面定义的路由都要挂载下面的routers里
    export const routers = [
        
        otherRouter,
        ...appRouter,
        loginRouter,
        page404,
        page403,
        // page400
    ];


