<template>
    <div class="TeleportVideo">
        <!-- 要播放的大视频窗口 -->
        <div id="bigBox">
            <Teleport v-if="isShow" to="#smallBox" :disabled="isTeleport">
                <video controls width="250">
                    <source
                        src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm"
                        type="video/webm"
                    />
                </video>
            </Teleport>
        </div>

        <!-- 要传送的小视频窗口 -->
        <div id="smallBox"></div>

        <!-- 模拟滚动 -->
        <div style="height: 2000px"></div>
    </div>
</template>
<!-- https://www.onmpw.com/p/1677994173671121024.html 传送门原理-->

<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core';

let isTeleport = ref(true); //  控制什么时候传送
let isShow = ref(false); // 控制 Teleport内置组件的挂载时机（要延迟一下）

onMounted(() => {
    intersectionObserver();
    isShow.value = true;
});

// 监听 指定的dom元素是否在 可视区域内
const intersectionObserver = () => {
    const { stop } = useIntersectionObserver(
        document.getElementById('bigBox'),
        ([{ isIntersecting }]) => {
            // isIntersecting  一个布尔值， true -> 代表在可视区域； false -> 表示不再可是区域
            console.log(isIntersecting, 'isIntersecting');
            isTeleport.value = isIntersecting;
        },
    );
    console.log(stop, 'stop>>>>>>>>>>>>停止监听回调函数');
};
</script>
<style scoped lang="scss">
#bigBox {
    width: 640px;
    height: 360px;
    /* border: 10px solid red; */
    z-index: 99;
}
#smallBox {
    position: fixed;
    bottom: 20px;
    right: 60px;
    width: 320px;
    height: 180px;
    /* border: 1px solid red; */
}
</style>
