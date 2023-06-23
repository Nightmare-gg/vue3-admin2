<template>
    <!-- 搜索框 -->
    <div class="user-header">
        <el-button type="primary" @click="handleAdd">+新增</el-button>
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
      <template #default="scope">
        <el-button size="small"
        @click="handleEdit(scope.row)"
          >编辑</el-button>
        <el-button  type="danger" size="small" 
        @click="handleDelete(scope.row)"
        >删除</el-button>
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
<!-- 新增用户对话框 -->
<el-dialog
    v-model="dialogVisible"
    :title="(action == 'add' ) ? '新增用户' : '编辑用户'"
    width="35%"
    :before-close="handleClose"
  >
  <el-form :inline="true" :model="formUser" ref="userForm" >
    <el-row>
        <el-col :span="12">
            <el-form-item 
            label="姓名"
             prop="name"
             :rules="[
                {required: true,message: '请输入姓名'}
             ]">
      <el-input v-model="formUser.name" placeholder="请输入姓名"/>
    </el-form-item>
        </el-col>

        <el-col :span="12">
            <el-form-item 
            label="年龄" 
            prop="age"
            :rules="[
                {required:true,message:'请输入年龄'},
                {type:'number',message:'年龄必须为数字'}
            ]">
            <!-- 将age变为数字类型 -->
      <el-input v-model.number="formUser.age" placeholder="请输入年龄"/>
    </el-form-item>
        </el-col>
    </el-row>

    <el-row>
        <el-col :span="12">
            <el-form-item label="性别" prop="sex" :rules="[
                {required: true,message: '请选择性别'}
             ]">
                <el-select v-model="formUser.sex" placeholder="请选择性别">
        <el-option label="男" value="0" />
        <el-option label="女" value="1" />
      </el-select>
    </el-form-item>
        </el-col>

        <el-col :span="12">
            <el-form-item label="出生日期" prop="birth" :rules="[
                {required: true,message: '请输入出生日期'}
             ]">
                <el-date-picker
            v-model="formUser.birth"
            type="date"
            label="出生日期"
            placeholder="请输入"
            style="width: 100%"
          />
    </el-form-item>
        </el-col>
    </el-row>
    <el-row>
        <el-form-item label="地址" prop="addr" :rules="[
                {required: true,message: '请输入地址'}
             ]">
      <el-input v-model="formUser.addr" placeholder="请输入地址"/>
    </el-form-item>
    </el-row>
    
   <el-row style="justify-content: flex-end">
    <el-form-item>
      <el-button type="primary" @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="onSubmit">确定</el-button>
    </el-form-item>
   </el-row>
  </el-form>
  

    <!-- <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false">
         确定
        </el-button>
      </span>
    </template> -->
  </el-dialog>
</template>

<script setup>
import { getCurrentInstance,onMounted, reactive,ref } from 'vue';

const {proxy} = getCurrentInstance()
const list = ref([])
// 控制添加用户框的显示隐藏
const dialogVisible = ref(false)
const handleClose = (done) => {
  ElMessageBox.confirm('确定要关闭对话框吗?')
    .then(() => {
        proxy.$refs.userForm.resetFields();
        done()
    })
    .catch(() => {
      // catch error
    })
}
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
// 添加用户的form 数据
const formUser = reactive({
    // 添加用户的 用户名
    name: "",
    age: "",
    sex: "",
    birth: "",
    addr: ""
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
// 格式化日期
const timeFormat = (time) => {
    var time = new Date(time);
    var year = time.getFullYear();
    var month = time.getMonth()+1;
    var date = time.getDate();
    function add(m) {
        return m < 10 ? "0"+ m : m;
    }
    return year + "-" + add(month) + "-" + add(date);
}

// 添加用户
const onSubmit = ()=> {
    proxy.$refs.userForm.validate(async (valid) => {
        if(valid) {
           if(action.value=="add") {
            formUser.birth = timeFormat(formUser.birth)
            let res = await proxy.$api.addUser(formUser);
            // console.log(res);
            // 1.添加成功 -》清空输入框，退出添加页面，重新调用获取新数据
             if(res) {
             dialogVisible.value = false;
             // 添加prop属性才生效
            proxy.$refs.userForm.resetFields();
            getUserData(config);
           }
    }else {
        // 编辑的接口
        formUser.sex =="男" ? (formUser.sex=1) : (formUser.sex = 0);
        let res = await proxy.$api.editUser(formUser);
        if(res) {
            dialogVisible.value = false;
            proxy.$refs.userForm.resetFields();
            getUserData(config)
        }
    }
        }else {
            ElMessage({
                showClose: true,
                message: "请输入正确的内容",
                type: "error"
            })
        }
    });
}
// 点击取消时 关闭对话框，清空表单
const handleCancel = ()=> {
    dialogVisible.value = false;
        // 添加prop属性才生效
    proxy.$refs.userForm.resetFields();
}
// 区分编辑和新增
const action = ref("add")
// 编辑用户
const handleEdit = (row)=> {
    // 浅拷贝
    action.value="edit";
    dialogVisible.value=true;
    row.sex == 1 ? (row.sex="男") : (row.sex="女");
    proxy.$nextTick(()=> {
        Object.assign(formUser,row);
    });
};
// 新增用户
const handleAdd = ()=> {
    action.value="add";
    dialogVisible.value=true;
}
// 删除用户
const handleDelete = (row)=> {
    ElMessageBox.confirm('确定要删除吗?')
    .then(async () => {
        await proxy.$api.deleteUser({
            id: row.id,
        });
        ElMessage({
            showClose: true,
            message: "删除成功！",
            type: "success",
        });
        getUserData(config);
    })
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