<template>
  <el-row>
    <el-col class="top">
      <img src="@/assets/arrow.png" alt="" @click="redirect">
      <span class="text">
            理疗师简介
          </span>
      <span style="font-size: 17px ;color: white; margin-left: auto;margin-right: 10px">
        </span>
    </el-col>
  </el-row>
  <div class="scrollbar-body">
    <el-scrollbar >
      <TherapistDetail/>
<!--      <el-divider style="margin: 5px" content-position="left">-->
<!--      </el-divider>-->
      <div class="tabs-container">
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
          <el-tab-pane label="理疗经验" name="first">
            <div style="width:100%;text-align: left;margin-left: 10px;margin-right: 10px;  justify-content: center;">
              <text >
                毕业于家里蹲大学，获得理疗博士学位，精通摆烂，划水！
                毕业于家里蹲大学，获得理疗博士学位，精通摆烂，划水！
                毕业于家里蹲大学，获得理疗博士学位，精通摆烂，划水！
                毕业于家里蹲大学，获得理疗博士学位，精通摆烂，划水！
              </text>
            </div>
          </el-tab-pane>
          <el-tab-pane label="相关证书" name="second">
            <div>
              <div style="width: 100%;display:flex;justify-content:center;align-items:center;">
                <el-image :src="activityJPG1"
                          style="width: 90%;object-fit: contain"
                          loading="eager "
                          :zoom-rate="1.2"
                          :max-scale="7"
                          :min-scale="0.2"
                          :preview-src-list="srcList"
                          :initial-index="0"/>
              </div>
              <el-divider style="margin: 5px"></el-divider>
            </div>
            <div>
              <div style="width: 100%;display:flex;justify-content:center;align-items:center;">
                <el-image :src="activityJPG2"
                          style="width: 90%;object-fit: contain"
                          loading="eager "
                          :zoom-rate="1.2"
                          :max-scale="7"
                          :min-scale="0.2"
                          :preview-src-list="srcList"
                          :initial-index="1"/>
              </div>
              <el-divider style="margin: 5px"></el-divider>
            </div>
            <div>
              <div style="width: 100%;display:flex;justify-content:center;align-items:center;">
                <el-image :src="activityJPG3"
                          style="width: 90%;object-fit: contain"
                          loading="eager "
                          :zoom-rate="1.2"
                          :max-scale="7"
                          :min-scale="0.2"
                          :preview-src-list="srcList"
                          :initial-index="2"/>
              </div>
              <el-divider style="margin: 5px"></el-divider>
            </div>
            <div>
              <div style="width: 100%;display:flex;justify-content:center;align-items:center;">
                <el-image :src="activityJPG4"
                          style="width: 90%;object-fit: contain"
                          loading="eager "
                          :zoom-rate="1.2"
                          :max-scale="7"
                          :min-scale="0.2"
                          :preview-src-list="srcList"
                          :initial-index="3"/>
              </div>
              <el-divider style="margin: 5px"></el-divider>
            </div>
          </el-tab-pane>
          <el-tab-pane label="理疗项目" name="third">
            <div style="margin-top: -7px;">
          <TherapistList/>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup>
import router from "@/router";
import activityJPG from "@/assets/ren.jpg"
import activityJPG1 from "@/assets/ren1.jpg"
import activityJPG2 from "@/assets/show3.jpg"
import activityJPG3 from "@/assets/show2.jpg"
import activityJPG4 from "@/assets/show1.jpg"
import {computed, onMounted, ref} from "vue";
import TherapistList from "@/components/therapist/List.vue"
import TherapistDetail from "@/components/therapist/Detial.vue"
const redirect=()=>{
  router.back();
}
const value=ref(5)
const activeName=ref("first")
const srcList=ref([
  activityJPG1,
  activityJPG2,
  activityJPG3,
  activityJPG4,
])
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
  background-color: white;
}
.info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px; /* 调整名称与 el-avatar 之间的间距 */
  text-align: right;
}
/deep/ .el-scrollbar__thumb {
  display: none;
}
.el-rate{
  height: 0px;
}
.tabs-container {
  display: flex;
  justify-content: space-between;
}
.demo-tabs .el-tabs__item {
  white-space: normal !important;
}
::v-deep .el-tabs__item.is-active {
  color: #00C5CD;
}
::v-deep .el-tabs__active-bar {
  background-color: #00C5CD;
}
::v-deep .el-tabs__item {
  width: 33vw;
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
  font-size: 14px;
  height: 3em; /* 设置容器高度为两行的高度 */
  line-height: 1.5em; /* 设置行高为1.5倍行高，即行间距为0.5em */
  letter-spacing: 1px; /* 设置字间距为1个像素 */
  overflow: hidden; /* 隐藏超出容器高度的内容 */
  text-overflow: ellipsis; /* 使用三个点表示超出容器高度的文本 */
  display: -webkit-box; /* 设置为弹性盒子布局 */
  -webkit-line-clamp: 2; /* 设置最大显示两行 */
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