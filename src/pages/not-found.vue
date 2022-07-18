<!--
 * @Description: 404页面
 * @Author: lujunan
 * @Date: 2022-06-12 14:26:30
 * @LastEditors: lujunan
 * @LastEditTime: 2022-06-12 15:24:17
-->

<template>
    <img :src="notFound" alt="404" />
    <el-button type="primary" class="go-back" @click="goBackHome"
        >返回登录页</el-button
    >
</template>

<script lang="ts" setup>
import imgUrl from '@/assets/404.png';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const notFound = ref(imgUrl);

const goBackHome = () => {
    router.push({ path: '/', query: { user: '123' } });
    // router.push({ name: 'Index', params: { id: 123 } }); --> path不可以和params一起用
};
</script>

<style lang="scss" scoped>
// @import "xxx";
// @import url(xxx);
img {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    // object-fit: cover;
}

.go-back {
    position: absolute;
    left: 60%;
    top: 78%;
}
</style>
