<template>
    <div>
        <div class="top-content box-shadow-bg">管理员$晚上好$-github地址</div>

        <div class="mid-content box-shadow-bg">图表$曲线图</div>

        <div class="footer-content box-shadow-bg">底部三个图</div>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
$el-text-color-regular: #606266;
$el-bg-color-overlay: #ffffff;
$el-border-color: #dcdfe6;
$el-box-shadow-dark: 0px 16px 48px 16px rgba(0, 0, 0, 0.08),
    0px 12px 32px rgba(0, 0, 0, 0.12), 0px 8px 16px -8px rgba(0, 0, 0, 0.16);
.box-shadow-bg {
    font-weight: 700;
    color: $el-text-color-regular;
    background: $el-bg-color-overlay;
    border-color: $el-border-color;
    box-shadow: $el-box-shadow-dark;
}

.top-content {
    padding: 20px;
    height: 80px;
}

.mid-content {
    height: 120px;
    padding: 20px;
    margin: 20px 0;
}

.footer-content {
    height: 500px;
    padding: 20px;
}
</style>
