<template>
  <div class="py-4 space-y-3">
    <div class="flex justify-between items-center px-2">
      <base-title title="Filter headers" />
      <base-button label="Done" icon="check-circle" @click="filterHeaders" />
    </div>
    <div class="grid grid-cols-2 col-gap-3 row-gap-3">
      <div
        v-for="({ label, selected }, i) in allHeaders"
        :key="i"
        class="cursor-move border p-2 rounded bg-brighterGray border-borderGray"
        @mousedown="dragElement(i)"
        @mouseup="dropElement(i)"
        @mouseenter="readyDropElement(i)"
      >
        <base-check-box
          :label="label"
          :selected="selected"
          @toggle="toggle(i, selected)"
          class=""
        >
        </base-check-box>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-4">
      <base-select
        v-model="actionType"
        label="Action Type"
        :items="actionTypeOptions"
      />
      <base-select
        v-model="actionPosition"
        label="Action Position"
        :items="actionPositionOptions"
      />
    </div>
  </div>
</template>

<script>
/* eslint-disable no-undef */
import eventBus from "@/eventBus"
import { dragdrop } from "@/mixins/dragdrop"
export default {
  mixins: [dragdrop],
  props: ["headers", "filteredHeaders", "cb"],
  data() {
    return {
      actionType: "",
      position: "",
      allHeaders: [],
      actionTypeOptions: [
        { label: "Tippy", value: "tippy" },
        { label: "Button", value: "button" },
        { label: "Icon", value: "icon" },
      ],
      actionPositionOptions: [
        { label: "Header", value: "header" },
        { label: "Start", value: "start" },
        { label: "End", value: "end" },
      ],
    }
  },
  methods: {
    toggle(index, isSelected) {
      this.allHeaders[index].selected = !isSelected
    },
    filterHeaders() {
      this.cb(
        this.allHeaders
          .filter(({ selected }) => selected)
          .map(({ label, key }) => ({ label, key })),
        this.actionType,
        this.actionPosition,
      )
      eventBus.$emit("close-modal")
    },
    // drag and drop action listeners
    swap() {
      if (this.dragIndex > -1 && this.dropIndex > -1) {
        const dragElement = this.allHeaders[this.dragIndex]
        this.allHeaders.splice(this.dragIndex, 1)
        this.allHeaders.splice(this.dropIndex, 0, dragElement)
        this.dragIndex = this.dropIndex
        return this.allHeaders
      } else return this.allHeaders
    },
  },
  created() {
    this.allHeaders = this.headers.map((header) => ({
      ...header,
      selected: this.filteredHeaders.find(({ key }) => key == header.key),
    }))
  },
}
</script>

<style></style>
