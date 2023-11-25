<template>
    <div class="container">
        <el-tree
            ref="treeRef"
            :data="data"
            show-checkbox
            default-expand-all
            node-key="id"
            :default-checked-keys="[5]"
            :props="defaultProps"
            @check-change="checkChange"
        >
            <template #default="{ node, data }">
                <span v-if="data.children">
                    <el-icon><Folder /></el-icon>
                </span>
                <span v-else>
                    <el-icon><Tickets /></el-icon>
                </span>
                <span class="custom-tree-node">
                    <span>{{ node.label }}</span>
                </span>
            </template>
        </el-tree>
    </div>
</template>
<script lang="ts" setup>
const defaultProps = {
    children: 'children',
    label: 'label',
};
const data = [
    {
        id: 1,
        label: 'Level one 1',
        children: [
            {
                id: 4,
                label: 'Level two 1-1',
                children: [
                    {
                        id: 9,
                        label: 'Level three 1-1-1',
                    },
                    {
                        id: 10,
                        label: 'Level three 1-1-2',
                    },
                ],
            },
        ],
    },
    {
        id: 2,
        label: 'Level one 2',
        children: [
            {
                id: 5,
                label: 'Level two 2-1',
            },
            {
                id: 6,
                label: 'Level two 2-2',
            },
        ],
    },
    {
        id: 3,
        label: 'Level one 3',
        children: [
            {
                id: 7,
                label: 'Level two 3-1',
            },
            {
                id: 8,
                label: 'Level two 3-2',
            },
        ],
    },
];
const treeRef = ref();
const checkChange = (e) => {
    console.log(e, '复选框点击后');
};

// onMounted(() => {
//     // 获取选中的权限数据
//     console.log(treeRef.value.getCheckedKeys(), 'treeRef.getCheckedKeys()');
// });
</script>
<style scoped lang="scss">
.container {
    padding: 20px;
}
</style>
