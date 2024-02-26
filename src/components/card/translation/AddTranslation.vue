<template>
  <div
    class="flex-grow grid grid-cols-12 row-gap-2 col-gap-4 grid-flow-row self-start p-4"
  >
    <div class="flex justify-between items-center col-span-12">
      <div class="text-xl tracking-widest">Add Translation</div>
      <base-button :isWorking="loading" label="SAVE" @click="addTranslation" />
    </div>

    <base-input
      v-model="Form.key"
      type="text"
      placeholder="key"
      label="KEY"
      class="col-span-12 row-span-1"
      bordered
      @enter="addTranslation"
    />
    <base-input
      v-model="Form.en"
      type="text"
      placeholder="en"
      label="EN"
      class="col-span-12 row-span-1"
      bordered
      @enter="addTranslation"
    />
    <base-input
      v-model="Form.tig"
      type="text"
      placeholder="tig"
      label="TIG"
      class="col-span-12 row-span-1"
      bordered
      @enter="addTranslation"
    />
  </div>
</template>

<script>
/* eslint-disable no-undef */
import eventBus from "@/eventBus"
export default {
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
    async addTranslation() {
      this.loading = true
      const response = await this.request({
        url: "config/translation",
        method: "post",
        data: this.Form,
      })
      if (response) {
        eventBus.$emit("refresh")
        this.resetForm()
        // eventBus.$emit('close-modal');
      } else {
        eventBus.$emit("open-toast", { error: true, message: response.message })
      }
      this.loading = false
    },
    resetForm() {
      Object.assign(this.Form, this.defaultForm)
    },
  },
  created() {},
}
</script>

<style></style>
