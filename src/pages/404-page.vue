<template>
    <div class="not-found">
        <el-image
            style="width: 600px; height: 330px"
            :src="notFound"
            fit="cover"
        />
        <div>
            <el-button type="primary">
                <router-link class="link" to="/home">返回主页</router-link>
            </el-button>
        </div>
    </div>
</template>
<script setup lang="ts">
import notFound from '@/assets/404.png';
</script>
<style scoped lang="scss">
.not-found {
    padding-top: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    & .link {
        text-decoration: none;
        color: #fff;
    }
}
</style>
