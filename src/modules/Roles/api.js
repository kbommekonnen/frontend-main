export default {
  getAll: { method: "get", url: "/auth/role" },

  getVerified: { method: "get", url: "/auth/role/active" },

  create: { method: "post", url: "/auth/role" },

  get: { method: "get", url: "/auth/role/detail/:id" },

  edit: { method: "put", url: "/auth/role/:id" },

  changeStatus: { method: "put", url: "/auth/role/status/:id" },
  verify: { method: "put", url: "/auth/role/verify/:id" },

  delete: { method: "delete", url: "/auth/role/:id" },
}
