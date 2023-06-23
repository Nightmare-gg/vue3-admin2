<template>
    <!-- 搜索框 -->
    <div class="user-header">
        <el-button type="primary">+新增</el-button>
        <el-form :inline="true" :model="formInline">
            <el-form-item label="请输入">
                <el-input v-model="formInline.keyword" placeholder="请输入用户名"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSearch">搜索</el-button>
            </el-form-item>
        </el-form>
    </div>
    <!-- 用户数据展示 -->
<div class="table">
    <el-table :data="list" style="width: 100%" height="500px">
        <el-table-column 
        v-for="item in tableLabel"
        :key="item.prop"
        :label="item.label"
        :prop="item.prop"
        :width="item.width ? item.width : 125"
        />

        <el-table-column fixed="right" label="操作" min-width="180">
      <template #default>
        <el-button size="small"
          >编辑</el-button
        >
        <el-button  type="danger" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    small
    background
    layout="prev, pager, next"
    :total="config.total"
    class="mt-4 page"
    @current-change="changePage"
  />
</div>
</template>

<script setup>
import { getCurrentInstance,onMounted, reactive,ref } from 'vue';

const {proxy} = getCurrentInstance()
const list = ref([])
// 表头字段
const tableLabel = reactive([
    {
        prop: "name",
        label: "姓名",
    },
    {
        prop: "age",
        label: "年龄",
    },
    {
        prop: "sexLabel",
        label: "性别",
    },
    {
        prop: "birth",
        label: "出生日期",
        width: 200,
    },
    {
        prop: "addr",
        label: "地址",
        width: 320,
    },
]);
const config = reactive({
    total: 0,
    page: 1,
    name: '',
});
const formInline = reactive({
    keyword: "",
})
const getUserData = async (config)=> {
    let res = await proxy.$api.getUserData(config);
    config.total = res.count
    list.value = res.list.map((item)=> {
        item.sexLabel = item.sex === 0 ? "女" : "男";
        return item;
    });
};
// 点击分页切换数据
const changePage = (page)=> {
    config.page=page;
    getUserData(config)
}
// 搜索框功能的实现
const handleSearch = ()=> {
  config.name = formInline.keyword;
  getUserData(config)
}

onMounted(()=> {
    getUserData(config);
})
</script>
<style scoped lang="less">
.table {
    position: relative;
    height: 520px;
    .page {
        position: absolute;
        right: 0;
        bottom: -20px;
    }
}

.user-header {
    display: flex;
    justify-content: space-between;
}
</style>