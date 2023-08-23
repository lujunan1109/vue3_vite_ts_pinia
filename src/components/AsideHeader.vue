<template>
    <div class="icon-block">
        <div>
            <el-icon
                v-show="isCollapse"
                size="normal"
                @click="handleClick(false)"
                ><Expand
            /></el-icon>
            <el-icon
                v-show="!isCollapse"
                size="normal"
                @click="handleClick(true)"
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

        <div class="header-right-tab">
            <el-icon v-if="isFullscreen" @click="fullScreen"
                ><FullScreen
            /></el-icon>
            <el-icon v-else @click="fullScreen"><RefreshLeft /></el-icon>

            <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                    <el-icon><Operation /></el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="default"
                            >默认</el-dropdown-item
                        >
                        <el-dropdown-item command="large"
                            >大型</el-dropdown-item
                        >
                        <el-dropdown-item command="small"
                            >小型</el-dropdown-item
                        >
                    </el-dropdown-menu>
                </template>
            </el-dropdown>

            <el-dropdown @command="triggerCom">
                <span class="el-dropdown-link">
                    <el-image
                        style="width: 40px; height: 40px"
                        :src="userUrl"
                        fit="fill"
                    />
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="/home"
                            >首页</el-dropdown-item
                        >
                        <el-dropdown-item command="/login"
                            >退出</el-dropdown-item
                        >
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
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
import { ref, nextTick, inject } from 'vue';
import { useMenuStore } from '@/store/menu';
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';
import { ArrowRight } from '@element-plus/icons-vue';
import { useGlobalStore } from '@/store/global';
import userUrl from '@/assets/user.gif';
import screenfull from 'screenfull';

const $router = useRouter();
const $route = useRoute();
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

// 设置ui尺寸
type Func = () => void;
const reloadPage: Func = inject('reloadPage');
const globalStore = useGlobalStore();
const handleCommand = (data) => {
    globalStore.setUiSize(data);
    reloadPage();
};

// 用户头像点击事件
import { ElMessage, ElMessageBox } from 'element-plus';
const triggerCom = (data) => {
    if (data === '/login') {
        ElMessageBox.confirm('你确定退出吗', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
        }).then(() => {
            $router.push({ path: data });
        });
    } else {
        $router.push({ path: data });
    }
};

// 全屏实现
const isFullscreen = ref(true);
const fullScreen = () => {
    // 当前全屏状态
    isFullscreen.value = screenfull.isFullscreen;
    if (!screenfull.isEnabled) {
        ElMessage({
            type: 'warning',
            message: '你的浏览器不支持全屏',
        });
    }
    screenfull.toggle();
};
</script>
<style scoped lang="scss">
.icon-block {
    display: flex;
    align-items: center;
    background-color: #fff;
    height: 45px;
    justify-content: space-between;
    & .el-icon {
        cursor: pointer;
        padding-right: 20px;
    }
    & .header-right-tab {
        display: flex;
        align-items: center;
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
