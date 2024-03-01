<template>
  <el-row>
    <el-col class="top">
      <img src="@/assets/arrow.png" alt="" @click="redirect">
      <span class="text">
            理疗师详情
          </span>
      <span style="font-size: 17px ;color: white; margin-left: auto;margin-right: 10px">
        </span>
    </el-col>
  </el-row>
  <el-scrollbar class="scrollbar-body">
    <div style="  background-color: white;">
      <div class="therapistimage">
        <img src="@/assets/ren.jpg">
        <el-affix class="affix" style="position: absolute; top: 20px; right: 0px;background-color:rgba(	0,197,205,0.5);padding: 5px;border-top-left-radius: 10px;border-bottom-left-radius:10px ">
          <ChatDotRound style="width: 1.3em;height: 1.3em;" />
          <span style="margin-right: 10px">咨询</span>
        </el-affix>
      </div>
      <div class="divider"></div>
      <div>
        <el-row class="row">
          <span style="text-align: left;margin-left: 10px;font-size: 20px;font-weight: bolder;color: black">张公子</span>
          <span style="text-align: right;margin-right: 10px">
           <el-rate
               v-model="value"
               disabled
               show-score
               text-color="#ff9900"
               score-template="{value} 分"
           />
        </span>
        </el-row>
      </div>
      <div class="row">
        <span class="spantext">已选择：500</span>
        <el-button :style="{ backgroundColor: buttonColor }" @click="toggleStar" round style="text-align: right;margin-right: 10px;border-color:#eebe77 ">
          <Star v-if="!collected" style="color: black;height: 1.4em;width: 1.4em"  ></Star>
          <span v-if="!collected" style="color: black;font-size: 14px;">收藏</span>
          <span v-if="collected" style="color: black;font-size: 14px;">已收藏</span>
        </el-button>
      </div>
      <div style="background-color: rgba(	127,255,212,0.3);margin-top: 5px;padding: 5px;text-align: left;">
        <CircleCheck style="color:	#2E8B57;height: 1em;width: 1em;margin-left: 10px;margin-right: 2px"></CircleCheck>
        <span style="color:#2E8B57;margin-right: 20px;font-size: 15px">健康认证</span>
        <Document style="color:	#2E8B57;height: 1em;width: 1em;margin-right: 2px"></Document>
        <span style="color:#2E8B57;font-size: 15px">资格认证</span>
      </div>
    </div>
    <div  style="  background-color: white;margin-top: 7px;padding: 5px" @click="toIntro">
      <div style="display: flex; align-items: center; margin-left: 10px;" >
        <span style="text-align: left; font-size: 18px; letter-spacing: 2px; font-weight: bolder">理疗师简介</span>
        <div style="flex-grow: 1;"></div>
        <span style="color: grey;font-size: 15px" >查看全部简介</span>
        <DArrowRight style="text-align: right; color: grey; height: 1.1em; width: 1.1em; margin-top: 2px;margin-right: 10px"></DArrowRight>
      </div>
      <div style="text-align: left;margin-left: 10px">
        <text style="font-size: 13px;color: grey">
          你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好
        </text>
      </div>
    </div>
    <div  style="  background-color: white;margin-top: 7px;padding: 5px" @click="toEvaluate">
      <div style="display: flex; align-items: center; margin-left: 10px;">
        <span style="text-align: left; font-size: 18px; letter-spacing: 2px;font-weight: bolder">理疗师评价</span>
        <div style="flex-grow: 1;"></div>
        <span style="color: grey;font-size: 15px">查看全部评价</span>
        <DArrowRight style="text-align: right; color: grey; height: 1.1em; width: 1.1em; margin-top: 2px;margin-right: 10px"></DArrowRight>
      </div>
      <div>
        <el-row class="row">
          <span style="text-align: left;margin-left: 10px">
            小张同志
           <el-rate
               v-model="value"
               disabled
               show-score
               text-color="#ff9900"
               score-template="{value} 分"
           />
        </span>
        </el-row>
        <el-row style="margin-left: 10px;text-align: left;color: grey;font-size: 13px">
          <text>好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好</text>
        </el-row>
        <el-row style="justify-content: flex-end;">
          <span style="margin-right: 10px; font-size: 13px;color: grey">2024-01-01 12:12:12</span>
        </el-row>
      </div>
    </div>
    <TherapistList/>
  </el-scrollbar>
</template>

<script setup lang="ts">
import {Star,User,CircleCheck,Document,DArrowRight,ChatDotRound} from '@element-plus/icons-vue'
import {computed, onMounted, ref} from "vue";
import activityJPG from "@/assets/logo.png"
import activityJPG1 from "@/assets/show1.jpg"
import {ElAffix,} from "element-plus"
import router from "@/router";
import TherapistList from "@/components/therapist/List.vue"

const value=ref(4.5)
const collected = ref(false); // 收藏状态，初始为未收藏
const buttonColor = computed(() => {
  return collected.value ? '#eebe77' : 'white'; // 根据收藏状态计算按钮颜色
});
const toEvaluate=()=>{
  router.push('/user/home/therapist/evaluate')
}
const toIntro=()=>{
  router.push('/user/home/therapist/intro')
}
const redirect=()=>{
  router.back();
}
function toggleStar() {
  collected.value = !collected.value; // 切换收藏状态
}
</script>

<style scoped>
.affix {
  z-index: 999;
}
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
.therapistimage{
  width:100%;
  height: 300px;
}
.therapistimage img{
  width:100%;
  height: 100%;
}
.divider {
  width: 100%;
  height: 1px;
  background-color: gainsboro; /* 设置横线的颜色 */
  margin-top: 1px; /* 调整横线与上方元素的间距 */
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
  display: flex;
  justify-content: space-between;
  margin-top: 10px
}
.spantext{
  margin-right: 10px;
  color: grey;
  font-size: 14px;
  text-align: left;
  margin-left: 10px;
}
.el-rate{
  height: 0px;
}
</style>