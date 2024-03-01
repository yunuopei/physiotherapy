<template>
  <el-row>
    <el-col class="top">
      <img src="@/assets/arrow.png" alt="" @click="redirect">
      <span class="text">
            预约下单
          </span>
    </el-col>
  </el-row>
  <div class="scrollbar-body">
    <el-scrollbar >
      <div style="background-color: white;margin-right: 10px;margin-left: 10px;border-radius: 10px;margin-top: 7px">
        <el-row style="margin-left: 10px;padding: 3px">
          <el-col :span="7">
            <div class="el-col-div-img">
              <img  :src="activityJPG1" alt="">
            </div>
          </el-col>
          <el-col class="div-context" :span="15"  :offset="1">
            <div class="div-title">
              来泡个脚吧
            </div>
            <div class="div-progress">
              程小姐(理疗师)
            </div>
            <div class="div-time">
              <el-row style="margin-left: 10px;">
                <el-col :span="8">
                </el-col>
                <el-col :span="7" style="margin-left: 5px">
                  <span style="font-size: 16px;">120</span>
                  <span style="font-size: 12px;color:black;">分钟</span>
                </el-col>
                <el-col :span="7" style="text-align: right;">
                  <span style="font-size: 14px;color: #e50404">￥</span>
                  <span style="font-size: 18px;color: #e50404">300</span>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div>
      <div style="margin-top: 7px">
      <PeopleForm/>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup>
import activityJPG1 from "@/assets/show2.jpg"
import router from "../../../../router";
import TherapistDetail  from "@/components/therapist/Detial.vue"
import PeopleForm  from "@/components/PeopleForm.vue"
const redirect=()=>{
  router.back()
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
.div-context{
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.div-title{
  margin-top: 5px;
  font-size: 18px;
  font-weight: bold;
  text-align: left;
}
.div-progress {
  margin-top: 7px;
  font-size: 14px;
  height: 2em; /* 设置容器高度为两行的高度 */
  line-height: 1.5em; /* 设置行高为1.5倍行高，即行间距为0.5em */
  letter-spacing: 1px; /* 设置字间距为1个像素 */
  overflow: hidden; /* 隐藏超出容器高度的内容 */
  text-overflow: ellipsis; /* 使用三个点表示超出容器高度的文本 */
  display: -webkit-box; /* 设置为弹性盒子布局 */
  -webkit-line-clamp: 1; /* 设置最大显示两行 */
  -webkit-box-orient: vertical; /* 设置为垂直方向排列 */
  text-align: left;
}

.div-time{
  margin-top: 8px;
  font-size: 16px;
  text-align: left;
  font-weight: bold;
}
.el-col-div-img {
  height: 100%;
  width: 100%;
  max-height: 100px; /* 设置最大高度 */
  max-width: 100px; /* 设置最大宽度 */
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-col-div-img img {
  /*max-height: 100%;*/
  /*max-width: 100%;*/
  /*object-fit:contain;*/
  height: 100%;
  width: 100%;
  border-radius: 10px;
}
</style>