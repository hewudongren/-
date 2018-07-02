import routers from '__{targetSystem}__/router'
import jwConfig from 'jw_config'

let excludeRouters = jwConfig.excludeRouters

let defaultRouters = [{
    path: '/setting',
    component: () => import ( /*webpackChunkName: "setting"*/ './modules/setting/index.vue')
  },
  
  //主页面
  {
    path: '/app/app/index',
    component: () => import ( /*webpackChunkName: "app_index"*/ './modules/app/app/index')
  }, 
  //跳转子页面
  {
    path: '/app/app/edit/:id',
    component: () => import ( /*webpackChunkName: "app_edit"*/ './modules/app/app/edit')
  }, {
    path: '/app/app/service/:id',
    component: () => import ( /*webpackChunkName: "app_service"*/ './modules/app/app/service-authorize')
  }, {
    path: '/app/app/permission/edit/:id',
    component: () => import ( /*webpackChunkName: "permission_edit"*/ './modules/app/permission/edit')
  }, {
    path: '/app/app/role/index',
    component: () => import ( /*webpackChunkName: "role_index"*/ './modules/app/role/index')
  }, {
    path: '/app/app/role/edit/:id',
    component: () => import ( /*webpackChunkName: "role_edit"*/ './modules/app/role/role-edit')
  }, {
    path: '/app/app/profile/edit/:id',
    component: () => import ( /*webpackChunkName: "profile_edit"*/ './modules/app/role/profile-edit')
  },


  {
    path: '/svc/service/index',
    component: () => import ( /*webpackChunkName: "svc_index"*/ './modules/svc/index')
  }, {
    path: '/svc/service/edit/:id',
    component: () => import ( /*webpackChunkName: "svc_edit"*/ './modules/svc/edit'),
    children: [{
      path: '/svc/service/edit/:id/detail',
      component: () => import ( /*webpackChunkName: "svc_edit_detail"*/ './modules/svc/service/detail')
    }, {
      path: '/svc/service/edit/:id/public',
      component: () => import ( /*webpackChunkName: "svc_edit_public"*/ './modules/svc/service/public')
    }, {
      path: '/svc/service/edit/:id/common',
      component: () => import ( /*webpackChunkName: "svc_edit_common"*/ './modules/svc/service/common.js')
    }, {
      path: '/svc/service/edit/:id/auth',
      component: () => import ( /*webpackChunkName: "svc_edit_auth"*/ './modules/svc/service/auth')
    }]
  },


  {
    path: '/config/i18n',
    component: () => import ( /*webpackChunkName: "config_i18n"*/ './modules/i18n/index.vue')
  }, {
    path: '/config/dataDictionary',
    component: () => import ( /*webpackChunkName: "config_datadict"*/ './modules/data-dictionary/index.vue')
  },


  {
    path: '/sys/user/index',
    component: () => import ( /*webpackChunkName: "user_index" */ './modules/sys/user/index')
  }, {
    path: '/sys/user/edit/:id',
    component: () => import ( /*webpackChunkName: "user_edit" */ './modules/sys/user/edit')
  }, {
    path: '/sys/org/index',
    component: () => import ( /*webpackChunkName: "org_index" */ './modules/sys/org/index')
  }
]

//从默认路由中排除无用的路由
for(let j=0,jlen=excludeRouters.length;j<jlen;j++) {

  for(let i=0,len=defaultRouters.length;i<len;i++) {
  
    if(defaultRouters[i].path === excludeRouters[j]) {
      defaultRouters.splice(i,1)
      break  
    }
  }
}

//组合默认路由和业务系统路由
export default defaultRouters.concat(routers)