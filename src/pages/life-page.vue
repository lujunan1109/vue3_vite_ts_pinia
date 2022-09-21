<!--
 * @Author: lujunan
 * @Date: 2022-09-19 14:47:40
 * @LastEditors: lujunan
 * @LastEditTime: 2022-09-19 17:27:33
 * @Description: 记录人生的每一个格子的demo code
-->
<template>
    <div>
        <div>{{ percentVal }} %</div>
        <ul>
            <li
                v-for="(day, inx) in lifeData"
                :key="inx"
                :class="day ? 'active-style' : 'default-style'"
            ></li>
        </ul>
        <div>今年还剩余{{ leftDay }}天</div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
// 2022中国男性的平均寿命
const chinaAverageManAge = 74;

const percentVal = ref(percent(26));
const leftDay = leftDays();
const lifeData = reactive(setLifeLoseDay(26));

function percent(old) {
    const number = (old / chinaAverageManAge) * 100;
    return number.toFixed(2);
}

function setLifeLoseDay(old) {
    return new Array(old)
        .fill(1)
        .concat(new Array(chinaAverageManAge - old).fill(0));
}

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

// 剩下的天数
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
.active-style {
    background: red;
}
.default-style {
    background: #ccc;
}

ul {
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    list-style: none;

    li {
        width: 10px;
        height: 10px;
        display: inline-block;
        border: 2px solid #fff;
    }
}
</style>
