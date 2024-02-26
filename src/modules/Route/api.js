export default {
  getAll: { method: "get", url: "/distribution/route" },

  getVerified: { method: "get", url: "/distribution/route/verified" },

  create: { method: "post", url: "/distribution/route" },

  get: { method: "get", url: "/distribution/route/:id" },

  edit: { method: "put", url: "/distribution/route/:id" },

  changeStatus: {
    method: "put",
    url: "/distribution/route/changestatus/:id",
  },

  verify: { method: "put", url: "/distribution/route/verify/:id" },

  delete: { method: "delete", url: "/distribution/route/:id" },
}
