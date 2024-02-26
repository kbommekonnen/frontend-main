import apiService from "./apiService"
import { handleError } from "./handleErrorService"
import { GENERATE_FAKE_DATA } from "../config/config.js"
import fakeDataResolver from "../fakeData/index.js"

export default {
  async request(axios, api = {}) {
    const requestData = this.getRequestData(api)
    try {
      if (GENERATE_FAKE_DATA) {
        return await this.getFakeData(requestData)
      } else {
        const response = await axios(requestData)
        return response.data
          ? { code: response.status, ...response.data }
          : { error: true, message: "server error" }
      }
    } catch (error) {
      console.log(error)
      try {
        if (error.response.status == 422)
          return {
            error: true,
            code: 422,
            joiError: true,
            joi: error.response.data,
          }
      } catch (error) {
        return { error: true, message: "network error" } // handleError(error);
      }
      return {
        error: true,
        message: error.response.data?.message || "Ooops, network error!",
      } // handleError(error);
    }
  },
  async getFakeData(api) {
    await setTimeout(() => {}, 1000)
    return {
      data: fakeDataResolver(api),
    }
  },
  async streamRequest(params) {
    const requestData = {
      url: params.url,
      method: params.method,
      data: params.data,
      responseType: "stream",
      transformRequest: params.transformRequest,
      transformResponse:
        params.transformResponse ||
        ((data) => {
          console.log(data)
        }),
    }

    try {
      const data = await apiService.customRequest(requestData)
      return data
    } catch (error) {
      return handleError(error)
    }
  },
  async getApplication(params) {
    const requestData = {
      url: params.url,
      method: params.method,
      data: params.data,
      responseType: params.responseType,
    }

    try {
      const data = await apiService.customRequest(requestData)
      return data
    } catch (error) {
      return handleError(error)
    }
  },
  async upload(axios, api = {}) {
    let requestData = this.getRequestData(api)
    requestData.headers = { "Content-Type": "multipart/form-data" }

    try {
      const response = await axios(requestData)
      return response.data
        ? { code: response.status, ...response.data }
        : { error: true, message: "server error" }
    } catch (error) {
      console.log(error)
      try {
        if (error.response.status == 422)
          return {
            error: true,
            code: 422,
            joiError: true,
            joi: error.response.data,
          }
      } catch (error) {
        return { error: true, message: "Ooops, network error" } // handleError(error);
      }
      return {
        error: true,
        message: error.response.data.message || "Ooops, network error!",
      } // handleError(error);
    }
  },

  getRequestData(api) {
    // return api;
    let { method, url = "", params = [], data, query } = api
    let [base, ...placeholders] = url.split("/:")
    if (placeholders.length > 0 && params.length > 0) {
      params.map((e, i) => placeholders[i])
      url = base + "/" + params.join("/")
    }
    if (query)
      url +=
        "?" +
        Object.entries(query)
          .map(([key, value]) => key + "=" + value)
          .join("&")
    return {
      url,
      method,
      data,
    }
  },
}
