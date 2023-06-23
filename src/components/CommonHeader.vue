<template>
 <el-header class="header">
    <div class="l_content">
       <!-- 图标的展示 -->
       <el-button size="small" @click="handleCollapse">
        <el-icon :size="20">
            <Menu />
        </el-icon>
       </el-button>
       <!-- 面包屑导航 -->
       <el-breadcrumb separator="/" class="bread">
        <!-- 首页是一定存在的所以直接写死 -->
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item :to="current.path" v-if="current">{{current.label}}</el-breadcrumb-item>
    </el-breadcrumb>
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
import { computed } from 'vue';
import {useStore} from 'vuex'
let store = useStore()

let handleCollapse = ()=> {
  // 调用vuex中的mutations
  store.commit("updateIsCollapse");
}

// 计算属性
const current = computed(()=> {
  return store.state.currentMenu;
})
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
// 样式穿透
// .bread /deep/ span {
//   color: #fff !important;
//   cursor: pointer !important;
// }
:deep(.bread span ){
  color: #fff !important;
  cursor: pointer !important;
}

</style>