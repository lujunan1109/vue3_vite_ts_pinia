<template>
    <div class="icon-block">
        <el-icon v-show="isCollapse" size="normal" @click="handleClick(false)"
            ><Expand
        /></el-icon>
        <el-icon v-show="!isCollapse" size="normal" @click="handleClick(true)"
            ><Fold
        /></el-icon>
    </div>
    <div class="keep-alive-tag">
        <el-tag
            v-for="tag in tags"
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

const menuStore = useMenuStore();
let { menueWidthState } = storeToRefs(menuStore);
const isCollapse = ref(menueWidthState);
const handleClick = (state) => {
    isCollapse.value = state;
    menueWidthState = state;
};

const tags = ref([
    { name: '首页 1', type: '', checked: 'plain' },
    { name: '人生 2', type: '', checked: 'plain' },
    { name: '404 2', type: '', checked: 'plain' },
]);

type Tag = {
    name: string;
    type: string;
    checked: string;
};

const handleClose = (tag: Tag) => {
    tags.value.splice(tags.value.indexOf(tag), 1);
};

const clickHandle = (tag: Tag) => {
    // reset
    tags.value = tags.value.map((t) => {
        t.checked = 'plain';
        return t;
    });
    const inx = tags.value.findIndex((t) => t.name === tag.name);
    tags.value[inx].checked = 'Dark';
};
</script>
<style scoped lang="scss">
.icon-block {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    height: 45px;
    & .el-icon {
        cursor: pointer;
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
