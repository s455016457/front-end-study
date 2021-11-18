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
      },
      {
        path: '/Color',
        name: 'Color色彩',
        component: () => import('@/views/Basic/Color.vue')
      },
      {
        path: '/CombinationComponents',
        name: '组合组件',
        component: () => import('@/views/Basic/CombinationComponents.vue')
      },
      {
        path: '/AgGrid-Started',
        name: 'AgGrid',
        component: () => import('@/views/AgGrid/Started.vue')
      },
      {
        path: '/AgGrid-StatusBar',
        name: 'statusbar',
        component: () => import('@/views/AgGrid/StatusBar.vue')
      },
      {
        path: '/AgGrid-ColumnState',
        name: 'ColumnState',
        component: () => import('@/views/AgGrid/ColumnState.vue')
      },
      {
        path: '/AgGrid-RowPinning',
        name: 'RowPinning',
        component: () => import('@/views/AgGrid/RowPinning.vue')
      },
      {
        path: '/TestAxios-HellowWorld',
        name: 'HelloWorld',
        component: () => import('@/views/TestAxios/HelloWorld.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
