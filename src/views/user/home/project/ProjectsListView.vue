<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import IndexSearch from "@/components/IndexSearch.vue";
import {computed, onMounted, ref} from "vue";
import {Search,Edit,Delete,Plus} from "@element-plus/icons-vue";
import axios from "axios";
import { reactive } from "vue";
import { ElForm, ElFormItem, ElInput, ElButton, ElMessage, ElMessageBox, ElRadio, ElRadioGroup } from "element-plus";
import activityJPG from "@/assets/ren.jpg"
import activityJPG1 from "@/assets/ren1.jpg"
import activityJPG2 from "@/assets/ren2.jpg"
import activityJPG3 from "@/assets/ren3.jpg"

const router = useRouter()
const route = useRoute()
const currents=ref(1)
const pageSize=ref(5)
const message=ref('')
const activities=ref([

])
const goRouter = (path: string) => {
  router.push(route.path.split('/')[1] + '/' + path);
}
const state = reactive({
  selectedId: ''
});

const toDetial = () => {
  router.push(`/user/home/project/detail`);
};

const toContent = (content)=>{
  if (content.length > 50)
    return content.slice(0,40)+'...'
  return content
}
const redirect = () => {
  // 使用编程式导航进行页面跳转
  router.back();
};
const flag = ref(0)
const loading = ref(false)
const busy = ref(false)
const load = async () => {
  console.log("执行")
  busy.value = true
  if(flag.value === 0){
    flag.value = 1
    axios.post('/front/group/getArticles',{
      title:message.value,
      current:currents.value,
      pageSize:pageSize.value,
      sortField: "update_time",
      sortOrder: "descend",
      status:activeTab.value,
    }).then((res)=>{
      activities.value = res.data.data;
      busy.value = false;
      loadings.value = false;
      console.log(res.data.data)
    })
    console.log(message.value)
  }
  else {
    loading.value = true
    if (currents.value <activities.value.pages) {
      loading.value = false
      currents.value=currents.value+1
      await axios.post('/front/group/getArticles', {
        title:message.value,
        current:currents.value,
        pageSize:pageSize.value,
        sortField: "create_time",
        sortOrder: "ascend",
        status:activeTab.value,
      }).then((res) => {
        console.log(res.data.data.records)
        activities.value.records = activities.value.records.concat(res.data.data.records)//拼接数据
        // console.log(activities.value.records)
        busy.value = false
      })
      if (currents.value <=activities.value.pages){
        loading.value = true
      }
    }
    console.log(loading.value)
  }
}

const handleEnter = ()=>{
  flag.value =0
  currents.value = 1;
  loading.value = true
  loadings.value = true;
  load()
}
const handleSearch = () => {
  handleEnter();
}
const handleTabClick = (tab) => {
  // 处理点击事件，根据选中的状态重新加载数据
  flag.value = 0;
  message.value = ""; // 重置搜索关键字
  currents.value = 1;
  loading.value = true;
  loadings.value = true;
  load();
}
const loadings=ref(false)
const value=ref(4.5)
const noMore = computed(() => currents.value> activities.value.pages )
const disabled = computed(() => loading.value || noMore.value)
</script>
<template>
  <el-row>
    <el-col class="top">
      <img src="@/assets/arrow.png" alt="" @click="redirect">
      <span class="text">
            理疗疗程
          </span>
      <span style="font-size: 17px ;color: white; margin-left: auto;margin-right: 10px">
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
          placeholder="请输入疗程内容"
          style="flex: 1; margin-right: 10px;margin-left: 10px;margin-top: 10px;"
      />
      <el-button @click="handleSearch()" style="margin-right: 10px;margin-top: 10px;">搜索</el-button>
    </el-row>
    <el-scrollbar >
      <ul    v-infinite-scroll="load" infinite-scroll-distance="10" class="infinite-list" :infinite-scroll-disabled="busy">
