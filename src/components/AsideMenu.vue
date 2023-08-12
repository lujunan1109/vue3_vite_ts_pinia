<template>
    <div>
        <el-menu
            :collapse="menueWidthState"
            active-text-color="#ffd04b"
            background-color="#545c64"
            class="el-menu-vertical-demo"
            default-active="/home"
            text-color="#fff"
            @select="handleClick"
        >
            <el-sub-menu index="1">
                <template #title>
                    <el-icon><location /></el-icon>
                    <span>Navigator One</span>
                </template>
                <el-menu-item index="/home">
                    <template #title>
                        <el-icon><location /></el-icon>
                        <span>首页</span>
                    </template>
                </el-menu-item>
            </el-sub-menu>

            <el-sub-menu index="2">
                <template #title>
                    <el-icon><location /></el-icon>
                    <span>Navigator One</span>
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
                    <el-icon><location /></el-icon>
                    <span>Navigator One</span>
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
                    <el-icon><location /></el-icon>
                    <span>Navigator One</span>
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
    min-height: 400px;
}
</style>
