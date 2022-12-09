<template>
    <div class="swiper">
        <ul ref="ulEl">
            <li v-for="(items, inx) in swiperData" :key="inx">{{ items }}页</li>
        </ul>
        <div class="half-constrol">
            <el-button @click="prevClick">左移</el-button>
            <el-button @click="nextClick">右移</el-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onUnmounted, onMounted, watch, defineEmits } from 'vue';

// 处理抛出方法
const emit = defineEmits<{
    (e: 'swiperPageNum', value: number): void;
}>();

// 接受参数
const props = defineProps({
    autoSwicth: { type: Boolean, required: false, default: true },
});

const swiperData = [1, 2, 3, 4, 5];
const ulEl = ref(null);
const timer = ref(null);

// 事件处理
let diffX = 0;
const count = ref(1);

const prevClick = () => {
    diffX = safeNumRange(diffX + 100);
    count.value = safeCountRange(count.value - 1);
    ulEl.value.style.transition = `transform 1s`;
    if (count.value === swiperData.length) {
        ulEl.value.style.transition = `transform 0s`;
    }
    ulEl.value.style.transform = `translateX(${diffX}vw)`;
};

const nextClick = () => {
    diffX = safeNumRange(diffX - 100);
    count.value = safeCountRange(count.value + 1);
    ulEl.value.style.transition = `transform 1s`;
    if (count.value === 1) {
        ulEl.value.style.transition = `transform 0s`;
    }
    ulEl.value.style.transform = `translateX(${diffX}vw)`;
};

watch(
    () => count.value,
    (val, preVal) => {
        emit('swiperPageNum', val);
    },
    {
        immediate: true,
        deep: true,
    },
);

const safeNumRange = (num) => {
    if (num > 0) return -400;
    if (num < -400) return 0;
    return num;
};

const safeCountRange = (count) => {
    if (count > 5) return 1;
    if (count < 1) return 5;
    return count;
};

// 暴露出去平替$child.msg
defineExpose({ prevClick, nextClick });

onMounted(() => {
    if (props.autoSwicth) {
        timer.value = setInterval(() => {
            if (count.value < swiperData.length) {
                count.value++;
                diffX -= 100;
                ulEl.value.style.transform = `translateX(${diffX}vw)`;
            } else {
                diffX = 0;
                count.value = 1;
                ulEl.value.style.transition = `transform 0s`;
                ulEl.value.style.transform = `translateX(${diffX}vw)`;
            }
        }, 10000);
    }
});

onUnmounted(() => {
    clearInterval(timer.value);
    timer.value = null;
});
</script>

<style scoped lang="scss">
.swiper {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;

    ul {
        margin: 0;
        padding: 0;
        width: 500vw;
        transition: transform 1s;
        will-change: transform;

        li {
            list-style: none;
            float: left;
            width: 100vw;
            height: 100vh;
            background: gray;
            color: #fff;
        }
    }
}

.half-constrol {
    width: 200px;
    position: absolute;
    bottom: 50px;
    left: 50%;
    transform: translateX(-50%);
}
</style>
