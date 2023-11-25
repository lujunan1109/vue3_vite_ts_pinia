<template>
    <div class="container">
        <div class="flex-layout">
            <el-input
                v-model="searchCtx"
                placeholder="请输入搜索内容"
                class="input"
            />
            <el-button type="primary">搜索</el-button>
        </div>
        <el-row>
            <custom-table
                :table-data="tableData"
                :colums="colums"
                border
                stripe
                :default-sort="{ prop: 'date', order: 'descending' }"
            >
                <template #default="{ slotData }">
                    <el-button
                        type="primary"
                        round
                        @click="handleClk(slotData.row)"
                        >点击获取数据</el-button
                    >
                </template>
            </custom-table>
            <test-demo v-model="showDia" :title="diaTitle" @setTitle="setTitle"
                >点击出现弹窗</test-demo
            >
        </el-row>
    </div>
</template>

<script lang="ts" setup>
const searchCtx = ref('');

// 弹窗组件逻辑
const showDia = ref(false);
const diaTitle = ref('旧的弹窗标题');
const setTitle = () => {
    diaTitle.value = '新的弹窗标题';
};
const tableData = reactive([
    {
        date: '2016-05-03',
        name: 'Tom3',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-02',
        name: 'Tom2',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-04',
        name: 'Tom4',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom1',
        address: 'No. 189, Grove St, Los Angeles',
    },
]);

const colums = reactive([
    {
        prop: 'date',
        label: 'Date',
        sortable: true,
    },
    {
        prop: 'name',
        label: 'Name',
    },
    {
        prop: 'address',
        label: 'Address',
    },
    {
        prop: 'operate',
        label: 'Operate',
        width: '220px',
        slot: true,
    },
]);

const handleClk = (data) => {
    console.log(data);
};
</script>

<style scoped lang="scss">
.container {
    padding: 15px;
    .flex-layout {
        display: flex;
        padding-bottom: 20px;
        .input {
            width: 200px;
        }
    }
}
</style>
