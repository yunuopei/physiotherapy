<template>
  <el-row>
    <el-col class="top">
      <img src="@/assets/arrow.png" alt="" @click="redirect">
      <span class="text">
            理疗项目详情
          </span>
      <span style="font-size: 17px ;color: white; margin-left: auto;margin-right: 10px">
        </span>
    </el-col>
  </el-row>
  <el-col class="scrollbar-body">
    <el-scrollbar style="height: calc(100% - 50px);">
      <div style="  background-color: white;border-bottom-left-radius:10px;border-bottom-right-radius:10px; ">
        <div class="therapistimage">
          <img src="@/assets/show1.jpg">
          <el-affix class="affix" style="position: absolute; top: 20px; right: 0px;background-color:rgba(	0,197,205,0.5);padding: 5px;border-top-left-radius: 10px;border-bottom-left-radius:10px ">
            <ChatDotRound style="width: 1.3em;height: 1.3em;" />
            <span style="margin-right: 10px">咨询</span>
          </el-affix>
        </div>
        <div>
          <el-row class="row">
            <span style="text-align: left;margin-left: 10px;font-size: 20px;font-weight: bolder;color: black">一起来针灸</span>
            <span class="spantext">已选择：500</span>
          </el-row>
        </div>
        <div class="row" style="  padding-bottom: 5px;">
          <el-button :style="{ backgroundColor: buttonColor }" @click="toggleStar" round style="text-align: right;margin-right: 10px;border-color:#eebe77 ">
            <Star v-if="!collected" style="color: black;height: 1.4em;width: 1.4em"  ></Star>
            <span v-if="!collected" style="color: black;font-size: 14px;">收藏</span>
            <span v-if="collected" style="color: black;font-size: 14px;">已收藏</span>
          </el-button>
          <span style="margin-right: 10px;margin-top: 5px;font-size: 18px">￥2000.00</span>
        </div>
      </div>
      <div style="margin-top: 7px;background-color: white;border-radius: 10px;">
        <div style="text-align: left;padding-top: 10px;margin-left: 10px">
          <span>可选择理疗师</span>
        </div>
        <div>
          <el-scrollbar style="height: 150px;background-color: white;padding: 5px;padding-bottom: 10px">
            <div class="container">
              <div class="item" v-for="day in 7" :key="day" @click="toOrder">
                <el-card :body-style="{ padding: '0px' }">
                  <div style="width: 110px;height: 100px">
                    <img :src="activityJPG2" class="image"/>
                  </div>
                  <div>
                    <span style="text-align:center;font-size:14px;font-weight: bold;display: inline-block; width:70%;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;" >张公子</span>
                  </div>
                  <div>
                    <el-rate
                        v-model="value"
                        disabled
                        show-score
                        text-color="#ff9900"
                        score-template="{value}"
                        size="small"
                        shadow="never"
                    />
                  </div>
                </el-card>
              </div>
            </div>
          </el-scrollbar>
        </div>
      </div>
      <div style="margin-top: 7px;background-color: white;border-radius: 10px;">
        <div style="text-align: left;padding-top: 10px;margin-left: 10px">
          <span style="padding-bottom: 5px;font-size: 17px">理疗项目介绍</span>
        </div>
        <el-divider style="margin: 5px"/>
        <div style="text-align: left;margin-right: 10px;margin-left: 10px">
          <text>
            针灸是针刺法和艾灸法的统称，是祖国医学宝贵遗产之一。由于二者都是通过调整经络脏腑气血的功能达到治病的目的，常配合使用，所以合称为针灸。其内容包括经络、腧穴、针灸方法及临床治疗等。由于针灸具有操作简便、适应症广、疗效明显和经济安全等优点。因此数千年来深受广大劳动人民的欢迎。
          </text>
        </div>
      </div>
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
import {Star,User,CircleCheck,Document,DArrowRight,ChatDotRound,Position} from '@element-plus/icons-vue'
import {ElRate,} from "element-plus"
import {computed, onMounted, ref} from "vue";
import activityJPG from "@/assets/logo.png"
import activityJPG1 from "@/assets/show1.jpg"
import activityJPG2 from "@/assets/ren.jpg"
import {ElAffix,} from "element-plus"
import router from "@/router";

const value=ref(4.5)
const collected = ref(false); // 收藏状态，初始为未收藏
const buttonColor = computed(() => {
  return collected.value ? '#eebe77' : 'white'; // 根据收藏状态计算按钮颜色
});
const redirect=()=>{
  router.back();
}
function toggleStar() {
  collected.value = !collected.value; // 切换收藏状态
}
const toOrder=()=>{
  router.push('/user/home/therapist/order')
}
const toSelf=()=>{
  router.push('/user/self')
}
const toHome=()=>{
  router.push('/user/home')
}
const toBuy=()=>{
  router.push('/user/home/order')
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
  margin-top: 10px;
}
.spantext{
  margin-right: 10px;
  color: grey;
  font-size: 14px;
  text-align: left;
  margin-left: 10px;
}
/deep/ .el-rate{
  --el-rate-height: 5px;
  --el-rate-icon-margin: 0px;
}
.container {
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
}
.image {
  height: 100%;
  width: 100%;
  display: block;
}
.item {
  width: 110px;
  height: 150px;
  margin-left: 5px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
/deep/ .el-scrollbar__thumb {
  display: none;
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