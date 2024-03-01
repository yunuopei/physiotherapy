<template>
  <el-button type="primary" size="default" :icon='Plus' @click="toUser">跳转</el-button>
</template>
<script setup lang="ts">
import {Plus} from '@element-plus/icons-vue';
import router from "@/router";
const toUser=()=>{
  router.push('/user/home')
}
</script>
<style scoped>

</style>

