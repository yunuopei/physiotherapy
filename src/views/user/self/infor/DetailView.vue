<template>
  <el-row>
    <el-col class="top">
      <img src="@/assets/arrow.png" alt="" @click="redirect">
      <span class="text">
            个人资料
      </span>
    </el-col>
  </el-row>
  <div class="scrollbar-body">
    <el-scrollbar>
        <div  style="background-color: white;margin-top: 10px;border-radius: 10px;margin-right: 10px;margin-left: 10px;padding: 5px">
          <div style="padding:5px;text-align: center">
            <UploadComponent class="custom-upload" @upload-success="handleUploadSuccess" :coverUrl=true></UploadComponent>
          </div>
          <div style="padding:5px;display: flex; align-items: center;"@click="toName">
            <span style="text-align: left; ">昵称</span>
            <div style="flex-grow: 1;"></div>
            <span style="color: grey;font-size: 15px;">张张张</span>
            <ArrowRight style="text-align: right; color: grey; height: 1.1em; width: 1.1em; margin-top: 2px;margin-right: 10px"></ArrowRight>
          </div>
          <el-divider style="margin: 5px"/>
          <div style="padding:5px;display: flex; align-items: center;" @click="toPhone">
            <span style="text-align: left; ">手机号</span>
            <div style="flex-grow: 1;"></div>
            <span style="color: grey;font-size: 15px;margin-right: 10px">17733482844</span>
          </div>
          <el-divider style="margin: 5px"/>
          <div style="padding:5px;display: flex; align-items: center;" @click="toHealth">
            <span style="text-align: left; ">健康档案</span>
            <div style="flex-grow: 1;"></div>
            <span style="color: grey;font-size: 15px" @click="toOrderList">查看</span>
            <ArrowRight style="text-align: right; color: grey; height: 1.1em; width: 1.1em; margin-top: 2px;margin-right: 10px"></ArrowRight>
          </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup>
import router from "@/router";
import { ref } from 'vue';
// import activityJPG from "@/assets/ren1.jpg"
const activityJPG = ref('https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png');
import UploadComponent from '@/components/user/UploadComponent.vue';

const redirect=()=>{
  router.back();
}
const toPhone=()=>{
  router.push('/user/self/infor/phone')
}
const toName=()=>{
  router.push('/user/self/infor/name')
}
const toHealth=()=>{
  router.push('/user/self/infor/health')
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
</style>