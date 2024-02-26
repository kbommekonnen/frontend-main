export const getOrganizations = {
  url: "/organization",
  method: "get",
}
export default {
  getAll: { method: "get", url: "/organization" },

  getVerified: { method: "get", url: "/organization/verified" },

  create: { method: "post", url: "/organization" },

  get: { method: "get", url: "/organization/:id" },

  edit: { method: "put", url: "/organization/:id" },

  changeStatus: { method: "put", url: "/organization/changestatus/:id" },
  verify: { method: "put", url: "/organization/verify/:id" },

  delete: { method: "delete", url: "/organization/:id" },
}
