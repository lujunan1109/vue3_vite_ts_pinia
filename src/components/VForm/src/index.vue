<!-- eslint-disable vue/no-mutating-props -->
<template>
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" v-bind="$attrs">
        <!-- 单独渲染没有嵌套结构 -->
        <div v-for="(formItem, inx) in formOptions" :key="inx">
            <el-form-item :label="formItem.label" :prop="formItem.prop">
                <component
                    :is="renderObj[formItem.componentName]"
                    v-model="ruleForm[formItem.prop]"
                    v-bind="formItem.attrs"
                >
                    <div v-if="formItem.childName">
                        <component
                            :is="renderObj[formItem.childName]"
                            v-for="child in formItem.children"
                            :key="child.value"
                            :label="child.label"
                            :value="child.value"
                            :name="child.name"
                        >
                            <slot name="childSlot" :label="child.label"></slot>
                        </component>
                    </div>
                </component>
            </el-form-item>
            <!-- 动态名称自定义插槽 -->
            <slot :name="formItem.slotName"></slot>
        </div>
        <!-- 自定义底部提交部分 -->
        <slot name="footer" :model="ruleForm"></slot>
    </el-form>
</template>
<script setup lang="ts">
import type { FormRules } from 'element-plus';
import { FormOptionType, RuleForm, defineRenderComponentType } from './type';
import {
    ElInput,
    ElButton,
    ElSelect,
    ElOption,
    ElDatePicker,
    ElCascader,
    ElSwitch,
    ElRadio,
    ElCheckbox,
    ElCheckboxGroup,
    ElSlider,
} from 'element-plus';
import { ref, onMounted } from 'vue';

defineProps<{
    ruleForm: RuleForm;
    formOptions: FormOptionType[];
    rules?: FormRules;
}>();

// 建立一个动态组件映射对象
const renderObj: defineRenderComponentType = {
    'el-input': ElInput,
    'el-button': ElButton,
    'el-select': ElSelect,
    'el-option': ElOption,
    'el-date-picker': ElDatePicker,
    'el-cascader': ElCascader,
    'el-switch': ElSwitch,
    'el-radio': ElRadio,
    'el-checkbox': ElCheckbox,
    'el-checkbox-group': ElCheckboxGroup,
    'el-slider': ElSlider,
};
const ruleFormRef = ref();
const emit = defineEmits(['setRef']);
onMounted(() => {
    console.log('子组件', ruleFormRef);
    emit('setRef', ruleFormRef.value);
});

// withDefaults(
//     defineProps<{
//         modelValue: boolean;
//         title: string;
//     }>(),
//     {
//         modelValue: false,
//         title: '弹窗标题',
//     },
// );
</script>
<style lang="scss" scoped></style>
