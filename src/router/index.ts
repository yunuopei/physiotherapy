import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '../components/HelloWorld.vue'

const routes: Array<RouteRecordRaw> = [
    {
        //路由初始指向
        path: '/',
        name: 'HelloWorld',
        component:()=>import('../components/HelloWorld.vue'),
    },
    {
        path: '/login',
        name: 'login',
        component:()=>import('../views/LoginView.vue'),
    },
    {
        path: '/register',
        name: 'register',
        component:()=>import('../views/user/RegisterView.vue'),
    },
    {
        path: '/retrieve',
        name: 'retrieve',
        component:()=>import('../views/RetrieveView.vue'),
    },
    {
        path:'/user',
        name:'userWithBottom',
        component: () => import('../views/user/WithBottomView.vue'),
        // meta: {login: true},
        children:[
            {
                path:'home',
                name:'userhome',
                component: () => import('../views/user/home/HomeView.vue'),
                children:[
                    {
                        path:'',
                        name:'userhome',
                        component: () => import('../views/user/home/UserHomeView.vue'),
                    },
                    {
                        path:'detail',
                        name:'projectDetail',
                        component: () => import('../views/user/home/ProjectDetailView.vue'),
                    },
                    {
                        path:'order',
                        name:'projectOrder',
                        component: () => import('../views/user/home/ProjectOrderView.vue'),
                    },
                    {
                        path:'therapist',
                        name:'therapist',
                        component: () => import('../views/user/home/therapist/TherapistView.vue'),
                        children:[
                            {
                                path:'detail',
                                name:'therapistDetail',
                                component: () => import('../views/user/home/therapist/TherapistDetailView.vue'),
                            },
                            {
                                path:'list',
                                name:'therapistList',
                                component: () => import('../views/user/home/therapist/TherapistListView.vue'),
                            },
                            {
                                path:'evaluate',
                                name:'therapistEvaluate',
                                component: () => import('../views/user/home/therapist/TherapistEvaluateView.vue'),
                            },
                            {
                                path:'intro',
                                name:'therapistIntro',
                                component: () => import('../views/user/home/therapist/TherapistIntroView.vue'),
                            },
                            {
                                path:'order',
                                name:'therapistOrder',
                                component: () => import('../views/user/home/therapist/TherapistOrderView.vue'),
                            },
                        ]
                    },
                    {
                        path:'project',
                        name:'project',
                        component: () => import('../views/user/home/project/ProjectView.vue'),
                        children:[
                            {
                                path:'detail',
                                name:'projectDetails',
                                component: () => import('../views/user/home/project/ProjectDetailsView.vue'),
                            },
                            {
                                path:'list',
                                name:'projectList',
                                component: () => import('../views/user/home/project/ProjectsListView.vue'),
                            },
                            {
                                path:'order',
                                name:'projectsOrder',
                                component: () => import('../views/user/home/project/ProjectsOrderView.vue'),
                            },
                            {
                                path:'evaluate',
                                name:'projectsEvaluate',
                                component: () => import('../views/user/home/project/ProjectsEvaluateView.vue'),
                            },
                        ]
                    },
                ]
            },
            {
                path:'self',
                name:'userself',
                component: () => import('../views/user/self/UserSelfView.vue'),
                children:[
                    {
                        path:'',
                        name:'userself',
                        component: () => import('../views/user/self/SelfIndexView.vue'),
                    },
                    {
                        path:'function',
                        name:'function',
                        component: () => import('../views/user/self/function/UserFunctionView.vue'),
                        children:[
                            {
                                path:'collect',
                                name:'collect',
                                component: () => import('../views/user/self/function/UserCollectView.vue'),
                            },
                            {
                                path:'connect',
                                name:'connect',
                                component: () => import('../views/user/self/function/UserConnectView.vue'),
                            },
                            {
                                path:'evaluate',
                                name:'evaluate',
                                component: () => import('../views/user/self/function/UserEvaluateView.vue'),
                            },
                            {
                                path:'vip',
                                name:'vip',
                                component: () => import('../views/user/self/function/UserVIPView.vue'),
                            },
                        ]
                    },
                    {
                        path:'infor',
                        name:'infor',
                        component: () => import('../views/user/self/infor/UserInforView.vue'),
                        children:[
                            {
                                path:'pwd',
                                name:'pwd',
                                component: () => import('../views/user/self/infor/UserChangePassView.vue'),
                            },
                            {
                                path:'detail',
                                name:'details',
                                component: () => import('../views/user/self/infor/DetailView.vue'),
                            },
                            {
                                path:'name',
                                name:'name',
                                component: () => import('../views/user/self/infor/NameView.vue'),
                            },
                            {
                                path:'Health',
                                name:'Health',
                                component: () => import('../views/user/self/infor/HealthView.vue'),
                            },
                        ],
                    },
                    {
                        path:'order',
                        name:'order',
                        component: () => import('../views/user/self/order/OrderView.vue'),
                        children: [
                            {
                                path:'detail',
                                name:'detail',
                                component: () => import('../views/user/self/order/OrderDetailView.vue'),
                            },
                            {
                                path:'',
                                name:'userorder',
                                component: () => import('../views/user/self/order/UserOrderView.vue'),
                            },
                            {
                                path:'list',
                                name:'orderlist',
                                component: () => import('../views/user/self/order/OrderList.vue'),
                            },
                        ]
                    },
                ]
            },

        ]
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})
import {useUserStore} from "@/stores/user";

let userStore = undefined

router.beforeEach(async (to, from, next) => {
    if (!userStore) {
        userStore = useUserStore()
    }
    const user = useUserStore()
    let authId = userStore.userInfo?.authId;
    if (to.meta.login) {
        if (authId === undefined) {
            next({name: 'login'})
        } else {
            next()
        }
    } else {
        if (to.path === '/login' && authId !== undefined) {
            next('/')
        } else {
            next()
        }
    }
})

export default router
