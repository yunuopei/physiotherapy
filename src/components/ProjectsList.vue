<script setup >
import {computed,onMounted, ref} from "vue";
import {ArrowDown} from "@element-plus/icons-vue";
import axios from "axios";
import myEventBus from "@/myEventBus";
import {useRouter} from "vue-router";
import activityJPG from "@/assets/logo.png"
import activityJPG1 from "@/assets/show1.jpg"

const loading1 = ref(false)//页面加载是的loading
const busy = ref(false)
const flag = ref(0)
const loading = ref(false)//判断是否显示更多数据
const router = useRouter()

const activities=ref({})
// const nameLength = (name)=>{
//   if (name.length>20){
//     return (name.toString().slice(0,20)+'...')
//   }else return name
// }
const load = async () => {
  busy.value=true
  if(flag.value === 0){
    await axios.post('/front/activity/list',{
      status:2
    }).then((res)=>{
      activities.value = res.data.data
      // console.log(res.data.data)
      loading1.value = false
      busy.value = false
      let current = parseInt(activities.value.current)
      let pages = parseInt(activities.value.pages)
      if(current >= pages){
        loading.value = true
      }
    })
    flag.value = 1
  }
  else {
    loading.value = true
    let current = parseInt(activities.value.current)
    let pages = parseInt(activities.value.pages)

    if (current < pages) {
      loading.value = false
      activities.value.current = current + 1
      await axios.post('/front/activity/list', {
        name: '',
        status:2,
        current: activities.value.current
      }).then((res) => {
        activities.value.records = activities.value.records.concat(res.data.data.records)//拼接数据
        // console.log(activities.value.records)
        busy.value = false
      })
    }
    if(current >= pages){
      loading.value = true
    }
    // console.log(loading.value)
  }
}
const emitter = myEventBus()//监听搜索事件
emitter.on("act",(val)=>{
  activities.value = val
  let current = parseInt(activities.value.current)
  let pages = parseInt(activities.value.pages)
  if(current >  pages ){
    loading.value = true
  }
})
const value = ref(3.7)
const toDetail = () => {
  router.push(`/user/home/detail`)
}

</script>
<template>
  <ul v-infinite-scroll="load" v-loading="loading1" infinite-scroll-distance="10"  class="infinite-list" :infinite-scroll-disabled="busy">
    <li class="activity" @click="toDetial" v-for="index in 10">
      <el-row class="mien-el-row" >
        <el-col class="el-col-div-img" :span="7">
          <div class="el-col-div-img-container" style="margin-right: 10px">
            <img :src="activityJPG">
          </div>
        </el-col>
        <el-col class="div-context" :span="16" :offset="1">
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
  <p class="loading" v-if="!loading">加载更多数据...</p>
  <p class="loading" v-if="loading">没有更多的数据</p>

</template>
<style scoped >
.dropdown-item-span{
  font-size: 16px;
}
.dropdown-item-span-active{
  font-size: 16px;
  color: #00C5CD;
}
:deep(:focus-visible) {
  outline: none;
}
.dropdown{
  width: 33%;
}
.el-rate{
  height: 3px;
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
  padding-bottom: 10px;
  font-size: 16px;
  background-color: rgba(253,253,253);
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
.activity{
  list-style: none;
}
.infinite-list{
  padding: 0px;
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
  color: #409EFF;
  background-color: #ecf5ff;
}

.el-dropdown-menu__item.is-disabled {
  color: #409EFF;
  background-color: #ecf5ff;
}
</style>