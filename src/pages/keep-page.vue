<template>
    <div id="myscrollbox" ref="el">
        <div
            v-for="(items, inx) in colorList"
            :key="inx"
            class="w-h"
            :style="[{ background: items.color }]"
        >
            健身就是爬楼梯，一层层的爪巴然后爬到最后一层
        </div>
        <el-button
            v-show="flyState"
            class="btn-top"
            type="danger"
            :icon="ArrowUpBold"
            circle
            @click="goTop"
        />
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onUnmounted, onMounted } from 'vue';
import { ArrowUpBold } from '@element-plus/icons-vue';

const colorList = reactive([
    { color: '#989664' },
    { color: '#999999' },
    { color: '#339933' },
    { color: '#993366' },
    { color: '#FFA500' },
    { color: '#FFC0CB' },
]);

// 飞行按钮展示状态
const flyState = ref(false);
let listenDom: null | HTMLElement = null;
const scrollFunc = function () {
    let scrollTop = listenDom.scrollTop || listenDom.scrollTop;
    console.log(scrollTop, '滚动距离');

    if (scrollTop > 500 && !flyState.value) {
        flyState.value = true;
    } else if (flyState.value && scrollTop < 500) {
        flyState.value = false;
    }
};
const goTop = () => {
    listenDom.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
};

// 监听逻辑
onMounted(() => {
    listenDom = document.querySelector('.common-layout-main');
    listenDom.addEventListener('scroll', scrollFunc);
});

onUnmounted(() => {
    listenDom.removeEventListener('scroll', scrollFunc);
});
</script>

<style scoped lang="scss">
.w-h {
    width: 100%;
    height: 100vh;
}
.btn-top {
    position: fixed;
    right: 50px;
    bottom: 100px;
}
</style>
