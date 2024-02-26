<template>
  <div class="space-y-1">
    <label
      :style="'font-size: ' + size + 'px;'"
      class="text-textMedium"
      v-if="label"
      >{{ $t(label) }} <span v-if="required" class="text-error">*</span></label
    >
    <div>
      <!-- TODO toggle flex direction -->
      <div
        v-on-click-outside="handleBlur"
        class="text-textMedium relative flex flex-shrink-0"
        :class="{
          'flex-col': topOrientation || true,
          'flex-col-reverse': !topOrientation && false,
        }"
      >
        <div
          :style="'font-size: ' + size + 'px;'"
          class="flex space-x-3 items-center rounded p-2 border border-transparent cursor-pointer"
          :class="{
            'bg-blueGray': success && !bordered,
            'bg-danger': !success && !bordered,
            'border-borderGray': success && bordered,
            'border-error': !success && bordered,
            'py-2 px-3': padding === 'big',
            'py-1 px-2': padding === 'small',
            'shadow-md': selectorOpened,
          }"
          @click="handleOpen"
        >
          <!-- v-outsideClick="{ handler: handleBlur }" -->
          <div v-if="icon" class="p-1">
            <BaseIcon :name="icon" />
          </div>
          <div
            v-if="!itemSelected"
            class="flex-shrink-0 flex-auto overflow-hidden text-overflow-ellipsis"
          >
            {{ placeholder }}
          </div>
          <div v-else class="flex-shrink-0 flex-auto">
            <slot :item="itemSelected">{{ itemSelected[searchKey] }}</slot>
          </div>
          <BaseIcon
            v-if="selectorOpened"
            name="caret-up"
            class="text-textLight"
          />
          <BaseIcon v-else name="caret-down" class="text-textLight" />
          <slot name="suffix" class="flex-grow-0"></slot>
        </div>
        <div
          v-if="selectorOpened"
          ref="itemsRef"
          class="selector bg-white absolute w-full"
          :class="{
            'z-50 top-12 drop-shadow-lg': topOrientation || true,
            'z-50 bottom-12 drop-shadow-t-lg': !topOrientation && false,
          }"
          :style="'font-size: ' + size + 'px;'"
        >
          <slot name="search">
            <input
              v-if="searchable"
              type="text"
              class="outline-none w-full p-2 focus:outline-dashed-primary"
              :placeholder="'SEARCH'"
              autofocus
              ref="searchInputRef"
              v-model="search"
              @click.stop
            />
          </slot>
          <div v-if="itemsFiltered.length === 0" class="p-2">No data</div>
          <div
            v-else
            class="overflow-y-auto overflow-x-visible p-2"
            style="max-height: 40vh"
          >
            <div
              class="flex flex-shrink-0 hover:bg-brightGray cursor-pointer text-textLight"
              :class="{
                'py-2': padding === 'big',
                'py-1': padding === 'small',
              }"
              v-for="item in itemsFiltered"
              :key="item.value"
              @click="handleChange(item.value)"
            >
              <slot name="option" :item="item">{{ item[searchKey] }}</slot>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!success" class="text-xs" style="color: #ec3118">
      <div v-if="error">{{ error }}</div>
    </div>
  </div>
</template>
<script setup>
import { vOnClickOutside } from "@vueuse/components"
import { useWindowSize, useElementBounding } from "@vueuse/core"
import { computed, onMounted, ref } from "vue"

const props = defineProps({
  value: {},
  modelValue: {},
  label: { type: String },
  placeholder: { type: String, default: "Select" },
  icon: { type: String },
  size: { type: Number, default: 16 },
  error: { type: String, default: "" },
  padding: { type: String, default: ["big", "small"][0] },
  items: { type: Array, default: () => [] },
  bordered: { type: Boolean, default: false },
  searchable: { type: Boolean, default: false },
  required: { type: Boolean, default: false },
  searchKey: { type: String, default: "label" },
})

const emit = defineEmits([
  "input",
  "enter",
  "focus",
  "blur",
  "update:modelValue",
])
const itemsRef = ref()
const { bottom } = useElementBounding(itemsRef, {
  immediate: false,
  windowScroll: false,
  windowResize: false,
})
const { height } = useWindowSize()
let searchInputRef = ref(null)
let selectorOpened = ref(false)
let search = ref('')

const success = computed(() => !props.error)
const topOrientation = computed(() => height.value >= bottom.value)
const itemSelected = computed(() =>
  props.items.find((item) => item.value === props.modelValue),
)
const itemsFiltered = computed(() =>
  props.items.filter((item) =>
    RegExp(".*" + search.value + ".*", "i").test(item[props.searchKey]),
  ),
)

onMounted(() => {
  // console.log("item options", itemsRef)
})

function handleFocus() {
  selectorOpened.value = true
  if (props.searchable) {
    searchInputRef.value.focus()
  }
  emit("focus")
}
function handleBlur() {
  selectorOpened.value = false
  search.value = ""
}
function handleOpen() {
  if (!selectorOpened.value) handleFocus()
  else handleBlur()
}
function handleChange(value) {
  emit("update:modelValue", value)
  handleBlur()
}
</script>

<style>
.selector {
  animation: slideUp 0.2s;
}
@keyframes slideUp {
  0% {
    transform: translateY(20px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
