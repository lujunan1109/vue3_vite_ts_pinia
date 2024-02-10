<template>
    <div class="container">
        <el-popover placement="bottom-start" :width="210" trigger="click">
            <template #reference>
                <div>
                    <el-select
                        v-model="checkTag"
                        multiple
                        collapse-tags
                        :placeholder="placeholder"
                        style="width: 240px"
                    >
                        <el-option value="value">
                            <template #default>
                                <el-tree
                                    ref="treeRef"
                                    :data="data"
                                    show-checkbox
                                    default-expand-all
                                    node-key="id"
                                    :default-checked-keys="defaultKeys"
                                    :props="defaultProps"
                                    @check-change="checkChange"
                                >
                                    <template #default="{ node, data }">
                                        <span v-if="data.children">
                                            <el-icon><Folder /></el-icon>
                                        </span>
                                        <span v-else>
                                            <el-icon><Tickets /></el-icon>
                                        </span>
                                        <span class="custom-tree-node">
                                            <span>{{ node.label }}</span>
                                        </span>
                                    </template>
                                </el-tree>
                            </template>
                        </el-option>
                    </el-select>
                </div>
            </template>
        </el-popover>
    </div>
</template>

<script setup lang="ts">
import { ref, Ref, onMounted, watch, toRaw } from 'vue';
import { Node, CheckIDType, DefaultPropsType } from './type';

const props = withDefaults(
    defineProps<{
        data: Node[];
        defaultProps?: DefaultPropsType;
        defaultKeys?: number[];
        placeholder?: string;
    }>(),
    {
        data: () => [
            {
                id: 1,
                label: '一级 1',
            },
        ],
        defaultProps: () => ({
            children: 'children',
            label: 'label',
        }),
        defaultKeys: () => [],
        placeholder: '请选择节点',
    },
);

// 扁平化tree
const flatten = (arr: Node[]): Node[] => {
    return arr.reduce<Node[]>((prev, cur) => {
        return prev.concat(cur.children ? flatten(cur.children) : cur);
    }, []);
};
const flatData = flatten(props.data);

// 通过label找到对应节点id
const findNodeIds = (arr: Node[], labels: string[]): number[] => {
    const ids: number[] = [];
    let len = arr.length;
    let i = 0;
    while (len--) {
        if (labels.length === ids.length) {
            break;
        }
        if (labels.includes(arr[i].label)) {
            ids.push(arr[i].id);
        }
        i++;
    }
    return ids;
};

const treeRef = ref();
const emit = defineEmits(['update:modelValue', 'setTreeRef']);

// 选中多选框回调同步下拉框的选中tag
const checkChange = () => {
    checkTag.value = [];
    const checkedNodes = treeRef.value.getCheckedNodes();
    const checkIds: CheckIDType[] = [];
    checkedNodes.forEach((node) => {
        checkTag.value.push(node.label);
        checkIds.push(node.id);
    });
    emit('update:modelValue', checkIds);
};

// 下拉框选中
const checkTag: Ref<string[]> = ref([]);
// 监听下拉框数据去同步tree选中状态
watch(
    () => checkTag.value,
    (val) => {
        let copyDefaultKeys = findNodeIds(flatData, val);
        treeRef.value.setCheckedKeys(toRaw(copyDefaultKeys));
    },
);

onMounted(() => {
    checkChange();
    // 暴露treeRef让外部调用
    emit('setTreeRef', treeRef);
});
</script>

<style lang="scss" scoped>
.container {
    padding: 20px;
}

// .el-select-dropdown__item::v-deep {
//     padding: 0;
//     height: auto;
// }
.el-select-dropdown__item {
    padding: 0;
    height: auto;
}
</style>
