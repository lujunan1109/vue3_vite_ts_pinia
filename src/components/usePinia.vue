<!--
 * @Description: 使用pinia
 * @Author: lujunan
 * @Date: 2022-06-07 10:01:23
 * @LastEditors: lujunan
 * @LastEditTime: 2022-06-07 10:06:28
-->

<template>
<div class="pinia">
  {{ userStore.name }}
</div>
<button @click.self="updateName"> 点击修改名字</button>
</template>

<script lang="ts" setup>
import { 
  defineComponent, 
  getCurrentInstance, 
  reactive, 
  ref,
  
} from 'vue';

import { useUserStore } from "@/store/user";

const userStore = useUserStore();

const updateName = () => {
  userStore.updateName("lew")
}

</script>

<style lang="scss" scoped>
// @import "xxx";
// @import url(xxx);
</style>
