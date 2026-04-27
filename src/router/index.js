import { createRouter, createWebHistory } from "vue-router"
import MainLayout from "@/layouts/MainLayout.vue";
import LoginView from "../views/LoginView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "mainLayout",
      component: MainLayout,
      children: [
        {
          path: "",
          name: "login",
          component: LoginView,
        },
        {
          path:"home",
          name:"home",
          component: () => import("../views/HomeView.vue"),
        }
      ]
    },
  ],
})

export default router
