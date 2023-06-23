import Mock from 'mockjs'
import homeApi from './mockData/home'
import userApi from './mockData/user'
// 拦截请求
Mock.mock('/home/getData',homeApi.getHomeData)

// 本地获取user的数据
Mock.mock(/user\/getUser/,'get',userApi.getUserList)