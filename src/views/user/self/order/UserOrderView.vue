<template>
  <el-row>
    <el-col class="top">
      <img src="@/assets/arrow.png" alt="" @click="redirect">
      <span class="text">
            账单明细
          </span>
    </el-col>
  </el-row>
  <div class="scrollbar-body">
    <el-scrollbar>
      <div style="margin-bottom: 10px">
      <div class="row" v-for="index in 15">
        <el-row>
          <el-col :span="18">支付订单：123123123123123</el-col>
<!--          <el-col v-if="activity.status==2" :span="6" style="color: green;text-align: right">订单已取消</el-col>-->
          <el-col :span="6" style="color: brown;text-align: right">-200.00元</el-col>
        </el-row>
        <el-row>
          <el-col :span="24" style="color: #666666 ;margin-top: 5px;white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">来泡个脚吧</el-col>
        </el-row>
        <el-row>
          <el-col :span="24" style="color: #666666 ;margin-top: 5px">2024-01-12 7:12:13</el-col>
        </el-row>
      </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup>
import router from "@/router";
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