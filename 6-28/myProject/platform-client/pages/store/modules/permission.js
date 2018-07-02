import { asyncRouterMap, constantRouterMap } from '@/router'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    //如果有设置权限，用用户的角色列表去匹配该路由的权限
    return roles.some(role => route.meta.roles.indexOf(role) >= 0)
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, roles) {
  const accessedRouters = asyncRouterMap.filter(route => {
    //过滤每一个路由
    if (hasPermission(roles, route)) {
        //如果有子路由，递归遍历
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  //返回符合权限的列表
  return accessedRouters
}

const permission = {
  state: {
    routers: constantRouterMap,//拼接总路由
    addRouters: []             //异步添加路由
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      //动态添加的路由
      state.addRouters = routers
      //总路由
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    //获得用户的权限列表
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        //用户角色
        const { roles } = data
        //默认权限列表
        let accessedRouters

        if (roles.indexOf('admin') >= 0) {
          //管理员获得全部路由列表
          accessedRouters = asyncRouterMap
        } else {
          //非管理员进行过滤，获得过滤后的权限列表
          accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        }
        //异步设置权限列表
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
