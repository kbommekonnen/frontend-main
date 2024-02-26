<template>
  <div v-if="isLoading">loading</div>
  <error-card v-else-if="errorMessage && !account" :error="errorMessage" />
  <div v-else>
    <div>
      <div class="">account detail</div>
      <div
        v-if="account"
        class="flex truncate text-primary text-2xl flex-grow limit-lines limit-lines-1 break-all w-full"
      >
        {{ account.name }}
      </div>
      <div class="flex space-x-4 items-center text-lg">
        <div>{{ account.code }}</div>
        <div
          class="bg-opacity-10 px-3 lowercase tracking-wide"
          :class="{
            'bg-primary text-primary': account.side == 'Credit',
            'bg-orange text-orange': account.side == 'Debit',
          }"
        >
          {{ account.side }}
        </div>
        <div
          class="bg-opacity-10 px-3 lowercase tracking-wide"
          :class="{
            'bg-primary text-primary': account.status == 'Active',
            'bg-error text-error': account.status == 'Inactive',
          }"
        >
          {{ account.status }}
        </div>
      </div>
    </div>
    <error-card v-if="errorMessage" :error="errorMessage" />
  </div>
  <div class=""></div>
</template>
<script>
import { ref } from "vue"
import api from "../../api.js"
export default {
  props: { id: String },
  inject: ["getRequest"],

  setup() {
    let account = ref()
    const isLoading = ref(true)
    return { account, isLoading }
  },
  methods: {
    async getGlAccount() {
      this.isLoading = true
      this.getRequest({ ...api.get, params: [this.id] }).then(
        ({ error, item }) => {
          if (error) {
            this.errorMessage = "account not found"
          } else {
            this.account = item
          }
          this.isLoading = false
        },
      )
    },
  },
  mounted() {
    this.getGlAccount()
  },
}
</script>
