<!--
 * @Description: SPA
 * @Author: lujunan
 * @Date: 2022-06-07 09:08:28
 * @LastEditors: lujunan
 * @LastEditTime: 2024-02-06 20:16:02
-->

<template>
    <div v-if="isRouterAlive" id="resetBox">
        <router-view v-slot="{ Component }">
            <component :is="Component" />
        </router-view>
    </div>
</template>

<script lang="ts" setup module="es2017">
import { ref, onMounted } from 'vue';
import autofit from 'autofit.js';

// 重载页面
const isRouterAlive = ref(true);
const reloadPage = () => {
    isRouterAlive.value = false;
    nextTick(() => {
        isRouterAlive.value = true;
    });
};

// 利用autofit进行全屏的一个缩放的效果 https://juejin.cn/post/7231089453694009404#heading-5

provide('reloadPage', reloadPage);
</script>

<style>
#resetBox {
    width: 100%;
    height: 100vh;
    overflow: hidden;
}
</style>
