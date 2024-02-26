<template>
  <div class="space-y-3">
    <BaseCheckBox
      :value="selectAll"
      label="Select all"
      :selected="value.length === items.length"
      @toggle="handleToggle"
    />
    <div class="space-y-2 px-3">
      <BaseCheckBox
        v-for="item in items"
        :key="item.value"
        :value="item.value"
        :label="item.label"
        :selected="value.includes(item.value)"
        @toggle="handleToggle"
      />
    </div>
  </div>
</template>

<script>
/* eslint-disable no-undef */
import BaseCheckBox from "@/components/base/BaseCheckBox.vue"
export default {
  props: ["items", "value"],
  components: { BaseCheckBox },
  data() {
    return {
      selectAll: "s-a",
    }
  },
  methods: {
    handleToggle(value) {
      if (value === "s-a") return this.handleSelectAll()
      let selectedItemValues = []
      if (this.value.includes(value)) {
        //the item is being unselected
        selectedItemValues = this.value.filter((v) => v !== value)
      } else {
        //the item is being selected
        selectedItemValues = [...this.value, value]
      }
      this.$emit("input", selectedItemValues)
    },
    handleSelectAll() {
      let selectedItemValues = this.items.map(({ value }) => value)
      if (this.value.length === this.items.length) selectedItemValues = []
      this.$emit("input", selectedItemValues)
    },
  },
}
</script>

<style></style>
