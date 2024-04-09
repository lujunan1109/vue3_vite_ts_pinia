<!--
 * @Description: 登录页面
 * @Author: lujunan
 * @Date: 2022-06-07 10:14:58
 * @LastEditors: lujunan
 * @LastEditTime: 2024-04-08 20:57:15
-->

<template>
    <div class="login">
        <svg-icon name="login-bg" size="100%" />
        <div ref="rollBox" class="center-form">
            <div v-show="cmtActive">
                <div class="user-login">用户登录</div>
                <el-form
                    ref="ruleFormRef"
                    :rules="rules"
                    label-width="120px"
                    status-icon
                    label-position="top"
                    :model="ruleForm"
                >
                    <el-form-item label="账户" prop="name">
                        <el-input
                            v-model="ruleForm.name"
                            placeholder="请输入用户名/手机账户/邮箱"
                            :prefix-icon="User"
                            clearable
                            autocomplete="off"
                        />
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input
                            v-model="ruleForm.password"
                            type="password"
                            placeholder="请输入密码"
                            :prefix-icon="Lock"
                            clearable
                            autocomplete="off"
                            @keyup.enter="submitForm(ruleFormRef)"
                        />
                    </el-form-item>
                    <el-form-item>
                        <el-button
                            type="primary"
                            :loading="loginLoading"
                            @click="submitForm(ruleFormRef)"
                        >
                            登录
                        </el-button>
                        <div class="bot-box">
                            <span class="register" @click="register"
                                >注册账户</span
                            >
                            <span class="forget-psw">忘记密码</span>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
            <div v-show="!cmtActive">
                <div class="user-login">用户注册</div>
                <el-form
                    label-width="120px"
                    status-icon
                    label-position="top"
                    :model="registerForm"
                >
                    <el-form-item label="账户" prop="name">
                        <el-input
                            v-model="registerForm.name"
                            autofocus
                            placeholder="请输入用户名/手机账户/邮箱"
                            :prefix-icon="User"
                            clearable
                            autocomplete="on"
                        />
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input
                            v-model="registerForm.password"
                            type="password"
                            placeholder="请输入密码"
                            :prefix-icon="Lock"
                            clearable
                            autocomplete="on"
                        />
                    </el-form-item>
                    <el-form-item label="再次输入密码" prop="password">
                        <el-input
                            v-model="registerForm.repPsw"
                            type="password"
                            placeholder="请再次输入密码"
                            :prefix-icon="Lock"
                            clearable
                            autocomplete="off"
                        />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary">注册登录</el-button>
                        <div class="bot-box">
                            <span class="register" @click="register"
                                >登录账户</span
                            >
                            <span v-show="cmtActive" class="forget-psw"
                                >忘记密码</span
                            >
                        </div>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import type { FormInstance, FormRules } from 'element-plus';
import { Lock, User } from '@element-plus/icons-vue';
import { sleep } from '@/utils';
import { getCurrentInstance } from 'vue';
import { useLoginStore } from '@/store/login';

const ruleFormRef = ref<FormInstance>();
// 获取全局的参数/方法
const { proxy } = getCurrentInstance();

const ruleForm = reactive({
    name: '',
    password: '',
    repPsw: '',
});

const registerForm = reactive({
    name: '',
    password: '',
    repPsw: '',
});

const loginLoading = ref(false);

const $router = useRouter();
const checkName = (rule, value, callback) => {
    if (!value) {
        callback(new Error('请输入用户名/手机账户/邮箱'));
    }
    callback();
};
const checkPsw = (rule, value, callback) => {
    if (!value) {
        callback(new Error('请输入密码'));
    }
    // const passwordRegex =
    //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).+$/;
    // if (!passwordRegex.test(value)) {
    //     callback(new Error('密码必须包含大小写字母、数字、特殊字符'));
    // }
    callback();
};
const rules = reactive<FormRules<ruleForm>>({
    name: [
        {
            required: true,
            validator: checkName,
            trigger: 'blur',
        },
    ],
    password: [
        {
            required: true,
            validator: checkPsw,
            trigger: 'blur',
        },
    ],
    repPsw: [
        {
            required: true,
            validator: checkPsw,
            trigger: 'blur',
        },
    ],
});

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
        if (valid) {
            loginLoading.value = true;
            const loginStore = useLoginStore();
            loginStore
                .userLoginHandle(ruleForm)
                .then((result) => {
                    if (result) {
                        proxy.$message({
                            message: '登录成功',
                            type: 'success',
                        });
                        $router.push({ path: '/home' });
                        loginLoading.value = false;
                    }
                })
                .catch(() => {
                    proxy.$message({
                        message: '登录失败',
                        type: 'error',
                    });
                    loginLoading.value = false;
                });
        }
    });
};

// 实现翻转动画
const active = ref(true);
const cmtActive = ref(true);
const register = async () => {
    rollBox.value.classList.add('add-style');
    active.value = !active.value;
    if (!active.value) {
        await sleep(250);
        rollBox.value.classList.add('register-height');
    } else {
        await sleep(250);
        rollBox.value.classList.remove('register-height');
    }
};
watch(active, async () => {
    // 在动画duration在一半也就是rotateY为90deg的时候完成此动画
    await sleep(250);
    cmtActive.value = active.value;
});

const rollBox = ref(null);
onMounted(() => {
    rollBox.value.addEventListener('animationend', () => {
        rollBox.value.classList.remove('add-style');
    });
});

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.resetFields();
};
</script>

<style lang="scss" scoped>
// @import "xxx";
// @import url(xxx);
$mainColor: #409eff;

@mixin flex-between {
    display: flex;
    justify-content: space-between;
}

.login {
    position: relative;
    width: 100%;
    height: 100%;

    .user-login {
        font-weight: 500;
        padding-bottom: 20px;
    }

    .center-form {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        width: 400px;
        height: 250px;
        padding: 20px 20px 30px 20px;
        background-color: #fff;
        box-shadow: 10px 10px 10px #ccc;
        border-radius: 4px;

        :deep(.el-button) {
            width: 100%;
            margin-top: 10px;
        }

        .bot-box {
            width: 100%;
            @include flex-between;

            .register {
                color: $mainColor;
                cursor: pointer;
            }
            .forget-psw {
                user-select: none;
            }
        }
    }

    .register-height {
        height: 350px;
    }

    .add-style {
        animation: roll 0.5s ease-in;
    }
}

@keyframes roll {
    0% {
        transform: rotateY(0deg);
    }
    50% {
        transform: rotateY(90deg);
    }
    100% {
        transform: rotateY(0deg);
    }
}
</style>
