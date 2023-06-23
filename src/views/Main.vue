<template>
    <div class="common-layout">
        <el-container class="lay-container">
      <common-aside/>
      <el-container class="r-container">
            <common-header/>
            <!-- tab -->
            <common-tab/>
        <el-main>
            <!-- 路由出口 -->
            <!-- 路由匹配到的组件将渲染在这里 -->
            <router-view/>
        </el-main>
      </el-container>
    </el-container>
    </div>
</template>

<script setup>
import CommonHeader from "@/components/CommonHeader.vue"
import CommonAside from "@/components/CommonAside.vue";
import CommonTab from "@/components/CommonTab.vue";
</script>
<style lang="less" scoped>
.common-layout {
    width: 100vw;
    height: 100vh;
    .lay-container {
        flex-wrap: nowrap;
    }
    & > .el-container {
        height: 100%;
        &>.el-aside {
            height: 100%;
            background-color: #545c64;
        }
    }
}
.el-container {
    flex-wrap: wrap;
    align-items: flex-start;
}
</style>