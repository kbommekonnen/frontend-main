export default {
  getAll: { method: "get", url: "/credential/myorg" },

  getVerified: { method: "get", url: "/credential/verified" },

  create: { method: "post", url: "/credential" },

  get: { method: "get", url: "/credential/:id" },

  edit: { method: "put", url: "/credential/:id" },

  changeStatus: { method: "put", url: "/credential/changestatus/:id" },
  verify: { method: "put", url: "/credential/verify/:id" },

  delete: { method: "delete", url: "/credential/:id" },
}
