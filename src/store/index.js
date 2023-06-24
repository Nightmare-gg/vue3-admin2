import {createStore} from 'vuex'
export default createStore({
    state: {
        isCollapse: true,
        currentMenu: null,
        menu: [],
        tabsList: [
            {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 'home'
            }
        ]
    },
    mutations: {
        updateIsCollapse(state,payload) {
            state.isCollapse = !state.isCollapse
        },
        selectMenu(state,val) {
            // 判断
            // 踩坑：这里判断用的是== 不是=
            // val.name=='home' ? (state.currentMenu = null) : (state.currentMenu = val)
            if(val.name=='home') {
                state.currentMenu = null
            }else {
                state.currentMenu = val
                let result = state.tabsList.findIndex(item => item.name === val.name)
                result == -1 ? state.tabsList.push(val) : ''
            }
        },
        // 关闭标签
        closeTab(state, val) {
            let res = state.tabsList.findIndex(item => item.name === val.name) 
            state.tabsList.splice(res,1)
        },
        // 不同用户显示不同菜单
        setMenu(state,val) {
            state.menu = val
            localStorage.setItem('menu',JSON.stringify(val))
        },
        addMenu(state,router) {
            if(!localStorage.getItem('menu')) {
                return
            }
            const menu = JSON.parse(localStorage.getItem('menu'))
            state.menu = menu

            const menuArray = []

            menu.forEach(item=> {
                if(item.children) {
                    item.children = item.children.map(item => {
                        let url = `../views/${item.url}.vue`
                        item.component = ()=> import(url)
                        return item
                    })
                    menuArray.push(...item.children)
                } else {
                    let url = `../views/${item.url}.vue`
                    item.component = ()=> import(url)
                    menuArray.push(item)
                }
            })
            menuArray.forEach(item=> {
                router.addRoute('home1',item)
            })
        },
        // 退出清除数据
        cleanMenu(state) {
            state.menu = []
            localStorage.removeItem('menu')
        }
    }
})