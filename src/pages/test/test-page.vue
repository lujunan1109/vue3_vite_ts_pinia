<template>
    <div>
        <Transition name="slide-right">
            <router-view :key="routerPath"></router-view>
        </Transition>
    </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
const $route = useRouter();
const routerPath = $route.currentRoute.value.path;
</script>
<style scoped lang="scss">
// 切换动画效果
@import '@/assets/transition.scss';
</style>
