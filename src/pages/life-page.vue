<template>
    <div class="container">
        <div class="g-container">
            <div class="g-number">今年还剩{{ leftDay }}天</div>
            <div class="g-contrast">
                <div class="g-circle"></div>
                <ul class="g-bubbles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance, ComponentInternalInstance } from 'vue';

// 本年度剩余天数
const leftDay = leftDays();

// 当前组件的实例
const that = getCurrentInstance() as ComponentInternalInstance;
console.log(that, '当前组件的实例');

const swiperEl = ref(null);
console.log(swiperEl, 'swiperEl');

// 某个年份的天数
const allDays = (year: number) => {
    let leapYear = false,
        sum_day = 0,
        month_arr = [4, 6, 9, 11];
    if (year % 100 === 0) {
        // 年份是整百
        leapYear = year % 400 === 0;
    } else {
        leapYear = year % 4 === 0;
    }
    // 下面计算每个月的天数
    for (let i = 1; i < 13; i++) {
        if (i === 2) {
            sum_day += leapYear ? 29 : 28;
        } else if (month_arr.includes(i)) {
            sum_day += 30;
        } else {
            sum_day += 31;
        }
    }
    return sum_day;
};

// 未来10年，每年天数
const futureTenYearsDays = (year: number) => {
    let sum_day = [];
    for (let i = 0; i < 10; i++) {
        sum_day.push(allDays(year + i));
    }
    return sum_day;
};
// 我们的荣耀不在过去也不是此刻，而是未来。
console.log(futureTenYearsDays(new Date().getFullYear()), '未来10年，每年天数');

// 本年度剩下的天数
function leftDays() {
    // 今天的标准时间
    let today = new Date();
    // 本年最后标准时间
    let endYear = new Date(today.getFullYear(), 11, 31, 23, 59, 59);
    // 一天的毫秒数
    let msPerDay = 24 * 60 * 60 * 1000;
    // 计算剩余毫秒除以一天的毫秒数，就是天数
    return Math.round((endYear.getTime() - today.getTime()) / msPerDay);
}
</script>

<style lang="scss" scoped>
.container {
    width: 100%;
    height: 85vh;
    display: flex;
    background: #000;
    overflow: hidden;
}
.g-number {
    position: absolute;
    width: 300px;
    top: 27%;
    text-align: center;
    font-size: 32px;
    z-index: 10;
    color: #fff;
}

.g-container {
    position: relative;
    width: 300px;
    height: 400px;
    margin: auto;
}

.g-contrast {
    filter: contrast(10) hue-rotate(0);
    width: 300px;
    height: 400px;
    background-color: #000;
    overflow: hidden;
    animation: hueRotate 10s infinite linear;
}

.g-circle {
    position: relative;
    width: 300px;
    height: 300px;
    box-sizing: border-box;
    filter: blur(8px);

    &::after {
        content: '';
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(0);
        width: 200px;
        height: 200px;
        background-color: #00ff6f;
        border-radius: 42% 38% 62% 49% / 45%;
        animation: rotate 10s infinite linear;
    }

    &::before {
        content: '';
        position: absolute;
        width: 176px;
        height: 176px;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 50%;
        background-color: #000;
        z-index: 10;
    }
}

.g-bubbles {
    position: absolute;
    left: 50%;
    bottom: 0;
    width: 100px;
    height: 40px;
    transform: translate(-50%, 0);
    border-radius: 100px 100px 0 0;
    background-color: #00ff6f;
    filter: blur(5px);
}

li {
    position: absolute;
    border-radius: 50%;
    background: #00ff6f;
}

@for $i from 0 through 15 {
    li:nth-child(#{$i}) {
        $width: 15 + random(15) + px;
        left: 15 + random(70) + px;
        top: 50%;
        transform: translate(-50%, -50%);
        width: $width;
        height: $width;
        animation: moveToTop
            #{random(6) +
            3}s
            ease-in-out -#{random(5000) /
            1000}s
            infinite;
    }
}

@keyframes rotate {
    50% {
        border-radius: 45% / 42% 38% 58% 49%;
    }
    100% {
        transform: translate(-50%, -50%) rotate(720deg);
    }
}

@keyframes moveToTop {
    90% {
        opacity: 1;
    }
    100% {
        opacity: 0.1;
        transform: translate(-50%, -180px);
    }
}

@keyframes hueRotate {
    100% {
        filter: contrast(15) hue-rotate(360deg);
    }
}
</style>
