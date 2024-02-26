import axios from "axios"
import VueAxios from "vue-axios"

import apiRequest from "../services/apiRequest"
import { BASE_URL } from "../config/config"
import { userInfoService, tokenService } from "../services/storageService"
import { useRouter } from "vue-router"

function logout() {
  const router = useRouter()
  userInfoService.removeUser()
  userInfoService.removeUserSocket()
  tokenService.removeToken()
  removeHeader(axios)
  window.location.reload()
  router.push({ name: "Signin" })
}

function mount401Interceptor(axios) {
  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response.status === 401) {
        logout(axios)
      } else if (error.response.status === 402 && error.config.url === "auth") {
        logout(axios)
      } else throw error
    },
  )
}
function removeHeader(axios) {
  axios.defaults.headers.common = {}
}
function setHeader(axios) {
  axios.defaults.headers.common.authorization = `Bearer ${tokenService.getToken()}`
}
export function setHeaderAuthToken(access_token) {
  axios.defaults.headers.common.authorization = `Bearer ${access_token}`
}

export function setActiveWarehouseHeader(warehouse) {
  if (warehouse) {
    axios.defaults.headers.common.Warehouse = warehouse
  }
}

export function init(axios) {
  axios.defaults.baseURL = BASE_URL
  if (tokenService.getToken()) {
    setHeader(axios)
    mount401Interceptor(axios)
  }
}
async function upload(api) {
  init(axios)
  return await apiRequest.upload(axios, api)
}

async function postRequest(api) {
  api.data = Object.keys(api.data).reduce(
    (acc, key) =>
      api.data[key] == "" ? acc : { ...acc, [key]: api.data[key] },
    {},
  )
  return await apiRequest.request(axios, { ...api, method: "post" })
}
export async function getRequest(api) {
  return await apiRequest.request(axios, { ...api, method: "get" })
}
async function putRequest(api) {
  return await apiRequest.request(axios, { ...api, method: "put" })
}
async function deleteRequest(api) {
  return await apiRequest.request(axios, { ...api, method: "delete" })
}
async function request(api) {
  init(axios)
  return await apiRequest.request(axios, api)
}

export default function (app) {
  init(axios)

  app.use(VueAxios, { axios: axios })

  app.provide("axios", app.config.globalProperties.axios)
  app.provide("request", request)
  app.provide("upload", upload)
  app.provide("postRequest", postRequest)
  app.provide("getRequest", getRequest)
  app.provide("putRequest", putRequest)
  app.provide("deleteRequest", deleteRequest)
}
