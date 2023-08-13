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

<script lang="ts" setup>
import AsideMenu from '../components/AsideMenu.vue';
import AsideHeader from '../components/AsideHeader.vue';
</script>

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
    width: 100%;
    height: 100%;
    background-color: #f2f3f5;
    .common-flex {
        display: flex;
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
        .com-style-pub {
            width: 100%;
            height: calc(100vh - 80px);
            overflow-y: auto;
            padding: 20px;
            box-sizing: border-box;
        }
    }
}
</style>
