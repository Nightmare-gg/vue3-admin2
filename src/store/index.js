import {createStore} from 'vuex'
export default createStore({
    state: {
        isCollapse: true,
        currentMenu: null,
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
        }
    }
})