<template>
    <div>
        <el-config-provider :size="size" :z-index="zIndex" :locale="local">
            <router-view v-slot="{ Component }" class="router-view">
                <Transition name="fade-transform" mode="out-in">
                    <component :is="Component" />
                </Transition>
            </router-view>
        </el-config-provider>
    </div>
</template>
<script setup lang="ts">
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
import { useLanguageStore } from '@/store/language';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import en from 'element-plus/dist/locale/en.mjs';

const size = storeToRefs(useGlobalStore()).size.value as EpPropMergeType<
    StringConstructor,
    '' | 'small' | 'default' | 'large',
    never
>;
const zIndex = 3000;

const local = computed(() => {
    const { language } = storeToRefs(useLanguageStore());
    return language.value === 'zh' ? zhCn : en;
});
</script>
<style scoped lang="scss"></style>
