<template>
    <el-row class="mb-4">
        <el-button>Default</el-button>
        <el-button type="primary">Primary</el-button>
    </el-row>

    <el-row class="mb-4">
        <el-button plain>&reg;Plain</el-button>
        <el-button type="primary" plain>&times;Primary</el-button>
    </el-row>

    <el-row class="mb-4">
        <el-button round>Round</el-button>
        <el-button type="primary" round>Primary</el-button>
    </el-row>

    <el-row>
        <el-button :icon="Search" circle />
        <el-button type="primary" :icon="Edit" circle />
    </el-row>

    <el-row>
        <custom-table
            :table-data="tableData"
            :colums="colums"
            border
            stripe
            :default-sort="{ prop: 'date', order: 'descending' }"
        >
            <template #default="{ slotData }">
                <el-button type="primary" round @click="handleClk(slotData.row)"
                    >点击获取数据</el-button
                >
            </template>
        </custom-table>
    </el-row>
</template>

<script lang="ts" setup>
import { Search, Edit } from '@element-plus/icons-vue';

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
