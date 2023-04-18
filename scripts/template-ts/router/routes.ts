import { RouteRecordRaw } from 'vue-router'
export const routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    name: 'index',
    component: () => import('@Project/页面名称/views/index.vue'),
    meta: { title: '首页' }
  }
]
