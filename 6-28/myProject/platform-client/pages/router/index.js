import Vue from 'vue';
import Router from 'vue-router';
import store from '../store/index'


import {routers, otherRouter, appRouter} from './router';

Vue.use(Router);

// 路由配置
const RouterConfig = {
    // mode: 'history',
    routes: routers,
    otherRouter:otherRouter,
    appRouter:appRouter
};

export const router = new Router(RouterConfig);




//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    
    const role = localStorage.getItem('user');
   
    const token =  sessionStorage.getItem('token');
    //如果没登录，并且去的页面不是login，则去到login页面
    if(!role && to.path !== '/login'){
        next('/login');
    }else if(role&&to.path=="/login"){
    //如果有登录，并且去的页面是登录页，则去到首页    
        next('/');
    } else if(to.meta.permission){
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin' ? next() : next('/403');
    }else{
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if(navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor'){
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        }else{
        //正常流转    
            next();
        }
    }
})
// router.beforeEach((to, from, next) => {
//     //若token存在，
//     if(store.getters.token){  
//         if(to.path=="/login"){
//             next("/")  //不用去登录页面,不严谨
//         }else{         //去生成权限页面
//             if (store.getters.roles.length === 0) { //去获取用户角色
//                 store.dispatch('GetInfo').then(res=>{
//                     const roles=res.data.roles
//                     store.dispatch('GenerateRoutes', { roles }).then(() => { // 生成可访问的路由表
//                         router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
//                         next({ ...to }) // hack方法 确保addRoutes已完成
//                       })
//                 })
//             }
//         }
//     }
// })

router.afterEach(() => {
    // NProgress.done() // 结束Progress
  })


    
    
    