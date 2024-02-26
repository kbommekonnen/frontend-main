export default {
  getAll: { method: "get", url: "/credential/module" },

  getVerified: { method: "get", url: "/credential/module/verified" },

  create: { method: "post", url: "/credential/module" },

  get: { method: "get", url: "/credential/module/:id" },

  edit: { method: "put", url: "/credential/module/:id" },

  changeStatus: { method: "put", url: "/credential/module/changestatus/:id" },
  verify: { method: "put", url: "/credential/module/verify/:id" },

  delete: { method: "delete", url: "/credential/module/:id" },
}
