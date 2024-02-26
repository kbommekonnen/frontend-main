import { defineStore } from "pinia"
import { ref } from "vue"

export const useOrganizationStore = defineStore("organizationStore", {
  state: () => ({
    name: ref(""),
    shortName: ref(""),
    code: ref(""),
    businessType: ref(""),
    jerrors: ref({}),
  }),
  getters: {
    form() {
      return {
        name: this.name,
        shortName: this.shortName,
        code: this.code,
        businessType: this.businessType,
      }
    },
    success() {
      return (
        this.name !== "" &&
        this.shortName !== "" &&
        this.code !== "" &&
        this.businessType !== ""
      )
    },
    errors() {
      return {
        name: this.name == "",
        shortName: this.shortName == "",
        code: this.code == "",
        businessType: this.businessType == "",
      }
    },
    error() {
      return this.success && Object.values(this.errors).find((value) => value)
    },
  },
  actions: {
    setError(error) {
      this.jerrors = error
    },
  },
})
export const useContactAddressStore = defineStore("contactAddressStore", {
  state: () => ({
    tel: ref([""]),
    email: ref(""),
    website: ref(""),
    country: ref("Ethiopia"),
    state: ref(""),
    address: ref(""),
    jerrors: ref({}),
  }),
  actions: {
    addTel() {
      this.tel.push("")
    },
    delTel(index) {
      this.tel.splice(index, 1)
    },
    setError(error) {
      this.jerrors = error || {}
    },
  },
  getters: {
    form() {
      return {
        tel: this.tel,
        email: this.email,
        website: this.website,
        country: this.country,
        state: this.state,
        address: this.address,
      }
    },
    success() {
      return (
        this.tel.length > 0 &&
        this.tel[0] != "" &&
        this.email != "" &&
        this.city != ""
      )
    },
    errors() {
      return {
        tel:
          (this.tel[0] && this.tel[0].length < 10) || this.tel[0].length > 12,
        email: !RegExp("[a-zA-Z1-9]{3,}@[a-zA-Z1-9]{2,}.[a-zA-Z1-9]{2,}").test(
          this.email,
        ),
        website: !RegExp(
          "(http://)*([0-9]{2,}.[0-9]{2,}.[0-9]{2,}.[0-9]{2,}(:[1-9]+)*|[a-zA-Z1-9]{3,}.[a-zA-Z1-9]{3,}.[a-zA-Z1-9]{2,})",
        ).test(this.website),
        country: this.country == "",
        state: this.state == "",
        city: this.city == "",
      }
    },
    error() {
      return this.success && Object.values(this.errors).find((value) => value)
    },
  },
})
// preferences store
export const usePreferencesStore = defineStore("preferencesStore", {
  state: () => ({
    language: ref("english"),
    timezone: ref(""),
    industry: ref(""),
    inventoryStartDate: ref(""),
    jerrors: ref({}),
  }),
  getters: {
    success() {
      return this.inventoryStartDate != ""
    },
    errors() {
      return {
        inventoryStartDate: this.inventoryStartDate == "",
      }
    },
    error() {
      return this.success && Object.values(this.errors).find((value) => value)
    },
    // error:
  },
  actions: {
    setError(error) {
      this.jerrors = error
    },
  },
})
