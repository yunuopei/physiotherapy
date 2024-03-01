<template>


<div class="concent">
  <div class="row">
    <span style="text-align: left; font-size: 18px; letter-spacing: 2px;font-weight: bolder;color: black">疗程明细</span>
  </div>
  <div>
    <div style=" align-items: center; margin-left: 10px;text-align: left" v-for="index in 6" key="index">
      <div class="row">
        <span style="text-align: left;margin-left: 10px">疗程项目{{index}}</span>
        <div style="flex-grow: 1;"></div>
        <span style="color: grey;font-size: 15px;">30分钟</span>
        <div style="flex-grow: 1;"></div>
        <span style="color: grey;font-size: 15px;margin-right: 20px">￥200.00</span>
      </div>
    </div>
    <div style="margin-top: 5px;margin-right: 10px;text-align:right;margin-bottom: 5px">
      <span style="margin-right: 20px;">频率:3次/周</span>
      <span style="font-size: 15px;color: #00C5CD">×</span>
      <span style="font-size: 18px;color: #00C5CD">3</span>
    </div>
<!--    <div style="margin-top: 5px;margin-left: 10px;text-align: left;margin-bottom: 5px">-->
<!--      <span>小计:</span>-->
<!--    </div>-->
<!--    <div style=" align-items: center; margin-left: 10px;text-align: left" v-for="index in 3" key="index">-->
<!--      <div class="row">-->
<!--        <span style="text-align: left;margin-left: 10px">疗程项目{{index}}</span>-->
<!--        <div style="flex-grow: 1;"></div>-->
<!--        <span style="color: grey;font-size: 15px;">×4</span>-->
<!--        <div style="flex-grow: 1;"></div>-->
<!--        <span style="color: grey;font-size: 15px;margin-right: 20px">￥800.00</span>-->
<!--      </div>-->
<!--    </div>-->
    <div style="margin-top: 5px;margin-right: 10px;text-align:right;margin-bottom: 5px">
      <span>共计:￥1000.00</span>
    </div>
  </div>
</div>
  <div class="concent">
    <div style="margin-left: 10px;text-align: left;margin-bottom: 5px">
      <span style="font-size: 18px; letter-spacing: 2px;font-weight: bolder;">小贴士</span>
    </div>
    <div style="margin-left: 10px;text-align: left;margin-bottom: 5px">
      <span style="color:grey">1.理疗师可在进店核销时选择</span>
    </div>
    <div style="margin-left: 10px;text-align: left;margin-bottom: 5px">
      <span style="color:grey">2.疗程中每个项目都需要单独预约</span>
    </div>
    <div style="margin-left: 10px;text-align: left;margin-bottom: 5px">
      <span style="color:grey">3.建议完成一次项目后和理疗师确定下一次理疗时间，然后进行预约</span>
    </div>
  </div>
</template>

<script setup>
import router from "@/router";


</script>

<style scoped>
.row span{
  color:grey;
  font-size: 15px;
}
.concent{
  margin-top: 7px;
  background-color: white;
  border-radius: 10px;
  padding:5px;
}
.row{
  display: flex;
  align-items: center;
  margin-left: 10px;
  padding-bottom: 10px
}
</style>