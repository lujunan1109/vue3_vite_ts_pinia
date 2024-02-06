<!--
 * @Description: 切换主题
 * @Author: lujunan
 * @Date: 2023-11-26 20:31:00
 * @LastEditors: lujunan
 * @LastEditTime: 2024-02-06 20:58:39
-->
<template>
    <div style="padding: 20px">
        <el-button :icon="!isDark ? Sunny : Moon" @click="toggleDark()">
            <i inline-block align-middle i="dark:carbon-moon carbon-sun" />

            {{ isDark ? 'Dark' : 'Light' }}
        </el-button>
        <!-- 原生内容，scss控制样式颜色 -->
        <div class="origin">scss控制样式颜色</div>
        <div class="var">css变量控制颜色</div>
    </div>
</template>
<script setup lang="ts">
import { Sunny, Moon } from '@element-plus/icons-vue';
import { useDark, useToggle } from '@vueuse/core';
import { useGlobalStore } from '@/store/global';
// import {storeToRefs} from 'pinia';

const globalStore = useGlobalStore();

const isDark = useDark();
const toggleDark = useToggle(isDark);

// 切换html的data-theme用于测试scss主题切换
watch(
    isDark,
    () => {
        globalStore.setTheme(isDark.value ? 'dark' : 'light');
    },
    {
        immediate: true,
    },
);
</script>

<style lang="scss">
.origin {
    padding-top: 40px;
    @include useTheme('color', $subtitle-color);
}
.var {
    color: var(--v-color);
    text-decoration: underline;
    text-decoration-style: wavy;
}
</style>
