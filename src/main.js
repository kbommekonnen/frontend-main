import installPlugins from "./plugins/index"
import installGlobalMixins from "@/mixins/global"
import "@/plugins/install"
import { directives } from "./directives/index"

import { createApp } from "vue"
import { createPinia } from "pinia"
// import {DatePicker} from "v-calendar"
import App from "./App.vue"
// import router from "./router";
import router from "./utils/routes"

import "./assets/main.css"

export default function () {
  
  const app = createApp(App)
  app.use(createPinia())
  installGlobalMixins(app)
  
  app.use(router)
  directives.forEach((d) => app.directive(d.name, d.hooksContainer))
  
  function bindJoiErrors(source, keys = "", setter) {
    const errors = keys
      .split(" ")
      .reduce(
        (acc, key) => (source[key] ? { ...acc, [key]: source[key] } : acc),
        {},
      )
    setter(errors)
  }
  app.provide("bindJoiErrors", bindJoiErrors)
  
  installPlugins(app).then(() => app.mount("#app"))

}