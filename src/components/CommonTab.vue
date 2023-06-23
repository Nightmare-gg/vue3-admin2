<template>
<div class="tags">
    <el-tag 
    :key="tag.name"
    v-for="(tag,index) in tags"
    :closable="tag.name !== 'home'"
    :disable-transitions="false"
    :effect="$route.name === tag.name ? 'dark' : 'plain'"
    @click="changeMenu(tag)"
    @close="handleClose(tag,index)"
    >
        {{ tag.label }}
    </el-tag>
</div>
</template>

<script setup>
import {useStore} from 'vuex'
import {useRouter,useRoute} from 'vue-router'

const store = useStore()
// 路由实例对象
const router = useRouter()
// 路由信息对象
const route = useRoute()
const tags = store.state.tabsList;
// 点击tab实现路由跳转
const changeMenu=(item)=> {
    router.push({name: item.name})
};
// 关闭标签
const handleClose =(tag,index)=> {
    let length = tags.length - 1;
    // 处理vuex中的tabslist
    store.commit('closeTab',tag);
    // 做第一个判断
    if(tag.name!== route.name) {
        return;
    }
// 如果关闭的标签是最后一个，那么路由调整到他前面那个标签
    if(index === length) {
        router.push({
            name: tags[index - 1].name,
        });
    }else {
        // 如果关闭的不是最后一个，跳转到它的后一个标签
        router.push({
            name: tags[index].name,
        });
    }
}

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