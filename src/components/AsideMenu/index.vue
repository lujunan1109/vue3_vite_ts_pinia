<template>
    <el-menu
        :collapse="menueWidthState"
        class="el-menu-vertical-demo"
        default-active="/home"
    >
        <div v-for="(items, key) in renderMenu" :key="key">
            <el-sub-menu v-show="items.children" :index="items.path">
                <template #title>
                    <el-icon class="icon"
                        ><component :is="items.meta.icon"
                    /></el-icon>
                    <span v-show="!menueWidthState" class="nav-title">
                        {{ t(`Menu.${String(items.name)}`) }}</span
                    >
                </template>
                <el-menu-item
                    v-for="nav in items.children"
                    :key="nav.name"
                    :index="nav.path"
                    @click="handleClick(nav)"
                >
                    <el-icon class="icon"
                        ><component :is="nav.meta.icon"
                    /></el-icon>
                    <span class="nav-title">
                        {{ t(`Menu.${String(nav.name)}`) }}</span
                    >
                </el-menu-item>
            </el-sub-menu>

            <el-menu-item
                v-show="!items.children"
                :index="items.path"
                @click="handleClick(items)"
            >
                <el-icon class="icon"
                    ><component :is="items.meta.icon"
                /></el-icon>
                <template #title>
                    <span class="nav-title">{{
                        t(`Menu.${String(items.name)}`)
                    }}</span>
                </template>
            </el-menu-item>
        </div>
    </el-menu>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { useMenuStore } from '@/store/menu';
import { useLoginStore } from '@/store/login';
import { storeToRefs } from 'pinia';
import { routes } from '@/router';
import { useI18n } from 'vue-i18n';
const { t } = useI18n({ useScope: 'global' });
const { dymicRoutes } = storeToRefs(useLoginStore());
// watchEffect(() => {
//     renderMenu = routes[1].children.concat(dymicRoutes.value);
//     console.log(renderMenu, 'renderMenu');
// });
const renderMenu = computed(() => {
    return routes[1].children.concat(dymicRoutes.value);
});

console.log(renderMenu.value, 'renderMenu');

const menuStore = useMenuStore();
const { menueWidthState } = storeToRefs(menuStore);
const $router = useRouter();

// import {
//     HelpFilled,
//     Avatar,
//     Basketball,
//     House,
//     WarningFilled,
// } from '@element-plus/icons-vue';

import { RouteRecordRaw, RouteRecordName } from 'vue-router';

const handleClick = (node: RouteRecordRaw) => {
    // 利用这里的点击事件keyPath 给到全局变量然后处理面包屑即可
    menuStore.updateBreadMenu(
        node.path,
        (node.meta as { title: RouteRecordName }).title,
    );
    $router.push({ name: node.name });
};
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    height: 100vh;

    & .nav-title {
        @include useTheme('color', $menu-text);
    }
    & .icon {
        @include useTheme('color', $menu-text);
    }
}
</style>

<style lang="scss">
.el-sub-menu__title:hover {
    @include useTheme('background-color', $menu-text-hover);
}

.el-menu-item:hover {
    @include useTheme('background-color', $menu-text-hover);
}
</style>
