<!--
 * @Description: 404页面
 * @Author: lujunan
 * @Date: 2022-06-12 14:26:30
 * @LastEditors: lujunan
 * @LastEditTime: 2024-02-06 18:20:09
-->

<template>
    <div class="not-found">404 NOT FOUND</div>
    <div class="go-home">
        <router-link to="/home"> GO HOME</router-link>
    </div>
</template>

<style lang="scss" scoped>
.not-found {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    text-align: center;
    font-weight: bold;
    color: #fff;
    background-color: #1d1d1d;
}
.go-home a {
    position: absolute;
    left: 50%;
    top: 60%;
    transform: translate(-50%, -50%);
    color: #fff;
    font-weight: 600;
}
</style>
