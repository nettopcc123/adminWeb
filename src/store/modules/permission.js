import { constantRouterMap } from '@/router'

const _import = require('@/router/_import_' + process.env.NODE_ENV)//获取组件的方法
// console.log(_import)
// const Index1 = r => require.ensure([],() => r(require('@/router/_import_' + process.env.NODE_ENV)), 'Index1');
// console.log(Index1)

//const _import = require('./router/_import_' + process.env.NODE_ENV)//获取组件的方法
/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param roles
 */
// function filterAsyncRouter(routes, roles) {
//   const res = []
//   console.log('-----------')
//   routes.forEach(route => {

//     const tmp = { ...route }
//     if (hasPermission(roles, tmp)) {
//       if (tmp.children) {
//         tmp.children = filterAsyncRouter(tmp.children, roles)
//       }
//       res.push(tmp)
//     }

//   })


//   return res
// }


function filterAsyncRouter(roles) { //遍历后台传来的路由字符串，转换为组件对象
  const accessedRouters = roles.filter(route => {
    if (route.component) {
      route.component = _import(route.component)
    }
    if (route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }
    return true
  })

  return accessedRouters
}



const permission = {
  state: {
    routers: [],
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data
        let accessedRouters
        accessedRouters = filterAsyncRouter(roles)
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
