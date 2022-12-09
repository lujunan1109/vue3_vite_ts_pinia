<!--
 * @Description: SPA
 * @Author: lujunan
 * @Date: 2022-06-07 09:08:28
 * @LastEditors: lujunan
 * @LastEditTime: 2022-12-09 14:53:26
-->

<template>
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

</style>
