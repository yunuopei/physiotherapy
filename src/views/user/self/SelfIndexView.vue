<template>
  <el-row>
    <el-col class="top">
      <img src="@/assets/arrow.png" alt="" @click="redirect">
      <span class="text">
            个人中心
          </span>
    </el-col>
  </el-row>
  <div class="scrollbar-body">
    <el-scrollbar >
      <div style="padding-top: 20px;padding-bottom: 10px;background-color: white;">
          <el-row style="margin-left: 10px">
            <el-avatar :size="60" :src="activityJPG" :fit="fill"></el-avatar>
            <div class="info">
              <div style="text-align: left">
                <span style="font-size: 18px;">程小姐</span>
              </div>
              <div style="justify-content: center;display: flex;">
                <span>关注 12</span>
                <el-divider direction="vertical" />
                <span>评价 12</span>
                <el-divider direction="vertical" />
                <span>预约 12</span>
              </div>
            </div>
          </el-row>
          <div style="margin-right: 10px;text-align: right;color:grey;" @click="toUser">
            <span>个人资料</span>
            <DArrowRight style="text-align: right; color: grey; height: 1.1em; width: 1.1em; margin-top: 2px;margin-right: 10px"></DArrowRight>
          </div>
      </div>
      <div class="row" @click="toCollect">
        <div style="text-align: left;">
          <span>我的收藏</span>
        </div>
        <div style="padding-bottom: 10px">
          <el-row>
            <el-col :span="7">
              <a>
                <i style="color: #00C5CD; margin-top: 30px " :class="'fa-solid fa-user-md fa-xl'" />
              </a>
              <span>理疗师</span>
            </el-col>
            <el-col :span="7" :offset="1">
              <a>
                <i style="color: #00C5CD; margin-top: 30px " :class="'fa-solid  fa-medkit fa-xl'" />
              </a>
              <span>理疗项目</span>
            </el-col>
            <el-col :span="7" :offset="1">
              <a>
                <i style="color: #00C5CD; margin-top: 30px " :class="'fa-solid  fa-th-list fa-xl'" />
              </a>
              <span>理疗疗程</span>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="row">
        <div style="display: flex; align-items: center;">
          <span style="text-align: left; ">我的订单</span>
          <div style="flex-grow: 1;"></div>
          <span style="color: grey;font-size: 15px" @click="toOrderList">查看全部订单</span>
          <DArrowRight style="text-align: right; color: grey; height: 1.1em; width: 1.1em; margin-top: 2px;margin-right: 10px"></DArrowRight>
        </div>
      </div>
      <div class="row">
        <div style="text-align: left;">
          <span>常用功能</span>
        </div>
        <div style="color:grey;">
          <el-row>
            <el-col :span="6" @click="toOrder">
              <div style="text-align: center;align-items: center">
                <div style="padding-bottom: 3px">
                  <a>
                    <i style="color: grey; margin-top: 30px " :class="'fa-solid fa-cny fa-xl'" />
                  </a>
                </div>
                <div>
                  <span style="font-size: 15px">账单明细</span>
                </div>
              </div>
            </el-col>
            <el-col :span="6" @click="toEvaluate">
              <div style="text-align: center;align-items: center">
                <div style="padding-bottom: 3px">
                  <a>
                    <i style="color: grey; margin-top: 30px " :class="'fa-solid fa-file-text fa-xl'" />
                  </a>
                </div>
                <div>
                  <span style="font-size: 15px">我的评价</span>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div style="text-align: center;align-items: center">
                <div style="padding-bottom: 3px">
                  <a>
                    <i style="color: grey; margin-top: 30px " :class="'fa-solid fa-credit-card fa-xl'" />
                  </a>
                </div>
                <div>
                  <span style="font-size: 15px">办理会员</span>
                </div>
              </div>
            </el-col>
            <el-col :span="6" @click="toPwd">
              <div style="text-align: center;align-items: center">
                <div style="padding-bottom: 3px">
                  <a>
                    <i style="color: grey; margin-top: 30px " :class="'fa-solid fa-cog fa-xl'" />
                  </a>
                </div>
                <div>
                  <span style="font-size: 15px">修改密码</span>
                </div>
              </div>
            </el-col>
            <el-col :span="6" @click="toConnect">
              <div style="text-align: center;align-items: center">
                <div style="padding-bottom: 3px">
                  <a>
                    <i style="color: grey; margin-top: 30px " :class="'fa-solid fa-commenting fa-xl'" />
                  </a>
                </div>
                <div>
                  <span style="font-size: 15px">联系我们</span>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup>
import {DArrowRight} from '@element-plus/icons-vue'
import activityJPG from "@/assets/ren2.jpg"
import router from "@/router";
const toOrder =()=>{
  router.push('/user/self/order');
}
const toEvaluate=()=>{
  router.push('/user/self/function/evaluate')
}
const toPwd =()=>{
  router.push('/user/self/infor/pwd')
}
const toConnect=()=>{
  router.push('/user/self/function/connect')
}
const toCollect=()=>{
  router.push('/user/self/function/collect')
}
const toOrderList=()=>{
  router.push('/user/self/order/list')
}
const toUser=()=>{
  router.push('/user/self/infor/detail')
}
const redirect=()=>{
  router.back();
}
</script>

<style scoped>
.info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px; /* 调整名称与 el-avatar 之间的间距 */
  text-align: right;
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
.scrollbar-body{
  display: flex;
  flex-direction: column;
  position: relative;
  top: 50px;
  width: 100%;
  height: calc(100% - 50px);
}
.row{
  background-color: white;
  margin-top: 7px;
  margin-right: 10px;
  margin-left: 10px;
  border-radius: 10px;
  padding: 10px;
}
</style>