<template>
  <el-row>
    <el-col class="top">
      <img src="@/assets/arrow.png" alt="" @click="redirect">
      <span class="text">
            理疗疗程详情
          </span>
      <span style="font-size: 17px ;color: white; margin-left: auto;margin-right: 10px">
        </span>
    </el-col>
  </el-row>
  <el-col class="scrollbar-body">
    <el-scrollbar style="height: calc(100% - 50px);">
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
          <span style="text-align: left;margin-left: 10px;font-size: 20px;font-weight: bolder;color: black">疏通脉络疗程</span>
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
      <div class="row" style="padding-bottom: 5px">
        <span class="spantext">已选择：500</span>
        <el-button :style="{ backgroundColor: buttonColor }" @click="toggleStar" round style="text-align: right;margin-right: 10px;border-color:#eebe77 ">
          <Star v-if="!collected" style="color: black;height: 1.4em;width: 1.4em"  ></Star>
          <span v-if="!collected" style="color: black;font-size: 14px;">收藏</span>
          <span v-if="collected" style="color: black;font-size: 14px;">已收藏</span>
        </el-button>
      </div>
    </div>
      <div  style="  background-color: white;margin-top: 7px;padding: 5px">
        <div style="display: flex; align-items: center; margin-left: 10px;">
          <span style="text-align: left; font-size: 18px; letter-spacing: 2px;font-weight: bolder">疗程简介</span>
        </div>
        <div style="text-align: left;margin-left: 10px;">
          <text>
            第一步：中医讲“通则不痛，痛则不通”，用上易元正祛痛穴位贴后，首先消除关节内的无菌性炎症，解除髓核对神经根的压迫，压迫解除疼痛、酸胀、麻木不适情况自然就消除。再则舒筋活血，打通经络，大部分患者使用24—72小时即可完成炎症、水肿消除期，此时疼痛、酸困、麻木症状减轻明显！
            <br>第二步：通过穴位贴敷靶向吸收，把突出的髓核让其脱水、萎缩、变小回到纤维环内。使其恢复以前的原有功能和弹性，根据个体差异大约需要1-2个疗程，突出的髓核不再压迫神经，神经根的水肿和腰椎原有的功能恢复后，身体现有症状即可消失，恢复如初！
            <br>第三步：突出的髓核消失和受损的纤维环修复，大约需要1—2个疗程。受损的纤维环修复以后，就不会再有突出的出现。受损的纤维环修复后，突出的髓核回到纤维环内关节稳定性就会大大提高，就算再负重，或者再做剧烈运动，也不会有复发的情况出现，从此，关节就不疼不麻，也不会再复发了。
          </text>
        </div>
      </div>
      <div  style="  background-color: white;margin-top: 7px;padding: 5px" @click="toEvaluate">
      <div style="display: flex; align-items: center; margin-left: 10px;">
        <span style="text-align: left; font-size: 18px; letter-spacing: 2px;font-weight: bolder">疗程评价</span>
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
    <ProjectsDetail/>
  </el-scrollbar>
  </el-col>
  <el-row>
    <el-col class="bottom">
      <div class="menuItem" @click="toHome">
        <i class="bottom-icon fa-solid fa-home"></i>
        <span>首页</span>
      </div>
      <div class="menuItem" @click="toSelf">
        <i class="bottom-icon fa-solid fa-user"></i>
        <span>我的</span>
      </div>
      <el-button round type="" style="background-color:#00C5CD;color: white;height: 60% ;width:50%;margin-left: 10px" @click="toBuy">立即购买</el-button>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import {Star,User,CircleCheck,Document,DArrowRight,ChatDotRound} from '@element-plus/icons-vue'
import {computed, onMounted, ref} from "vue";
import activityJPG from "@/assets/logo.png"
import activityJPG1 from "@/assets/show1.jpg"
import {ElAffix,} from "element-plus"
import router from "@/router";
import ProjectsDetail from "@/components/projects/Detail.vue"

const value=ref(4.5)
const collected = ref(false); // 收藏状态，初始为未收藏
const buttonColor = computed(() => {
  return collected.value ? '#eebe77' : 'white'; // 根据收藏状态计算按钮颜色
});
const toEvaluate=()=>{
  router.push('/user/home/project/evaluate')
}
const redirect=()=>{
  router.back();
}
function toggleStar() {
  collected.value = !collected.value; // 切换收藏状态
}
const toBuy=()=>{
  router.push('/user/home/project/order')
}
const toSelf=()=>{
  router.push('/user/self')
}
const toHome=()=>{
  router.push('/user/home')
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
  height: 100%;
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
.bottom {
  position: fixed;
  background-color: white;
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  z-index: 999;
}
.menuItem {
  cursor: pointer;
  align-items: center;
  padding-left: 10px;
  width: 60px;
  font-size: 16px;
  text-align: center;
  display: flex;
  flex-flow: column;
.bottom-icon {
  color: black;
  margin-top: 5px;
  font-size: 24px;
}
}
</style>