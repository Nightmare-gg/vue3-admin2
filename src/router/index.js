// 引入创建路由的方法，和跳转路由的方法
import { createRouter,createWebHashHistory } from "vue-router";

const routes = [
    {
        path: '/',
        component:()=> import('@/views/Main.vue'),
        name: 'home1',
        // 如果处于根路径就重定向到home中
        redirect: '/home',
        // children: [
        //     {
        //         path: '/',
        //         name: 'home',
        //         component:()=> import('@/views/home/Home.vue')
        //     },
        //     {
        //         path: '/user',
        //         name: 'user',
        //         component: ()=> import('@/views/user/User.vue')
        //     },
        //     {
        //         path: '/page1',
        //         name: 'page1',
        //         component: ()=> import('@/views/Page1.vue')
        //     },
        //     {
        //         path: '/page2',
        //         name: 'page2',
        //         component: ()=> import('@/views/Page2.vue')
        //     }
        // ]
        children: []
    },
    {
        path: '/login',
        component:()=> import('@/views/Login.vue'),
    }
]

const router = createRouter({
    // 路由跳转的方法： hash,history,这里用的hash
    history: createWebHashHistory(),
    routes
})
// 导出
export default router