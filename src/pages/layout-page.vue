<template>
    <div class="common-layout">
        <el-container>
            <el-container class="common-flex">
                <el-aside class="common-layout-aside">
                    <AsideMenu />
                </el-aside>
                <div class="common-layout-main">
                    <el-header class="common-layout-header">
                        <AsideHeader />
                    </el-header>
                    <div class="com-style-pub">
                        <router-view v-slot="{ Component }" class="router-view">
                            <Transition name="slide-right">
                                <component :is="Component" />
                            </Transition>
                        </router-view>
                    </div>
                </div>
            </el-container>
        </el-container>
    </div>
</template>

<script lang="ts" setup>
import AsideMenu from '@/components/AsideMenu.vue';
import AsideHeader from '@/components/AsideHeader.vue';

import { storeToRefs } from 'pinia';
import { useMenuStore } from '@/store/menu';
const menuStore = useMenuStore();
let { menuTags } = storeToRefs(menuStore);

import { watch } from 'vue';
import { useRouter } from 'vue-router';

const $router = useRouter();

type Tag = {
    name: string;
    type: string;
    checked: string;
    path: string;
};

// 监听并且menuTags赋值
watch(
    () => $router.currentRoute.value,
    (toValue) => {
        // 重置选中效果
        menuTags.value = menuTags.value.map((t) => {
            t.checked = 'plain';
            return t;
        });
        // 重复元素不添加
        if (!menuTags.value.some((e) => e.path === toValue.path)) {
            menuTags.value.push({
                name: toValue.meta.title,
                type: '',
                checked: 'plain',
                path: toValue.path,
            });
        }
        // 设置tag高亮
        const inx = menuTags.value.findIndex((e) => e.path === toValue.path);
        if (inx > -1) {
            menuTags.value[inx].checked = 'dark';
        }
    },
    { immediate: true, deep: true },
);
</script>

<style lang="scss" scoped>
// 切换动画效果
.slide-right-enter-from {
    transform: translateX(0);
}
.slide-right-enter-to {
    transform: translateX(-100%);
}
.slide-right-leave-from {
    transform: translateX(0);
}
.slide-right-leave-to {
    transform: translateX(-100%);
}

.slide-right-enter-active,
.slide-right-leave-active {
    transition: transform 0.5s;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    width: 100%;
    height: 100%;
}

.common-layout {
    width: 100%;
    height: 100%;
    background-color: #f2f3f5;
    .common-flex {
        display: flex;
        width: 100%;
        overflow-x: hidden;
    }

    &-header {
        width: 100%;
        height: 80px;
        background-color: #fff;
    }

    &-aside {
        width: auto;
        background: #304156;
    }

    &-main {
        width: 100%;
        height: 100vh;
        overflow-y: auto;
        & .com-style-pub {
            padding: 20px;
        }
    }
}
</style>
