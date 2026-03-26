import { createRouter, createWebHashHistory } from 'vue-router'
import Empty from '@/views/Empty.vue'

const routes = [
  {
    path: '/',
    name: 'Empty',
    component: Empty
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router