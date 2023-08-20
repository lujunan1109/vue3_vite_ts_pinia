<!--
 * @Description: SPA
 * @Author: lujunan
 * @Date: 2022-06-07 09:08:28
 * @LastEditors: lujunan
 * @LastEditTime: 2023-08-20 18:29:36
-->

<template>
    <div v-if="isRouterAlive"><router-view /></div>
</template>

<script lang="ts" setup>
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
