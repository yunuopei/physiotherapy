<script setup>
import router from '@/router';
import {computed,onMounted, ref} from "vue";
import {ArrowDown,Plus,Search,Edit,Delete,TurnOff,MapLocation} from "@element-plus/icons-vue";
import axios from "axios";
import myEventBus from "@/myEventBus";
import {ElMessage, ElMessageBox} from "element-plus";
import activityJPG from "@/assets/logo.png"
const currents=ref(1);
const pageSize=ref(5);
const num=ref('')
const message=ref()

const redirect = () => {
  // 使用编程式导航进行页面跳转
  router.back();
};

const activities=ref({})
const flag = ref(0)
const loading = ref(true)
const busy = ref(false)
const load = async () => {
  // console.log("执行")
  busy.value = true
  if(flag.value === 0){
    flag.value = 1
    axios.post('/front/order/list',{
      current:currents.value,
      pageSize:pageSize.value,
      status:activeTab.value,
      productName: message.value,
      sortField: "create_time",
      sortOrder: "descend",
    }).then((res)=>{
      activities.value = res.data.data;
      busy.value = false
      loadings.value=false
      // console.log(res.data.data)
    })
    // console.log(message.value)
  }
  else {
    loading.value = true
    // console.log("开始执行load函数")
    if (currents.value < activities.value.pages) {
      loading.value = false
      currents.value++
      await axios.post('/front/order/list', {
        current:currents.value,
        pageSize:pageSize.value,
        status:activeTab.value,
        productName: message.value,
        sortField: "create_time",
        sortOrder: "descend",
      }).then((res) => {
        // console.log(res.data.data)
        activities.value.records = activities.value.records.concat(res.data.data.records)//拼接数据
        // console.log(activities.value.records)
        busy.value = false
      })
      if (currents.value <= activities.value.pages){
        loading.value = true
      }
    }
    // console.log(loading.value)
  }
}

const handleEnter = ()=>{
  flag.value =0
  currents.value = 1;
  loading.value = true;
  loadings.value=true;
  load()
}
const handleSearch = () => {
  handleEnter();
}

const noMore = computed(() => currents.value> activities.value.pages )
const disabled = computed(() => loading.value || noMore.value)
const activeTab = ref("");
const toVerify=(id)=>{
  axios.post(`/front/order/confirm/`+id)
      .then((res)=>{
        if(res.data.code!==200){
          ElMessage.error(res.data.msg)
        }else{
          ElMessage.success("收货成功")
          location.reload();
        }
      })
}
const handleTabClick = (tab) => {
  // 处理点击事件，根据选中的状态重新加载数据
  // loadings.value = true
  busy.value = false
  flag.value = 0;
  message.value = ""; // 重置搜索关键字
  currents.value = 1;
  loading.value = true;
  // activities.value = {}; // 清空原有数据
  load();
};
const loadings=ref(false)
const centerDialogVisible=ref(false)
const toDetail=(id)=>{
  router.push('/shop/orderDetail/'+id)
}
const  closeDialog=(done)=> {
  centerDialogVisible.value = false;
  done(); // 关闭弹窗
}
const dialogData=ref([])
const openDialog = (data) => {
  // 设置弹窗的可见状态为true，并更新dialogData的值
  centerDialogVisible.value = true;
  dialogData.value.verificationCode = data.verificationCode;
  dialogData.value.orderId = data.orderId;
};
</script>

<template>
  <el-row>
    <el-col class="top">
      <img src="@/assets/arrow.png" alt="" @click="redirect">
      <span class="text">
            我的订单
          </span>
    </el-col>
  </el-row>
  <div class="scrollbar-body" v-loading="loadings" >
    <div style="background-color: white;">
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
    </div>
    <div  class="container">
      <el-tabs v-model="activeTab" @click="handleTabClick">
        <el-tab-pane label="全部" name=""></el-tab-pane>
        <el-tab-pane label="待核销" name="0"></el-tab-pane>
        <el-tab-pane label="已核销" name="1"></el-tab-pane>
      </el-tabs>
    </div>
    <el-scrollbar>
      <ul   v-infinite-scroll="load" infinite-scroll-distance="10" class="infinite-list" :infinite-scroll-disabled="busy" style="overflow: hidden;">
