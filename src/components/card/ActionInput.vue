<template>
  <div class="space-y-4 rounded p-3">
    <div class="flex justify-between text-textLight">
      {{ title }}
      <base-icon
        name="times"
        :size="28"
        class="hover:bg-primaryBg cursor-pointer"
        v-tippy
        content="close"
        @click="handleClose"
      />
    </div>
    <component v-if="component" v-bind="componentProps" :is="component" />
    <div class="text-xl" v-else-if="message">{{ message }}</div>
    <div class="flex justify-end space-x-3 w-full pt-3">
      <base-select
        v-if="type == 'selector'"
        v-model="input"
        :icon="icon"
        :items="options"
        searchable
        class="flex-grow"
      />

      <base-radio
        v-else-if="type == 'radio'"
        v-model="input"
        :icon="icon"
        :items="options"
        class="flex-grow"
      />
      <base-input
        v-else-if="label"
        :type="type"
        :placeholder="placeholder"
        v-model="input"
        :icon="icon"
        class=""
      />
      <base-button
        icon="check"
        :label="actionLabel"
        class="flex-shrink-0 flex-grow-0"
        :isWorking="loading"
        @click="handleAction"
      />
    </div>
  </div>
</template>

<script>
/* eslint-disable no-undef */
export default {
  props: {
    type: { type: String, default: "text" },
    title: { type: String, default: "" },
    icon: { type: String, default: "" },
    message: { type: String, default: "" },
    placeholder: { type: String, default: "" },
    label: { type: String, default: "" },
    api: { type: Object },
    default: {},
    options: { type: Array, default: () => [] },
    successMessage: { type: String },
    actionLabel: { type: String, default: "Save" },
    component: {
      type: [Object, String],
      required: true,
    },
    componentProps: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      loading: false,
      input: "",
    }
  },
  inject: ['request'],
  computed: {},
  methods: {
    async handleAction() {
      this.loading = true
      let api = this.api
      if (!api.data) api.data = {}
      api.data[this.label] = this.input
      const response = await this.request(api)
      if (response) {
        this.$emit("open-toast", {
          message: this.successMessage || response.message,
        })
        this.$emit("refresh")
        this.handleClose()
      } else {
        this.$emit("open-toast", { error: true, message: response.message })
      }
      this.loading = false
    },
    handleClose() {
      this.$emit("close", { invokeCallBack: true })
    },
  },
  created() {
    this.input = this.default
  },
}
</script>

<style></style>
