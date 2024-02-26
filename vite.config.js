import { fileURLToPath, URL } from "node:url"

import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

// https://vitejs.dev/config/
export default defineConfig({
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  mode: "production",
  plugins: [vue()],
  resolve: {
    // extensions: ["jsx", "vue", "js"],
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  assetsInclude: "(**/*.md)|(*.spec.test)",
  server: {
    hmr: {
      overlay: true,
    },
    cors: {
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      preflightContinue: false,
      optionsSuccessStatus: 204,
    },
  },
})
