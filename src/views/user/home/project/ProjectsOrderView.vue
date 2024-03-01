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
      <ProjectsCard/>
      <div style="margin-top: 7px">
        <PeopleForm/>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup>
import activityJPG1 from "@/assets/show2.jpg"
import router from "@/router";
import ProjectsCard  from "@/components/projects/Card.vue"
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

</style>