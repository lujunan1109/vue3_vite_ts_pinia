<template>
    <div class="container">
        <el-popover placement="bottom-start" :width="210" trigger="click">
            <template #reference>
                <div>
                    <el-select
                        v-model="checkTag"
                        multiple
                        collapse-tags
                        placeholder="请选择节点"
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
<script lang="ts" setup>
type Node = {
    id: number;
    label: string;
    children?: Node[];
};

const defaultProps = {
    children: 'children',
    label: 'label',
};
const defaultKeys = ref([5]);
const data = [
    {
        id: 1,
        label: 'Level one 1',
        children: [
            {
                id: 4,
                label: 'Level two 1-1',
                children: [
                    {
                        id: 9,
                        label: 'Level three 1-1-1',
                    },
                    {
                        id: 10,
                        label: 'Level three 1-1-2',
                    },
                ],
            },
        ],
    },
    {
        id: 2,
        label: 'Level one 2',
        children: [
            {
                id: 5,
                label: 'Level two 2-1',
            },
            {
                id: 6,
                label: 'Level two 2-2',
            },
        ],
    },
    {
        id: 3,
        label: 'Level one 3',
        children: [
            {
                id: 7,
                label: 'Level two 3-1',
            },
            {
                id: 8,
                label: 'Level two 3-2',
            },
        ],
    },
];

// 扁平化tree
const flatten = (arr: Node[]): Node[] => {
    return arr.reduce((prev, cur) => {
        return prev.concat(cur.children ? flatten(cur.children) : cur);
    }, []);
};
const flatData = flatten(data);

// 通过label快速找到对应节点id
const findNodeIds = (arr: Node[], labels: string[]): number[] => {
    const ids = [];
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
const emit = defineEmits(['update:modelValue']);
const checkChange = () => {
    checkTag.value = [];
    const checkedNodes = treeRef.value.getCheckedNodes();
    const checkIds = [];
    checkedNodes.forEach((node) => {
        checkTag.value.push(node.label);
        checkIds.push(node.id);
    });
    emit('update:modelValue', checkIds);
};

const checkTag = ref([]);
// 监听下拉框数据去同步tree选中状态
watch(
    () => checkTag.value,
    (val) => {
        console.log(val, 1111);
        defaultKeys.value = findNodeIds(flatData, val);
        console.log(defaultKeys.value, 2222);
        treeRef.value.setCheckedKeys(toRaw(defaultKeys.value));
    },
);

onMounted(() => {
    checkChange();
    // 获取选中的权限数据
    // console.log(treeRef.value.getCheckedKeys(), 'treeRef.getCheckedKeys()');
});
</script>
<style scoped lang="scss">
.container {
    padding: 20px;
}

.el-select-dropdown__item::v-deep {
    padding: 0;
    height: auto;
}
</style>
