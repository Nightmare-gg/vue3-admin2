<template>
    <el-form :model="loginForm" class="login_container">
        <h3>登录系统</h3>
        <el-form-item>
            <el-input type="input" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item>
            <el-input type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary">登录</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup>
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