<!--        <li class="activity" v-for="activity in activities?.records">-->
<!--          <el-row class="mien-el-row" >-->
<!--            <el-col class="el-col-div-img" :span="7" :offset="2">-->
<!--              <div class="el-col-div-img-container" style="margin-right: 10px">-->
<!--                <img :src="activityJPG">-->
<!--              </div>-->
<!--            </el-col>-->
<!--            <el-col class="div-context" :span="15">-->
<!--              <div  class="div-title">-->
<!--                高效正骨-->
<!--              </div>-->
<!--              <div class="div-text">-->
<!--                {{toTime(activity.updateTime)}}-->
<!--              </div>-->
<!--              <div class="div-text">-->
<!--                <Search style="width: 1em; height: 1em;" @click="toDetial(activity.id)" />详情-->
<!--                <Edit style="width: 1em; height: 1em; margin-left: 30px" @click="toUpdate(activity.id)"/>修改-->
<!--                <Delete style="width: 1em; height: 1em; margin-left: 30px" @click="toDelete(activity.id)" />删除-->
<!--              </div>-->
<!--            </el-col>-->
<!--          </el-row>-->
<!--          <el-divider style="margin: 5px"/>-->
<!--        </li>-->
        <li class="activity" @click="toDetial">
          <el-row class="mien-el-row" >
            <el-col class="el-col-div-img" :span="7" :offset="1">
              <div class="el-col-div-img-container" style="margin-right: 10px">
                <img :src="activityJPG">
              </div>
            </el-col>
            <el-col class="div-context" :span="15">
              <div  class="div-title">
                高效正骨
              </div>
              <div style="text-align: left;">
                <el-rate
                    v-model="value"
                    disabled
                    show-score
                    text-color="#ff9900"
                    score-template="{value} 分"
                />
              </div>
              <div class="div-text">
                正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨
              </div>
            </el-col>
          </el-row>
          <el-divider style="margin: 5px"/>
        </li>
        <li class="activity" @click="toDetial">
          <el-row class="mien-el-row" >
            <el-col class="el-col-div-img" :span="7" :offset="1">
              <div class="el-col-div-img-container" style="margin-right: 10px">
                <img :src="activityJPG1">
              </div>
            </el-col>
            <el-col class="div-context" :span="15">
              <div  class="div-title">
                高效正骨
              </div>
              <div style="text-align: left;">
                <el-rate
                    v-model="value"
                    disabled
                    show-score
                    text-color="#ff9900"
                    score-template="{value} 分"
                />
              </div>
              <div class="div-text">
                正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨
              </div>
            </el-col>
          </el-row>
          <el-divider style="margin: 5px"/>
        </li>
        <li class="activity" @click="toDetial">
          <el-row class="mien-el-row" >
            <el-col class="el-col-div-img" :span="7" :offset="1">
              <div class="el-col-div-img-container" style="margin-right: 10px">
                <img :src="activityJPG2">
              </div>
            </el-col>
            <el-col class="div-context" :span="15">
              <div  class="div-title">
                高效正骨
              </div>
              <div style="text-align: left;">
                <el-rate
                    v-model="value"
                    disabled
                    show-score
                    text-color="#ff9900"
                    score-template="{value} 分"
                />
              </div>
              <div class="div-text">
                正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨
              </div>
            </el-col>
          </el-row>
          <el-divider style="margin: 5px"/>
        </li>
        <li class="activity" @click="toDetial">
          <el-row class="mien-el-row" >
            <el-col class="el-col-div-img" :span="7" :offset="1">
              <div class="el-col-div-img-container" style="margin-right: 10px">
                <img :src="activityJPG">
              </div>
            </el-col>
            <el-col class="div-context" :span="15">
              <div  class="div-title">
                高效正骨
              </div>
              <div style="text-align: left;">
                <el-rate
                    v-model="value"
                    disabled
                    show-score
                    text-color="#ff9900"
                    score-template="{value} 分"
                />
              </div>
              <div class="div-text">
                正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨
              </div>
            </el-col>
          </el-row>
          <el-divider style="margin: 5px"/>
        </li>
        <li class="activity" @click="toDetial">
          <el-row class="mien-el-row" >
            <el-col class="el-col-div-img" :span="7" :offset="1">
              <div class="el-col-div-img-container" style="margin-right: 10px">
                <img :src="activityJPG1">
              </div>
            </el-col>
            <el-col class="div-context" :span="15">
              <div  class="div-title">
                高效正骨
              </div>
              <div style="text-align: left;">
                <el-rate
                    v-model="value"
                    disabled
                    show-score
                    text-color="#ff9900"
                    score-template="{value} 分"
                />
              </div>
              <div class="div-text">
                正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨
              </div>
            </el-col>
          </el-row>
          <el-divider style="margin: 5px"/>
        </li>
        <li class="activity"  @click="toDetial">
          <el-row class="mien-el-row" >
            <el-col class="el-col-div-img" :span="7" :offset="1">
              <div class="el-col-div-img-container" style="margin-right: 10px">
                <img :src="activityJPG2">
              </div>
            </el-col>
            <el-col class="div-context" :span="15">
              <div  class="div-title">
                高效正骨
              </div>
              <div style="text-align: left;">
                <el-rate
                    v-model="value"
                    disabled
                    show-score
                    text-color="#ff9900"
                    score-template="{value} 分"
                />
              </div>
              <div class="div-text">
                正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨正骨
              </div>
            </el-col>
          </el-row>
          <el-divider style="margin: 5px"/>
        </li>
      </ul>
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
.div-context{
  display: flex;
  flex-direction: column;

  .div-title{
    margin-top: 5px;
    font-size: 16px;
    font-weight: bold;
    text-align: left;
  }
  .div-text{
    font-size: 14px;
    height: 3em; /* 设置容器高度为两行的高度 */
    line-height: 1.5em; /* 设置行高为1.5倍行高，即行间距为0.5em */
    letter-spacing: 1px; /* 设置字间距为1个像素 */
    overflow: hidden; /* 隐藏超出容器高度的内容 */
    text-overflow: ellipsis; /* 使用三个点表示超出容器高度的文本 */
    display: -webkit-box; /* 设置为弹性盒子布局 */
    -webkit-line-clamp:2; /* 设置最大显示san行 */
    -webkit-box-orient: vertical; /* 设置为垂直方向排列 */
    text-align: left;
  }
}
.el-col-div-img {
  display: flex;
  align-items: center;
}
.el-col-div-img-container {
  height: 100%;
  width: 100%;
  max-height: 100px; /* 设置最大高度 */
  max-width: 100px; /* 设置最大宽度 */
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-col-div-img-container img {
  height: 100%;
  width: 100%;
  border-radius: 10px;
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
.activity{
  list-style: none;
}
:deep(:focus-visible) {
  outline: none;
}
</style>
