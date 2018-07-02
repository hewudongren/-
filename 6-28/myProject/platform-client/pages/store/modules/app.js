import {appRouter} from '@/router/router.js';


const app = {
    state: {
        menuList: [],  //侧边栏菜单
        imgPath:"",    //上传图片路劲
    },
    mutations: {
        //设置用户头像
        setAvator(state,path){
            //保存用户头像
            localStorage.userIcon=path
        },
        //设置侧边栏列表
        setMenulist (state) {
            state.menuList = appRouter;
        },
        //设置上传图片路劲
        setimgPath (state,path) {
            state.imgPath = path;
        },


     

    },
    getters:{
       
    },
};

export default app;
