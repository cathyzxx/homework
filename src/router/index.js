//路由页面

import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Singer from '@/components/Singer'
import Album from '@/components/Album'
import Test from '@/components/Test'
import API from '@/components/API'

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
