<template>
    <div class="icon-block">
        <el-icon v-show="isCollapse" size="normal" @click="handleClick(false)"
            ><Expand
        /></el-icon>
        <el-icon v-show="!isCollapse" size="normal" @click="handleClick(true)"
            ><Fold
        /></el-icon>

        <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item :to="{ path: '/home' }">
                首页
            </el-breadcrumb-item>
            <el-breadcrumb-item
                v-if="breadMenu.path !== '/home'"
                :to="{ path: breadMenu.path }"
                >{{ breadMenu.label }}</el-breadcrumb-item
            >
        </el-breadcrumb>
    </div>
    <div class="keep-alive-tag">
        <el-tag
            v-for="tag in menuTags"
            :key="tag.name"
            class="mx-1"
            closable
            size="large"
            :type="tag.type"
            :effect="tag.checked"
            @click="clickHandle(tag)"
            @close="handleClose(tag)"
        >
            {{ tag.name }}
        </el-tag>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useMenuStore } from '@/store/menu';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { ArrowRight } from '@element-plus/icons-vue';

const $router = useRouter();
const menuStore = useMenuStore();
let { menueWidthState, menuTags, breadMenu } = storeToRefs(menuStore);
const isCollapse = ref(menueWidthState);
const handleClick = (state) => {
    isCollapse.value = state;
    menueWidthState.value = state;
};

type Tag = {
    name: string;
    type: string;
    checked: string;
    path: string;
};

const handleClose = (tag: Tag) => {
    menuTags.value.splice(menuTags.value.indexOf(tag), 1);
};

const clickHandle = (tag: Tag) => {
    // 重置选中效果
    menuTags.value = menuTags.value.map((t) => {
        t.checked = 'plain';
        return t;
    });
    // 跳转到选中页面
    $router.push({ path: tag.path });
    // 选中效果
    const inx = menuTags.value.findIndex((t) => t.name === tag.name);
    menuTags.value[inx].checked = 'dark';
};

// 监听router获取面包屑数据
type Node = {
    path: string;
    label: string;
};
const currentPathNode = ref<Node>({ path: '', label: '' });
watch(
    () => $router.currentRoute.value,
    (toValue) => {
        if (toValue.path !== '/home') {
            currentPathNode.value = {
                path: toValue.path,
                label: toValue.meta.title as string,
            };
        }
    },
    { immediate: true, deep: true },
);
</script>
<style scoped lang="scss">
.icon-block {
    display: flex;
    align-items: center;
    background-color: #fff;
    height: 45px;
    & .el-icon {
        cursor: pointer;
        padding-right: 20px;
    }
}
.keep-alive-tag {
    height: 35px;
    & .el-tag--large.is-closable {
        margin-right: 5px;
        cursor: pointer;
    }
}
</style>
