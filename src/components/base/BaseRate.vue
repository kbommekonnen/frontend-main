<template>
  <div class="w-full space-y-1">
    <label style="font-size: 16px" class="text-textDarkest" v-if="label">{{
      label
    }}</label>
    <div class="flex space-x-2">
      <BaseIcon
        v-for="i in [1, 2, 3, 4, 5]"
        :key="i"
        class="hover:text-primary cursor-pointer"
        :style="{ color: i <= value ? '#007fff' : '' }"
        :name="i <= value ? 'star-s' : 'star'"
        :size="size"
        @click="handleChange(i)"
      />
    </div>
    <div v-if="!success" class="text-xs" style="color: #ec3118">
      <div v-for="(error, i) in errors" :key="i">{{ error }}</div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-undef */
export default {
  props: {
    value: { type: Number, default: 0 },
    label: { type: String },
    size: { type: Number, default: 16 },
    errors: { type: Array, default: () => [] },
  },
  computed: {
    success() {
      return this.errors.length === 0
    },
  },
  methods: {
    handleChange(i) {
      this.$emit("input", i)
    },
  },
}
</script>

<style></style>
