<!--
 * @Description: 404页面
 * @Author: lujunan
 * @Date: 2022-06-12 14:26:30
 * @LastEditors: lujunan
 * @LastEditTime: 2023-08-07 20:25:00
-->

<template>
    <img :src="notFound" alt="404" />
    >
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import imgUrl from '@/assets/404.png';
const notFound = ref(imgUrl);
</script>

<style lang="scss" scoped>
img {
    width: 100vw;
    height: 100vh;
    object-fit: cover;
}
</style>
