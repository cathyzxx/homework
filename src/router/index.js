//路由页面

import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Singer from '@/components/Singer'
import Album from '@/components/Album'
import Test from '@/components/Test'
import API from '@/components/API'
import UserSinger from '@/components/UserSinger'
import AdminLogin from '@/components/AdminLogin'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ToLogin',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/admin-login',
      name: 'AdminLogin',
      component: AdminLogin
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/singer',
      name: 'Singer',
      component: Singer
    },
    {
      path: '/user-singer',
      name: 'UserSinger',
      component: UserSinger
    },
    {
      path: '/album',
      name: 'Album',
      component: Album
    },
    {
      path: '/interface',
      name: 'API',
      component: API 
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    },
  ]
})
