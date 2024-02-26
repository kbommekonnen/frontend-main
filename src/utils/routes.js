import { createRouter, createWebHistory } from "vue-router"
// import { activityService } from '../services/activityService';
import { tokenService } from "../services/storageService"
const Signin = () => import("../modules/Auth/components/Signin.vue")
const Registration = () => import("../modules/Registration/components/Registration.vue")
import protectedRoutes from "../routes/protectedRoutes"
import { isDefined, useTitle } from '@vueuse/core'
import nProgress from "nprogress"

const openRoutes = [
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
]
const routes = [...openRoutes, ...protectedRoutes]
const router = createRouter({
  mode: "history",
  history: createWebHistory(),
  base: import.meta.env.BASE_URL,
  routes: routes,
})
router.beforeEach((to, from, next) => {
  nProgress.start();
  const isPublic = to.matched.some((route) => route.meta.public)
  const title = useTitle('Golleta')
  if(isDefined(to.meta.title)) title.value = title.value.concat(' | ', to.meta.title)
  const onlyWhenLoggedOut = to.matched.some(
    (route) => route.meta.onlyWhenLoggedOut,
  )
  const loggedIn = !!tokenService.getToken()

  if (loggedIn) {
    if (onlyWhenLoggedOut && isPublic) return next({ path: "/" })
    return next()
  } else {
    if (!isPublic)
      return next({
        path: "/signin",
      })
    // NProgress.done();
  }

  return next()
  //     // NProgress.done();
})
router.afterEach(()=> {
  nProgress.done()
})
export default router
