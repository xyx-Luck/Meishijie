/* eslint-disable */
import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../views/Home/Home-Page.vue'
import LoginPage from '../views/Login/Login-Page.vue'
import MenuPage from '../views/Menu/Menu-Page.vue'
import SpacePage from '@/views/Space/Space-Page'
import CreatePage from '@/views/Create/Create-Page'
import DetailPage from '@/views/Detail/Detail-Page'
import WorksPage from '@/components/Works/WorksPage'
// eslint-disable-next-line
import EditPage from '@/views/Edit/Edit-Page'

import FansPage from '@/components/Fans/FansPage'
import FollowPage from '@/components/Follow/FollowPage'
import CollectionPage from '@/components/Collection/CollectionPage'
import { reqUserInfo } from '@/api/ajax.js'
import store from '@/store/index'
Vue.use(VueRouter)


// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
 
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

 
/* eslint-disable */
const routes = [
    {
        path: '/',
        component: HomePage
    },
    {
        path: '/home',
        name: 'home',
        component: HomePage
    },
    {
        path: '/menu',
        name: 'menu',
        component: MenuPage
    },
    {
        path: '/login',
        name: 'login',
        component: LoginPage,
        meta: {//添加meta标签的，说明必须要登录才能访问，如果没有设置添加meta标签的，就可以直接访问
            login: true
        }
    },
    {
        path:'/space',
        name:'spacepage',
        component:SpacePage,
        redirect: {
            name: 'works'
          },
        meta:{
            login:true
        },
        children:[// eslint-disable-next-line
            {
                path:'/works',
                name:'works',
                component:WorksPage,
                meta:{
                    login:true
                }
            },
            {
                path:'/fans',
                name:'fans',
                component:FansPage,
                meta:{
                    login:true
                }
            },
            {
                path:'/follow',
                name:'follow',
                component:FollowPage,
                meta:{
                    login:true
                }
            },
            {
                path:'/collection',
                name:'collection',
                component:CollectionPage,
                meta:{
                    login:true
                }
            },
        ]

    },
    {
        path:'/Create',
        name:'createpage',
        component:CreatePage,
        meta:{
            login:true
        }
    },
    {
        path:'/detail',
        name:'detailpage',
        component:DetailPage
    },
    {
        path:'/edit',
        name:'editpage',
        component:EditPage
    },
]

const router = new VueRouter({
    routes
})



//进入路由的时候都要向后端发送token,验证合法不合法
//不管路由需要不需要登录，都需要展示用户信息
//都需要向后端发送请求，拿到用户信息

//设置全局路由守卫
router.beforeEach(async(to, from, next) => {
    // const islogin = false;//false就是没登录   true就是登录了
//通过获取token判断是否登录，有token就是登录了，没有token就是没有登录
const token = localStorage.getItem('token')
const islogin = !!token;//把token转为布尔类型
const data = await reqUserInfo()//获取用户信息
//把用户信息存储在vuex中
store.commit('setUserInfo',data.data)
    if (to.matched.some(item => item.meta.login)) {
        //需要登录
        if (islogin) {//
            if (data.error === 400) {//后端告诉你，登录没成功
                next({ name: 'login' });
                localStorage.removeItem('token')
                return;
            }
            if (to.name === 'login') {
                next({ name: 'home' })
            } else {
                next();
            }
            return;
        }
        //如果没登陆，进入的是login页面 那就直接登录
        if (!islogin && to.name === 'login') {
            next();
        }
        //如果没登录，进入的不是Login.需要跳到login 
        if (!islogin && to.name !== 'login') {
            next({ name: 'login' })
        }
    } else {
        //不需要登录
        next()
    }
})





export default router
