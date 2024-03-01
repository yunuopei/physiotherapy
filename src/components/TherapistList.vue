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

const toDetail = () => {
  router.push(`/user/home/therapist/detail`);
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
      <div class="list" v-infinite-scroll="load" infinite-scroll-distance="10" :infinite-scroll-disabled="busy">
        <div class="activity">
          <el-row >
            <el-col :span="10" :offset="1" @click="toDetail" style="margin-top: 10px;">
              <el-card :body-style="{ padding: '0px' }">
                <img :src="activityJPG" class="image"/>
                <div style="padding: 5px">
                  <div>
                    <span style="text-align:left;font-size:18px;font-weight: bold;display: inline-block; width:70%;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;" >张公子</span>
                    <span style="color: #ff9900;text-align: right;width: 30%;">3.6分</span>
                  </div>
                  <div class="bottom">
                    厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="10" :offset="1" @click="toDetail" style="margin-top: 10px;">
              <el-card :body-style="{ padding: '0px' }">
                <img :src="activityJPG1" class="image"/>
                <div style="padding: 5px">
                  <div>
                    <span style="text-align:left;font-size:18px;font-weight: bold;display: inline-block; width:70%;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;" >我要暴富</span>
                    <span style="color: #ff9900;text-align: right;width: 30%;">4.6分</span>
                  </div>
                  <div class="bottom">
                    厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="10" :offset="1" @click="toDetail" style="margin-top: 10px;">
              <el-card :body-style="{ padding: '0px' }">
                <img :src="activityJPG2" class="image"/>
                <div style="padding: 5px">
                  <div>
                    <span style="text-align:left;font-size:18px;font-weight: bold;display: inline-block; width:70%;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;" >我要发财</span>
                    <span style="color: #ff9900;text-align: right;width: 30%;">5分</span>
                  </div>
                  <div class="bottom">
                    厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="10" :offset="1" @click="toDetail" style="margin-top: 10px;">
              <el-card :body-style="{ padding: '0px' }">
                <img :src="activityJPG3" class="image"/>
                <div style="padding: 5px">
                  <div>
                    <span style="text-align:left;font-size:18px;font-weight: bold;display: inline-block; width:70%;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;" >我要好运</span>
                    <span style="color: #ff9900;text-align: right;width: 30%;">3.6分</span>
                  </div>
                  <div class="bottom">
                    厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="10" :offset="1" @click="toDetail" style="margin-top: 10px;">
              <el-card :body-style="{ padding: '0px' }">
                <img :src="activityJPG" class="image"/>
                <div style="padding: 5px">
                  <div>
                    <span style="text-align:left;font-size:18px;font-weight: bold;display: inline-block; width:70%;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;" >张公子</span>
                    <span style="color: #ff9900;text-align: right;width: 30%;">3.6分</span>
                  </div>
                  <div class="bottom">
                    厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="10" :offset="1" @click="toDetail" style="margin-top: 10px;">
              <el-card :body-style="{ padding: '0px' }">
                <img :src="activityJPG1" class="image"/>
                <div style="padding: 5px">
                  <div>
                    <span style="text-align:left;font-size:18px;font-weight: bold;display: inline-block; width:70%;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;" >我要暴富</span>
                    <span style="color: #ff9900;text-align: right;width: 30%;">4.6分</span>
                  </div>
                  <div class="bottom">
                    厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="10" :offset="1" @click="toDetail" style="margin-top: 10px;">
              <el-card :body-style="{ padding: '0px' }">
                <img :src="activityJPG2" class="image"/>
                <div style="padding: 5px">
                  <div>
                    <span style="text-align:left;font-size:18px;font-weight: bold;display: inline-block; width:70%;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;" >我要发财</span>
                    <span style="color: #ff9900;text-align: right;width: 30%;">5分</span>
                  </div>
                  <div class="bottom">
                    厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害厉害
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
      <p class="loading" v-if="loading">没有更多的数据</p>
    </div>

</template>

<style scoped lang="less">
.el-card {
  height: 220px;
}
.el-card img{
  height: 130px;
  width: 100/24*10vx;
}
.bottom {
  font-size: 13px;
  color: grey;
  height: 3em; /* 设置容器高度为两行的高度 */
  line-height: 1.5em; /* 设置行高为1.5倍行高，即行间距为0.5em */
  overflow: hidden; /* 隐藏超出容器高度的内容 */
  text-overflow: ellipsis; /* 使用三个点表示超出容器高度的文本 */
  display: -webkit-box; /* 设置为弹性盒子布局 */
  -webkit-line-clamp:2; /* 设置最大显示san行 */
  -webkit-box-orient: vertical; /* 设置为垂直方向排列 */
  text-align: left;
}
.image {
  height: 100%;
  width: 100%;
  display: block;
}
.scrollbar-body{
  display: flex;
  flex-direction: column;
  position: relative;
  top: 50px;
  width: 100%;
  height: calc(100% - 50px);
}
.mienItem{
  //display: flex;
  width: 100%;
  height: 200px;
  line-height: 90px;
  text-align: center;
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
  margin-bottom: 10px;

}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  /*height: 100vh; !* 铺满整个屏幕 *!*/
}
:deep(:focus-visible) {
  outline: none;
}
</style>
