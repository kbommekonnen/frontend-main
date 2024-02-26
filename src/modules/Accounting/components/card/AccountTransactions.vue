<template>
  <div v-if="isLoading">loading</div>
  <error-card v-else-if="errorMessage && !transactions" :error="errorMessage" />
  <div v-else class="w-full">
    <data-table
      title="transactions"
      :showHeader="true"
      :headers="AccountTransactionsHeaders"
      :api="api.getAccountTransactions"
      :params="[id]"
      :searchApi="api.search"
      class="flex-grow bg-white w-full h-full"
    >
      <template #mobile="{ item }">
        <router-link :to="`/account/detail/${item._id}`">
          <!-- <mobile-account-card :account="item" /> -->
        </router-link>
      </template>
    </data-table>
  </div>
  <div class=""></div>
</template>
<script>
import { ref } from "vue"
import DataTable from "@/components/table/DataTable.vue"
import api from "../../api.js"
import { AccountTransactionsHeaders } from "../../headers.js"
export default {
  components: { DataTable },
  props: { id: String },
  inject: ["getRequest"],

  setup() {
    let transactions = ref([])
    return { api, AccountTransactionsHeaders, transactions }
  },
  methods: {},
  mounted() {},
}
</script>
