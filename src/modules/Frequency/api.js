export default {
  getAll: { method: "get", url: "/distribution/frequency" },

  getVerified: { method: "get", url: "/distribution/frequency/verified" },

  create: { method: "post", url: "/distribution/frequency" },

  get: { method: "get", url: "/distribution/frequency/:id" },

  edit: { method: "put", url: "/distribution/frequency/:id" },

  changeDefault: {
    method: "put",
    url: "/distribution/frequency/change-default/:id",
  },

  changeStatus: {
    method: "put",
    url: "/distribution/frequency/changestatus/:id",
  },

  changeAccount: {
    method: "put",
    url: "/distribution/frequency/change-account/:id",
  },

  verify: { method: "put", url: "/distribution/frequency/verify/:id" },

  delete: { method: "delete", url: "/distribution/frequency/:id" },
}
