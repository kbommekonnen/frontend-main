<template>
  <div
    class="flex flex-col space-y-4 rounded bg-white text-center p-4 relative"
  >
    <div class="first-letter:uppercase">{{ $t(label) }}</div>
    <account-selector :value="modelValue" v-model="account" label="">
      <template #default="{ item }">
        <div class="space-y-1 text-left">
          <div class="text-xl text-textDark">
            {{ item.label }}
          </div>
          <div class="">{{ item.rest.code }}</div>
        </div>
      </template>
    </account-selector>
    <div v-if="modelValue != account" class="absolute right-0 top-0">
    <base-button  :isWorking="isWorking" icon="check" :iconSize="24" @click="handleUpdate" type="" class="text-primary -mt-2" />
    </div>
  </div>
</template>
<script>
import { inject, ref } from "vue"
// import { openModal } from "@/plugins/modal"
import { openToast } from "@/plugins/toast"
import AccountSelector from "../AccountSelector.vue"
export default {
  props: { label: String, api: Object, modelValue: {} },

  emits: ["update:modelValue", "update:model-value"],

  components: { AccountSelector },

  setup(props, { emit }) {
    
    const putRequest = inject("putRequest")
    const isWorking = ref(false)
    const account = ref(props.modelValue)

    async function handleUpdate() {
      isWorking.value = true
      const response = await putRequest({
        ...props.api,
        data: { account: account.value },
      })
      if (response && !response.error) {
        emit("update:model-value", account.value)
        openToast("account updated successfully")
      } else {
        openToast(response.message, true)
      }
      isWorking.value = false
    }
    return { account, handleUpdate, isWorking }
  },
}
</script>
