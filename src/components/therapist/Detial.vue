<template>
  <el-row style="margin-top: 5px">
    <el-avatar :size="70" :src="activityJPG" :fit="fill"></el-avatar>
    <div class="info">
      <div style="text-align: left">
        <span style="font-size: 18px;">程小姐</span>
      </div>
      <div style="text-align: left">
        <el-rate
            v-model="value"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value} 分"
            size="large"
        />
      </div>
      <div style="color: grey">
        <span>粉丝:40人</span>
        <span style="margin-left: 20px">已选择:140人</span>
      </div>
    </div>
  </el-row>
</template>

<script setup>
import {ref,} from 'vue'
import activityJPG from "@/assets/ren.jpg"
const value=ref(5)
</script>

<style scoped>
/deep/ .el-rate{
  height:0px;
}
</style>