<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import IndexSearch from "@/components/IndexSearch.vue";
import {computed, onMounted, ref} from "vue";
import {Search,Edit,Delete,Plus} from "@element-plus/icons-vue";
import axios from "axios";
import { reactive } from "vue";
import { ElForm, ElFormItem, ElInput, ElButton, ElMessage, ElMessageBox, ElRadio, ElRadioGroup } from "element-plus";
import activityJPG1 from "@/assets/show1.jpg"
import activityJPG from "@/assets/cs.png"
import IndexActivity from "@/components/IndexActivity.vue";
import ProjectsList from "@/components/ProjectsList.vue";
import TherapistList from "@/components/TherapistList.vue";
const router = useRouter()
const route = useRoute()
const message=ref('')
const activeTab=ref("2")
const loadings=ref(false)
const redirect=()=>{
  router.back()
}
</script>
<template>
  <el-row>
    <el-col class="top">
      <img src="@/assets/arrow.png" alt="" @click="redirect">
      <span class="text">
            我的收藏
          </span>
    </el-col>
  </el-row>
  <el-col class="scrollbar-body"  v-loading="loadings" style="border-radius: 10px;background-color: white">
    <el-row class="div_search" style="display: flex; justify-content: space-between; align-items: center;margin-bottom: 10px">
      <el-input
          ref="input"
          :prefix-icon="Search"
          v-model="message"
          @keyup.enter="handleEnter()"
          placeholder="请输入要搜索的名称"
          style="flex: 1; margin-right: 10px;margin-left: 10px;margin-top: 10px;"
      />
      <el-button @click="handleSearch()" style="margin-right: 10px;margin-top: 10px;">搜索</el-button>
    </el-row>
    <div  class="container">
      <el-tabs v-model="activeTab" @click="handleTabClick" class="demo-tabs">
        <el-tab-pane label="理疗师" name="2"></el-tab-pane>
        <el-tab-pane label="理疗项目" name="0"></el-tab-pane>
        <el-tab-pane label="理疗疗程" name="1"></el-tab-pane>
      </el-tabs>
    </div>
    <el-scrollbar  style="height: 100%">
      <div    v-infinite-scroll="load" infinite-scroll-distance="10" class="infinite-list" :infinite-scroll-disabled="busy">
        <el-col :span="22" :offset="1" v-if="activeTab==0">
          <!--理疗项目列表-->
          <IndexActivity />
        </el-col>
        <el-col :span="22" :offset="1" v-if="activeTab==1">
          <!--理疗疗程-->
          <ProjectsList />
        </el-col>
        <el-col :span="22" :offset="1" v-if="activeTab==2">
          <!--活动列表-->
          <TherapistList />
        </el-col>
      </div>
      <p class="loading" v-if="loading">没有更多的数据</p>
    </el-scrollbar>
  </el-col>

</template>

<style scoped lang="less">
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
.infinite-list{
  padding: 3px;
  //height: 92%;
}
.loading{
  display: flex;
  justify-content: center;
  align-items: center;
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
.container {
    display: flex;
    justify-content: space-between;
}
.demo-tabs .el-tabs__item {
  white-space: normal !important;
}
:deep(:focus-visible) {
  outline: none;
}
</style>
