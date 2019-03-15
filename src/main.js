import Vue from 'vue'
import 'babel-polyfill'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // 全局样式
import App from './App'
import store from './store'
import router from './router'

import './icons' // svg图标
import './errorLog' // 错误日志
import './permission'  // 权限控制
import './mock' // 测试数据
import * as filters from './filters' // 全局filter

Vue.use(Element)

// 注册全局实用程序筛选器。
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
