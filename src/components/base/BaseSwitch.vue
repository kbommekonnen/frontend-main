<template>
  <div class="space-y-1">
    <label
      :style="'font-size: ' + size + 'px;'"
      class="text-textMedium"
      v-if="label"
      >{{ $t(label) }} <span v-if="required" class="text-error">*</span></label
    >

    <div class="rounded p-1 bg-brightGray flex items-center">
      <div
        v-for="(item, i) in items"
        :key="i"
        :class="{
          'active-switch bg-primary bg-opacity-60 m-1 text-white rounded py-1':
            item.value === modelValue,
        }"
        class="px-2 cursor-pointer w-full text-center text-textMedium"
        style="min-width: fit-content"
        @click="changeChoice(item.value)"
      >
        {{ item.label }}
      </div>
      <base-error :message="error" />
    </div>
  </div>
</template>
<script>
export default {
  setup() {
    return {}
  },
  props: {
    error: { type: String, default: "" },
    label: { type: String },
    modelValue: {},
    items: { type: Array, default: () => [] },
    required: { type: Boolean, default: false },
    value: {},
  },
  emits: ["input", "update:modelValue"],
  methods: {
    changeChoice(value) {
      console.log(value)
      this.$emit("input", value)
      this.$emit("update:modelValue", value)
    },
  },
}
</script>

<style scoped>
.active-switch {
  color: white;
}
</style>
