<script lang="ts" setup>
import {useRoute, useRouter} from "vue-router";
import {computed, ref} from "vue";
import {onMounted} from "vue";

const route = useRoute()
const router = useRouter()
const routers = ref([
  {
    icon: 'fa-solid fa-home',
    title: '首页',
    link: 'user/home'
  },
  {
    icon: 'fa-solid fa-user',
    title: '我的',
    link: 'user/self'
  }
])
const routerFlag = computed(() => {
  return route.path.split('/')[2]
})
const goRouter = (link: string) => {
  router.push(`/${link}`)
}
const showBottom = ref(true)
const defaultHeight = ref()
onMounted(() => {
  defaultHeight.value = document.body.clientHeight
  window.addEventListener('resize',() => {
    if (document.body.clientHeight < defaultHeight.value-100){
      showBottom.value = false
    }else {
      showBottom.value = true
    }
  })
})
</script>

<template>
  <div class="routerView">
    <div :style="`${showBottom?'height: calc(100% - 70px)':'height: calc(100%)'};`" class="routerBody">
      <router-view/>
    </div>
    <div class="routerBottom" v-if="showBottom">
      <div v-for="item in routers" :class="`menuItem ${routerFlag == item.link.split('/')[1]?'menuItemActive' : ''}`"
           @click="() => {
        goRouter(item.link)
      }">
        <i :class="`${item.icon} bottom-icon`"/>
        <span>{{ item.title }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.routerView {
  width: 100vw;
  height: 100vh;
}
.routerBody {
  width: 100%;
  height: calc(100% - 70px);
  background-color: #f5f5f5;
}
.routerBottom {
  margin-bottom: 0;
  margin-left: 15%;
  width: 70%;
  height: 8%;
  align-items: center;
  display: flex;
  justify-content: space-between;
}
.menuItem {
  cursor: pointer;
  align-items: center;
  padding-left: 10px;
  width: 60px;
  font-size: 16px;
  text-align: center;
  display: flex;
  flex-flow: column;
.bottom-icon {
  color: black;
  margin-top: 5px;
  font-size: 20px;
}
}
.menuItemActive {
.bottom-icon {
  color: rgba(62, 203, 199, 0.99);
  margin-top: 5px;
  font-size: 20px;
}
background-color: white;
color: rgba(62, 203, 199, 0.99);
}

</style>
