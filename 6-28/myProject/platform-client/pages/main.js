import Vue from 'vue';
import App from './App';
import {router} from './router/index';
import store from './store';


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import "babel-polyfill";

Vue.use(ElementUI, { size: 'small' });
//本地路由
import axios from './axios/api';
// 模拟数据
import "./mock.js"

//测试路由
// import axios from 'axios';
Vue.prototype.$axios = axios;


// //使用钩子函数对路由进行权限跳转
// router.beforeEach((to, from, next) => {
//     const role = localStorage.getItem('user');
//     //如果没登录，并且去的页面不是login，则去到login页面
//     if(!role && to.path !== '/login'){
//         next('/login');
//     }else if(role&&to.path=="/login"){
//     //如果有登录，并且去的页面是登录页，则去到首页    
//         next('/');
//     } else if(to.meta.permission){
//         // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
//         role === 'admin' ? next() : next('/403');
//     }else{
//         // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
//         if(navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor'){
//             Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
//                 confirmButtonText: '确定'
//             });
//         }else{
//         //正常流转    
//             next();
//         }
//     }
// })

new Vue({
    router,
    store,
    render: h => h(App),
    //获得侧边栏列表
    mounted () {
        this.$store.commit('setMenulist');
    },
    
}).$mount('#app');