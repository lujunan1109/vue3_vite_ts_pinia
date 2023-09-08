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
                        <el-config-provider
                            :size="size"
                            :z-index="zIndex"
                            :locale="zhCn"
                        >
                            <router-view
                                v-slot="{ Component }"
                                class="router-view"
                            >
                                <Transition name="slide-right">
                                    <component :is="Component" />
                                </Transition>
                            </router-view>
                        </el-config-provider>
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

import { watch, provide, nextTick } from 'vue';
import { useRouter } from 'vue-router';

const $router = useRouter();

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

import type { EpPropMergeType } from 'element-plus/es/utils/vue/props/types';
// 修改elment-plus的尺寸/语言/组件层级
import { ElConfigProvider } from 'element-plus';
import { useGlobalStore } from '@/store/global';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
// 你ts是真滴恶心啊
const size = storeToRefs(useGlobalStore()).size.value as EpPropMergeType<
    StringConstructor,
    '' | 'small' | 'default' | 'large',
    never
>;
const zIndex = 3000;
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
        overflow-x: hidden;
    }

    &-main {
        width: 100%;
        height: 100vh;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        & .com-style-pub {
            height: 100%;
            overflow-y: auto;
        }
    }
}
</style>
