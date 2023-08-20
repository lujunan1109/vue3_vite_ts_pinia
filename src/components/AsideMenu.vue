<template>
    <div class="slider-wrap">
        <el-menu
            :collapse="menueWidthState"
            active-text-color="#359ef3"
            background-color="#304156"
            class="el-menu-vertical-demo"
            default-active="/home"
            text-color="#fff"
        >
            <div v-for="items in renderMenu" :key="items.name">
                <el-sub-menu v-show="items.children" :index="items.path">
                    <template #title>
                        <el-icon><component :is="items.meta.icon" /></el-icon>
                        <span v-show="!menueWidthState"> {{ items.name }}</span>
                    </template>
                    <el-menu-item
                        v-for="nav in items.children"
                        :key="nav.name"
                        :index="nav.path"
                        @click="handleClick(nav)"
                    >
                        <el-icon><component :is="items.meta.icon" /></el-icon>
                        <span> {{ nav.name }}</span>
                    </el-menu-item>
                </el-sub-menu>

                <el-menu-item
                    v-show="!items.children"
                    :index="items.path"
                    @click="handleClick(items)"
                >
                    <el-icon><component :is="items.meta.icon" /></el-icon>
                    <template #title>
                        <span>{{ items.name }}</span>
                    </template>
                </el-menu-item>
            </div>
        </el-menu>
    </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { useMenuStore } from '@/store/menu';
import { storeToRefs } from 'pinia';
import { routes } from '@/router';
console.log(routes, 'routes');

const renderMenu = routes[1].children;
console.log(renderMenu, 'renderMenu');

const menuStore = useMenuStore();
const { menueWidthState, breadMenu } = storeToRefs(menuStore);
const $router = useRouter();

// import {
//     HelpFilled,
//     Avatar,
//     Basketball,
//     House,
//     WarningFilled,
// } from '@element-plus/icons-vue';

import { RouteRecordRaw } from 'vue-router';

const handleClick = (node: RouteRecordRaw) => {
    // 利用这里的点击事件keyPath 给到全局变量然后处理面包屑即可
    console.log(node);
    breadMenu.value = {
        path: node.path,
        label: node.name as string,
    };
    $router.push({ path: node.path });
};
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 100vh;
}
</style>
