<template>
    <div>
        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
            <el-radio-button :label="false">expand</el-radio-button>
            <el-radio-button :label="true">collapse</el-radio-button>
        </el-radio-group>
        <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            :collapse="isCollapse"
            @open="handleOpen"
            @close="handleClose"
        >
            <div v-for="items in data" :key="items.name">
                <el-sub-menu v-if="items.meta.hasChild" :index="items.name">
                    <template #title>
                        <el-icon><component :is="items.meta.icon" /></el-icon>
                        <span> {{ items.name }}</span>
                    </template>
                    <el-menu-item
                        v-for="nav in items.children"
                        :key="nav.name"
                        :index="nav.name"
                        >{{ nav.name }}</el-menu-item
                    >
                </el-sub-menu>

                <el-menu-item v-else :index="items.name">
                    <el-icon><component :is="items.meta.icon" /></el-icon>
                    <span>{{ items.name }}</span>
                </el-menu-item>
            </div>
        </el-menu>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
} from '@element-plus/icons-vue';

const isCollapse = ref(true);
const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath);
};

// 测试
const data = [
    {
        path: '/home',
        name: '首页',
        meta: {
            title: '首页',
            keepAlive: false,
            requireAuth: true,
            index: 2,
            icon: 'House',
            hasChild: true,
        },
        component: () => import('@/pages/home-page.vue'),
        children: [
            {
                path: '/home1',
                name: '首页1',
                meta: {
                    title: '首页1',
                    keepAlive: false,
                    requireAuth: true,
                    index: 21,
                    icon: 'House',
                },
                component: () => import('@/pages/home-page.vue'),
            },
        ],
    },
    {
        path: '/keep',
        name: '健身',
        meta: {
            title: '健身',
            keepAlive: false,
            requireAuth: true,
            index: 5,
            icon: 'Basketball',
        },
        component: () => import('@/pages/keep-page.vue'),
    },
    {
        path: '/life',
        name: '人生',
        meta: {
            title: '人生',
            keepAlive: false,
            requireAuth: true,
            index: 6,
            icon: 'Avatar',
        },
        component: () => import('@/pages/life-page.vue'),
    },
    {
        path: '/douban',
        name: '测试',
        meta: {
            title: '测试',
            keepAlive: false,
            requireAuth: true,
            index: 7,
            icon: 'HelpFilled',
        },
        component: () => import('@/pages/douban-page.vue'),
    },
];
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}
</style>
