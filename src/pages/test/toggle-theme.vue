<!--
 * @Description: 切换主题
 * @Author: lujunan
 * @Date: 2023-11-26 20:31:00
 * @LastEditors: lujunan
 * @LastEditTime: 2023-12-03 21:34:38
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
const isDark = useDark();
const toggleDark = useToggle(isDark);
console.log(isDark.value);
// 切换html的data-theme用于测试scss主题切换
watch(isDark, () => {
    document
        .querySelector('html')
        .setAttribute('data-theme', isDark.value ? 'dark' : 'light');
});
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
