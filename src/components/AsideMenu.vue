<template>
    <div class="slider-wrap">
        <el-menu
            :collapse="menueWidthState"
            active-text-color="#359ef3"
            background-color="#304156"
            class="el-menu-vertical-demo"
            default-active="/home"
            text-color="#fff"
            @select="handleClick"
        >
            <el-menu-item index="/home">
                <el-icon><House /></el-icon>
                <template #title>
                    <span>首页</span>
                </template>
            </el-menu-item>

            <el-sub-menu index="2">
                <template #title>
                    <el-icon><Calendar /></el-icon>
                    <span>组件开发</span>
                </template>
                <el-menu-item index="/life">
                    <template #title>
                        <el-icon><document /></el-icon>
                        <span>人生</span>
                    </template>
                </el-menu-item>
            </el-sub-menu>

            <el-sub-menu index="3">
                <template #title>
                    <el-icon><Platform /></el-icon>
                    <span>功能展示</span>
                </template>
                <el-menu-item index="/404">
                    <template #title>
                        <el-icon><icon-menu /></el-icon>
                        <span>404</span>
                    </template>
                </el-menu-item>
            </el-sub-menu>

            <el-sub-menu index="4">
                <template #title>
                    <el-icon><Operation /></el-icon>
                    <span>测试菜单</span>
                </template>
                <el-menu-item-group>
                    <template #title><span>Group One</span></template>
                    <el-menu-item index="1-1">item one</el-menu-item>
                    <el-menu-item index="1-2">item two</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="Group Two">
                    <el-menu-item index="1-3">item three</el-menu-item>
                </el-menu-item-group>
                <el-sub-menu index="1-4">
                    <template #title><span>item four</span></template>
                    <el-menu-item index="1-4-1">item one</el-menu-item>
                </el-sub-menu>
            </el-sub-menu>
        </el-menu>
    </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { useMenuStore } from '@/store/menu';
import { storeToRefs } from 'pinia';
const menuStore = useMenuStore();
const { menueWidthState } = storeToRefs(menuStore);
const $router = useRouter();

import { Location, Menu as IconMenu } from '@element-plus/icons-vue';

const handleClick = (path: string, keyPath: string[]) => {
    console.log(typeof path, keyPath);
    $router.push({ path });
};
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 100vh;
}
</style>
