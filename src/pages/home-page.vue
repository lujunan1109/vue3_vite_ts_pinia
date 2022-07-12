<!--
 * @Description: 首页
 * @Author: lujunan
 * @Date: 2022-06-07 10:14:22
 * @LastEditors: lujunan
 * @LastEditTime: 2022-07-12 17:54:45
-->

<template>
    <div>
        <div class="home" @click="toggleStart">
            学习时间 - {{ timeFormatter(learnTime) }}
        </div>
        <my-button @custom-click="btnClick">按钮{{ obj3.foo }}</my-button>
        <router-link :to="{ path: '/404', query: { t: new Date() } }"
            >Go to 404</router-link
        >
        <tree-page :data="data1"></tree-page>
        <div ref="box" class="style">
            <div>
                <el-progress
                    type="circle"
                    :percentage="percentage"
                    status="success"
                />
                <i
                    ref="dianzan"
                    class="iconfont icon-dianzan_kuai"
                    @mousedown="down"
                    @mouseup="up"
                ></i>
            </div>
            <div><i class="iconfont icon-jinbi"></i></div>
            <div>
                <i class="iconfont icon-shoucang"></i>
            </div>
        </div>
    </div>
</template>

<script setup>
import {
    onMounted,
    onUnmounted,
    ref,
    watch,
    markRaw,
    isReactive,
    reactive,
    toRaw,
    watchEffect,
    toRefs,
} from 'vue';
import { useRoute } from 'vue-router';
import TreePage from '@/pages/tree-page.vue';
import MyButton from '@/components/RenderFunc.vue';

const $route = useRoute();
const learnTime = ref(0);
const isFlage = ref(false);
const percentage = ref(0);

const increase = () => {
    setInterval(() => {
        percentage.value = (percentage.value % 100) + 10;
    }, 500);
};

let timer = null;
const toggleStart = () => {
    isFlage.value = !isFlage.value;
    if (isFlage.value) {
        timer = setInterval(() => {
            learnTime.value++;
            increase();
        }, 1000);
    } else {
        clearInterval(timer);
        timer = null;
    }
};
const dianzan = ref(null);
const box = ref(null);
// 让数据没办法被代理劫持
const foo = markRaw({ a: 1 });
const foo1 = { a: 1 };
console.log(isReactive(reactive(foo)), foo, foo1); // false
// toRaw让数据变成劫持前状态
const o = {};
const o1 = reactive(o);
const o2 = toRaw(o1);
console.log(o2 === o);

// watchEffect()
const obj = reactive({ foo: 1 });
watchEffect(() => {
    // 这里只会执行一次
    console.log(obj.foo);
});

obj.foo++;
obj.foo++;
obj.foo++;

const obj3 = reactive({ foo: 1 });
const obj4 = { ...toRefs(obj3) };
obj3.foo = 4;
console.log(obj3, obj4);

const animationStart = () => {
    // animate__shakeX
    console.log(dianzan, 'dianzan');
    dianzan.value.className += ' animated wobble';
    box.value.className += ' color';
};
let f = null;
const down = () => {
    // 1. 長按超過1秒 開啟動畫
    // 2. 普通點擊顏色變化
    f = setTimeout(() => {
        animationStart();
    }, 1500);
};

const up = () => {
    clearTimeout(f);
};

const btnClick = () => {
    console.log('按钮回调');
};

const data1 = ref([
    {
        key: '1',
        title: 'Parent 1',
        children: [
            {
                key: '1-1',
                title: 'child 1',
            },
            {
                key: '1-2',
                title: 'child 2',
                children: [
                    {
                        key: '1-2-1',
                        title: 'grandchild 1',
                    },
                    {
                        key: '1-2-2',
                        title: 'grandchild 2',
                    },
                ],
            },
        ],
    },
    {
        key: '2',
        title: 'Parent 2',
        children: [
            {
                key: '2-1',
                title: 'child 1',
                children: [
                    {
                        key: '2-1-1',
                        title: 'grandchild 1',
                    },
                    {
                        key: '2-1-2',
                        title: 'grandchild 2',
                    },
                ],
            },
            {
                key: '2-2',
                title: 'child 2',
            },
        ],
    },
]);

watch(
    () => $route.path,
    (newPath, oldPath) => {
        console.log(newPath, oldPath, '》》路由变化');
    },
    { immediate: true },
);

onMounted(() => {
    console.log('dom加载完毕');
});

onUnmounted(() => {
    console.log('组件销毁');
    clearInterval(timer);
    timer = null;
});

/**
 * @description: 转换成时分秒的函数
 * @return {*}
 */
const timeFormatter = (val) => {
    if (val < 60) {
        return zeroNumber(val);
    } else if (val >= 60 && val <= 60 * 60) {
        let min = parseInt((val % (60 * 60)) / 60);
        let second = (val % (60 * 60)) % 60;
        return `${zeroNumber(min)}-${zeroNumber(second)}`;
    } else {
        let hour = parseInt(val / (60 * 60));
        let min = parseInt((val % (60 * 60)) / 60);
        let second = (val % (60 * 60)) % 60;

        return `${zeroNumber(hour)} - ${zeroNumber(min)}-${zeroNumber(second)}`;
    }
};

const zeroNumber = (val) => {
    if (val >= 10) return val;
    return `0${val}`;
};
</script>

<style lang="scss" scoped>
// @import "xxx";
// @import url(xxx);
.home {
    width: 200px;
    height: 200px;
    border: 1px solid #ddd;
    cursor: pointer;
}

.style {
    margin: auto;
    width: 120px;
    display: flex;
    justify-content: space-between;
    i {
        font-size: 30px;
        display: block;
        // color: #00aeec;
        color: #61666d;
    }
}

.color {
    i {
        color: #00aeec;
    }
    transition: color 0.5s cubic-bezier(0.86, 0, 0.07, 1);
}
</style>
