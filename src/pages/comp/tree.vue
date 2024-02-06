<template>
    <div>
        <h5>常规tree</h5>
        <v-tree :tree-data="treeData"></v-tree>
        <h5>多选树展示</h5>
        <mul-select-tree :data="data" :default-keys="[10]"></mul-select-tree>
    </div>
</template>
<script lang="ts" setup>
import VTree from '@/components/VTree';
import MulSelectTree from '@/components/MulSelectTree';

import { ref, onMounted } from 'vue';
import { captureAsyncErrors } from '@/utils';
import { getTreeData } from '@/api';

type ResultType = [Error | null, ResponseType];

type ResponseType = {
    data: TreeDataType[];
};

type TreeDataType = {
    id: number;
    label: string;
    children?: TreeDataType[];
};

const treeData = ref([]);
onMounted(async () => {
    const [isErr, res]: ResultType = await captureAsyncErrors(getTreeData());
    if (!isErr) {
        treeData.value = res.data;
    }
});

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
</script>
<style scoped lang="scss"></style>
