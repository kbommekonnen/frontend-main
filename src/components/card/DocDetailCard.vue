<template>
  <div class="space-y-2">
    <div
      v-for="({ label, value, type, name }, i) in attributes"
      :key="i"
      class="w-full grid grid-cols-2 col-gap-4"
    >
      <div class="w-full flex justify-end text-end uppercase text-textLight">
        {{ label }}
      </div>
      <template v-if="type == 'text'">
        <div class="text-lg">{{ value }}</div>
      </template>
      <template v-else-if="type == 'boolean'">
        <div class="text-lg">{{ value ? "YES" : "NO" }}</div>
      </template>
      <template v-else-if="type == 'date'">
        <div class="text-lg">{{ value | formateDate }}</div>
      </template>
      <template v-else-if="type == 'array'">
        <div class="space-y-1 text-lg">
          <div v-for="(item, i) in value" :key="i">
            {{ item[name] }}
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-undef */
import { formateDate } from "@/utils"
export default {
  props: { attributes: { type: Array, default: () => [] } },
  filters: {
    formateDate,
  },
}
</script>

<style></style>
