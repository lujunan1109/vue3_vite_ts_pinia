<!--
 * @Description: 切换主题
 * @Author: lujunan
 * @Date: 2023-11-26 20:31:00
 * @LastEditors: lujunan
 * @LastEditTime: 2023-11-26 20:46:07
-->
<template>
    <div style="padding: 20px">
        <el-button :icon="!isDark ? Sunny : Moon" @click="toggleDark()">
            <i inline-block align-middle i="dark:carbon-moon carbon-sun" />

            {{ isDark ? 'Dark' : 'Light' }}
        </el-button>
    </div>
</template>
<script setup lang="ts">
import { Sunny, Moon } from '@element-plus/icons-vue';
import { useDark, useToggle } from '@vueuse/core';
const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>
