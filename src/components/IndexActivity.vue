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
<!--    <li class="activity" v-for="activity in activities?.records" @click="() => goDetail(activity.id)">-->
<!--      <el-row>-->
<!--        <el-col :span="7">-->
<!--          <div class="el-col-div-img">-->
<!--            <img  v-if="activity.picture !== null " :src="`/front/fileInfo/downloadFile/${activity.picture}`" alt="">-->
<!--            <img  v-else :src="activityJPG" alt="">-->
<!--          </div>-->
<!--        </el-col>-->
<!--        <el-col class="div-context" :span="16">-->
<!--          <div class="div-title">-->
<!--            {{nameLength(activity.name)}}-->
<!--          </div>-->
<!--          <div class="div-progress" v-if="activity.maxPeople === 0 ||activity.maxPeople === null">-->
<!--            招募进度0%   报名人数0-->
<!--          </div>-->
<!--          <div class="div-progress" v-else>-->
<!--            招募进度{{(activity.passNumber/activity.maxPeople).toFixed(2)*100}}%   报名人数{{activity.passNumber}}-->
<!--          </div>-->
<!--          <div class="div-time">-->
<!--            {{getShowRecruit(activity)}}-->
<!--          </div>-->
<!--        </el-col>-->
<!--      </el-row>-->
<!--      <el-divider style="margin: 5px"/>-->

<!--    </li>-->
    <li class="activity" @click="toDetail">
      <el-row>
        <el-col :span="7">
          <div class="el-col-div-img">
            <img  :src="activityJPG" alt="">
          </div>
        </el-col>
        <el-col class="div-context" :span="16" :offset="1">
          <div class="div-title">
            来针个灸吧
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
          <div class="div-progress">
            针灸是针刺法和艾灸法的统称，是祖国医学宝贵遗产之一。由于二者都是通过调整经络脏腑气血的功能达到治病的目的，常配合使用，所以合称为针灸。其内容包括经络、腧穴、针灸方法及临床治疗等。由于针灸具有操作简便、适应症广、疗效明显和经济安全等优点。因此数千年来深受广大劳动人民的欢迎。
          </div>
          <div class="div-time">
            ￥2000.00
          </div>
        </el-col>
      </el-row>
      <el-divider style="margin: 5px"/>
    </li>
    <li class="activity" @click="toDetail">
      <el-row>
        <el-col :span="7">
          <div class="el-col-div-img">
            <img  :src="activityJPG1" alt="">
          </div>
        </el-col>
        <el-col class="div-context" :span="16" :offset="1">
          <div class="div-title">
            来泡个脚吧
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
          <div class="div-progress">
            针灸是针刺法和艾灸法的统称，是祖国医学宝贵遗产之一。由于二者都是通过调整经络脏腑气血的功能达到治病的目的，常配合使用，所以合称为针灸。其内容包括经络、腧穴、针灸方法及临床治疗等。由于针灸具有操作简便、适应症广、疗效明显和经济安全等优点。因此数千年来深受广大劳动人民的欢迎。
          </div>
          <div class="div-time">
            ￥3000.00
          </div>
        </el-col>
      </el-row>
      <el-divider style="margin: 5px"/>
    </li>
    <li class="activity" @click="toDetail">
      <el-row>
        <el-col :span="7">
          <div class="el-col-div-img">
            <img  :src="activityJPG" alt="">
          </div>
        </el-col>
        <el-col class="div-context" :span="16" :offset="1">
          <div class="div-title">
            来针个灸吧
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
          <div class="div-progress">
            针灸是针刺法和艾灸法的统称，是祖国医学宝贵遗产之一。由于二者都是通过调整经络脏腑气血的功能达到治病的目的，常配合使用，所以合称为针灸。其内容包括经络、腧穴、针灸方法及临床治疗等。由于针灸具有操作简便、适应症广、疗效明显和经济安全等优点。因此数千年来深受广大劳动人民的欢迎。
          </div>
          <div class="div-time">
            ￥2000.00
          </div>
        </el-col>
      </el-row>
      <el-divider style="margin: 5px"/>
    </li>
    <li class="activity" @click="toDetail">
      <el-row>
        <el-col :span="7">
          <div class="el-col-div-img">
            <img  :src="activityJPG1" alt="">
          </div>
        </el-col>
        <el-col class="div-context" :span="16" :offset="1">
          <div class="div-title">
            来泡个脚吧
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
          <div class="div-progress">
            针灸是针刺法和艾灸法的统称，是祖国医学宝贵遗产之一。由于二者都是通过调整经络脏腑气血的功能达到治病的目的，常配合使用，所以合称为针灸。其内容包括经络、腧穴、针灸方法及临床治疗等。由于针灸具有操作简便、适应症广、疗效明显和经济安全等优点。因此数千年来深受广大劳动人民的欢迎。
          </div>
          <div class="div-time">
            ￥3000.00
          </div>
        </el-col>
      </el-row>
      <el-divider style="margin: 5px"/>
    </li>
    <li class="activity" @click="toDetail">
      <el-row>
        <el-col :span="7">
          <div class="el-col-div-img">
            <img  :src="activityJPG" alt="">
          </div>
        </el-col>
        <el-col class="div-context" :span="16" :offset="1">
          <div class="div-title">
            来针个灸吧
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
          <div class="div-progress">
            针灸是针刺法和艾灸法的统称，是祖国医学宝贵遗产之一。由于二者都是通过调整经络脏腑气血的功能达到治病的目的，常配合使用，所以合称为针灸。其内容包括经络、腧穴、针灸方法及临床治疗等。由于针灸具有操作简便、适应症广、疗效明显和经济安全等优点。因此数千年来深受广大劳动人民的欢迎。
          </div>
          <div class="div-time">
            ￥2000.00
          </div>
        </el-col>
      </el-row>
      <el-divider style="margin: 5px"/>
    </li>
    <li class="activity" @click="toDetail">
      <el-row>
        <el-col :span="7">
          <div class="el-col-div-img">
            <img  :src="activityJPG1" alt="">
          </div>
        </el-col>
        <el-col class="div-context" :span="16" :offset="1">
          <div class="div-title">
            来泡个脚吧
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
          <div class="div-progress">
            针灸是针刺法和艾灸法的统称，是祖国医学宝贵遗产之一。由于二者都是通过调整经络脏腑气血的功能达到治病的目的，常配合使用，所以合称为针灸。其内容包括经络、腧穴、针灸方法及临床治疗等。由于针灸具有操作简便、适应症广、疗效明显和经济安全等优点。因此数千年来深受广大劳动人民的欢迎。
          </div>
          <div class="div-time">
            ￥3000.00
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
  justify-content: center;
}
.div-title{
  margin-top: 5px;
  font-size: 18px;
  font-weight: bold;
  text-align: left;
}
.div-progress {
  font-size: 14px;
  height: 3em; /* 设置容器高度为两行的高度 */
  line-height: 1.5em; /* 设置行高为1.5倍行高，即行间距为0.5em */
  letter-spacing: 1px; /* 设置字间距为1个像素 */
  overflow: hidden; /* 隐藏超出容器高度的内容 */
  text-overflow: ellipsis; /* 使用三个点表示超出容器高度的文本 */
  display: -webkit-box; /* 设置为弹性盒子布局 */
  -webkit-line-clamp: 2; /* 设置最大显示两行 */
  -webkit-box-orient: vertical; /* 设置为垂直方向排列 */
  text-align: left;
}

.div-time{
  margin-top: 8px;
  font-size: 16px;
  text-align: right;
  color: #00868B;
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