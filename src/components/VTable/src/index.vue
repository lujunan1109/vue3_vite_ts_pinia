<template>
    <div v-if="formOptions" class="filter-block">
        <VForm
            :form-options="formOptions"
            :rule-form="ruleForm"
            v-bind="formAttrs"
            @set-ref="(el) => (ruleFormRef = el)"
        >
            <template #footer="{ model }">
                <div style="padding-left: 20px">
                    <slot name="btnHead" :model="model">
                        <el-button
                            type="primary"
                            icon="Search"
                            @click="search(model)"
                            >搜索</el-button
                        >
                        <el-button icon="Refresh" @click="reset"
                            >重置</el-button
                        >
                    </slot>
                </div>
            </template>

            <template #childSlot="{ label }">
                {{ label }}
            </template>
        </VForm>
    </div>

    <div class="table-content">
        <div class="btn-operate__container">
            <slot name="btnSlots"></slot>
        </div>

        <!-- 表格 -->
        <el-table :data="data" style="width: 100%" v-bind="$attrs">
            <!-- 多选框使用 -->
            <slot name="selection"></slot>
            <el-table-column
                v-for="item in columns"
                :key="item.label"
                :prop="item.prop"
                :label="item.label"
                :width="item.width"
                :sortable="item.sortable"
                :formatter="item.formatter ? item.formatter : filterCellVal"
            />
            <!-- 操作模块 -->
            <slot></slot>
        </el-table>
        <el-pagination
            class="mt-20"
            background
            small
            :layout="pagination.layout"
            :total="pagination.total"
            :current-page="pagination.currentPage"
            :page-size="pagination.pageSize"
            :page-sizes="pagination.pageSizes"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
        />
    </div>
</template>
<script setup lang="ts">
import {
    TableItemType,
    ColumnsType,
    PaginationType,
    MyFunction,
    FilAttrType,
} from './type';
import VForm from '../../VForm/src/index.vue';
import { RuleForm, FormOptionType } from '../../VForm/src/type';
import type { FormInstance } from 'element-plus';

const props = withDefaults(
    defineProps<{
        columns: ColumnsType[];
        pagination: PaginationType;
        requestApi: MyFunction;
        formOptions: FormOptionType[];
        ruleForm: RuleForm;
        formAttrs?: FilAttrType;
    }>(),
    {},
);

const data = ref<TableItemType[]>();

const filterCellVal = (_row: any, _column: any, cellValue: any) => {
    return cellValue;
};

// const emit = defineEmits(['handleCurrentChange', 'handleSizeChange']);
const tableProps = computed(() => props.pagination);
const handleCurrentChange = (val: number) => {
    // emit('handleCurrentChange', val);
    tableProps.value.currentPage = val;
    getTableData();
};

const handleSizeChange = (val: number) => {
    tableProps.value.pageSize = val;
    // emit('handleSizeChange', val);
    getTableData();
};

const getTableData = (model = props.ruleForm) => {
    const params = Object.assign({}, model, {
        pageNum: tableProps.value.currentPage,
        pageSize: tableProps.value.pageSize,
    });
    console.log(params, '请求参数');
    props
        .requestApi(params)
        .then((res: TableItemType[]) => {
            const [isErr, tableData] = res;
            if (!isErr) {
                console.log(tableData.data, '请求返回的数据');
                data.value = tableData.data;
            }
        })
        .catch((err: Error) => {
            console.log('Error: ', err);
        });
};

// 初始化渲染
getTableData();

let ruleFormRef = ref<FormInstance>();

const search = async (model) => {
    if (!ruleFormRef.value) return;
    await ruleFormRef.value.validate((valid) => {
        if (valid) {
            getTableData(model);
        }
    });
};

const reset = () => {
    if (!ruleFormRef.value) return;
    ruleFormRef.value.resetFields();
};

// 自定义暴露给父组件调用方法/属性
defineExpose({
    getTableData,
    search,
    reset,
});
</script>
<style lang="scss" scoped>
.mt-20 {
    margin-top: 20px;
    justify-content: center;
}

.filter-block .el-form {
    display: flex;
    flex-wrap: wrap;
    background-color: var(--el-bg-color-overlay);
    border: 1px solid var(--el-border-color-light);
    border-radius: 4px;
    box-shadow: var(--el-box-shadow-light);
    padding: 18px 0 0 10px;
    margin-bottom: 10px;
}

.table-content {
    background-color: var(--el-bg-color-overlay);
    border: 1px solid var(--el-border-color-light);
    border-radius: 4px;
    box-shadow: var(--el-box-shadow-light);
    padding: 18px 0 20px 10px;
    & .btn-operate__container {
        margin-bottom: 20px;
    }
}
</style>
