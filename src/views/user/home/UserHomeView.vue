<script setup lang="ts">
import IndexCarousel from "@/components/IndexCarousel.vue";
import IndexSearch from "@/components/IndexSearch.vue";
import IndexActivity from "@/components/IndexActivity.vue";
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import {useUserStore} from "@/stores/user";
import axios from "axios";


const store = useUserStore()
const  dialogVisible = ref(false);
const notice = ref({title:'',content:''});

onMounted( () => {
  // const router = useRouter();
  // // console.log(store.notice)
  // // 检查是否需要显示公告弹框的逻辑
  // if (router.currentRoute.value.path === "/" && store.notice === 0) {
  //   axios.get('/front/notice').then(res => {
  //     if(res.data.data != null){
  //       notice.value.content = res.data.data.noticeContent
  //       notice.value.title = res.data.data.noticeTitle
  //       console.log(notice.value)
  //       dialogVisible.value = true;
  //     }
  //     else {
  //       dialogVisible.value = false;
  //     }
  //   })
  //
  // }

});
function closeDialog() {
  store.setNotice(1)
  // console.log(store.notice)
  dialogVisible.value = false;
}
</script>

<template >
  <el-row class="index-top">
    <!--    搜索-->
    <IndexSearch />
  </el-row>
  <el-scrollbar class="index-body">
    <div style="background-color: #00C5CD">
      <el-col :span="22" :offset="1">
        <!--轮播图-->
        <IndexCarousel />
      </el-col>
      <el-col :span="22" :offset="1" class="el-col-function">
        <li class="li-function">
          <router-link :to="'/user/home/project/list'" class="li-function-a">
            <section>
              <div class="div-img">
                <a>
                  <i style="color: #00C5CD; margin-top: 30px " :class="'fa-solid  fa-th-list fa-2xl'" />
                </a>
                <a style="color: black">
                  理疗疗程
                </a>
              </div>
            </section>
          </router-link>
        </li>
        <li class="li-function">
          <router-link :to="'/user/home/therapist/list'" class="li-function-a">
            <section>
              <div class="div-img">
                <a>
                  <i style="color: #00C5CD; margin-top: 30px " :class="'fa-solid fa-user-md fa-2xl'" />
                </a>
                <a style="color: black">
                  理疗师
                </a>
              </div>
            </section>
          </router-link>
        </li>
      </el-col>
      <div style="width: 100%; height: 5px;background-color: #00C5CD"/>

    </div>
    <el-col :span="22" :offset="1">
      <!--活动列表-->
      <IndexActivity />
    </el-col>
  </el-scrollbar>
  <!-- 弹窗公告 -->
  <!-- 遮罩层 -->
<!--  <div class="overlay" v-if="dialogVisible">-->
<!--    &lt;!&ndash; 内容区域 &ndash;&gt;-->
<!--    <div class="dialog-content">-->
<!--      <h2 class="dialog-title">{{ notice.title }}</h2>-->
<!--      <div style="height: 200px">-->
<!--        <el-scrollbar>-->
<!--          <div v-html="notice.content">-->
<!--          </div>-->
<!--        </el-scrollbar>-->
<!--      </div>-->
<!--      <div class="dialog-footer">-->
<!--        <button class="close-button" @click="closeDialog">关闭</button>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
</template>

<style scoped>
.div-img{
  height: 50px;
  width: 150px;
}
.div-img img{
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
}
.li-function{
  float: left;
  height: 100%;
  width: 50%;
  list-style: none;
}
.li-function-a {
  letter-spacing: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 14px;
  text-decoration: none;
  color: #333;
}
.el-col-function{
  height: 50px;
  background-color: white;
  border-radius: 6px;
}
.index-top{
  width: 100%;
  height: 8.5%;
}
.index-body{
  display: flex;
  flex-direction: column;
  height: 92%;
  background-color: white;
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.dialog-content {
  background-color: #fff;
  padding: 20px;
  width: 80%;
  border-radius: 15px;
}

.dialog-title {
  font-size: 24px;
  text-align: center;
  margin-top: 0;
  margin-bottom: 20px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.close-button {
  padding: 8px 16px;
  background-color:#00C5CD;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
