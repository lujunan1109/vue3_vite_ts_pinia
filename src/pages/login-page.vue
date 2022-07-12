<!--
 * @Description: 登录页面
 * @Author: lujunan
 * @Date: 2022-06-07 10:14:58
 * @LastEditors: lujunan
 * @LastEditTime: 2022-06-30 09:05:38
-->

<template>
    <div class="login">
        <svg-icon :name="iconsName" size="100%" />
        <div class="center-form">
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
                        autocomplete="on"
                    />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input
                        v-model="ruleForm.password"
                        placeholder="请输入密码"
                        :prefix-icon="Lock"
                        clearable
                        autocomplete="on"
                    />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm(ruleFormRef)"
                        >登录</el-button
                    >
                    <div class="bot-box">
                        <span class="register">注册账户</span>
                        <span>忘记密码</span>
                    </div>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import type { FormInstance, FormRules } from 'element-plus';
import { Lock, User } from '@element-plus/icons-vue';
const iconsName = ref('login-bg');
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
    name: '',
    password: '',
});

const $router = useRouter();

const rules = reactive<FormRules>({
    name: [
        {
            required: true,
            message: '请输入用户名/手机账户/邮箱',
            trigger: 'blur',
        },
    ],
    password: [
        {
            required: true,
            message: '请输入密码',
            trigger: 'blur',
        },
    ],
});

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
        console.log(valid, fields);
        if (valid) {
            $router.push({ path: '/home' });
            console.log('submit!');
        } else {
            console.log('error submit!', fields);
        }
    });
};

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
    width: 100vw;
    height: 100vh;
    overflow-y: hidden;

    .user-login {
        font-weight: 500;
        padding-bottom: 20px;
    }

    .center-form {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
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
        }
    }
}
</style>
