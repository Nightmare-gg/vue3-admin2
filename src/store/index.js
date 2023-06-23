import {createStore} from 'vuex'
export default createStore({
    state: {
        isCollapse: true,
        currentMenu: null
    },
    mutations: {
        updateIsCollapse(state,payload) {
            state.isCollapse = !state.isCollapse
        },
        selectMenu(state,val) {
            // 判断
            // 踩坑：这里判断用的是== 不是=
            val.name=='home' ? (state.currentMenu = null) : (state.currentMenu = val)
        }
    }
})