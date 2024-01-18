<!--
 * @Description: SPA
 * @Author: lujunan
 * @Date: 2022-06-07 09:08:28
 * @LastEditors: lujunan
 * @LastEditTime: 2023-11-25 19:45:34
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
onMounted(() => {
    autofit.init({
        el: '#app',
        dh: 937,
        dw: 1920,
        resize: true,
        ignore: [],
        transition: 0,
        delay: 0,
    });
});

provide('reloadPage', reloadPage);
</script>

<style>
#resetBox {
    width: 100%;
    height: 100%;
}
</style>
