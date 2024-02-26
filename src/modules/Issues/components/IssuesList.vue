<template>
  <div class="h-full">
    <data-table
      title="empty issues"
      :showHeader="true"
      :headers="issuesHeaders"
      :api="api.getAll"
      :handlers="handlers"
      letCreate
      createLabel="new"
      :createHandler="openCreateForm"
      class="h-full relative z-0"
    >
      <template #items="{ value, index }">
        <div class="" v-on-click-outside="close">
          <!-- <pre>{{ open + "\t" + index  }}</pre> -->
          <!-- <pre>{{value}}</pre> -->
          <div
            class="border border-gray-100 "
            :class="{
              'border-0 border-b-0 border-gray-200': open == index,
              'border-t-0': open != index,
            }"
          >
            <h2
              @click="toggle(index)"
              id="accordion-collapse-heading-1"
              class="relative"
            >
              <button
                type="button"
                class="flex items-center space-x-4 justify-between w-full px-3 py-1 font-medium text-left focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <span class="flex-grow flex space-x-4 justify-between">
                  <span>{{ value[0].item.name }}</span>
                  <span class="font-semibold">{{ value[0].quantity }}</span>
                </span>
                <svg
                v-if="value.length > 1"
                data-accordion-icon
                  class="w-3 h-3 shrink-0"
                  :class="{ 'rotate-180 opacity-40': open !== index }"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5 5 1 1 5"
                  />
                </svg>
                <span v-else class="w-3 h-3 "></span>
              </button>
            </h2>
            <h2
              v-if="value.length > 1 && open==index"
              id="accordion-collapse-heading-1"
              class="shadow-r_md border-l-2 border-gray-200 absolute p-1 w-full top-0 left-0 bg-gray-50 z-40"
            >
              <button
                v-for="(item, i) in value"
                :key="i"
                type="button"
                @click="() => (i == 0 ? close() : null)"
                class="p-4 pl-2 flex items-center space-x-4 justify-between w-full font-medium text-left focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <span class="flex-grow flex space-x-4 justify-between">
                  <span>{{ item.item.name }}</span>
                  <span class="font-semibold">{{ item.quantity }}</span>
                </span>
                <svg
                  v-if="i == 0"
                  data-accordion-icon
                  class="w-3 h-3 shrink-0"
                  :class="{ 'rotate-180 opacity-40': open !== index }"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5 5 1 1 5"
                  />
                </svg>
                <span v-else class="w-3 h-3 "></span>
              </button>
            </h2>
          </div>
        </div>
      </template>
    </data-table>
  </div>
</template>

<script setup>
import { issuesHeaders } from "../headers"
import api from "../api"
import handlers from "../actionHandlers"
// import {openCreateForm} from "../functions"
import DataTable from "@/components/table/DataTable.vue"

import { useRouter } from "vue-router"
import { formateNumber } from "../../../utils"
import { vOnClickOutside } from "@vueuse/components"
import { ref } from "vue"
const router = useRouter()
const open = ref(null)
const active = ref(null)
function openCreateForm() {
  router.push({ name: "NewIssueForm" })
}

function toggle(index) {
  if (open.value == index) close()
  else {
    open.value = index
    active.value.bringToFront()
  }
}
function close() {
  open.value = null
}
</script>

<style></style>
