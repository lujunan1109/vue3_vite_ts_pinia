<template>
    <div class="form-layout">
        <VForm
            :form-options="formOptions"
            :rules="rules"
            :rule-form="ruleForm"
            label-width="120px"
            class="form-inline"
            @set-ref="setFormRef"
        >
            <template #footer="{ model }">
                <el-form-item>
                    <el-button type="primary" @click="submit(model)"
                        >提交</el-button
                    >
                    <el-button @click="reset">重置</el-button>
                </el-form-item>
            </template>

            <template #childSlot="{ label }"> {{ label }} </template>

            <template #iptComSlot>
                <el-form-item prop="iptCom" label="复合输入框">
                    <div class="ipt-block">
                        <el-form-item
                            v-for="(item, k) in iptComComput"
                            :key="k"
                            :label="`参数${k + 1}`"
                            label-width="50px"
                        >
                            <el-input
                                v-model="ruleForm.iptCom[item]"
                            ></el-input>
                        </el-form-item>
                    </div>
                </el-form-item>
            </template>

            <template #mixSeleteSlot>
                <div>
                    <el-form-item label="下拉框2" prop="mixSelete">
                        <el-select
                            v-model="ruleForm.mixSelete"
                            clearable
                            placeholder="Select2"
                            :disabled="hideSlot"
                        >
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            />
                        </el-select>
                    </el-form-item>
                </div>
            </template>

            <template #mixSeleteSlot2>
                <div v-show="!hideSlot">
                    <el-form-item label="下拉框2" prop="mixSelete2">
                        <el-select
                            v-model="ruleForm.mixSelete2"
                            clearable
                            placeholder="Select"
                        >
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            />
                        </el-select>
                    </el-form-item>
                </div>
            </template>
        </VForm>

        <div style="padding-left: 20px">
            <el-button
                v-throttle="{
                    fn: handleClick,
                    event: 'click',
                    delay: 500,
                }"
                >测试节流</el-button
            >
        </div>
    </div>
</template>

<script setup lang="ts">
import VForm from '@/components/VForm/src/index.vue';
import { reactive, ref } from 'vue';

import {
    Partial,
    Arrayable,
    RuleForm,
    FormOptionType,
} from '@/components/VForm/src/type';
import type { FormInstance, FormItemRule, FormRules } from 'element-plus';
const options = [
    {
        value: 'Option1',
        label: 'Option1',
    },
];
// 表单封装示例
let ruleFormRef = ref<FormInstance>();

const setFormRef = (el: FormInstance): void => {
    ruleFormRef.value = el;
};

const ruleForm: RuleForm = reactive({
    name: '',
    date: '',
    select: '',
    checkBox: [],
    iptCom: {
        ipt1: '',
        ipt2: '',
        ipt3: '',
        ipt4: '',
    },
    slider: 0,
    mixSelete: '',
    mixSelete2: '',
});

const handleClick = () => {
    console.log('节流');
};

// 用于遍历slot
const iptComComput = computed(() => {
    const result = [];
    for (const key in ruleForm.iptCom as { [key: string]: string }) {
        ruleForm.iptCom.hasOwnProperty(key) && result.push(key);
    }
    return result;
});

// 表单校验复合输入框
const checkIptCom = (rule: any, value: any, callback: any) => {
    const { ipt1, ipt2, ipt3, ipt4 } = value;
    if (ipt1 && ipt2 && ipt3 && ipt4) {
        callback();
    } else {
        callback(new Error('Please input iptcom'));
    }
};

const rules: FormRules<RuleForm> = {
    name: [
        { required: true, message: '请输入活动名称', trigger: 'blur' },
        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
    ],
    select: [{ required: true, message: '请选择活动区域', trigger: 'change' }],
    checkBox: [
        {
            type: 'array',
            required: true,
            message: '请至少选择一个城市',
            trigger: 'change',
        },
    ],
    iptCom: [
        { required: true, message: '请输入活动名称', trigger: 'blur' },
        { validator: checkIptCom, trigger: 'blur' },
    ],
};

const formOptions: FormOptionType[] = [
    {
        label: '输入框',
        prop: 'name',
        componentName: 'el-input',
    },
    {
        label: '时间',
        prop: 'date',
        componentName: 'el-date-picker',
    },
    {
        label: '下拉框',
        prop: 'select',
        componentName: 'el-select',
        childName: 'el-option',
        attrs: {
            clearable: true,
            placeholder: '请选择',
        },
        children: [
            {
                label: '选项1',
                value: '1',
            },
            {
                label: '选项2',
                value: '2',
            },
        ],
    },
    {
        label: '多选框',
        prop: 'checkBox',
        componentName: 'el-checkbox-group',
        childName: 'el-checkbox',
        children: [
            {
                label: '选项1',
            },
            {
                label: '选项2',
            },
            {
                label: '选项3',
            },
        ],
    },
    {
        label: '滑动条',
        prop: 'slider',
        componentName: 'el-slider',
        attrs: {
            min: 0,
            max: 100,
        },
    },
    {
        slotName: 'iptComSlot',
    },
    {
        slotName: 'mixSeleteSlot',
    },
    {
        slotName: 'mixSeleteSlot2',
    },
];

const submit = async (model) => {
    if (!ruleFormRef.value) return;
    await ruleFormRef.value.validate((valid) => {
        if (valid) {
            console.log(model);
        }
    });
};

const reset = () => {
    console.log('reset', ruleFormRef.value);
    if (!ruleFormRef.value) return;
    ruleFormRef.value.resetFields();
};

// 业务要求下拉框选中后禁用另一个下拉框
const hideSlot = ref(false);
watchEffect(() => {
    ruleForm.select === '1' && (hideSlot.value = true);
    ruleForm.select === '2' && (hideSlot.value = false);
});
</script>

<style scoped lang="scss">
$width: 50px;

.footer-block {
    display: flex;
    justify-content: center;
}

.form-layout {
    width: $width * 7;
    padding-top: $width;
}

.ipt-block {
    display: flex;
    flex-wrap: wrap;

    &:first-child {
        margin-top: $width;
    }

    & .el-form-item {
        width: 50%;
        padding-bottom: 15px;
    }
}
</style>
