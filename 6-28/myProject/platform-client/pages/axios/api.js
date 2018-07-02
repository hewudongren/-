import axios from 'axios'
// import store from "../store/index" //引入仓库实例
import { Message, Loading} from 'element-ui';
import Cookies from 'js-cookie'




//设置请求头信息
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
//设置请求时间
axios.defaults.timeout = 5000;

//设置请求公共路径
//  axios.defaults.baseURL ='http://123.com';process.env.BASE_API, // api的base_url

let loadingInstance
// 请求拦截器
axios.interceptors.request.use(function(config) {
          if(Cookies.get('access_token')){
            
              config.headers['access_token'] = Cookies.get('access_token')  //每次请求携带token
          }
        //全局loading
         loadingInstance = Loading.service({
          target:".list",
        });
    return config;
  }, function(error) {
    //请求错误
    Message.error('请求超时，请检查网络。') //请求超时，提示
    return Promise.reject(error);
    // return Promise.resolve(err);  在then函数中能接收到错误信息
  })
  // 响应拦截器
axios.interceptors.response.use(function(response) {
 
  if (response.status && response.status == 200 && response.error) {  //服务器数据异常
    Message.error({message: response.error});
    return;
  }
 
    loadingInstance.close();
 
  return response;                   //响应成功，返回数据    
}, function(error) {
  
  if (err.response.status == 504||err.response.status == 404) {  //响应不成功，异常
    Message.error({message: '服务器被吃了⊙﹏⊙∥'});
  } else if (err.response.status == 403) {
    Message.error({message: '权限不足,请联系管理员!'});
  }else {
    Message.error({message: '未知错误!'});
  }
  return Promise.reject(error);
  // return Promise.resolve(err);
})

 let base = 'http://rap2api.taobao.org/app/mock/14103/';  //开发 生产切换
 if (process.env.NODE_ENV == 'development') {
 
}else{
	
}
// 封装axios的post发送数据请求
export default {
  post : (url, params) => {
    return axios({
      method: 'post',
      url: `${base}${url}`,
      data: params,
      headers: {
          'Content-Type': 'multipart/form-data'
      }
    });
  },
  // 封装axios的get获取数据请求
   get: (url,params) => {
    return axios({
      method: 'get',
      params,
      url: `${base}${url}`
    });
  },
    // 封装axios的put编辑数据请求
    put: (url,params) => {
      return axios({
        method: 'put',
        params,
        url: `${base}${url}`
      });
    },
      // 封装axios的delete删除数据请求
      delete: (url,params) => {
        return axios({
          method: 'delete',
          params,
          url: `${base}${url}`
        });
      }
}  




 