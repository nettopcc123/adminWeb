import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { getToken } from '@/utils/auth' // getToken from cookie


NProgress.configure({ showSpinner: false })// NProgress Configuration

// 动态改造路由
function mapRouter(roles,n) { //遍历后台传来的路由字符串，转换为组件对象
  n = n;
  let itme_data = []; 
  let itme = [];
  roles.forEach((route,i) => {
    if(n == 0){ //第一级遍历
      itme = {
        "path": "/" + route.id,
        "component": route.component,
        "name": route.id,
        "meta": {
          "title": route.name,
          "icon": route.id
        }
      }
    }else{
      itme = {
        "path": route.id,
        "component": route.component,
        "name": route.id,
        "meta": {
          "title": route.name
        }
      }
    }

    itme_data.push(itme);
    if (route.children && route.children.length) {
      itme_data[i].children = [];
      n = n + 1;
      let children_data = mapRouter(route.children,n)// 递归循环调用方法
      itme_data[i].children = children_data
      n = n - 1;
    }
    return
  })
  return itme_data
}


// permission judge function
function hasPermission(roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) return true // admin permission passed directly
  if (!permissionRoles) return true
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

const whiteList = ['/login', '/auth-redirect']// no redirect whitelist

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  if (getToken()) { // determine if there has token
    /* has token*/
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
        store.dispatch('GetUserInfo').then(res => { // 拉取user_info
          //const roles = res.data.roles // 原始数据路由
          const roles = mapRouter(res.data.roles,0) //动态设置路由
          store.dispatch('GenerateRoutes', { roles }).then(() => { // 根据roles权限生成可访问的路由表
          router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          })
        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err)
            next({ path: '/' })
          })
        })
      } else {
        // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        if (hasPermission(store.getters.roles, to.meta.roles)) {
          next()
        } else {
          next({ path: '/401', replace: true, query: { noGoBack: true }})
        }
        // 可删 ↑
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
