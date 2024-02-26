export default {
  getAll: { method: "get", url: "/credential/action" },

  getVerified: { method: "get", url: "/credential/action/verified" },

  create: { method: "post", url: "/credential/action" },

  get: { method: "get", url: "/credential/action/:id" },

  edit: { method: "put", url: "/credential/action/:id" },

  changeStatus: { method: "put", url: "/credential/action/changestatus/:id" },
  verify: { method: "put", url: "/credential/action/verify/:id" },

  delete: { method: "delete", url: "/credential/action/:id" },
}
