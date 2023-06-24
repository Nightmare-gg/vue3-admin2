
<template>
    <el-aside :width="$store.state.isCollapse ? '180px' : '64px'">
        <el-menu
        class="el-menu-vertical-demo" 
        background-color="#545c64"
        :collapse="!$store.state.isCollapse"
        :collapse-transition="false">
        <h3 v-show="$store.state.isCollapse">后台管理</h3>
        <h3 v-show="!$store.state.isCollapse">后台</h3>
        <el-menu-item
        :index="item.path"
        v-for="item in noChildren()"
        :key="item.path"
        @click="clickMenu(item)">
          <component class="icons" :is="item.icon"></component>
          <span>{{item.label}}</span>
        </el-menu-item>
        <el-sub-menu 
        :index="item.label"
        v-for="item in hasChildren()"
        :key="item.path"
       >
          <template #title>
            <component class="icons" :is="item.icon"></component>
          <span>{{item.label}}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
            v-for="(subItem,subIndex) in item.children"
            :index="subItem.path"
            :key="subIndex"
            @click="clickMenu(subItem)"
            ><component class="icons" :is="subItem.icon"></component>
          <span>{{subItem.label}}</span>
        </el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
      </el-menu>
    </el-aside>
</template>

<script setup>
import { useRouter } from 'vue-router';
import {useStore} from 'vuex'
const router = useRouter()
    const store = useStore()
    const asyncList = store.state.menu;
    const list = [
    // {
    //       path: '/',
    //       name: 'home',
    //       label: '首页',
    //       icon: 's-home',
    //       url: 'Home/Home'
    //     },
        // {
        //   path: '/mall',
        //   name: 'mall',
        //   label: '商品管理',
        //   icon: 'video-play',
        //   url: 'MallManage/MallManage'
        // },
        {
          path: '/user',
          name: 'user',
          label: '用户管理',
          icon: 'user',
          url: 'UserManage/UserManage'
        },
        {
          label: '其他',
          icon: 'location',
          path: '/other',
          children: [
            {
              path: '/page1',
              name: 'page1',
              label: '页面1',
              icon: 'setting',
              url: 'Other/PageOne'
            },
            {
              path: '/page2',
              name: 'page2',
              label: '页面2',
              icon: 'setting',
              url: 'Other/PageTwo'
            }
          ]
        }
    ];
    const noChildren = ()=> {
        return asyncList.filter((item)=> !item.children);
    }
    const hasChildren = ()=> {
        return asyncList.filter((item)=> item.children);
    }

    // 点击左侧菜单
    const clickMenu =(item)=> {
      router.push({
        name: item.name,
      });
      // vuex来管理
      store.commit("selectMenu",item)
    }

</script>

<style scoped lang="less">
.icons {
    width: 18px;
    height: 18px;
}

.el-menu {
  border-right: 0;
  h3 {
    color: #fff;
    line-height: 48px;
    text-align: center;
  }
}

</style>