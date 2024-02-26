export default {
  getAll: { method: "get", url: "/composite" },

  getVerified: { method: "get", url: "/composite/verified" },

  create: { method: "post", url: "/composite" },

  search: { method: "get", url: "/composite/stock/search" },

  get: { method: "get", url: "/composite/:id" },

  edit: { method: "put", url: "/composite/:id" },

  changeStatus: { method: "put", url: "/composite/changestatus/:id" },
  verify: { method: "put", url: "/composite/verify/:id" },

  delete: { method: "delete", url: "/composite/:id" },
}
