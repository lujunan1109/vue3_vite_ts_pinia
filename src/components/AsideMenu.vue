<template>
    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" />
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
const $router = useRouter();
interface Tree {
    label: string;
    path: string;
    children?: Tree[];
}

const handleNodeClick = (data: Tree) => {
    console.log(data);
    if (!data.children) {
        $router.push({ path: data.path });
    }
};

const data: Tree[] = [
    {
        label: '首页',
        path: '/home',
    },
    {
        label: '豆瓣',
        path: '/douban',
    },
    {
        label: '人生',
        path: '/life',
    },
];

const defaultProps = {
    children: 'children',
    label: 'label',
};
</script>
