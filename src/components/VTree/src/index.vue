<template>
    <el-tree
        ref="treeRef"
        v-bind="$attrs"
        :data="treeData"
        :show-checkbox="showCheckBox"
        :node-key="nodeKey"
        :default-checked-keys="defaultKeys"
        :props="defaultProps"
    />
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { TreeDataType, DefaultPropsType } from './type';

withDefaults(
    defineProps<{
        nodeKey: string;
        showCheckBox: boolean;
        treeData: TreeDataType[];
        defaultKeys: number[];
        defaultProps: DefaultPropsType;
    }>(),
    {
        treeData: () => [
            {
                id: 1,
                label: '一级 1',
                children: [
                    {
                        id: 4,
                        label: '二级 1-1',
                    },
                ],
            },
        ],
        defaultKeys: () => [],
        showCheckBox: false,
        defaultProps: () => ({
            children: 'children',
            label: 'label',
        }),
        nodeKey: 'id',
    },
);

// 接收子组件的ref
const treeRef = ref();
const emit = defineEmits(['setTreeRef']);
onMounted(() => {
    emit('setTreeRef', treeRef);
});
</script>
<style lang="scss" scoped></style>
\
