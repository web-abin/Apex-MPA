import { routes } from './routes'
import { createRouter, createWebHashHistory } from 'vue-router'
const router = createRouter({
  history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
  routes
})

router.afterEach((to, from, next) => {
  //遍历meta改变title
  if (to.meta.title) {
    document.title = to.meta.title as string
  }
  window.scrollTo(0, 0)
})
export default router
