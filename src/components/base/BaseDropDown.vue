<template>
  <div>
    <button
      ref="multiLevelDropdownButton"
      data-dropdown-toggle="dropdown"
      class="text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      type="button"
      @click="toggle"
      v-on-click-outside="hide"
    >
      {{ label }}
      <svg
        class="w-2.5 h-2.5 ml-2.5"
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
          d="m1 1 4 4 4-4"
        />
      </svg>
    </button>
    <!-- Dropdown menu -->
    <div
      id="dropdown"
      v-if="showActions"
      class="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
    >
      <slot>
        <ul
          class="p-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="multiLevelDropdownButton"
        >
          <li>
            <a
              href="#"
              class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >Sign out</a
            >
          </li>
        </ul>
      </slot>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue"
import { vOnClickOutside } from "@vueuse/components"
defineProps({
  label: {
    type: String,
    default: "Actions",
  },
  icon: { type: String },
  actions: { type: Array, default: () => [] },
})
const showActions = ref(false)
function toggle() {
  showActions.value = !showActions.value
}
function hide() {
  showActions.value = false
}
</script>
