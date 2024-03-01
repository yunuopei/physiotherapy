<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import IndexSearch from "@/components/IndexSearch.vue";
import {computed, onMounted, ref} from "vue";
import {Search,Edit,Delete,Plus} from "@element-plus/icons-vue";
import axios from "axios";
import { reactive } from "vue";
import { ElForm, ElFormItem, ElInput, ElButton, ElMessage, ElMessageBox, ElRadio, ElRadioGroup,ElAvatar,ElBacktop,} from "element-plus";
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
            全部评价
          </span>
      <span style="font-size: 17px ;color: white; margin-left: auto;margin-right: 10px">
        </span>
    </el-col>
  </el-row>
  <el-col class="scrollbar-body"  v-loading="loadings" style="border-radius: 10px;background-color: white">
    <el-scrollbar >
      <el-row style="margin-top: 5px">
        <el-col :span="20" class="left">
          <div class="info">
            <div>
              <span>未被拱的大美女</span>
            </div>
            <div>
              <el-rate
                  v-model="value"
                  disabled
                  show-score
                  text-color="#ff9900"
                  score-template="{value} 分"
              />
            </div>
          </div>
        </el-col>
        <el-col :span="4" class="right">
          <el-avatar :size="60" :src="activityJPG2" :fit="fill"></el-avatar>
        </el-col>
        <el-divider style="margin: 5px" content-position="left">
          <span>全部评价</span>
        </el-divider>
      </el-row>
      <ul    v-infinite-scroll="load" infinite-scroll-distance="10" class="infinite-list" :infinite-scroll-disabled="busy">
        <li class="activity">
          <el-row >
            <el-avatar :size="40" :src="activityJPG" :fit="fill"></el-avatar>
            <div class="info">
              <div style="text-align: left">
                <span style="font-size: 18px;">程小姐</span>
              </div>
              <div>
                <el-rate
                    v-model="value"
                    disabled
                    show-score
                    text-color="#ff9900"
                    score-template="{value} 分"
                    size="small"
                />
              </div>
            </div>
          </el-row>
          <el-row>
            <text style="text-align: left;color: #333333">
              啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊
            </text>
          </el-row>
          <div style="text-align: right;color: grey;font-size: 13px">
            <span >2024-01-01 17:21:21</span>
          </div>
          <el-divider style="margin: 5px"/>
        </li>
        <li class="activity">
          <el-row >
            <el-avatar :size="40" :src="activityJPG" :fit="fill"></el-avatar>
            <div class="info">
              <div style="text-align: left">
                <span style="font-size: 18px;">程小姐</span>
              </div>
              <div>
                <el-rate
                    v-model="value"
                    disabled
                    show-score
                    text-color="#ff9900"
                    score-template="{value} 分"
                    size="small"
                />
              </div>
            </div>
          </el-row>
          <el-row>
            <text style="text-align: left;color: #333333">
              啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊
            </text>
          </el-row>
          <div style="text-align: right;color: grey;font-size: 13px">
            <span >2024-01-01 17:21:21</span>
          </div>
          <el-divider style="margin: 5px"/>
        </li>
        <li class="activity">
          <el-row >
            <el-avatar :size="40" :src="activityJPG" :fit="fill"></el-avatar>
            <div class="info">
              <div style="text-align: left">
                <span style="font-size: 18px;">程小姐</span>
              </div>
              <div>
                <el-rate
                    v-model="value"
                    disabled
                    show-score
                    text-color="#ff9900"
                    score-template="{value} 分"
                    size="small"
                />
              </div>
            </div>
          </el-row>
          <el-row>
            <text style="text-align: left;color: #333333">
              啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊
            </text>
          </el-row>
          <div style="text-align: right;color: grey;font-size: 13px">
            <span >2024-01-01 17:21:21</span>
          </div>
          <el-divider style="margin: 5px"/>
        </li>
        <li class="activity">
          <el-row >
            <el-avatar :size="40" :src="activityJPG" :fit="fill"></el-avatar>
            <div class="info">
              <div style="text-align: left">
                <span style="font-size: 18px;">程小姐</span>
              </div>
              <div>
                <el-rate
                    v-model="value"
                    disabled
                    show-score
                    text-color="#ff9900"
                    score-template="{value} 分"
                    size="small"
                />
              </div>
            </div>
          </el-row>
          <el-row>
            <text style="text-align: left;color: #333333">
              啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊
            </text>
          </el-row>
          <div style="text-align: right;color: grey;font-size: 13px">
            <span >2024-01-01 17:21:21</span>
          </div>
          <el-divider style="margin: 5px"/>
        </li>
        <li class="activity">
        <el-row >
          <el-avatar :size="40" :src="activityJPG" :fit="fill"></el-avatar>
          <div class="info">
            <div style="text-align: left">
              <span style="font-size: 18px;">程小姐</span>
            </div>
            <div>
              <el-rate
                  v-model="value"
                  disabled
                  show-score
                  text-color="#ff9900"
                  score-template="{value} 分"
                  size="small"
              />
            </div>
          </div>
        </el-row>
        <el-row>
          <text style="text-align: left;color: #333333">
            啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊
          </text>
        </el-row>
        <div style="text-align: right;color: grey;font-size: 13px">
          <span >2024-01-01 17:21:21</span>
        </div>
        <el-divider style="margin: 5px"/>
      </li>
        <li class="activity">
          <el-row >
            <el-avatar :size="40" :src="activityJPG" :fit="fill"></el-avatar>
            <div class="info">
              <div style="text-align: left">
                <span style="font-size: 18px;">程小姐</span>
              </div>
              <div>
                <el-rate
                    v-model="value"
                    disabled
                    show-score
                    text-color="#ff9900"
                    score-template="{value} 分"
                    size="small"
                />
              </div>
            </div>
          </el-row>
          <el-row>
            <text style="text-align: left;color: #333333">
              啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊
            </text>
          </el-row>
          <div style="text-align: right;color: grey;font-size: 13px">
            <span >2024-01-01 17:21:21</span>
          </div>
          <el-divider style="margin: 5px"/>
        </li>
        <li class="activity">
          <el-row >
            <el-avatar :size="40" :src="activityJPG" :fit="fill"></el-avatar>
            <div class="info">
              <div style="text-align: left">
                <span style="font-size: 18px;">程小姐</span>
              </div>
              <div>
                <el-rate
                    v-model="value"
                    disabled
                    show-score
                    text-color="#ff9900"
                    score-template="{value} 分"
                    size="small"
                />
              </div>
            </div>
          </el-row>
          <el-row>
            <text style="text-align: left;color: #333333">
              啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊
            </text>
          </el-row>
          <div style="text-align: right;color: grey;font-size: 13px">
            <span >2024-01-01 17:21:21</span>
          </div>
          <el-divider style="margin: 5px"/>
        </li>
      </ul>
      <p class="loading" v-if="loading">没有更多的数据</p>
    </el-scrollbar>
  </el-col>
<!--  <div>-->
<!--  <el-backtop :right="100" :bottom="50" />-->
<!--  </div>-->
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
.activity{
  list-style: none;
}
:deep(:focus-visible) {
  outline: none;
}
.info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px; /* 调整名称与 el-avatar 之间的间距 */
  text-align: right;
}
/deep/ .el-scrollbar__thumb {
  display: none;
}
</style>
