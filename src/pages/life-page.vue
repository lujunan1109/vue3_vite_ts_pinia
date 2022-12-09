<!--
 * @Author: lujunan
 * @Date: 2022-09-19 14:47:40
 * @LastEditors: lujunan
 * @LastEditTime: 2022-12-09 14:26:09
 * @Description: 记录人生的每一个格子的demo code
-->
<template>
    <div>
        <div class="form__age--content">
            <el-form
                ref="formRef"
                :model="numberValidateForm"
                label-width="100px"
                class="demo-ruleForm"
            >
                <el-form-item
                    label="age"
                    prop="age"
                    :rules="[
                        { required: true, message: 'age is required' },
                        { type: 'number', message: 'age must be a number' },
                        { validator: checkAge, trigger: 'blur' },
                    ]"
                >
                    <el-input
                        v-model.number="numberValidateForm.age"
                        type="text"
                        autocomplete="off"
                    />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm(formRef)"
                        >Submit</el-button
                    >
                    <el-button @click="resetForm(formRef)">Reset</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div v-show="lifeData.length !== 0" class="show__life--percent">
            <div>{{ percentVal }} %</div>
            <ul>
                <li
                    v-for="(day, inx) in lifeData"
                    :key="inx"
                    :class="day ? 'active-style' : 'default-style'"
                ></li>
            </ul>
        </div>
        <div>今年还剩余{{ leftDay }}天</div>
        <SwiperComVue ref="swiperEl" @swiperPageNum="swiperPageNum" />
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, getCurrentInstance, onMounted } from 'vue';
import { FormInstance } from 'element-plus';
import SwiperComVue from '../components/dbComponents/SwiperCom.vue';

// 2022中国男性的平均寿命
const chinaAverageManAge = 74;
const leftDay = leftDays();
let lifeData: any = ref([]);
const formRef = ref<FormInstance>();

const { ctx: that } = getCurrentInstance() as any;
console.log(that);

const numberValidateForm = reactive({
    age: '',
});
const percentVal = ref('0');

// form表单的逻辑
const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.validate((valid) => {
        if (valid) {
            lifeData.value = setLifeLoseDay(numberValidateForm.age);
            percentVal.value = percent(numberValidateForm.age);
            console.log(percentVal.value, 'percentVal.value');
        } else {
            console.log('error submit!');
            return false;
        }
    });
};

// rules
const checkAge = (rule: any, value: any, callback: any) => {
    if (!value) {
        return callback(new Error('Please input the age'));
    }
    setTimeout(() => {
        if (!Number.isInteger(value)) {
            callback(new Error('Please input digits'));
        } else {
            if (value < 0) {
                callback(new Error('Age must be greater than 0'));
            } else {
                callback();
            }
        }
    }, 1000);
};

const swiperEl = ref(null);

// const triggerChildFunc = () => {
//         swiperEl.value.prevClick();
// };

const swiperPageNum = (pageNum) => {
    console.log('pageNum', pageNum);
};

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.resetFields();
};

function percent(old): string {
    old = old > chinaAverageManAge ? chinaAverageManAge : old;
    const number = (old / chinaAverageManAge) * 100;
    return number.toFixed(2);
}

function setLifeLoseDay(old): Array<number> {
    old = old > chinaAverageManAge ? chinaAverageManAge : old;
    return new Array(old)
        .fill(1)
        .concat(
            new Array(
                chinaAverageManAge - old < 0 ? 0 : chinaAverageManAge - old,
            ).fill(0),
        );
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
.form__age--content {
    width: 500px;
    height: 300px;
    display: flex;
    align-items: center;
}
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