<!--        <li  v-for="activity in activities?.records" >-->
        <li  v-for="activity in 9" >
          <div class="activity">
            <div @click="toDetail(activity.orderId)">
              <el-row>
                <el-col :span="20">
                  <span>订单编号：130120391028462</span>
                </el-col>
                <el-col :span="4">
                  <span v-if="activeTab==0" style="color: #e50404">待核销</span>
                  <span v-if="activeTab==1" style="color: #13ce66">已核销</span>
                </el-col>
              </el-row>
              <el-divider style="margin: 2px"/>
              <el-row style="margin-top: 5px">
                <el-col :span="7">
                  <div class="el-col-div-img">
                    <img  :src=activityJPG alt="">
                  </div>
                </el-col>
                <el-col class="div-context" :span="16"  >
                  <div style="display: flex; flex-direction: row;">
                    <div class="div-title"  style="flex: 3;text-align: left">
                      <div><b>泡个脚吧</b></div>
                    </div>
                    <div class="div-text"  style="flex: 2;">
                      ￥200.00元
                    </div>
                  </div>
                  <div style="margin-top: 5px;font-size: 14px;text-align: left">预约时间：2024-12-12 06:09:34</div>
                  <div style="margin-top: 5px;font-size: 14px;text-align: left">理疗师:(进店选择)</div>
                </el-col>
              </el-row>
            </div>
            <el-row>
              <el-col :span="24">
                <div style="display: flex; justify-content: flex-end;">
                  <el-button v-if="activeTab==0" type="" size="small" style="background-color: #00C5CD;color:white;margin-top: 2px" round @click="openDialog(activity)">去核销</el-button>
                  <el-button v-else type="" size="small" style="background-color: white;border: #00C5CD solid 1px;margin-top: 2px;color: black" @click="toDetail(activity.orderId)" round>查看详情</el-button>
                  <el-dialog
                      text
                      v-model="centerDialogVisible"
                      width="90%"
                      title="请凭核销码提货"
                      align-center
                      center
                      :before-close="closeDialog"
                  >
                    <div style="font-size: 30px;text-align: center;font-weight: bold;">
                      <span>{{ dialogData.verificationCode }}</span>
                    </div>
                    <div style="margin-top: 30px;text-align: center;font-size: 20px;">
                      <span>订单号：{{ dialogData.orderId }}</span>
                    </div>
                  </el-dialog>
                </div>
              </el-col>
            </el-row>
          </div>
        </li>
      </ul>

      <p class="loading" v-if="loading">没有更多的数据</p>
    </el-scrollbar>

  </div>
</template>
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

.el-dropdown-item-status span{
  font-size:  16px;
}
.el-dropdown-span{
  font-size: 16px;
}
:deep(:focus-visible) {
  outline: none;
}
.dropdown{
  width: 33%;
}
.example-showcase .el-dropdown-link{

  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
.top-list{
  display: flex;
  width: 100%;
  height: 15%;
  padding-left: 2%;
  padding-top: 7px;
  padding-bottom: 3px;
  font-size: 16px;
  background-color: rgba(253,253,253);
}
.div-context{
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
}
.div-title{
  margin-top: 5px;
  font-size: 16px;
  /*font-weight: bold;*/
}
.div-progress{
  margin-top: 8px;
  font-size: 14px;
}
.div-time{
  margin-top: 8px;
  font-size: 14px;
}
.el-col-div-img{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;

}
.el-col-div-img  img{
  width: 100%;
  height: 100%;
  border-radius: 10px;
}
.activity{
  list-style: none;
  margin-left: 5px;
  margin-right: 5px;
  background-color: white;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 10px;
}
.infinite-list{
  padding: 0px;
  height: 92%;
}
.loading{
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-dropdown-menu__item {
  color: #606266;
&:hover {
   background-color: #e9e9ea;
 }
}

.el-dropdown-menu__item.is-active {
  color: #00C5CD;
  background-color: #00C5CD;
}

.el-dropdown-menu__item.is-disabled {
  color: #00C5CD;
  background-color: #00C5CD;
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
  justify-content: center;
  align-items: center;
  /*height: 100vh; !* 铺满整个屏幕 *!*/
  width: 100vw;
  background-color: white;
}
.el-button--text {
  color:black;
}
.div-text{
  margin-top: 5px;
  word-break: break-all;
  height: 100%;
  width: 100%;
  font-size: 14px;
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  padding-bottom: 10px;
}
::v-deep .el-tabs__item {
  padding:0 12px;
}
::v-deep .el-overlay {
  background-color: rgba(123, 123, 123, 0.05);
}
::v-deep .el-dialog {
  --el-dialog-box-shadow: none !important;
}
</style>
