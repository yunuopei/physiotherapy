import {createPinia, defineStore} from 'pinia'

import axios from "axios";
import router from "@/router";

export const useUserStore = defineStore('user', {
    state: () => ({
        userInfo: null,
        activityTime: 0,
        notice:0,
        isLogin:false,
        expiresAt: Date,

    }),
    actions: {
        async getUserSession() {
            let data = await axios.get('/front/user/get/login')
            // console.log(data.data)
            return data.data
        },
        setUserInfo(userInfo: any) {
            this.userInfo = userInfo
        },
        clearUserInfo(userInfo: any) {
            this.userInfo = null
        },
        logout(userInfo:any){
            router.push('login')
            this.userInfo = null
        },
        setNotice(notice: any){
            this.notice = notice
        },
        setIsLogin(isLogin:any){
            this.isLogin = isLogin
        },
        setExpiresAt(expiresAt:any){
            this.expiresAt = expiresAt
        },

    },
    getters: {
        hasUserInfo: (state) => !!state.userInfo
    },
    persist: true,
}, {

})

