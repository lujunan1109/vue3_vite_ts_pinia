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
                        <MainContent />
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
import MainContent from '@/pages/main.vue';
</script>

<style lang="scss" scoped>
// 切换动画效果
// @import '@/assets/transition.scss';
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
            overflow-x: hidden;
            background-color: var(--el-bg-color);
        }
    }
}
</style>
