/* eslint-disable no-unused-vars */
import { defineStore } from "pinia"
import { ref } from "vue"

export const useSuppliersstore = defineStore("Suppliersstore", {
  state: () => ({
    name: ref(""),
    email: ref(""),
    workPhone: ref(""),
    mobileNumber: ref(""),
    website: ref(""),
    address: ref({
      city: "",
      kebele: "",
      block: "",
      houseNumber: "",
    }),
    contactPersons: ref([
      {
        fullName: "",
        email: "",
        mobileNumber: "",
      },
    ]),
    jerrors: ref({
      address: {},
      contactPersons: [
        {
          fullName: "",
          email: "",
          mobileNumber: "",
        },
      ],
    }),
  }),
  getters: {
    form() {
      return {
        name: this.name,
        email: this.email,
        workPhone: this.workPhone,
        mobileNumber: this.mobileNumber,
        website: this.website,
        address: this.address,
        contactPersons: this.contactPersons,
      }
    },
    error() {
      return this.success && Object.values(this.errors).find((value) => value)
    },
  },
  actions: {
    addContactPerson() {
      this.contactPersons.push({
        fullName: "",
        email: "",
        mobileNumber: "",
      })
      this.jerrors.contactPersons.push({
        fullName: "",
        email: "",
        mobileNumber: "",
      })
    },
    delContactPerson(index) {
      this.contactPersons.splice(index, 1)
      this.jerrors.contactPersons.splice(index, 1)
    },
    setError(error) {
      this.jerrors = error
      this.jerrors.address = {}
      this.jerrors.contactPersons = this.contactPersons.map((_item) => ({
        fullName: "",
        email: "",
        mobileNumber: "",
      }))
    },
  },
})
