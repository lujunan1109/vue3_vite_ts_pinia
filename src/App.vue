<!--
 * @Description: SPA
 * @Author: lujunan
 * @Date: 2022-06-07 09:08:28
 * @LastEditors: lujunan
 * @LastEditTime: 2023-08-08 20:55:55
-->

<template>
    <div class="common-layout">
        <el-container>
            <el-container class="common-flex">
                <el-aside class="common-layout-aside">菜单组件</el-aside>
                <div class="common-layout-main">
                    <el-header class="common-layout-header"
                        >头部组件展示</el-header
                    >
                    <div>
                        <router-view v-slot="{ Component }" class="router-view">
                            <KeepAlive max="5">
                                <transition name="fade-transform" mode="out-in">
                                    <div>
                                        <component :is="Component" />
                                    </div>
                                </transition>
                            </KeepAlive>
                        </router-view>
                    </div>
                </div>
            </el-container>
        </el-container>
    </div>
</template>

<style lang="scss" scoped>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    width: 100%;
    height: 100%;
}

.fade-transform-leave-active,
.fade-transform-enter-active {
    transition: all 0.5s;
}
.fade-transform-enter {
    opacity: 0;
    transform: translateX(-30px);
}
.fade-transform-leave-to {
    opacity: 0;
    transform: translateX(30px);
}

.common-layout {
    width: 100vw;
    height: 100vh;
    display: flex;

    .common-flex {
        display: flex;
    }

    &-header {
        width: 100%;
        height: 80px;
        background-color: #ccc;
    }

    &-aside {
        width: 200px;
        background: #aaa;
    }

    &-main {
        width: 100%;
    }
}
</style>
