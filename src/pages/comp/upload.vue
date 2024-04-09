<!--
 * @Description: 上传模块
 * @Author: lujunan
 * @Date: 2024-02-29 18:33:19
 * @LastEditors: lujunan
 * @LastEditTime: 2024-04-08 21:43:18
-->
<template>
    <div>
        <el-upload
            class="avatar-uploader"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :on-progress="handleProgress"
            :before-upload="beforeAvatarUpload"
        >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>

        <div style="margin: 20px">
            <el-button type="primary" @click="customUplaod">手动上传</el-button>
        </div>
        <upload-big-file></upload-big-file>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { Plus } from '@element-plus/icons-vue';

import type { UploadProps } from 'element-plus';

const imageUrl = ref('');

const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile,
) => {
    console.log(uploadFile, 'file');
    imageUrl.value = URL.createObjectURL(uploadFile.raw!);
};

const handleProgress = (evt, uploadFile, uploadFiles) => {
    console.log(evt, uploadFile, uploadFiles, 'evt, uploadFile, uploadFiles');
};

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    console.log(rawFile, 'rawFile');
    if (rawFile.type !== 'image/jpeg') {
        ElMessage.error('Avatar picture must be JPG format!');
        return false;
    } else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('Avatar picture size can not exceed 2MB!');
        return false;
    } else {
        imageUrl.value = URL.createObjectURL(rawFile);
    }
    return false;
};

const customUplaod = () => {
    console.log('customUplaod');
};
</script>

<style scoped>
.avatar-uploader {
    margin: 20px;
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
}
</style>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>
