


export default [
  {
    path: '/',
    redirect: '/Bresources/Bresources/index'
  },
  // ,{
  //   path: '/home',
  //   component: Home
  //   //component: () => import( /*webpackChunkName: "home"*/ 'platform-client/modules/home/index')
  // },
  
  
  // {
  //   path: '/app/app/index',
  //   component: () => import ( /*webpackChunkName: "app_index"*/ './platform-client/modules/app/app/index')
  // },
//   {
//     path: '/app/app/edit/:id',
//     component: () => import(/*webpackChunkName: "app_edit"*/'platform-client/modules/app/app/edit')
//   },{
//     path: '/app/app/service/:id',
//     component: () => import(/*webpackChunkName: "app_service"*/'platform-client/modules/app/app/service-authorize')
//   },{
//     path: '/app/app/permission/edit/:id',
//     component: () => import(/*webpackChunkName: "permission_edit"*/'platform-client/modules/app/permission/edit')
//   },{
//     path: '/app/app/role/index',
//     component: () => import(/*webpackChunkName: "role_index"*/'platform-client/modules/app/role/index')
//   },{
//     path: '/app/app/role/edit/:id',
//     component: () => import(/*webpackChunkName: "role_edit"*/'platform-client/modules/app/role/role-edit')
//   },{
//     path: '/app/app/profile/edit/:id',
//     component: () => import(/*webpackChunkName: "profile_edit"*/'platform-client/modules/app/role/profile-edit')
//   },
  
  //主页面 
  {
    path: '/Bresources/Bresources/index',
    component: () => import(/*webpackChunkName: "svc_index"*/'./platform-client/modules/Bresources/Bresources/index')
  },
  {
    path: '/bresources/resource',
    component: () => import(/*webpackChunkName: "svc_index"*/'./platform-client/modules/Bresources/resource/index')
  },
  // {
  //   path: '/svc/service/edit/:id',
  //   component: () => import(/*webpackChunkName: "svc_edit"*/'platform-client/modules/svc/edit'),
  //   children: [{
  //       path: '/svc/service/edit/:id/detail',
  //       component: () => import(/*webpackChunkName: "svc_edit_detail"*/ 'platform-client/modules/svc/service/detail')
  //     },{
  //       path: '/svc/service/edit/:id/public',
  //       component: () => import(/*webpackChunkName: "svc_edit_public"*/'platform-client/modules/svc/service/public')
  //     },{
  //       path: '/svc/service/edit/:id/common',
  //       component: () => import(/*webpackChunkName: "svc_edit_common"*/'platform-client/modules/svc/service/common.js')
  //     },{
  //       path: '/svc/service/edit/:id/auth',
  //       component: () => import(/*webpackChunkName: "svc_edit_auth"*/'platform-client/modules/svc/service/auth')
  //     }
  //   ]
  // },
  
  
  {
    path: '/digital/pdm/index',
    component: () => import(/*webpackChunkName: "digital_pdm"*/ './platform-client/modules/digital/pdm/index')
  },{
    path: '/digital/pdm/append/:id',
    component: () => import(/*webpackChunkName: "digital_pdm"*/ './platform-client/modules/digital/pdm/append')
  },
  {
    path: '/digital/iot/index',
    component: () => import(/*webpackChunkName: "digital_iot"*/'./platform-client/modules/digital/iot/index')
  },{
    path: '/digital/mpm/index',
    component: () => import(/*webpackChunkName: "digital_mpm"*/'./platform-client/modules/digital/mpm/index')
  },
  
  
//   {
//     path: '/middleware',
//     component: () => import(/*webpackChunkName: "middleware"*/'platform-client/modules/middleware/index')
//   },
  
  
//   {
//     path: '/config/i18n',
//     component: () => import(/*webpackChunkName: "config_i18n"*/'platform-client/modules/i18n/index.vue')
//   },{
//     path: '/config/dataDictionary',
//     component: () => import(/*webpackChunkName: "config_datadict"*/'platform-client/modules/data-dictionary/index.vue')
//   },


//   {
//     path: '/sys/user/index',
//     component: () => import(/*webpackChunkName: "user_index" */ 'platform-client/modules/sys/user/index')
//   },{
//     path: '/sys/user/edit/:id',
//     component: () => import(/*webpackChunkName: "user_edit" */ 'platform-client/modules/sys/user/edit')
//   },{
//     path: '/sys/org/index',
//     component: () => import(/*webpackChunkName: "org_index" */'platform-client/modules/sys/org/index')
//   }, 


//   {
//     path: '/apm',
//     component: () => import(/*webpackChunkName: "digital_apm"*/'platform-client/modules/apm/index')
//   },


//   {
//     path: '/analysis/traffic',
//     component: () => import(/*webpackChunkName: "analysis_traffic"*/'platform-client/modules/analysis/traffic-analysis.vue')
//   },{
//     path: '/analysis/performance',
//     component: () => import(/*webpackChunkName: "analysis_performance"*/'platform-client/modules/analysis/performance-analysis.vue')
//   },{
//     path: '/analysis/error',
//     component: () => import(/*webpackChunkName: "analysis_error"*/'platform-client/modules/analysis/error-analysis.vue')
//   },{
//     path: '/analysis/device',
//     component: () => import(/*webpackChunkName: "analysis_device"*/'platform-client/modules/analysis/device-analysis.vue')
//   }
 ]




