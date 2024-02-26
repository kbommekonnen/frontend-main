import { createRouter, createWebHistory } from "vue-router"
import HomeView from "./views/HomeView.vue"
const Signin = () => import("../modules/Auth/components/Signin.vue")
const Registration = () => import("../modules/Registration/components/Registration.vue")

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
    },
    {
        path: "/signin",
        name: "Signin",
        component: Signin,
        meta: {
          onlyWhenLoggedOut: true,
          public: true,
        },
      },
      {
        path: "/registration",
        name: "Registration",
        component: Registration,
        meta: {
          onlyWhenLoggedOut: true,
          public: true,
        },
      },
        // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import("../views/AboutView.vue"),
    // },
  ],
})

export default router
