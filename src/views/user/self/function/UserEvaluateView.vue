<template>
  <el-row>
    <el-col class="top">
      <img src="@/assets/arrow.png" alt="" @click="redirect">
      <span class="text">
            我的评价
          </span>
    </el-col>
  </el-row>
  <div class="scrollbar-body">
    <el-scrollbar>
      <div class="row" v-for="index in 10">
        <el-row style="display: flex; align-items: center;margin-top: 5px">
          <el-avatar :size="25" :src="activityJPG" :fit="fill" shape="square"></el-avatar>
          <span style="margin-left: 3px; font-weight: bolder;">来泡个脚吧</span>
          <el-icon><ArrowRight /></el-icon>
          <div style="margin-left: auto; text-align: right;margin-right: 10px">
            <el-icon><More /></el-icon>
          </div>
        </el-row>
        <el-row>
          <el-rate
              v-model="value"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}分"
              size="small"
          />
        </el-row>
        <el-row>
          泡完脚了十分舒服，下次还来；全身都暖和了！！！力荐力荐！！！
        </el-row>
        <div style="text-align: right">
          <span style="color: grey;font-size: 15px">2024-12-12 10:10:10</span>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup>
import router from "@/router";
import activityJPG from "@/assets/show2.jpg"
import {computed, onMounted, ref} from "vue";
const value=ref(5)
const redirect=()=>{
  router.back();
}
</script>

<style scoped>
.top{
  position: fixed;
  background-color: #00C5CD;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  z-index: 999;
}
.top img{
  width: 30px;
  height: 30px;
  margin-top: 8px;
  transform: scale(0.8);
}
.text{
  margin-top: 4px;
  margin-left: 5px; /* 将 "登录" 文字置于右侧位置 */
  font-size: 17px;
  color: #ffffff;
  font-weight: bold;
}
.scrollbar-body{
  display: flex;
  flex-direction: column;
  position: relative;
  top: 50px;
  width: 100%;
  height: calc(100% - 50px);
}
.row{
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 10px;
  background-color: white;
  border-radius: 10px;
  padding: 5px;
  text-align: left;
}
</style>