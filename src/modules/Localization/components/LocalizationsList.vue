<template>
  <div class="h-full">
    <data-table
      title="localizations"
      :showHeader="true"
      :headers="localizationsHeaders"
      :api="api.getAll"
      :handlers="handlers"
      letCreate
      :createHandler="openCreateForm"
      class="h-full"
    >
      <template #en="{ item, value }">
        <div>
          <base-text-area
            v-model="item.en"
            :value="value"
            :rows="Math.ceil(value.length / 40)"
            @blur="updateTranslation('en', item._id, item.en)"
          />
        </div>
      </template>
      <template #tg="{ item, value }">
        <div>
          <base-input
            v-model="item.tg"
            :value="value"
            :rows="Math.ceil(value.length / 40)"
            @enter="updateTranslation('tg', item._id, item.tg)"
            @blur="updateTranslation('tg', item._id, item.tg)"
          />
        </div>
      </template>
    </data-table>
  </div>
</template>

<script setup>
import { localizationsHeaders } from "../headers"
import api from "../api"
import handlers from "../actionHandlers"
import { openCreateForm } from "../functions"
import DataTable from "@/components/table/DataTable.vue"
import { inject, ref } from "vue"

const putRequest = inject("putRequest")
let translation = ref("")
async function updateTranslation(locale, id, value) {
  await putRequest({
    ...api.edit,
    params: [id],
    data: {
      [locale]: value,
    },
  })
}
</script>

<style></style>
