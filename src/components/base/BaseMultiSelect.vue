<template>
  <div class="w-full space-y-1">
    <label
      :style="'font-size: ' + size + 'px;'"
      class="text-textMedium"
      v-if="label"
      >{{ label }}</label
    >
    <div class="text-textMedium relative">
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
        }"
        @click="handleOpen"
        v-outsideClick="{ handler: handleBlur }"
      >
        <div v-if="!itemsSelected.length" class="flex-auto">
          {{ placeholder }}
        </div>
        <div v-else class="flex-auto">
          <slot :items="itemsSelected">
            <div class="flex">
              <div
                v-for="{ label, value } in itemsSelected"
                :key="value"
                class="m-1 flex space-x-2 items-center border rounded text-sm text-primary pl-2 pr-1"
              >
                {{ label }}
                <base-icon
                  name="times"
                  class="text-error cursor-pointer"
                  @click="handleToggle(value)"
                />
              </div>
            </div>
          </slot>
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
        class="selector bg-white absolute z-50 w-full shadow-2xl"
        :style="'font-size: ' + size + 'px;'"
      >
        <input
          v-if="searchable"
          type="text"
          class="outline-none w-full p-2"
          placeholder="Search"
          autofocus
          v-model="search"
          @click.stop
        />
        <div v-if="itemsFiltered.length === 0" class="p-2">No data</div>
        <div v-else class="overflow-y-auto py-2" style="max-height: 40vh">
          <div
            class="hover:bg-brightGray cursor-pointer text-textLight"
            :class="{
              'p-2': padding === 'big',
              'p-1': padding === 'small',
            }"
            v-for="item in itemsFiltered"
            :key="item.value"
          >
            <slot name="option" :item="item">
              <base-check-box
                :key="item.value"
                :value="item.value"
                :label="item.label"
                :selected="props.modelValue.includes(item.value)"
                @toggle="handleToggle"
              />
              <!-- {{ item[searchKey] }} -->
            </slot>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!success" class="text-xs" style="color: #ec3118">
      <div v-for="(error, i) in errors" :key="i">{{ error }}</div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue"
const props = defineProps({
  value: { type: Array, default: () => [] },
  modelValue: {},
  label: { type: String },
  placeholder: { type: String, default: "Select" },
  size: { type: Number, default: 16 },
  errors: { type: Array, default: () => [] },
  padding: { type: String, default: ["big", "small"][0] },
  items: { type: Array, default: () => [] },
  bordered: { type: Boolean, default: false },
  searchable: { type: Boolean, default: false },
  searchKey: { type: String, default: "label" },
})
const emit = defineEmits([
  "input",
  "enter",
  "focus",
  "blur",
  "update:modelValue",
])

let selectorOpened = ref(false)
let search = ""

const success = computed(() => !props.error)
const itemsSelected = computed(() =>
  props.items.filter((item) => props.modelValue.includes(item.value)),
)
const itemsFiltered = computed(() =>
  props.items.filter((item) =>
    RegExp(".*" + search + ".*", "i").test(item[props.searchKey]),
  ),
)

function handleFocus() {
  selectorOpened.value = true
}
function handleBlur() {
  selectorOpened.value = false
  search = ""
}
function handleOpen() {
  if (!selectorOpened.value) handleFocus()
  else handleBlur()
}
function handleChange(value) {
  emit("update:modelValue", value)
  handleBlur()
}
function handleToggle(value) {
  console.log(value)
  if (value === "s-a") return handleSelectAll()
  let selectedItemValues = []
  if (props.modelValue.includes(value)) {
    //the item is being unselected
    selectedItemValues = props.modelValue.filter((v) => v !== value)
  } else {
    //the item is being selected
    selectedItemValues = [...props.modelValue, value]
  }
  console.log(selectedItemValues)
  emit("update:modelValue", selectedItemValues)
}
function handleSelectAll() {
  let selectedItemValues = props.items.map(({ value }) => value)
  if (props.value.length === props.items.length) selectedItemValues = []
  emit("update:modelValue", selectedItemValues)
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
