import axios from "axios"
import { tokenService } from "./storageService"
import { BASE_URL } from "../config/config"
// import eventBus from "../eventBus"
import { handleError } from "./handleErrorService"
import { userInfoService } from "./storageService"

const loggerInterceptor = (config) => {
  /** Add logging here */
  return config
}

const apiService = {
  interceptor: null, // Mark: - 401 interceptor

  init(baseURL) {
    axios.defaults.baseURL = baseURL
  },

  setHeader() {
    axios.defaults.headers.common["token"] = `Bearer ${tokenService.getToken()}`
  },

  removeHeader() {
    axios.defaults.headers.common = {}
  },

  get(resource) {
    return axios.get(resource)
  },

  post(resource, data) {
    return axios.post(resource, data)
  },

  put(resource, data) {
    return axios.put(resource, data)
  },

  delete(resource) {
    return axios.delete(resource)
  },

  customRequest(data) {
    const socket = userInfoService.getUserSocket()
    if (socket) axios.defaults.headers.common["socket"] = socket
    return axios(data)
  },
  addInterceptor() {
    axios.interceptors.request.use(loggerInterceptor)
  },

  async replayRequest(error) {
    const requestData = {
      url: error.config.url,
      method: error.config.method,
      data: error.config.data,
    }

    try {
      const data = await this.customRequest(requestData)
      return data
    } catch (error) {
      return handleError(error)
    }
  },

  mount401Interceptor() {
    this.interceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response && error.response.status === 401) {
          // const requestData = {
          //   url: 'auth',
          //   method: 'get',
          // }
          // try {
          //   const { data } = await this.customRequest(requestData)

          //   tokenService.saveToken(data.token)
          //   this.setHeader()

          //   let response = await this.replayRequest(error)
          //   return response
          // } catch {
          //   eventBus.$emit('sign-out')
          // }
          // eventBus.$emit("sign-out")
        } 
        // else if (
        //   error.response &&
        //   error.response.status === 400 &&
        //   error.config.url === "auth"
        // )
          // eventBus.$emit("sign-out")
        // else throw error
      },
    )
  },

  getBaseUrl() {
    return BASE_URL
  },
}

export default apiService
