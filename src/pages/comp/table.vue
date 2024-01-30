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
        >
            <el-table-column fixed="right" label="Operations" width="180">
                <template #default>
                    <el-button size="small" type="danger" :icon="Delete"
                        >Detail</el-button
                    >
                    <el-button
                        size="small"
                        type="success"
                        :icon="Edit"
                        @click="dialogRef.toggleDialogVisible(true)"
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

        <v-dialog
            ref="dialogRef"
            title="弹窗标题"
            draggable
            :defaut-footer="false"
        >
            <div>弹窗的内容部分</div>

            <template #footer>
                <div>
                    <el-button @click="toggleDialog(false)">取消</el-button>
                    <el-button type="primary" @click="submitEvent">
                        完 成
                    </el-button>
                </div>
            </template>
        </v-dialog>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, Ref } from 'vue';
import { getTableData } from '@/api';
import { captureAsyncErrors } from '@/utils';
import { Delete, Edit } from '@element-plus/icons-vue';
import { TreeExposedMethods } from '@/components/VDialog/src/type';

import vTable from '@/components/VTable';
import vDialog from '@/components/VDialog';

// 弹窗逻辑
const dialogRef: Ref<TreeExposedMethods> = ref(null);
const toggleDialog = (bool?: boolean) => {
    dialogRef.value.toggleDialogVisible(bool);
};
const submitEvent = () => {
    console.log('提交弹窗的事件');
    dialogRef.value.toggleDialogVisible(false);
};

// 表格逻辑
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
    pageSize: 10,
    total: 100,
    pageSizes: [10, 20, 50],
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
    select: '',
});

// 获取数据 data可能是数组对象或者对象
// interface ApiResponse {
//     data: PramasType | PramasType[];
//     code: number;
//     message: string;
// }

const getDataApi = () => captureAsyncErrors(getTableData());
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
