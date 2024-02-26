<template>
  <div class="flex flex-col space-y-3">
    <base-select
      v-model="account"
      :label="label"
      :placeholder="placeholder"
      v-bind="attrs"
      :items="accounts"
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
            <base-icon name="times" class="text-textLight hover:text-textDark cursor-pointer"/>
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

let accounts = ref([])
const props = defineProps({
  modelValue: {},
  label: { type: String, default: "account" },
  placeholder: { type: String, default: "select account" },
})
const account = ref(props.modelValue)

const emit = defineEmits(["update:modelValue", "update:model-value"])

onMounted(async () => {
  const response = await getRequest(api.getAll)
  if (response) {
    accounts.value = response.items.map(
      ({ name: label, _id: value, ...rest }) => ({ label, value, rest }),
    )
  }
})

function reset() {
  account.value = ''
  emit("update:modelValue", '')
}

function updateValue(value) {
  emit("update:modelValue", value)
}
</script>

<style scoped>
.account {
  @apply bg-secondaryBg;
}
.account:hover {
  @apply bg-primaryBg font-semibold;
}
</style>
