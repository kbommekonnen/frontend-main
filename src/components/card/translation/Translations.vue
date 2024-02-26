<template>
  <div class="flex space-x-3">
    <div class="flex-grow">
      <data-table
        title=""
        :headers="headers"
        :items="items"
        :api="api"
        :canSelect="true"
        actionPosition="start"
        actionType="icon"
        :handlers="actionHandlers"
        :letCreate="true"
        createLabel="Add"
        :createHandler="openCreateForm"
        :hideSort="true"
      >
      </data-table>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-undef */
import eventBus from "@/eventBus"
import AddTranslation from "./AddTranslation.vue"
import EditTranslation from "./EditTranslation.vue"
export default {
  data() {
    return {
      api: { url: "config/translation", method: "get" },
      headers: [
        { label: "KEY", key: "key" },
        { label: "EN", key: "en" },
        { label: "TIG", key: "tig" },
      ],
    }
  },
  computed: {
    actionHandlers() {
      return [
        {
          label: "EDIT",
          function: this.openEditTranslation,
          icon: "edit",
          fullParam: true,
        },
        {
          label: "DELETE",
          function: this.deleteTranslation,
          icon: "trash",
          idParam: true,
        },
      ]
    },
  },
  methods: {
    openCreateForm() {
      eventBus.$emit("open-modal", { component: AddTranslation })
    },
    openEditTranslation(translation) {
      eventBus.$emit("open-modal", {
        component: EditTranslation,
        componentProps: { translation },
      })
    },
    deleteTranslation() {},
  },
  created() {},
}
</script>

<style></style>
