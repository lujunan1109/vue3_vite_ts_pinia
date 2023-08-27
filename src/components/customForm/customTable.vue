<template>
    <el-table :data="tableData" style="width: 100%">
        <el-table-column
            v-for="(items, k) in colums"
            :key="k"
            :prop="items"
            :label="items"
        />
        <el-table-column fixed="right" label="Operate" width="120">
            <template #default="scope">
                <slot :slot-data="scope"></slot>
            </template>
        </el-table-column>
    </el-table>
</template>

<script lang="ts" setup>
type TabData = Array<object>;
type Columns = Array<string>;

defineProps<{ tableData: TabData; colums: Columns }>();
</script>

<!-- https://blog.csdn.net/weixin_45291937/article/details/125523244  可以学习很多小知识-->
