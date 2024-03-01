<template>
  <div style="background-color: white;margin-right: 10px;margin-left: 10px;border-radius: 10px;margin-top: 7px">
    <el-row style="margin-left: 10px;padding: 3px">
      <el-col :span="7">
        <div class="el-col-div-img">
          <img  :src="activityJPG1" alt="">
        </div>
      </el-col>
      <el-col class="div-context" :span="15"  :offset="1">
        <div class="div-title">
          疏通脉络疗程
        </div>
        <div class="div-progress">
          进店分配理疗师
        </div>
        <div class="row">
          <span style="text-align: left;margin-left: 10px;font-size: 14px;">共3次</span>
          <div style="flex-grow: 1;"></div>
          <span style="color:black;font-size: 14px;">3次/周</span>
          <div style="flex-grow: 1;"></div>
          <span style="color:black;font-size: 18px;">￥200.00</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import activityJPG1 from "@/assets/show1.jpg"
</script>

<style scoped>
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
.row{
  display: flex;
  align-items: center;
  margin-left: 10px;
  padding-bottom: 10px
}
</style>