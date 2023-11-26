import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/reading",
      name: "reading-list",
      component: () => import("../components/Reading/List.vue")
    }, {
      path: "/reading/add",
      name: "reading-add",
      component: () => import('../components/Reading/Add.vue')
    }
  ]
})

export default router
