<template>
  <div class="top">
    <img src="../../assets/arrow.png" alt="" @click="redirect">
    <span style="margin-top:6px ; font-size: 17px ;color: white">订单详情</span>
  </div>
  <el-row>
    <el-col class="top">
      <img src="@/assets/arrow.png" alt="" @click="redirect">
      <span class="text">
            订单详情
          </span>
    </el-col>
  </el-row>
  <el-scrollbar class="scrollbar-body" v-loading="loadings" >
    <div >
      <img style="width: 100%;height: 300px;object-fit: cover"  :src="`/front/fileInfo/downloadFile/${activity.pic}`" alt="">
    </div>
    <div class="activity" >
      <el-row style="margin-top: 5px;padding: 7px">
        <el-col :span="6">
          商品名称
        </el-col>
        <el-col :span="16" :offset="1" style="text-align: right;white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
          {{activity.prodName}}
        </el-col>
      </el-row>
      <el-row style="margin-top: 5px;padding: 7px">
        <el-col :span="6">
          实付款
        </el-col>
        <el-col :span="16" :offset="1" style="text-align: right">
          {{activity.integral}}积分
        </el-col>
      </el-row>
      <el-row style="margin-top: 5px;padding: 7px">
        <el-col :span="6">
          订单编号
        </el-col>
        <el-col :span="16" :offset="1" style="text-align: right">
          {{activity.orderId}}
        </el-col>
      </el-row>
      <el-row style="margin-top: 5px;padding: 7px">
        <el-col :span="6">
          订单状态
        </el-col>
        <el-col v-if="activity.status==0" :span="16" :offset="1" style="text-align: right">
          待核销
        </el-col>
        <el-col v-if="activity.status==1" :span="16" :offset="1" style="text-align: right">
          已核销
        </el-col>
      </el-row>
        <el-row style="margin-top: 5px;padding: 7px">
          <el-col :span="6">
            核销码
          </el-col>
          <el-col :span="16" :offset="1" style="text-align: right">
            {{activity.verificationCode}}
          </el-col>
        </el-row>
      <el-row style="margin-top: 5px;padding: 7px">
        <el-col :span="6">
          收货人
        </el-col>
        <el-col :span="16" :offset="1" style="text-align: right">
          {{activity.userName}}
        </el-col>
      </el-row>
      <el-row style="margin-top: 5px;padding: 7px">
        <el-col :span="6">
          收货电话
        </el-col>
        <el-col :span="16" :offset="1" style="text-align: right">
          {{activity.userPhone}}
        </el-col>
      </el-row>
      <el-row style="margin-top: 5px;padding: 7px">
        <el-col :span="6">
          商家地址
        </el-col>
        <el-col :span="16" :offset="1" style="text-align: right;">
          {{activity.address}}
        </el-col>
      </el-row>
      <el-row style="margin-top: 5px;padding: 7px">
        <el-col :span="6">
          下单时间
        </el-col>
        <el-col :span="16" :offset="1" style="text-align: right">
          {{toTime(updateTime)}}
        </el-col>
      </el-row>
    </div>
  </el-scrollbar>
</template>

<script setup lang="ts">
import router from "@/router";
import {Notification,MapLocation,LocationInformation} from "@element-plus/icons-vue"
import {ElMessageBox,ElNotification} from "element-plus";
import {computed, onMounted, ref} from 'vue';
import axios from "axios";
import {useRoute} from "vue-router";
import {useUserStore} from "@/stores/user";
const store = useUserStore()
const userData = computed(() => store.userInfo);
const route = useRoute();
const activity=ref('')
const loading=ref(true)
const updateTime=ref('')
const toTime = (updateTime)=>{
  let riqi =  updateTime.toString().slice(0,10)
  let shijian = updateTime.toString().slice(11,19)
  return riqi+' '+shijian
}
const redirect = () => {
  router.back();
};
onMounted(()=>{
  axios.get(`/front/order/${route.params.id}`)
      .then(response => {
        activity.value=response.data.data
        // console.log(activity.value);
        updateTime.value=toTime(activity.value.createTime)
        loading.value=false
      })
      .catch(error => {
        console.error(error);
      });
})
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

.activity{
  list-style: none;
  margin-left: 5px;
  margin-right: 5px;
  background-color: white;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 10px;
}
.el-col-div-img{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
}
.el-col-div-img img{
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
}
</style>
