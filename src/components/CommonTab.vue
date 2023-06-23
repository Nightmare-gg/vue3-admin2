<template>
<div class="tags">
    <el-tag 
    :key="tag.name"
    v-for="(tag,index) in tags"
    :closable="tag.name !== 'home'"
    :disable-transitions="false"
    :effect="$route.name === tag.name ? 'dark' : 'plain'"
    @click="changeMenu(tag)"
    >
        {{ tag.label }}
    </el-tag>
</div>
</template>

<script setup>
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'

const store = useStore()
const router = useRouter()
const tags = store.state.tabsList;
// 点击tab实现路由跳转
const changeMenu=(item)=> {
    router.push({name: item.name})
};

</script>
<style scoped lang="less">
.tags {
    padding: 20px;
    width: 100%;
    text-align: left;
    .el-tag {
        margin-right: 15px;
        cursor: pointer;
    }
}
</style>