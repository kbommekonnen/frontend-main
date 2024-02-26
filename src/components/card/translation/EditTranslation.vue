<template>
  <div
    class="flex-grow grid grid-cols-12 row-gap-2 col-gap-4 grid-flow-row self-start p-4"
  >
    <div class="flex justify-between items-center col-span-12">
      <div class="text-xl tracking-widest">Edit Translation</div>
      <base-button
        :isWorking="loading"
        label="UPDATE"
        @click="editTranslation()"
      />
    </div>

    <base-input
      v-model="Form.key"
      type="text"
      placeholder="key"
      label="KEY"
      class="col-span-12 row-span-1"
      bordered
      @enter="editTranslation()"
    />
    <base-input
      v-model="Form.en"
      type="text"
      placeholder="en"
      label="EN"
      class="col-span-12 row-span-1"
      bordered
      @enter="editTranslation()"
    />
    <base-input
      v-model="Form.tig"
      type="text"
      placeholder="tig"
      label="TIG"
      class="col-span-12 row-span-1"
      bordered
      @enter="editTranslation()"
    />
  </div>
</template>

<script>
/* eslint-disable no-undef */
/* eslint-disable no-undef */
import eventBus from "@/eventBus"
export default {
  props: ["translation"],
  data() {
    return {
      loading: false,
      Form: {
        key: undefined,
        en: undefined,
        tig: undefined,
      },
      defaultForm: {
        key: undefined,
        en: undefined,
        tig: undefined,
      },
    }
  },
  computed: {},
  methods: {
    async editTranslation() {
      this.loading = true
      let data = {}
      Object.keys(this.Form)
        .filter((key) => this.Form[key] != this.defaultForm[key])
        .forEach((k) => {
          data[k] = this.Form[k]
        })
      const response = await this.request({
        url: "config/translation/:id",
        method: "put",
        params: [this.translation._id],
        data,
      })
      if (response) {
        eventBus.$emit("close-modal")
        eventBus.$emit("refresh")
      } else {
        eventBus.$emit("open-toast", { error: true, message: this.berror })
      }
      this.loading = false
    },
    resetForm() {
      Object.assign(this.form, this.defaultForm)
    },

    async init() {
      Object.keys(this.Form).forEach((key) => {
        this.defaultForm[key] = this.Form[key] = this.translation[key]
      })
    },
  },
  created() {
    this.init()
  },
}
</script>

<style></style>
