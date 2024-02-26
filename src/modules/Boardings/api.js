export default {
  getAll: { method: "get", url: "/distribution/boarding" },

  getVerified: { method: "get", url: "/distribution/boarding/verified" },

  create: { method: "post", url: "/distribution/boarding" },

  get: { method: "get", url: "/distribution/boarding/:id" },

  edit: { method: "put", url: "/distribution/boarding/:id" },

  changeStatus: {
    method: "put",
    url: "/distribution/boarding/changestatus/:id",
  },

  verify: { method: "put", url: "/distribution/boarding/verify/:id" },

  delete: { method: "delete", url: "/distribution/boarding/:id" },
}
