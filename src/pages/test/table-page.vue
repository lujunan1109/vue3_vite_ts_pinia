<template>
    <div class="container">
        <v-table
            :columns="columns"
            border
            stripe
            :default-sort="{ prop: 'date', order: 'descending' }"
            :pagination="pagination"
            :request-api="getDataApi"
            :form-options="tableOptions"
            :rule-form="tableForm"
            :fil-attr="{
                labelWidth: '80px',
            }"
            @handle-size-change="(val) => (pagination.pageSize = val)"
            @handle-current-change="(val) => (pagination.currentPage = val)"
        >
            <el-table-column fixed="right" label="Operations" width="180">
                <template #default>
                    <el-button size="small" type="danger" :icon="Delete"
                        >Detail</el-button
                    >
                    <el-button size="small" type="success" :icon="Edit"
                        >Edit</el-button
                    >
                </template>
            </el-table-column>

            <template #btnSlots>
                <div>
                    <el-button icon="Plus" type="primary">新增</el-button>
                    <el-button icon="Delete" type="danger">删除</el-button>
                    <el-button icon="FolderAdd" type="success">导入</el-button>
                </div>
            </template>
        </v-table>
    </div>
</template>

<script lang="ts" setup>
import vTable from '@/components/VTable';
import { getTableData } from '@/api';
import { captureAsyncErrors } from '@/utils';
import { Delete, Edit } from '@element-plus/icons-vue';

const columns = [
    {
        label: '日期',
        prop: 'date',
        sortable: true,
    },
    {
        label: '姓名',
        prop: 'name',
    },
    {
        label: '地址',
        prop: 'address',
    },
];

const pagination = reactive({
    layout: 'total, sizes, prev, pager, next, jumper',
    currentPage: 1,
    pageSize: 100,
    total: 10000,
    pageSizes: [100, 200, 500],
});

const tableOptions = [
    {
        label: '输入框',
        prop: 'name',
        componentName: 'el-input',
    },
    {
        label: '下拉框',
        prop: 'select',
        componentName: 'el-select',
        childName: 'el-option',
        attrs: {
            clearable: true,
            placeholder: '请选择',
        },
        children: [
            {
                label: '选项1',
                value: '1',
            },
            {
                label: '选项2',
                value: '2',
            },
        ],
    },
];
const tableForm = reactive({
    name: '',
    name1: '',
    name2: '',
    name3: '',
    select: '',
});

// 获取数据 data可能是数组对象或者对象
// interface ApiResponse {
//     data: PramasType | PramasType[];
//     code: number;
//     message: string;
// }

const getDataApi = () => captureAsyncErrors(getTableData);
</script>

<style scoped lang="scss">
.container {
    padding: 30px 15px 15px;

    .flex-layout {
        display: flex;
        padding-bottom: 20px;

        .input {
            width: 200px;
        }
    }
}
</style>
