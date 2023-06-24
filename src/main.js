import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
// 引入样式文件
import '@/styles/index.less'
import '@/api/mock.js'
import api from './api/api'
// 注册图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 完整引入element-plus
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
import store from '@/store/index'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
  store.commit("addMenu",router);
  // 对比路由的方法
  function checkRouter(path) {
    let hasCheck = router.getRoutes().filter(route => route.path == path).length
    if(hasCheck) {
      return true
    } else {
      return false
    }
  }
  // 路由守卫
  router.beforeEach((to,from,next)=> {
    store.commit('getToken')
    const token = store.state.token
    if(!token && to.name !== 'login') {
      next({name: 'login'})
    }else if(!checkRouter(to.path)) {
      next({name: 'login'})
    }
    
    else {
      next()
    }
  })
  // 挂载到全局
app.config.globalProperties.$api = api
app.use(router).use(store)
// app.use(ElementPlus)
app.mount('#app')
