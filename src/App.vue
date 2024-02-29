<!--
 * @Description: SPA
 * @Author: lujunan
 * @Date: 2022-06-07 09:08:28
 * @LastEditors: lujunan
 * @LastEditTime: 2024-02-06 22:08:13
-->

<template>
    <div v-if="isRouterAlive" id="resetBox">
        <router-view v-slot="{ Component }">
            <component :is="Component" />
        </router-view>
    </div>
</template>

<script lang="ts" setup module="es2017">
import { ref } from 'vue';

// 重载页面
const isRouterAlive = ref(true);
const reloadPage = () => {
    isRouterAlive.value = false;
    nextTick(() => {
        isRouterAlive.value = true;
    });
};
provide('reloadPage', reloadPage);
</script>

<style>
#resetBox {
    width: 100%;
    height: 100vh;
    /* overflow: hidden; */
}
</style>
