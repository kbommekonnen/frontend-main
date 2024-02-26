<template>
  <div class="flex flex-col space-y-3">
    <base-select
      v-model="customerType"
      :label="label"
      :placeholder="placeholder"
      v-bind="attrs"
      :items="customerTypes"
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

let customerTypes = ref([])
const props = defineProps({
  modelValue: {},
  label: { type: String, default: "customer type" },
  placeholder: { type: String, default: "select customer type" },
})
const customerType = ref(props.modelValue)

const emit = defineEmits(["update:modelValue", "update:model-value"])

onMounted(async () => {
  const response = await getRequest(api.getAll)
  if (response) {
    customerTypes.value = response.items.map(
      ({ name: label, _id: value, ...rest }) => ({ label, value, rest }),
    )
    autoPopulateDefaultValue()
  }
})

function autoPopulateDefaultValue() {
  const defaultCustomerType = customerTypes.value.find(
    ({ rest }) => rest.isDefault,
  )
  if (defaultCustomerType) {
    customerType.value = defaultCustomerType.value
    emit("update:modelValue", defaultCustomerType.value)
  } else if (customerTypes.value.length == 1) { // auto select if there is only one option
    customerType.value = customerTypes.value[0].value
    emit("update:modelValue", customerTypes.value[0].value)
  }
}

function reset() {
  customerType.value = ""
  emit("update:modelValue", "")
}

function updateValue(value) {
  emit("update:modelValue", value)
}
</script>

<style scoped>
.customerType {
  @apply bg-secondaryBg;
}
.customerType:hover {
  @apply bg-primaryBg font-semibold;
}
</style>
