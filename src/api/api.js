// 对整个项目api的管理
import request from "./request";
export default {
    // home组件左侧表格数据获取
    getTableData(params) {
        return request({
            url: '/home/getTableData',
            method: 'get',
            data: params,
            mock: true
        })
    },
    getCountData() {
        return request({
            url: '/home/getCountData',
            method: 'get',
            mock: true
        })
    },
    // 获取echart数据
    getChartData() {
        return request({
            url: '/home/getChartData',
            method: 'get',
            mock: true
        })
    },
    // 获取用户信息
    getUserData(params) {
        return request({
            url: '/user/getUser',
            method: 'get',
            // mock为false否则调用的是线上fastmock数据
            mock: false,
            data: params
        })
    },
    // 新增用户
    addUser(params) {
        return request({
            url: '/user/add',
            method: 'post',
            mock: false,
            data: params
        })
    },
    // 编辑用户
    editUser(params) {
        return request({
            url: '/user/edit',
            method: 'post',
            mock: false,
            data: params
        })
    },
    // 删除用户
    deleteUser(params) {
        return request({
            url: '/user/delete',
            method: 'get',
            mock: false,
            data: params
        })
    },
    // 不同用户登录展示不同的菜单列表
    getMenu(params) {
        return request({
            url: '/permission/getMenu',
            method: 'post',
            mock: false,
            data: params
        })
    }

}