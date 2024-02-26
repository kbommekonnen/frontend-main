<template>
  <div class="flex flex-col space-y-3">
    <base-select
      v-model="customer"
      :label="label"
      :placeholder="placeholder"
      v-bind="attrs"
      :items="customers"
      @input="hanldeInput"
      @update:modelValue="updateValue"
    >
      <template #default="{ item }">
        <div
          v-if="!item"
          class="flex-shrink-0 flex-auto overflow-hidden text-overflow-ellipsis"
        >
          {{ placeholder }}
        </div>
        <div v-else class="w-full flex items-center flex-shrink-0 flex-auto">
          <div class="flex-grow">
            <slot :item="item" class="">{{ item.label }}</slot>
          </div>
          <div class="float-right" @click.stop="reset">
            <base-icon
              name="times"
              class="text-textLight hover:text-textDark cursor-pointer"
            />
          </div>
        </div>
      </template>
    </base-select>
  </div>
</template>

<script setup>
import { inject, onMounted, ref } from "vue"
import api from "../api.js"

const getRequest = inject("getRequest")

let customers = ref([])
const props = defineProps({
  modelValue: {},
  label: { type: String, default: "customer" },
  placeholder: { type: String, default: "select customer" },
})
const customer = ref(props.modelValue)

const emit = defineEmits(["update:modelValue", "update:model-value"])

onMounted(async () => {
  const response = await getRequest(api.getAll)
  if (response) {
    customers.value = response.items.map(
      ({ name: label, _id: value, ...rest }) => ({ label, value, rest }),
    )
    autoPopulateDefaultValue()
  }
})

function autoPopulateDefaultValue() {
  const defaultCustomer = customers.value.find(
    ({ rest }) => rest.isDefault,
  )
  if (defaultCustomer) {
    customer.value = defaultCustomer.value
    emit("update:modelValue", defaultCustomer.value)
  } else if (customers.value.length == 1) { // auto select if there is only one option
    customer.value = customers.value[0].value
    emit("update:modelValue", customers.value[0].value)
  }
}

function reset() {
  customer.value = ""
  emit("update:modelValue", "")
}

function updateValue(value) {
  emit("update:modelValue", value)
}
</script>

<style scoped>
.customer {
  @apply bg-secondaryBg;
}
.customer:hover {
  @apply bg-primaryBg font-semibold;
}
</style>
