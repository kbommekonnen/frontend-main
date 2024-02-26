export default {
  getAll: { method: "get", url: "/config/paymentMode" },

  getVerified: { method: "get", url: "/config/paymentMode/verified" },

  create: { method: "post", url: "/config/paymentMode" },

  get: { method: "get", url: "/config/paymentMode/:id" },

  edit: { method: "put", url: "/config/paymentMode/:id" },

  changeDefault: {
    method: "put",
    url: "/config/paymentMode/change-default/:id",
  },

  changeStatus: {
    method: "put",
    url: "/config/paymentMode/changestatus/:id",
  },

  changeAccount: {
    method: "put",
    url: "/config/paymentMode/change-account/:id",
  },

  verify: { method: "put", url: "/config/paymentMode/verify/:id" },

  delete: { method: "delete", url: "/config/paymentMode/:id" },
}
