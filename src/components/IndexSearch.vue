<script setup lang="ts">
import { ref } from 'vue'
import {Search} from '@element-plus/icons-vue'
import axios from "axios";
import myEventBus from '../myEventBus.js'
// import bus
const message = ref('')
const activities = ref({})
const emitter = myEventBus()
const handleEnter = async () => {
  await axios.post('/front/activity/list/', {
    name: message.value,
    status:2
  }).then((res) => {
    // console.log(message.value)
    activities.value = res.data.data
    // console.log(activities.value)
    emitter.emit("act", activities.value)
  })
}
</script>

<template>
  <el-row class="top">
    <el-row class="div_search">
      <el-input ref="input" :prefix-icon="Search" class="search" v-model="message" @keyup.enter="handleEnter" placeholder="搜索" />
      <div class="div-search" @click="handleEnter" >
        搜索
      </div>
    </el-row>

  </el-row>
</template>

<style scoped>
.top{
  background-color: #00C5CD;
  width: 100%;
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
}
.div_search{
  width: 90%;
}
.search{
  width: 85%;

  text-align: center;
}
.div-search{
  display: flex;
  margin-left: 10px;
  font-size: 18px;
  color: #ffffff;
  align-items: center;
  justify-content: center;
}
</style>