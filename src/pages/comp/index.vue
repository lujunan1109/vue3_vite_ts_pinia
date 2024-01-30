<template>
    <router-view v-slot="{ Component }" :key="routerPath">
        <Transition name="slide-right">
            <component :is="Component"></component>
        </Transition>
    </router-view>
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
