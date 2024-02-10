<template>
    <div v-show="loading" class="aoto-comp">
        <auto-complete></auto-complete>
    </div>
    <div
        v-loading="loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        :element-loading-spinner="false"
        class="common-layout"
    >
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
                            :locale="local"
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
import AsideMenu from '@/components/AsideMenu/index.vue';
import AsideHeader from '@/components/AsideHeader/index.vue';
import AutoComplete from '@/components/AutoComplete/index.vue';

import { storeToRefs } from 'pinia';
import { useMenuStore } from '@/store/menu';
import { useGlobalStore } from '@/store/global';
const menuStore = useMenuStore();
const globalStore = useGlobalStore();

let { menuTags } = storeToRefs(menuStore);

import { watch } from 'vue';
import { useRouter } from 'vue-router';

const $router = useRouter();
const loading = computed(() => globalStore.load);

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
import { useLanguage } from '@/store/language';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import en from 'element-plus/dist/locale/en.mjs';

const size = storeToRefs(useGlobalStore()).size.value as EpPropMergeType<
    StringConstructor,
    '' | 'small' | 'default' | 'large',
    never
>;
const zIndex = 3000;

const local = computed(() => {
    const { language } = storeToRefs(useLanguage());
    return language.value === 'zh-cn' ? zhCn : en;
});
</script>

<style lang="scss" scoped>
// 切换动画效果
@import '@/assets/transition.scss';
.aoto-comp {
    position: fixed;
    top: 200px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 20001;
    width: auto;
    height: auto;
    overflow-y: auto;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
}
.common-layout {
    width: 100%;
    height: 100%;
    background-color: #f2f3f5;
    & .el-container {
        width: 100%;
        height: 100%;
    }
    .common-flex {
        display: flex;
        width: 100%;
        overflow-x: hidden;
    }

    &-header {
        width: 100%;
        height: 85px;
        background-color: var(--el-bg-color);
        padding-bottom: 5px;
        @include useTheme('border-bottom', $border-bottom);
    }

    &-aside {
        width: auto;
        overflow-x: hidden;
        height: 100%;
        @include useTheme('background-color', $menu-bg);
    }

    &-main {
        width: 100%;
        height: 100%;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        background-color: var(--el-bg-color);
        & .com-style-pub {
            height: 100%;
            overflow-y: auto;
            background-color: var(--el-bg-color);
        }
    }
}
</style>
