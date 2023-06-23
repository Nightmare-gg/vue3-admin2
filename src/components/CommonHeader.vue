<template>
 <el-header class="header">
    <div class="l_content">
       <!-- 图标的展示 -->
       <el-button size="small" @click="handleCollapse">
        <el-icon :size="20">
            <Menu />
        </el-icon>
       </el-button>
       <h3>首页</h3>
    </div>
    <div class="r_content">
      <el-dropdown>
    <span class="el-dropdown-link">
      <img class="user_img" src="@/assets/images/user.png" alt="">
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>个人中心</el-dropdown-item>
        <el-dropdown-item>退出</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
    </div>
 </el-header>     
</template>

<script setup>
import {useStore} from 'vuex'
let store = useStore()

let handleCollapse = ()=> {
  // 调用vuex中的mutations
  store.commit("updateIsCollapse");
}
</script>
<style scoped lang="less">
.header {
   display: flex;
   align-items: center;
   justify-content: space-between;
   width: 100%;
   background-color: #333;
}

.user_img {
   width: 40px;
   height: 40px;
   border-radius: 50%;
}

.l_content {
  display: flex;
  align-items: center;
  .el-button {
    margin-right: 20px;
  }
  h3 {
    color: #fff;
  }
}

</style>