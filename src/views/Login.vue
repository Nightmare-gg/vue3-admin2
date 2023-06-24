<template>
    <el-form :model="loginForm" class="login_container">
        <h3>登录系统</h3>
        <el-form-item>
            <el-input type="input" placeholder="请输入账号" v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item>
            <el-input type="password" placeholder="请输入密码" v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="login">登录</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup>
import { reactive,getCurrentInstance } from 'vue';
import {useStore} from 'vuex'
import { useRouter } from 'vue-router';
const loginForm = reactive({
    username: 'admin',
    password: 'admin'
})
const {proxy} = getCurrentInstance()
const store = useStore()
const router = useRouter()
const login =async ()=> {
 const res = await proxy.$api.getMenu(loginForm);
//  console.log(res);
    store.commit('setMenu',res.menu);
    store.commit("addMenu",router);
    store.commit("setToken",res.token);
    router.push({
        name: 'home',
    })
}

</script>
<style scoped lang="less">
    .login_container {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 350px;
        background-color: #fff;
        border: 1px solid #eaeaea;
        border-radius: 15px;
        padding: 35px 35px 15px 35px;
        box-shadow: 0 0 25px #cacaca;
        h3 {
            text-align: center;
            margin-bottom: 20px;
            color: #505450;
        }
        .el-button {
            margin-left: 35%;
        }
    }
</style>