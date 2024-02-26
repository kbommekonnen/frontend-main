import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import setupI18n from "../plugins/i18n"
import installAxios from "../plugins/axios"
import { createPinia } from "pinia"
export default async function () {
  const app = createApp(App)
  app.use(router)
  const i18n = await setupI18n()
  app.use(i18n)
  installAxios(app)
  app.use(createPinia())
  app.mount("#app")
}
