import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhCn from "element-plus/dist/locale/zh-cn.mjs"
import '@fortawesome/fontawesome-free/css/fontawesome.css'
import '@fortawesome/fontawesome-free/css/solid.css'
import { createPinia } from 'pinia'
import {useUserStore} from "@/stores/user";
import mitt from 'mitt'

const app = createApp(App);
// 实例化 Pinia
const pinia = createPinia()
app.config.globalProperties.emitter = mitt() //兄弟组件信息传递
app.use(ElementPlus,{locale: zhCn}).use(router).use(pinia).mount('#app')

//全局注册图标组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
const userStore = useUserStore();
// console.log(userStore.expiresAt)
// console.log(Date.now())
// console.log(userStore.isLogin)
// console.log(userStore.expiresAt > Date.now())


if (userStore.isLogin  && userStore.expiresAt > Date.now()) {
    let data = await userStore.getUserSession()
    userStore.setUserInfo(data.data)
}else {
    // console.log("登录时间过期")
    userStore.setUserInfo(null)
}