import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Login from '../views/Login.vue'
import Main from '../views/Main.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    name: 'Login',
    component: Login,
    children: [
      {
        path: '/main',
        name: 'Main',
        component: Main
      }
    ]
  },
  {
    path: '/main',
    name: 'Main',
    component: Main,
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
      },
      {
        path: '/about',
        name: 'About',
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
      },
      {
        path: '/Border',
        name: 'Border组件',
        component: () => import('@/views/Basic/Border.vue')
      },
      {
        path: '/Button',
        name: 'Button组件',
        component: () => import('@/views/Basic/Button.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
