<template>
  <div class="space-y-3 p-3">
    <div>
      <div class="flex justify-center w-full p-2 border border-primary">
        <div class="text-xl text-primary font-semibold">
          {{ title }}
        </div>
      </div>
      <data-table
        :headers="headers"
        :items="items"
        :canSelect="false"
        :exportable="false"
        :isWorking="isWorking"
        :hasDynamicActions="false"
        :paginate="false"
        :small="true"
        :searchable="false"
      >
      </data-table>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-undef */
export default {
  props: ["headers", "title", "items"],
  data() {
    return {}
  },
  computed: {},
  methods: {},
  created() {},
}
</script>

<style></style>
