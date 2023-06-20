// 引入创建路由的方法，和跳转路由的方法
import { createRouter,createWebHashHistory } from "vue-router";

const routes = [
    {
        path: '/',
        component:()=> import('@/views/Main.vue'),
        children: [
            {
                path: '/',
                name: 'home',
                component:()=> import('@/views/home/Home.vue')
            }
        ]
    }
]

const router = createRouter({
    // 路由跳转的方法： hash,history,这里用的hash
    history: createWebHashHistory(),
    routes
})
// 导出
export default router