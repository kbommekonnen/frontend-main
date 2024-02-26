export default {
  getAll: { method: "get", url: "/distribution/customertype" },

  getVerified: { method: "get", url: "/distribution/customertype/verified" },

  create: { method: "post", url: "/distribution/customertype" },

  get: { method: "get", url: "/distribution/customertype/:id" },

  edit: { method: "put", url: "/distribution/customertype/:id" },

  changeDefault: {
    method: "put",
    url: "/distribution/customertype/change-default/:id",
  },

  changeStatus: {
    method: "put",
    url: "/distribution/customertype/changestatus/:id",
  },

  changeAccount: {
    method: "put",
    url: "/distribution/customertype/change-account/:id",
  },

  verify: { method: "put", url: "/distribution/customertype/verify/:id" },

  delete: { method: "delete", url: "/distribution/customertype/:id" },
}
