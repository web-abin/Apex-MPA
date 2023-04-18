import { createRouter, createWebHashHistory } from 'vue-router'
const router = createRouter({
  history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@Project/pagetwo/views/index.vue'),
      meta: { title: '首页' }
    },
    {
      path: '/two',
      name: 'two',
      component: () => import('@Project/pagetwo/views/index2.vue'),
      meta: { title: '第二页' }
    }
  ]
})

router.afterEach((to, from, next) => {
  //遍历meta改变title
  if (to.meta.title) {
    document.title = to.meta.title
  }
  window.scrollTo(0, 0)
})
export default router
