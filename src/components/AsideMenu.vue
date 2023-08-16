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
            <el-menu-item
                v-for="items in renderMenu"
                :key="items.path"
                :index="items.path"
                @click="handleClick(items)"
            >
                <el-icon><component :is="items.meta.icon" /></el-icon>
                <template #title>
                    <span>{{ items.name }}</span>
                </template>
            </el-menu-item>

            <!-- <el-sub-menu index="组件开发">
                <template #title>
                    <el-icon><Calendar /></el-icon>
                    <span>组件开发</span>
                </template>
                <el-menu-item index="人生">
                    <template #title>
                        <el-icon><document /></el-icon>
                        <span>人生</span>
                    </template>
                </el-menu-item>
            </el-sub-menu>

            <el-sub-menu index="功能展示">
                <template #title>
                    <el-icon><Platform /></el-icon>
                    <span>功能展示</span>
                </template>
                <el-menu-item index="404">
                    <template #title>
                        <el-icon><icon-menu /></el-icon>
                        <span>404</span>
                    </template>
                </el-menu-item>
            </el-sub-menu>

            <el-sub-menu index="权限管理">
                <template #title>
                    <el-icon><Platform /></el-icon>
                    <span>权限管理</span>
                </template>
                <el-menu-item index="豆瓣">
                    <template #title>
                        <el-icon><Operation /></el-icon>
                        <span>豆瓣</span>
                    </template>
                </el-menu-item>
            </el-sub-menu> -->
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
const menuStore = useMenuStore();
const { menueWidthState, breadMenu } = storeToRefs(menuStore);
const $router = useRouter();

import {
    HelpFilled,
    Avatar,
    Basketball,
    House,
    WarningFilled,
} from '@element-plus/icons-vue';

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
